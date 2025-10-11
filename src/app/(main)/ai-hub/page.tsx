import { GeneratorDemo } from "@/components/ai-hub/generator-demo";

export default function AiHubPage() {
    return (
        <div className="container py-12">
             <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">AI Hub</h1>
                <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
                    A playground for your imagination. Generate content, avatars, and playlists with our demo tools. Full access is granted to members.
                </p>
            </div>
            <GeneratorDemo />
        </div>
    )
}
