export type UserRole = "admin" | "accountant" | "staff" | "viewer";

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "cancelled";

export type InvoiceCategory =
  | "medical"
  | "payroll"
  | "utilities"
  | "subscription"
  | "custom";

export type PaymentMethod = "cash" | "bank_transfer" | "online" | "check";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Party {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface Invoice {
  id: string;
  title: string;
  category: InvoiceCategory;
  sender: Party;
  receiver: Party;
  amount: number;
  tax: number;
  discount: number;
  total: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paymentDate?: string;
  attachments?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: PaymentMethod;
  date: string;
  reference?: string;
  notes?: string;
  createdAt: string;
}

export interface StatusTimelineItem {
  status: InvoiceStatus;
  date: string;
  description: string;
}

// Role permissions
export const rolePermissions: Record<UserRole, {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canApprovePayments: boolean;
}> = {
  admin: {
    canCreate: true,
    canEdit: true,
    canDelete: true,
    canViewReports: true,
    canManageUsers: true,
    canApprovePayments: true,
  },
  accountant: {
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canViewReports: true,
    canManageUsers: false,
    canApprovePayments: true,
  },
  staff: {
    canCreate: true,
    canEdit: false,
    canDelete: false,
    canViewReports: false,
    canManageUsers: false,
    canApprovePayments: false,
  },
  viewer: {
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canViewReports: true,
    canManageUsers: false,
    canApprovePayments: false,
  },
};
