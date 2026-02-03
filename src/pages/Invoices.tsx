import { useState } from "react";
import { AppLayout } from "@/components/layout";
import { InvoiceTable, InvoiceDetail } from "@/components/invoices";
import { mockInvoices } from "@/lib/mockData";
import { Invoice } from "@/lib/types";

const InvoicesPage = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  return (
    <AppLayout
      title="Invoices"
      subtitle="Manage and track all your invoices"
    >
      <InvoiceTable
        invoices={mockInvoices}
        onViewInvoice={setSelectedInvoice}
        onEditInvoice={(inv) => console.log("Edit:", inv.id)}
        onDeleteInvoice={(inv) => console.log("Delete:", inv.id)}
      />

      <InvoiceDetail
        invoice={selectedInvoice}
        open={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </AppLayout>
  );
};

export default InvoicesPage;
