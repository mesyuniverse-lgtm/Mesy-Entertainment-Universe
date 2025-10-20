
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookPlus, BookImage } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Album = {
    id: string;
    name: string;
    imageCount: number;
    coverImageUrl: string;
    coverImageHint: string;
};

export default function AlbumsPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
    const [newAlbumName, setNewAlbumName] = useState("");

    const handleCreateAlbum = () => {
        if (newAlbumName.trim() === "") return;

        const randomCover = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

        const newAlbum: Album = {
            id: `album-${Date.now()}`,
            name: newAlbumName,
            imageCount: 0,
            coverImageUrl: randomCover.imageUrl,
            coverImageHint: randomCover.imageHint,
        };

        setAlbums([...albums, newAlbum]);
        setNewAlbumName("");
        setCreateDialogOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Photo Chronicles</h2>
                    <p className="text-muted-foreground">Your collected stories in images.</p>
                </div>
                <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <BookPlus className="mr-2 h-4 w-4" />
                            Create New Chronicle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Inscribe a New Chronicle</DialogTitle>
                            <DialogDescription>
                                Give a name to this new collection of memories. Click inscribe when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newAlbumName}
                                    onChange={(e) => setNewAlbumName(e.target.value)}
                                    className="col-span-3"
                                    placeholder="e.g., 'Journey to the Sky Peaks'"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateAlbum}>Inscribe Chronicle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {albums.length === 0 ? (
                <Card className="flex flex-col items-center justify-center min-h-[400px] bg-secondary/20 border-dashed">
                    <CardContent className="text-center p-6">
                        <BookImage className="mx-auto h-16 w-16 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-medium font-headline">You have no chronicles yet</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Create one to begin your legend.</p>
                        <Button variant="outline" className="mt-6" onClick={() => setCreateDialogOpen(true)}>
                           <BookPlus className="mr-2 h-4 w-4" /> Start your first Chronicle
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {albums.map((album) => (
                        <Card key={album.id} className="overflow-hidden group relative shadow-lg hover:shadow-primary/20 transition-shadow">
                             <Image
                                src={album.coverImageUrl}
                                alt={album.name}
                                data-ai-hint={album.coverImageHint}
                                width={400}
                                height={400}
                                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                    <p className="font-semibold text-sm truncate font-headline">{album.name}</p>
                                    <p className="text-xs text-muted-foreground">{album.imageCount} images</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
