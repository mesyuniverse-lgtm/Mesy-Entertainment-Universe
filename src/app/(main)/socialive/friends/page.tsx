
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function FriendsPage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Friends</h1>
            <p className="text-muted-foreground">Manage your connections and see what your friends are up to.</p>
        </div>
        <Card className="flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center p-6">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Friends List Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">This is where your list of friends will be displayed.</p>
            </CardContent>
        </Card>
    </div>
  );
}
