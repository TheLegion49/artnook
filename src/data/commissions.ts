export type CommissionStatus =
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'QUOTED'
  | 'ACCEPTED_DEPOSIT_PAID'
  | 'IN_PROGRESS'
  | 'PREVIEW_SENT'
  | 'APPROVED'
  | 'BALANCE_PAID'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'DECLINED'
  | 'CANCELLED';

export interface CommissionMessage {
  id: string;
  sender: 'customer' | 'maker';
  text: string;
  attachments?: string[];
  createdAt: string;
}

export interface CommissionMilestone {
  id: string;
  title: string;
  description: string;
  imageSeed?: number;
  palette?: string[];
  status: 'pending' | 'current' | 'approved';
  createdAt: string;
}

export interface Commission {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  type: string;
  details: {
    size?: string;
    colours: string[];
    wordsOrNames?: string;
    flowerType?: string;
    specialNotes?: string;
  };
  neededByDate?: string;
  budgetRange: string;
  status: CommissionStatus;
  quoteAmountPaise?: number; // e.g. 500000 = ₹5,000
  depositPaid: boolean;
  balancePaid: boolean;
  messages: CommissionMessage[];
  milestones: CommissionMilestone[];
  createdAt: string;
  updatedAt: string;
}

export const sampleCommissions: Commission[] = [
  {
    id: 'COM-2026-0881',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.s@example.com',
    customerPhone: '+91 98765 43210',
    type: 'Wedding Bouquet Preservation',
    details: {
      size: 'A3 (30 × 42 cm)',
      colours: ['Cream', 'Blush pink', 'Eucalyptus green', 'Gold flakes'],
      wordsOrNames: 'A & K • 14.02.2026',
      flowerType: 'Roses, baby\'s breath & olive leaves',
      specialNotes: 'Please preserve the ribbon from the bouquet if possible.',
    },
    neededByDate: '2026-11-15',
    budgetRange: '₹8,000 – ₹10,000',
    status: 'IN_PROGRESS',
    quoteAmountPaise: 899900,
    depositPaid: true,
    balancePaid: false,
    messages: [
      {
        id: 'msg_1',
        sender: 'customer',
        text: 'Hi! I got married last weekend and have dried my bouquet according to your instructions. Looking forward to having it framed!',
        createdAt: '2026-09-22T10:00:00Z',
      },
      {
        id: 'msg_2',
        sender: 'maker',
        text: 'Congratulations Ananya! The flowers arrived safely in the studio. We\'ve finished the silica drying phase and the petals kept their blush color beautifully. We\'ll pour the first base layer tomorrow.',
        createdAt: '2026-09-24T14:30:00Z',
      },
    ],
    milestones: [
      {
        id: 'ms_1',
        title: 'Flowers Dried & Layout Approved',
        description: 'Arrangement finalized in a natural cascading shape.',
        status: 'approved',
        createdAt: '2026-09-23T11:00:00Z',
      },
      {
        id: 'ms_2',
        title: 'Deep Cast Pouring',
        description: 'First two layers of crystal clear resin cured without bubbles.',
        status: 'current',
        imageSeed: 1500,
        palette: ['#FFF6E5', '#F7A8C4', '#8EE3C2', '#D4A63A'],
        createdAt: '2026-09-26T16:00:00Z',
      },
      {
        id: 'ms_3',
        title: 'Diamond Polishing & Frame Mounting',
        description: 'Final bevel sanding and brass hanger attachment.',
        status: 'pending',
        createdAt: '2026-10-01T10:00:00Z',
      },
    ],
    createdAt: '2026-09-20T08:30:00Z',
    updatedAt: '2026-09-26T16:00:00Z',
  },
];
