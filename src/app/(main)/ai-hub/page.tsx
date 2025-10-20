import { GeneratorDemo } from "@/components/ai-hub/generator-demo";
import { AiPlatforms } from "@/components/ai-hub/ai-platforms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";

export default function AiHubPage() {
    return (
        <div className="container py-12 md:py-20">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">AI Hub</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    A creative nexus where imagination meets intelligence. Explore, generate, and collaborate with a universe of AI models.
                </p>
            </div>
            
            <AiPlatforms />

            <Card className="mt-16 bg-card/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-3xl">
                        <Store className="h-8 w-8 text-primary"/>
                        AI Market (Coming Soon)
                    </CardTitle>
                    <CardDescription className="text-lg">The marketplace for innovation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground max-w-4xl">
                        A revolutionary marketplace where members can buy, sell, rent, or even offer free trials for their custom-trained AI models. Whether you're a developer looking to monetize your creations or a user searching for the perfect AI tool, the AI Market will be your central hub for exchange and collaboration.
                    </p>
                </CardContent>
            </Card>

            <div className="mt-16">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Try Our Native Generator</h2>
                    <p className="text-muted-foreground mt-2">Get a glimpse of our integrated AI capabilities. Full access is granted to members.</p>
                </div>
                <GeneratorDemo />
            </div>
        </div>
    )
}
