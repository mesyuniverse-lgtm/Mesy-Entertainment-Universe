
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cloud, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function MesyCloudPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Mesy Cloud</h1>
        <p className="text-muted-foreground">ห้องสมุดแห่งความทรงจำ: พื้นที่จัดเก็บข้อมูลส่วนตัวของคุณ</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Cloud className="text-primary"/> Your Cloud Storage
            </CardTitle>
            <CardDescription>A personal space to store your creations, documents, and memories from the MESY Universe.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <div className="flex justify-between items-baseline mb-2">
                    <p className="text-lg font-semibold">Storage Usage</p>
                    <p className="text-sm text-muted-foreground">250 MB / 1 GB</p>
                </div>
                <Progress value={25} />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline">Upload Files</Button>
                <Button variant="outline">Manage Files</Button>
            </div>

             <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <HardDrive />
                        Need More Space?
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Upgrade your storage plan to keep more of your digital treasures.</p>
                    <Button>Purchase Storage (Coming Soon)</Button>
                </CardContent>
            </Card>
        </CardContent>
      </Card>
    </div>
  );
}
