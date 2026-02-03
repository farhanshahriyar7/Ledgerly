import { InvoiceCategory } from "@/lib/types";
import { getCategoryIcon, getCategoryLabel, formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface CategoryBreakdownProps {
  data: {
    category: InvoiceCategory;
    count: number;
    total: number;
  }[];
}

const categoryColors: Record<InvoiceCategory, string> = {
  medical: "bg-info",
  payroll: "bg-success",
  utilities: "bg-warning",
  subscription: "bg-primary",
  custom: "bg-muted-foreground",
};

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const total = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="bg-card rounded-lg p-5 card-elevated animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Category Breakdown</h3>
        <span className="text-xs text-muted-foreground">This month</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-muted overflow-hidden flex mb-6">
        {data.map((item) => {
          const percentage = total > 0 ? (item.total / total) * 100 : 0;
          return (
            <div
              key={item.category}
              className={cn("h-full", categoryColors[item.category])}
              style={{ width: `${percentage}%` }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  categoryColors[item.category]
                )}
              />
              <span className="text-muted-foreground">
                {getCategoryIcon(item.category)} {getCategoryLabel(item.category)}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{item.count} invoices</span>
              <span className="font-medium text-foreground w-24 text-right">
                {formatCurrency(item.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
