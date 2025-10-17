
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function GroupsPage() {
  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Groups</h1>
            <p className="text-muted-foreground">Find, join, and create groups based on your interests.</p>
        </div>
        <Card className="flex items-center justify-center min-h-[400px]">
            <CardContent className="text-center p-6">
                <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Community Groups Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">This is where you'll be able to manage and discover groups.</p>
            </CardContent>
        </Card>
    </div>
  );
}
