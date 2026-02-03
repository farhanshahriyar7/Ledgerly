import { AppLayout, PageTransition } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageSquare, FileQuestion, ExternalLink } from "lucide-react";

const HelpPage = () => {
  return (
    <AppLayout title="Help & Support" subtitle="Get help with Ledgerly">
      <PageTransition>
      <div className="max-w-3xl space-y-6">
        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 card-elevated hover:border-primary transition-colors cursor-pointer">
            <Mail className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium">Email Support</h4>
            <p className="text-sm text-muted-foreground">
              Get help via email within 24 hours
            </p>
          </Card>
          <Card className="p-5 card-elevated hover:border-primary transition-colors cursor-pointer">
            <MessageSquare className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium">Live Chat</h4>
            <p className="text-sm text-muted-foreground">
              Chat with our support team
            </p>
          </Card>
          <Card className="p-5 card-elevated hover:border-primary transition-colors cursor-pointer">
            <FileQuestion className="w-8 h-8 text-primary mb-3" />
            <h4 className="font-medium">Documentation</h4>
            <p className="text-sm text-muted-foreground">
              Browse our knowledge base
            </p>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="p-6 card-elevated">
          <h3 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new invoice?</AccordionTrigger>
              <AccordionContent>
                Navigate to the Invoices page and click the "New Invoice" button.
                Fill in the required fields including sender, receiver, amounts,
                and due date. Save as draft or send directly.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How do I record a partial payment?
              </AccordionTrigger>
              <AccordionContent>
                Open the invoice detail view and click "Record Payment". Enter
                the amount received and payment method. The invoice will
                automatically update to "Partially Paid" status.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I export my invoices to PDF?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Open any invoice and click the "Download PDF" button. You
                can also export multiple invoices from the Reports page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What are the different user roles?
              </AccordionTrigger>
              <AccordionContent>
                Ledgerly supports four roles: Admin (full access), Accountant
                (create/edit invoices, view reports), Staff (create invoices
                only), and Viewer (read-only access to invoices and reports).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Contact form */}
        <Card className="p-6 card-elevated">
          <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Input id="priority" placeholder="Normal" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question..."
                rows={4}
              />
            </div>
            <Button>Send Message</Button>
          </div>
        </Card>
      </div>
      </PageTransition>
    </AppLayout>
  );
};

export default HelpPage;
