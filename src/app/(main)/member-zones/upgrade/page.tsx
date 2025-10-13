
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function UpgradePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">อัปเกรดระดับ</h1>
        <p className="text-muted-foreground">พิธีการเปลี่ยนผ่าน: ยกระดับตัวตนและปลดล็อกศักยภาพใหม่</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <ChevronUp className="text-primary"/> Upgrade Your Level
            </CardTitle>
            <CardDescription>Reaching the next level unlocks new benefits and higher income potential.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
            <div className="flex justify-center items-end gap-4">
                <div className="flex flex-col items-center">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <div className="flex items-center gap-2">
                        <Star className="text-yellow-400" />
                        <p className="text-4xl font-bold">5</p>
                    </div>
                </div>
                <div className="pb-2 text-muted-foreground">➔</div>
                 <div className="flex flex-col items-center">
                    <p className="text-sm text-muted-foreground">Next</p>
                     <div className="flex items-center gap-2">
                        <Star className="text-yellow-400" />
                        <p className="text-4xl font-bold">6</p>
                    </div>
                </div>
            </div>

            <div className="my-6 max-w-md mx-auto">
                <p className="text-sm">Downline Progress</p>
                <Progress value={5000 / 6000 * 100} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-2">5,000 / 6,000 Members</p>
            </div>
            
            <Button size="lg" disabled>Upgrade Unavailable</Button>
            <p className="text-xs text-muted-foreground mt-2">You need more downline members to upgrade.</p>
        </CardContent>
      </Card>
    </div>
  );
}
