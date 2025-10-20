

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Download, Trash2 } from "lucide-react";
import Image from "next/image";

const galleryImages = [
    { id: 'custom-5', imageUrl: 'https://picsum.photos/seed/pavatar1/400/300', description: 'Generated Griffon', imageHint: 'fantasy creature', size: '2.1MB', date: '2025-11-20' },
    { id: 'custom-6', imageUrl: 'https://picsum.photos/seed/pavatar2/400/300', description: 'Mystic Forest Concept', imageHint: 'fantasy forest', size: '3.5MB', date: '2025-11-18' },
    { id: 'custom-7', imageUrl: 'https://picsum.photos/seed/pavatar3/400/300', description: 'Character Portrait - Aria', imageHint: 'fantasy character', size: '1.8MB', date: '2025-11-15' },
    { id: 'custom-8', imageUrl: 'https://picsum.photos/seed/pavatar4/400/300', description: 'Sky Castle Sketch', imageHint: 'fantasy castle', size: '1.2MB', date: '2025-11-12' },
    { id: 'custom-9', imageUrl: 'https://picsum.photos/seed/pavatar5/400/300', description: 'Dragon Scale Texture', imageHint: 'dragon skin', size: '4.0MB', date: '2025-11-10' },
    { id: 'custom-10', imageUrl: 'https://picsum.photos/seed/pavatar6/400/300', description: 'Enchanted Sword Design', imageHint: 'fantasy sword', size: '2.8MB', date: '2025-11-08' },
    { id: 'custom-11', imageUrl: 'https://picsum.photos/seed/pavatar7/400/300', description: 'Ancient Artifact', imageHint: 'fantasy artifact', size: '2.3MB', date: '2025-11-06' },
    { id: 'custom-12', imageUrl: 'https://picsum.photos/seed/pavatar8/400/300', description: 'Floating City Concept', imageHint: 'fantasy city', size: '4.5MB', date: '2025-11-04' },
];

export default function GalleryPage() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {galleryImages.map((image) => (
                <Card key={image.id} className="overflow-hidden group relative shadow-lg hover:shadow-primary/20 transition-shadow">
                    <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        width={400}
                        height={300}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <p className="font-semibold text-sm truncate">{image.description}</p>
                            <p className="text-xs text-muted-foreground">{image.size} - {image.date}</p>
                        </div>
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                            <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/50 hover:bg-primary">
                                <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/50 hover:bg-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
