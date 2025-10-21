import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function ShoppingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Shopping Hub</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Discover unique products, open your own store, and enjoy exclusive member rewards.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="text-primary"/> 
            Marketplace Launching Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">The Shopping Hub is in development. Soon you'll be able to browse a marketplace of unique goods, enjoy promotions and cashback with MESY Coin, and even open your own storefront. Get ready for a new commerce experience!</p>
        </CardContent>
      </Card>
    </div>
  );
}
