import { Invoice, InvoiceCategory, InvoiceStatus, Payment, User, UserRole } from "./types";

// Mock current user
export const currentUser: User = {
  id: "user-1",
  name: "Sarah Mitchell",
  email: "sarah@ledgerly.com",
  role: "admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
};

// Mock invoices data
export const mockInvoices: Invoice[] = [
  {
    id: "INV-001",
    title: "Medical Equipment Supply",
    category: "medical",
    sender: {
      name: "MedTech Solutions Inc.",
      email: "billing@medtech.com",
      address: "123 Healthcare Blvd, Boston, MA 02101",
    },
    receiver: {
      name: "City General Hospital",
      email: "accounts@cityhospital.org",
      address: "456 Medical Center Dr, Boston, MA 02102",
    },
    amount: 2500.00,
    tax: 200.00,
    discount: 0,
    total: 2700.00,
    status: "paid",
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    paymentDate: "2024-02-10",
    notes: "Quarterly medical supplies delivery",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-10T14:30:00Z",
  },
  {
    id: "INV-002",
    title: "Staff Payroll - January",
    category: "payroll",
    sender: {
      name: "HR Department",
      email: "hr@company.com",
      address: "Internal",
    },
    receiver: {
      name: "Finance Department",
      email: "finance@company.com",
      address: "Internal",
    },
    amount: 45000.00,
    tax: 0,
    discount: 0,
    total: 45000.00,
    status: "paid",
    issueDate: "2024-01-25",
    dueDate: "2024-01-31",
    paymentDate: "2024-01-30",
    notes: "Monthly payroll processing",
    createdAt: "2024-01-25T09:00:00Z",
    updatedAt: "2024-01-30T16:00:00Z",
  },
  {
    id: "INV-003",
    title: "Office Utilities - Q1",
    category: "utilities",
    sender: {
      name: "City Power & Gas",
      email: "billing@citypg.com",
      address: "789 Energy Way, Boston, MA 02103",
    },
    receiver: {
      name: "Ledgerly HQ",
      email: "admin@ledgerly.com",
      address: "100 Innovation Dr, Boston, MA 02104",
    },
    amount: 1250.00,
    tax: 100.00,
    discount: 50.00,
    total: 1300.00,
    status: "sent",
    issueDate: "2024-02-01",
    dueDate: "2024-02-28",
    notes: "Q1 electricity and gas charges",
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-01T11:00:00Z",
  },
  {
    id: "INV-004",
    title: "Software Subscription - Annual",
    category: "subscription",
    sender: {
      name: "CloudSoft Inc.",
      email: "invoices@cloudsoft.io",
      address: "500 Tech Park, San Francisco, CA 94102",
    },
    receiver: {
      name: "Ledgerly HQ",
      email: "admin@ledgerly.com",
      address: "100 Innovation Dr, Boston, MA 02104",
    },
    amount: 5999.00,
    tax: 479.92,
    discount: 599.90,
    total: 5879.02,
    status: "overdue",
    issueDate: "2024-01-01",
    dueDate: "2024-01-15",
    notes: "Annual enterprise license renewal",
    createdAt: "2024-01-01T08:00:00Z",
    updatedAt: "2024-01-01T08:00:00Z",
  },
  {
    id: "INV-005",
    title: "Consulting Services",
    category: "custom",
    sender: {
      name: "Strategic Advisors LLC",
      email: "billing@stratadvisors.com",
      address: "200 Business Ave, New York, NY 10001",
    },
    receiver: {
      name: "Ledgerly HQ",
      email: "admin@ledgerly.com",
      address: "100 Innovation Dr, Boston, MA 02104",
    },
    amount: 15000.00,
    tax: 1200.00,
    discount: 0,
    total: 16200.00,
    status: "partially_paid",
    issueDate: "2024-01-20",
    dueDate: "2024-02-20",
    notes: "Q1 strategic consulting engagement",
    createdAt: "2024-01-20T13:00:00Z",
    updatedAt: "2024-02-05T10:00:00Z",
  },
  {
    id: "INV-006",
    title: "Office Supplies",
    category: "custom",
    sender: {
      name: "OfficeMax Pro",
      email: "orders@officemax.com",
      address: "300 Supply St, Chicago, IL 60601",
    },
    receiver: {
      name: "Ledgerly HQ",
      email: "admin@ledgerly.com",
      address: "100 Innovation Dr, Boston, MA 02104",
    },
    amount: 450.00,
    tax: 36.00,
    discount: 0,
    total: 486.00,
    status: "draft",
    issueDate: "2024-02-05",
    dueDate: "2024-03-05",
    notes: "Monthly office supplies order",
    createdAt: "2024-02-05T15:00:00Z",
    updatedAt: "2024-02-05T15:00:00Z",
  },
  {
    id: "INV-007",
    title: "Medical Lab Services",
    category: "medical",
    sender: {
      name: "BioLab Diagnostics",
      email: "finance@biolab.com",
      address: "150 Research Pkwy, Cambridge, MA 02139",
    },
    receiver: {
      name: "City General Hospital",
      email: "accounts@cityhospital.org",
      address: "456 Medical Center Dr, Boston, MA 02102",
    },
    amount: 8500.00,
    tax: 680.00,
    discount: 425.00,
    total: 8755.00,
    status: "sent",
    issueDate: "2024-02-08",
    dueDate: "2024-03-08",
    notes: "February laboratory testing services",
    createdAt: "2024-02-08T09:30:00Z",
    updatedAt: "2024-02-08T09:30:00Z",
  },
  {
    id: "INV-008",
    title: "Staff Payroll - February",
    category: "payroll",
    sender: {
      name: "HR Department",
      email: "hr@company.com",
      address: "Internal",
    },
    receiver: {
      name: "Finance Department",
      email: "finance@company.com",
      address: "Internal",
    },
    amount: 47500.00,
    tax: 0,
    discount: 0,
    total: 47500.00,
    status: "draft",
    issueDate: "2024-02-20",
    dueDate: "2024-02-29",
    notes: "Monthly payroll processing - February",
    createdAt: "2024-02-20T09:00:00Z",
    updatedAt: "2024-02-20T09:00:00Z",
  },
  {
    id: "INV-009",
    title: "Internet & Phone Services",
    category: "utilities",
    sender: {
      name: "TeleCom Solutions",
      email: "billing@telecom.com",
      address: "600 Connect Blvd, Boston, MA 02105",
    },
    receiver: {
      name: "Ledgerly HQ",
      email: "admin@ledgerly.com",
      address: "100 Innovation Dr, Boston, MA 02104",
    },
    amount: 350.00,
    tax: 28.00,
    discount: 0,
    total: 378.00,
    status: "paid",
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    paymentDate: "2024-02-08",
    notes: "Monthly telecom services",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-02-08T11:00:00Z",
  },
  {
    id: "INV-010",
    title: "Cloud Hosting Services",
    category: "subscription",
    sender: {
      name: "AWS",
      email: "billing@aws.amazon.com",
      address: "410 Terry Ave N, Seattle, WA 98109",
    },
    receiver: {
      name: "Ledgerly HQ",
      email: "admin@ledgerly.com",
      address: "100 Innovation Dr, Boston, MA 02104",
    },
    amount: 2340.00,
    tax: 187.20,
    discount: 0,
    total: 2527.20,
    status: "sent",
    issueDate: "2024-02-01",
    dueDate: "2024-02-15",
    notes: "Monthly cloud infrastructure",
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
];

// Mock payments
export const mockPayments: Payment[] = [
  {
    id: "PAY-001",
    invoiceId: "INV-001",
    amount: 2700.00,
    method: "bank_transfer",
    date: "2024-02-10",
    reference: "TRF-2024-0210-001",
    createdAt: "2024-02-10T14:30:00Z",
  },
  {
    id: "PAY-002",
    invoiceId: "INV-002",
    amount: 45000.00,
    method: "bank_transfer",
    date: "2024-01-30",
    reference: "PAY-2024-0130-001",
    createdAt: "2024-01-30T16:00:00Z",
  },
  {
    id: "PAY-003",
    invoiceId: "INV-005",
    amount: 8000.00,
    method: "bank_transfer",
    date: "2024-02-05",
    reference: "TRF-2024-0205-001",
    notes: "First partial payment",
    createdAt: "2024-02-05T10:00:00Z",
  },
  {
    id: "PAY-004",
    invoiceId: "INV-009",
    amount: 378.00,
    method: "online",
    date: "2024-02-08",
    reference: "ONL-2024-0208-001",
    createdAt: "2024-02-08T11:00:00Z",
  },
];

// Helper functions
export const getInvoicesByStatus = (status: InvoiceStatus): Invoice[] => {
  return mockInvoices.filter((inv) => inv.status === status);
};

export const getInvoicesByCategory = (category: InvoiceCategory): Invoice[] => {
  return mockInvoices.filter((inv) => inv.category === category);
};

export const getPaymentsByInvoice = (invoiceId: string): Payment[] => {
  return mockPayments.filter((pay) => pay.invoiceId === invoiceId);
};

export const getTotalPaidAmount = (): number => {
  return mockInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);
};

export const getTotalUnpaidAmount = (): number => {
  return mockInvoices
    .filter((inv) => ["sent", "draft", "partially_paid"].includes(inv.status))
    .reduce((sum, inv) => sum + inv.total, 0);
};

export const getTotalOverdueAmount = (): number => {
  return mockInvoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);
};

export const getCategoryBreakdown = () => {
  const categories: InvoiceCategory[] = ["medical", "payroll", "utilities", "subscription", "custom"];
  return categories.map((category) => ({
    category,
    count: mockInvoices.filter((inv) => inv.category === category).length,
    total: mockInvoices
      .filter((inv) => inv.category === category)
      .reduce((sum, inv) => sum + inv.total, 0),
  }));
};
