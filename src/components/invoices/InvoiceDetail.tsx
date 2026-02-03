import { Invoice, Payment } from "@/lib/types";
import {
  formatCurrency,
  formatDate,
  getCategoryLabel,
  getPaymentMethodLabel,
} from "@/lib/formatters";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Download,
  Edit,
  Send,
  CreditCard,
  Clock,
  CheckCircle2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { getPaymentsByInvoice } from "@/lib/mockData";

interface InvoiceDetailProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
}

export function InvoiceDetail({ invoice, open, onClose }: InvoiceDetailProps) {
  if (!invoice) return null;

  const payments = getPaymentsByInvoice(invoice.id);
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = invoice.total - totalPaid;

  const timeline = [
    {
      status: "created",
      date: invoice.createdAt,
      label: "Invoice Created",
      icon: FileText,
      complete: true,
    },
    {
      status: "sent",
      date: invoice.status !== "draft" ? invoice.issueDate : null,
      label: "Sent to Recipient",
      icon: Send,
      complete: invoice.status !== "draft",
    },
    {
      status: "payment",
      date: payments.length > 0 ? payments[0].date : null,
      label:
        invoice.status === "partially_paid"
          ? "Partial Payment Received"
          : "Payment Received",
      icon: CreditCard,
      complete:
        invoice.status === "paid" || invoice.status === "partially_paid",
    },
    {
      status: "complete",
      date: invoice.paymentDate || null,
      label: "Completed",
      icon: CheckCircle2,
      complete: invoice.status === "paid",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <div>
            <DialogTitle className="text-xl">{invoice.title}</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="font-mono">
                {invoice.id}
              </Badge>
              <StatusBadge status={invoice.status} />
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overdue warning */}
          {invoice.status === "overdue" && (
            <div className="flex items-center gap-3 p-4 bg-destructive-muted rounded-lg border border-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Invoice Overdue</p>
                <p className="text-sm text-muted-foreground">
                  This invoice was due on {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-4">
              Status Timeline
            </h4>
            <div className="flex items-center justify-between">
              {timeline.map((step, index) => (
                <div key={step.status} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.complete
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground text-center">
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground">
                        {formatDate(step.date)}
                      </p>
                    )}
                  </div>
                  {index < timeline.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        timeline[index + 1].complete
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                From (Sender)
              </h4>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium">{invoice.sender.name}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.sender.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.sender.address}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                To (Receiver)
              </h4>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium">{invoice.receiver.name}</p>
                <p className="text-sm text-muted-foreground">
                  {invoice.receiver.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {invoice.receiver.address}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium capitalize">
                {getCategoryLabel(invoice.category)}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Issue Date</p>
              <p className="font-medium">{formatDate(invoice.issueDate)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="font-medium">{formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Amounts */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Amount Breakdown
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(invoice.amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
              {invoice.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-success">
                    -{formatCurrency(invoice.discount)}
                  </span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCurrency(invoice.total)}</span>
              </div>
              {payments.length > 0 && (
                <>
                  <div className="flex justify-between text-sm text-success">
                    <span>Paid</span>
                    <span>-{formatCurrency(totalPaid)}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Remaining</span>
                    <span>{formatCurrency(remaining)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Payment History */}
          {payments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Payment History
              </h4>
              <div className="space-y-2">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 bg-success-muted rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-success" />
                      <div>
                        <p className="text-sm font-medium">
                          {getPaymentMethodLabel(payment.method)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment.reference || "No reference"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-success">
                        {formatCurrency(payment.amount)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(payment.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {invoice.notes && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Internal Notes
              </h4>
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-4">
                {invoice.notes}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            {invoice.status !== "paid" && (
              <>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Record Payment
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
