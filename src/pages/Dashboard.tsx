import { useState } from "react";
import { AppLayout, PageTransition } from "@/components/layout";
import {
  StatCard,
  CategoryBreakdown,
  RecentInvoices,
  OutstandingByCategory,
} from "@/components/dashboard";
import { InvoiceDetail } from "@/components/invoices";
import {
  mockInvoices,
  getTotalPaidAmount,
  getTotalUnpaidAmount,
  getTotalOverdueAmount,
  getCategoryBreakdown,
} from "@/lib/mockData";
import { formatCurrency } from "@/lib/formatters";
import { Invoice } from "@/lib/types";
import { DollarSign, Clock, AlertTriangle, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";

const Dashboard = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const totalPaid = getTotalPaidAmount();
  const totalUnpaid = getTotalUnpaidAmount();
  const totalOverdue = getTotalOverdueAmount();
  const categoryData = getCategoryBreakdown();

  const paidCount = mockInvoices.filter((i) => i.status === "paid").length;
  const unpaidCount = mockInvoices.filter((i) =>
    ["sent", "draft", "partially_paid"].includes(i.status)
  ).length;
  const overdueCount = mockInvoices.filter((i) => i.status === "overdue").length;

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Overview of your invoice activity"
    >
      <PageTransition>
      {/* Quick actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Overview
          </Button>
          <Button variant="ghost" size="sm">
            Paid
          </Button>
          <Button variant="ghost" size="sm">
            Overdue
          </Button>
        </div>
        <div className="flex gap-2">
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Paid Invoices"
          value={formatCurrency(totalPaid)}
          subtitle={`${paidCount} invoices this month`}
          icon={FileCheck}
          variant="success"
          trend={{ value: 12, label: "vs last month" }}
        />
        <StatCard
          title="Unpaid Invoices"
          value={formatCurrency(totalUnpaid)}
          subtitle={`${unpaidCount} invoices pending`}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Overdue"
          value={formatCurrency(totalOverdue)}
          subtitle={`${overdueCount} invoices overdue`}
          icon={AlertTriangle}
          variant="destructive"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent invoices - takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentInvoices
            invoices={mockInvoices}
            onViewInvoice={setSelectedInvoice}
          />
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <CategoryBreakdown data={categoryData} />
          <OutstandingByCategory invoices={mockInvoices} />
        </div>
      </div>

        {/* Invoice detail modal */}
        <InvoiceDetail
          invoice={selectedInvoice}
          open={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      </PageTransition>
    </AppLayout>
  );
};

export default Dashboard;
