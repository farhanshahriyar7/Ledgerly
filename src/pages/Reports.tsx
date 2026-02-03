import { AppLayout, PageTransition } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, FileText, TrendingUp, PieChart } from "lucide-react";
import { mockInvoices, getCategoryBreakdown } from "@/lib/mockData";
import { formatCurrency } from "@/lib/formatters";

const ReportsPage = () => {
  const categoryData = getCategoryBreakdown();
  const totalAmount = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
  const paidAmount = mockInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <AppLayout title="Reports" subtitle="Generate and download financial reports">
      <PageTransition>
      {/* Report options */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-5 card-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <p className="text-2xl font-semibold">{mockInvoices.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 card-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold">{formatCurrency(totalAmount)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 card-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <PieChart className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collected</p>
              <p className="text-2xl font-semibold">{formatCurrency(paidAmount)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-5 card-elevated">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <TrendingUp className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
              <p className="text-2xl font-semibold">
                {Math.round((paidAmount / totalAmount) * 100)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Category breakdown */}
      <Card className="p-6 card-elevated">
        <h3 className="text-lg font-semibold mb-4">Revenue by Category</h3>
        <div className="space-y-4">
          {categoryData.map((item) => {
            const percentage = Math.round((item.total / totalAmount) * 100);
            return (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="capitalize font-medium">{item.category}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(item.total)} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      </PageTransition>
    </AppLayout>
  );
};

export default ReportsPage;
