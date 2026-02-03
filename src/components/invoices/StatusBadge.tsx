import { InvoiceStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getStatusLabel } from "@/lib/formatters";

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

const statusStyles: Record<InvoiceStatus, string> = {
  paid: "bg-success-muted text-success",
  sent: "bg-info-muted text-info",
  partially_paid: "bg-warning-muted text-warning",
  overdue: "bg-destructive-muted text-destructive",
  draft: "bg-muted text-muted-foreground",
  cancelled: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
        statusStyles[status],
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full mr-1.5",
          status === "paid" && "bg-success",
          status === "sent" && "bg-info",
          status === "partially_paid" && "bg-warning",
          status === "overdue" && "bg-destructive",
          status === "draft" && "bg-muted-foreground",
          status === "cancelled" && "bg-muted-foreground"
        )}
      />
      {getStatusLabel(status)}
    </span>
  );
}
