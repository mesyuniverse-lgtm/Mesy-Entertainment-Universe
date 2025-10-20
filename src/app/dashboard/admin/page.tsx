
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="container py-12 md:py-20">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Admin Panel</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    System administration and management tools.
                </p>
            </div>
             <Card className="flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center p-6">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Administration Tools</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Content management and system settings will appear here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
