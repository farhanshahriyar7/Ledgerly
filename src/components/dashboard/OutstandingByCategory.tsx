import { Invoice } from "@/lib/types";
import { formatCurrency, getCategoryLabel } from "@/lib/formatters";

interface OutstandingByCategoryProps {
  invoices: Invoice[];
}

export function OutstandingByCategory({ invoices }: OutstandingByCategoryProps) {
  const outstanding = invoices.filter(
    (inv) => inv.status !== "paid" && inv.status !== "cancelled"
  );

  const grouped = outstanding.reduce((acc, inv) => {
    if (!acc[inv.category]) {
      acc[inv.category] = { count: 0, total: 0 };
    }
    acc[inv.category].count += 1;
    acc[inv.category].total += inv.total;
    return acc;
  }, {} as Record<string, { count: number; total: number }>);

  const categories = Object.entries(grouped).sort((a, b) => b[1].total - a[1].total);

  return (
    <div className="bg-card rounded-lg p-5 card-elevated animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Outstanding by Category</h3>
        <span className="text-xs text-muted-foreground">
          {outstanding.length} pending
        </span>
      </div>

      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No outstanding invoices
          </p>
        ) : (
          categories.map(([category, data]) => (
            <div
              key={category}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div>
                <p className="text-sm font-medium text-foreground capitalize">
                  {getCategoryLabel(category as any)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {data.count} invoice{data.count !== 1 ? "s" : ""}
                </p>
              </div>
              <p className="font-semibold text-foreground">
                {formatCurrency(data.total)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
