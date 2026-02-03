import { AppLayout, PageTransition } from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const SettingsPage = () => {
  return (
    <AppLayout title="Settings" subtitle="Manage your account and preferences">
      <PageTransition>
      <div className="max-w-3xl space-y-6">
        {/* Profile section */}
        <Card className="p-6 card-elevated">
          <h3 className="text-lg font-semibold mb-4">Profile</h3>
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{currentUser.name}</h4>
                <Badge variant="secondary" className="capitalize">
                  {currentUser.role}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={currentUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={currentUser.email} />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6 card-elevated">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about invoice activity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Overdue reminders</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when invoices become overdue
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment confirmations</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when payments are recorded
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 card-elevated">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button>Update Password</Button>
          </div>
        </Card>

        {/* Save button */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
      </PageTransition>
    </AppLayout>
  );
};

export default SettingsPage;
