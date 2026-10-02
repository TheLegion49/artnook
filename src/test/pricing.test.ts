import { calculateOrderPricing } from '../lib/pricing';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${msg}`);
}

console.log('🧪 Starting ArtNook Commerce Engine Unit Tests...\n');

// TEST 1: Standard subtotal without discounts
{
  const result = calculateOrderPricing({
    items: [
      { id: '1', pricePaise: 119900, quantity: 1 }, // Ocean Wave Coaster (₹1,199)
      { id: '2', pricePaise: 29900, quantity: 2 },  // Gold-Fleck Bookmark (₹299 x 2)
    ],
    shippingMethod: 'standard',
  });

  assert(result.subtotalPaise === 179700, 'Subtotal should be ₹1,797 (179700 paise)');
  assert(result.shippingPaise === 9900, 'Orders under ₹1,999 should have ₹99 standard shipping');
  assert(!result.freeShippingApplied, 'Free shipping should not be applied under ₹1,999');
  assert(result.totalBeforeGiftCardPaise === 189600, 'Total should equal subtotal + shipping (₹1,896)');
}

// TEST 2: Free shipping above threshold ₹1,999
{
  const result = calculateOrderPricing({
    items: [
      { id: '1', pricePaise: 249900, quantity: 1 }, // Sunset Swirl Tray (₹2,499)
    ],
    shippingMethod: 'standard',
  });

  assert(result.shippingPaise === 0, 'Orders above ₹1,999 must get free shipping');
  assert(result.freeShippingApplied === true, 'freeShippingApplied flag must be true');
}

// TEST 3: WELCOME10 (10% discount on order)
{
  const result = calculateOrderPricing({
    items: [
      { id: '1', pricePaise: 100000, quantity: 1 }, // ₹1,000
    ],
    discountCode: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minOrderValue: 49900,
    },
    shippingMethod: 'standard',
  });

  assert(result.orderDiscountPaise === 10000, '10% of ₹1,000 should be ₹100 (10000 paise)');
  assert(result.finalPayablePaise === 90000 + 9900, 'Final payable should be (₹1000 - ₹100) + ₹99 shipping');
}

// TEST 4: GST Intrastate breakdown (CGST + SGST)
{
  const result = calculateOrderPricing({
    items: [{ id: '1', pricePaise: 118000, quantity: 1 }], // ₹1,180 inclusive
    isOriginState: true,
    gstRatePercent: 18,
    taxInclusive: true,
  });

  assert(result.taxPaise === 18000, '18% GST back-calculated on ₹1,180 inclusive is ₹180');
  assert(result.cgstPaise === 9000, 'CGST should be ₹90 (9000 paise)');
  assert(result.sgstPaise === 9000, 'SGST should be ₹90 (9000 paise)');
  assert(result.igstPaise === undefined, 'IGST should be undefined for intrastate order');
}

// TEST 5: GST Interstate breakdown (IGST)
{
  const result = calculateOrderPricing({
    items: [{ id: '1', pricePaise: 118000, quantity: 1 }],
    isOriginState: false,
    gstRatePercent: 18,
    taxInclusive: true,
  });

  assert(result.igstPaise === 18000, 'IGST should be full ₹180 for interstate order');
  assert(result.cgstPaise === undefined, 'CGST should be undefined for interstate order');
}

// TEST 6: Gift card balance applied last
{
  const result = calculateOrderPricing({
    items: [{ id: '1', pricePaise: 100000, quantity: 1 }], // ₹1,000
    giftCardBalancePaise: 60000, // ₹600 card
    shippingMethod: 'pickup',
  });

  assert(result.giftCardDeductionPaise === 60000, 'Gift card should deduct up to available balance');
  assert(result.finalPayablePaise === 40000, 'Final payable should be ₹400 after ₹600 gift card applied');
}

console.log('\n🎉 ALL COMMERCE UNIT TESTS PASSED SUCCESSFULLY!\n');
