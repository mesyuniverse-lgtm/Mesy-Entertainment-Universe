import { GeneratorDemo } from "@/components/ai-hub/generator-demo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function AiGeneratorPage() {
    return (
        <div className="container py-12">
            <div className="mb-8">
                <Button asChild variant="outline">
                    <Link href="/ai-hub">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to AI Hub
                    </Link>
                </Button>
            </div>
            <GeneratorDemo />
        </div>
    )
}
