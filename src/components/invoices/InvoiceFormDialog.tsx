import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InvoiceForm, InvoiceFormData } from "./InvoiceForm";
import { Invoice, InvoiceStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface InvoiceFormDialogProps {
  open: boolean;
  onClose: () => void;
  onInvoiceCreated?: (invoice: Invoice) => void;
}

function generateInvoiceId(): string {
  const prefix = "INV";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function InvoiceFormDialog({
  open,
  onClose,
  onInvoiceCreated,
}: InvoiceFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: InvoiceFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const taxAmount = (data.amount * data.taxRate) / 100;
    const total = data.amount + taxAmount - data.discount;

    const newInvoice: Invoice = {
      id: generateInvoiceId(),
      title: data.title,
      category: data.category,
      sender: {
        name: data.senderName,
        email: data.senderEmail,
        address: data.senderAddress,
        phone: data.senderPhone,
      },
      receiver: {
        name: data.receiverName,
        email: data.receiverEmail,
        address: data.receiverAddress,
        phone: data.receiverPhone,
      },
      amount: data.amount,
      tax: taxAmount,
      discount: data.discount,
      total,
      status: "draft" as InvoiceStatus,
      issueDate: data.issueDate.toISOString().split("T")[0],
      dueDate: data.dueDate.toISOString().split("T")[0],
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setIsSubmitting(false);

    toast({
      title: "Invoice Created",
      description: `Invoice ${newInvoice.id} has been created successfully.`,
    });

    onInvoiceCreated?.(newInvoice);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl">Create New Invoice</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-80px)] px-6 pb-6">
          <InvoiceForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
