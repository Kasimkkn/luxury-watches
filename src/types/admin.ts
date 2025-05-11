
// Product Management
export interface ProductFilter {
  brand?: string[];
  priceRange?: [number, number];
  condition?: ('New' | 'Excellent' | 'Good' | 'Fair')[];
  inStock?: boolean;
}

// User Management
export interface AdminUser {
  id: string;
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'suspended';
  totalPurchases: number;
  totalSpent: number;
}

// Order Management
export interface Order {
  id: string;
  userId: string;
  userName: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'paid' | 'pending' | 'failed';
  items: {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// Support & Customer Management
export interface CustomerInquiry {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  date: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

export interface ChatMessage {
  id: string;
  inquiryId: string;
  sender: 'customer' | 'admin';
  message: string;
  timestamp: string;
  read: boolean;
}

// Analytics & Reporting
export interface SalesReport {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  topBrands: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
}

export interface UserActivityReport {
  period: string;
  newUsers: number;
  activeUsers: number;
  conversionRate: number;
}
