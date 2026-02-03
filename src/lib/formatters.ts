import { InvoiceCategory, InvoiceStatus, PaymentMethod } from "./types";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateShort = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const getStatusLabel = (status: InvoiceStatus): string => {
  const labels: Record<InvoiceStatus, string> = {
    draft: "Draft",
    sent: "Sent",
    partially_paid: "Partial",
    paid: "Paid",
    overdue: "Overdue",
    cancelled: "Cancelled",
  };
  return labels[status];
};

export const getCategoryLabel = (category: InvoiceCategory): string => {
  const labels: Record<InvoiceCategory, string> = {
    medical: "Medical",
    payroll: "Payroll",
    utilities: "Utilities",
    subscription: "Subscription",
    custom: "Custom",
  };
  return labels[category];
};

export const getPaymentMethodLabel = (method: PaymentMethod): string => {
  const labels: Record<PaymentMethod, string> = {
    cash: "Cash",
    bank_transfer: "Bank Transfer",
    online: "Online",
    check: "Check",
  };
  return labels[method];
};

export const getCategoryIcon = (category: InvoiceCategory): string => {
  const icons: Record<InvoiceCategory, string> = {
    medical: "🏥",
    payroll: "💰",
    utilities: "⚡",
    subscription: "🔄",
    custom: "📋",
  };
  return icons[category];
};

export const isOverdue = (dueDate: string, status: InvoiceStatus): boolean => {
  if (status === "paid" || status === "cancelled") return false;
  return new Date(dueDate) < new Date();
};
