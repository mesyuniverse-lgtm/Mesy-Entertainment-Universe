
import { Card, CardContent } from "@/components/ui/card";
import { FolderHeart } from "lucide-react";

export default function AlbumsPage() {
  return (
    <Card className="flex items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
        <CardContent className="text-center p-6">
            <FolderHeart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Albums</h3>
            <p className="mt-1 text-sm text-muted-foreground">Create and manage your photo albums here. Coming soon!</p>
        </CardContent>
    </Card>
  );
}
