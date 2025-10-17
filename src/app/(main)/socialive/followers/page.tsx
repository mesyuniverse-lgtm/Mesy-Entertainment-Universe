
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export default function FollowersPage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Followers</h1>
            <p className="text-muted-foreground">See a list of members who are following your journey.</p>
        </div>
        <Card className="flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center p-6">
                <UserPlus className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Followers List Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">A list of all your followers will appear here.</p>
            </CardContent>
        </Card>
    </div>
  );
}
