import { useState } from "react";
import { AppLayout, PageTransition } from "@/components/layout";
import { InvoiceTable, InvoiceDetail, InvoiceFormDialog } from "@/components/invoices";
import { mockInvoices } from "@/lib/mockData";
import { Invoice } from "@/lib/types";

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
        <InvoiceTable
          invoices={invoices}
          onViewInvoice={setSelectedInvoice}
          onEditInvoice={(inv) => console.log("Edit:", inv.id)}
          onDeleteInvoice={(inv) => console.log("Delete:", inv.id)}
          onNewInvoice={() => setIsFormOpen(true)}
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
