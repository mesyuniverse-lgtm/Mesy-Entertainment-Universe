import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, ShoppingBag } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockProducts = [
    { id: 'prod_1', name: 'Chrono Blade', price: 1500, stock: 50, status: 'Published' },
    { id: 'prod_2', name: 'Elven Cloak', price: 800, stock: 120, status: 'Published' },
    { id: 'prod_3', name: 'Dragon Scale Shield', price: 2500, stock: 0, status: 'Draft' },
    { id: 'prod_4', name: 'Scroll of Knowledge', price: 300, stock: 200, status: 'Published' },
];

export default function ShopPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">My Shop</h1>
                <div className="flex gap-2">
                    <Button variant="outline"><Settings className="mr-2 h-4 w-4"/>Shop Settings</Button>
                    <Button><PlusCircle className="mr-2 h-4 w-4"/>Add New Product</Button>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="text-primary"/> 
                        My Products
                    </CardTitle>
                    <CardDescription>Manage your inventory and product listings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Price (MC)</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockProducts.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.price.toLocaleString()}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell><Badge variant={product.status === 'Published' ? 'default' : 'secondary'}>{product.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Shop Overview</CardTitle>
                    <CardDescription>A summary of your shop's performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-secondary/30 rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Revenue</p>
                            <p className="text-2xl font-bold">4,600 MC</p>
                        </div>
                         <div className="p-4 bg-secondary/30 rounded-lg">
                            <p className="text-sm text-muted-foreground">Orders this month</p>
                            <p className="text-2xl font-bold">15</p>
                        </div>
                         <div className="p-4 bg-secondary/30 rounded-lg">
                            <p className="text-sm text-muted-foreground">Active Listings</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
