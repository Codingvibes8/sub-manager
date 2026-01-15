import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and email preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pl-4">
             <Button variant="secondary" className="justify-start">Profile</Button>
             <Button variant="ghost" className="justify-start">Account</Button>
             <Button variant="ghost" className="justify-start">Appearance</Button>
             <Button variant="ghost" className="justify-start">Notifications</Button>
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Profile</h3>
              <p className="text-sm text-muted-foreground">
                This is how others will see you on the site.
              </p>
            </div>
            <Separator />
            <form className="space-y-8">
                <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="antigravity" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="example@gmail.com" />
                </div>
                <Button>Update profile</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
