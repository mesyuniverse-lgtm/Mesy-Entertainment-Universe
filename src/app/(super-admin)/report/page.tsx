
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ReportPage() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm border-white/10 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText /> Reports
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    Generate and view detailed reports on various platform metrics.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-12 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center text-muted-foreground">
                    Report generation tools and downloadable reports will be available here.
                </div>
            </CardContent>
        </Card>
    );
}
