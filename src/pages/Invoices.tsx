import { useState } from "react";
import { AppLayout, PageTransition } from "@/components/layout";
import { InvoiceTable, InvoiceDetail, InvoiceFormDialog } from "@/components/invoices";
import { mockInvoices } from "@/lib/mockData";
import { Invoice } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const InvoicesPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInvoiceCreated = (newInvoice: Invoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  return (
    <AppLayout
      title="Invoices"
      subtitle="Manage and track all your invoices"
    >
      <PageTransition>
        {/* Header with action */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">All Invoices</Button>
            <Button variant="ghost" size="sm">Drafts</Button>
            <Button variant="ghost" size="sm">Pending</Button>
            <Button variant="ghost" size="sm">Paid</Button>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>

        <InvoiceTable
          invoices={invoices}
          onViewInvoice={setSelectedInvoice}
          onEditInvoice={(inv) => console.log("Edit:", inv.id)}
          onDeleteInvoice={(inv) => console.log("Delete:", inv.id)}
        />

        <InvoiceDetail
          invoice={selectedInvoice}
          open={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />

        <InvoiceFormDialog
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onInvoiceCreated={handleInvoiceCreated}
        />
      </PageTransition>
    </AppLayout>
  );
};

export default InvoicesPage;
