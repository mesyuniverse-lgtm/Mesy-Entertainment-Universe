import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PawPrint, Heart, Home } from "lucide-react";

export default function AnimalsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center gap-4 mb-4">
            <PawPrint className="w-10 h-10 text-primary" />
            <Heart className="w-10 h-10 text-primary" />
            <Home className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Animals & Pets Zone</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          A dedicated space for your beloved companions. Share photos, find pet-friendly places, and connect with other animal lovers.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>This special zone for our furry, feathered, and scaled friends is currently under construction. Get ready for a world of pet profiles, adoption centers, and more!</CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
          <p className="text-muted-foreground">The Animals & Pets Zone is being built with love.</p>
        </CardContent>
      </Card>
    </div>
  );
}
