
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Image as ImageIcon, Video, Smile } from "lucide-react";

export function CreatePost() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={PlaceHolderImages.find(i => i.id === 'default-avatar')?.imageUrl} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Input 
                        placeholder="What's on your mind, User?" 
                        className="flex-1 bg-secondary border-none h-12"
                    />
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between border-t mt-2">
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                        <ImageIcon className="mr-2 h-4 w-4 text-green-500" /> Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Video className="mr-2 h-4 w-4 text-red-500" /> Video
                    </Button>
                     <Button variant="ghost" size="sm">
                        <Smile className="mr-2 h-4 w-4 text-yellow-500" /> Feeling
                    </Button>
                </div>
                <Button>Post</Button>
            </CardFooter>
        </Card>
    );
}
