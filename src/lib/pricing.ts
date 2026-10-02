/**
 * Pure pricing calculation pipeline as specified in Section 7 of Master Build Prompt:
 * 1. Line subtotals
 * 2. Item-level discounts
 * 3. Order-level discount code
 * 4. Shipping fee calculation (Free over threshold ₹1,999)
 * 5. Tax (GST: CGST + SGST or IGST based on state)
 * 6. Gift-card balance applied last as payment method (not discount)
 */

export interface PricingLineItem {
  id: string;
  pricePaise: number;
  quantity: number;
  itemDiscountPaise?: number;
}

export interface PricingCalculationInput {
  items: PricingLineItem[];
  discountCode?: {
    code: string;
    type: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
    value: number; // percentage or paise
    minOrderValue?: number;
  };
  giftWrap?: boolean;
  giftWrapFeePaise?: number; // default ₹99 = 9900 paise
  shippingMethod?: 'standard' | 'express' | 'pickup';
  freeShippingThresholdPaise?: number; // default ₹1,999 = 199900 paise
  shippingZoneState?: string;
  isOriginState?: boolean; // Origin is Karnataka (560038)
  gstRatePercent?: number; // e.g. 18% for resin handicrafts (owner to confirm)
  taxInclusive?: boolean; // default true in India
  giftCardBalancePaise?: number;
}

export interface PricingBreakdown {
  subtotalPaise: number;
  itemDiscountsTotalPaise: number;
  orderDiscountPaise: number;
  effectiveDiscountPaise: number;
  giftWrapPaise: number;
  shippingPaise: number;
  freeShippingApplied: boolean;
  taxableAmountPaise: number;
  taxPaise: number;
  cgstPaise?: number;
  sgstPaise?: number;
  igstPaise?: number;
  totalBeforeGiftCardPaise: number;
  giftCardDeductionPaise: number;
  finalPayablePaise: number;
}

export function calculateOrderPricing(input: PricingCalculationInput): PricingBreakdown {
  const {
    items,
    discountCode,
    giftWrap = false,
    giftWrapFeePaise = 9900,
    shippingMethod = 'standard',
    freeShippingThresholdPaise = 199900,
    isOriginState = true,
    gstRatePercent = 18,
    taxInclusive = true,
    giftCardBalancePaise = 0,
  } = input;

  // 1. Line subtotals
  let subtotalPaise = 0;
  let itemDiscountsTotalPaise = 0;

  for (const item of items) {
    const lineTotal = item.pricePaise * item.quantity;
    subtotalPaise += lineTotal;
    if (item.itemDiscountPaise) {
      itemDiscountsTotalPaise += item.itemDiscountPaise * item.quantity;
    }
  }

  const baseAfterItemDiscounts = Math.max(0, subtotalPaise - itemDiscountsTotalPaise);

  // 2. Order discount code
  let orderDiscountPaise = 0;
  let freeShippingFromDiscount = false;

  if (discountCode) {
    const eligible = !discountCode.minOrderValue || baseAfterItemDiscounts >= discountCode.minOrderValue;

    if (eligible) {
      if (discountCode.type === 'PERCENTAGE') {
        orderDiscountPaise = Math.round((baseAfterItemDiscounts * discountCode.value) / 100);
      } else if (discountCode.type === 'FIXED_AMOUNT') {
        orderDiscountPaise = Math.min(baseAfterItemDiscounts, discountCode.value);
      } else if (discountCode.type === 'FREE_SHIPPING') {
        freeShippingFromDiscount = true;
      }
    }
  }

  const effectiveDiscountPaise = itemDiscountsTotalPaise + orderDiscountPaise;

  // 3. Gift wrap fee
  const giftWrapPaise = giftWrap ? giftWrapFeePaise : 0;

  // 4. Shipping fee calculation
  let shippingPaise = 0;
  let freeShippingApplied = false;

  if (shippingMethod === 'pickup') {
    shippingPaise = 0;
    freeShippingApplied = true;
  } else if (freeShippingFromDiscount || baseAfterItemDiscounts >= freeShippingThresholdPaise) {
    shippingPaise = 0;
    freeShippingApplied = true;
  } else {
    shippingPaise = shippingMethod === 'express' ? 19900 : 9900; // ₹199 express or ₹99 standard
  }

  // 5. Tax (GST)
  const netAmount = Math.max(0, baseAfterItemDiscounts - orderDiscountPaise + giftWrapPaise);

  let taxPaise = 0;
  let cgstPaise = 0;
  let sgstPaise = 0;
  let igstPaise = 0;

  if (taxInclusive) {
    // Back-calculate tax from inclusive amount: net * (rate / (100 + rate))
    taxPaise = Math.round((netAmount * gstRatePercent) / (100 + gstRatePercent));
  } else {
    taxPaise = Math.round((netAmount * gstRatePercent) / 100);
  }

  if (isOriginState) {
    // Intrastate: CGST 50% + SGST 50%
    cgstPaise = Math.floor(taxPaise / 2);
    sgstPaise = taxPaise - cgstPaise;
  } else {
    // Interstate: IGST 100%
    igstPaise = taxPaise;
  }

  // Total payable before gift card application
  const totalBeforeGiftCardPaise = taxInclusive
    ? netAmount + shippingPaise
    : netAmount + taxPaise + shippingPaise;

  // 6. Gift card applied last as payment method
  const giftCardDeductionPaise = Math.min(totalBeforeGiftCardPaise, Math.max(0, giftCardBalancePaise));
  const finalPayablePaise = Math.max(0, totalBeforeGiftCardPaise - giftCardDeductionPaise);

  return {
    subtotalPaise,
    itemDiscountsTotalPaise,
    orderDiscountPaise,
    effectiveDiscountPaise,
    giftWrapPaise,
    shippingPaise,
    freeShippingApplied,
    taxableAmountPaise: netAmount - (taxInclusive ? taxPaise : 0),
    taxPaise,
    cgstPaise: isOriginState ? cgstPaise : undefined,
    sgstPaise: isOriginState ? sgstPaise : undefined,
    igstPaise: !isOriginState ? igstPaise : undefined,
    totalBeforeGiftCardPaise,
    giftCardDeductionPaise,
    finalPayablePaise,
  };
}
