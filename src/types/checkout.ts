
// Types for checkout functionality
export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'wallet' | 'cod';
  details: CardDetails | UpiDetails | WalletDetails | null;
  isDefault?: boolean;
}

export interface CardDetails {
  cardNumber: string; // Last 4 digits only for saved cards
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  brand?: 'visa' | 'mastercard' | 'amex' | 'rupay' | 'other';
}

export interface UpiDetails {
  upiId: string;
  provider?: 'gpay' | 'phonepe' | 'paytm' | 'other';
}

export interface WalletDetails {
  provider: 'paytm' | 'phonepe' | 'amazonpay' | 'gpay' | 'other';
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
}

export interface CheckoutFormData {
  addressId: string;
  paymentMethod: PaymentMethod;
  orderNotes?: string;
}
