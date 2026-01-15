import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentSubscriptions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={className} {...props}>
        <CardHeader>
            <CardTitle>Recent Renewals</CardTitle>
            <CardDescription>
                You have 3 subscriptions renewing this week.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>NF</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Netflix</p>
                <p className="text-sm text-muted-foreground">
                    Entertainment
                </p>
                </div>
                <div className="ml-auto font-medium">-$19.99</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>SP</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Spotify</p>
                <p className="text-sm text-muted-foreground">
                    Music
                </p>
                </div>
                <div className="ml-auto font-medium">-$9.99</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Adobe Creative Cloud</p>
                <p className="text-sm text-muted-foreground">
                    Design Tools
                </p>
                </div>
                <div className="ml-auto font-medium">-$59.99</div>
            </div>
            <div className="flex items-center">
                <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>VE</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">Vercel</p>
                <p className="text-sm text-muted-foreground">
                    Hosting
                </p>
                </div>
                <div className="ml-auto font-medium">-$20.00</div>
            </div>
             <div className="flex items-center">
                <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>GH</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">GitHub Copilot</p>
                <p className="text-sm text-muted-foreground">
                    Developer Tools
                </p>
                </div>
                <div className="ml-auto font-medium">-$10.00</div>
            </div>
            </div>
        </CardContent>
    </Card>
  )
}
