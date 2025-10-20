import { GeneratorDemo } from "@/components/ai-hub/generator-demo";
import { AiPlatforms } from "@/components/ai-hub/ai-platforms";

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
