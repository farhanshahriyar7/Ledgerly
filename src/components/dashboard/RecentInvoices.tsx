import { Invoice } from "@/lib/types";
import { formatCurrency, formatDateShort, getStatusLabel } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RecentInvoicesProps {
  invoices: Invoice[];
  onViewInvoice?: (invoice: Invoice) => void;
}

const statusStyles: Record<string, string> = {
  paid: "bg-success-muted text-success",
  sent: "bg-info-muted text-info",
  partially_paid: "bg-warning-muted text-warning",
  overdue: "bg-destructive-muted text-destructive",
  draft: "bg-muted text-muted-foreground",
  cancelled: "bg-muted text-muted-foreground line-through",
};

export function RecentInvoices({ invoices, onViewInvoice }: RecentInvoicesProps) {
  return (
    <div className="bg-card rounded-lg card-elevated animate-fade-in">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">Recent Invoices</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest activity across all categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-success" /> Paid
            <span className="w-2 h-2 rounded-full bg-warning ml-2" /> Pending
            <span className="w-2 h-2 rounded-full bg-destructive ml-2" /> Overdue
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {invoices.slice(0, 6).map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-xs font-mono text-accent-foreground">
                    {invoice.id.slice(-3)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {invoice.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {invoice.sender.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs font-medium capitalize",
                  statusStyles[invoice.status]
                )}
              >
                {getStatusLabel(invoice.status)}
              </Badge>

              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground">
                  {formatCurrency(invoice.total)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Due {formatDateShort(invoice.dueDate)}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onViewInvoice?.(invoice)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full text-sm text-muted-foreground">
          View all invoices
        </Button>
      </div>
    </div>
  );
}
