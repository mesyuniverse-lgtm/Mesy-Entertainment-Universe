
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react";

type Post = {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    timestamp: string;
    content: string;
    image?: string | null;
    imageHint?: string;
    likes: number;
    comments: number;
    shares: number;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={post.user.avatar} alt={post.user.name} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{post.user.name}</p>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border">
            <Image
              src={post.image}
              alt="Post image"
              data-ai-hint={post.imageHint}
              fill
              className="object-cover"
            />
          </div>
        )}
      </CardContent>
      <div className="px-4 py-2 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3 text-primary"/>
            {post.likes} Likes
        </div>
        <div className="flex items-center gap-4">
            <span>{post.comments} Comments</span>
            <span>{post.shares} Shares</span>
        </div>
      </div>
      <CardFooter className="p-0 border-t">
        <div className="grid grid-cols-3 w-full">
            <Button variant="ghost" className="rounded-none rounded-bl-lg">
                <ThumbsUp className="mr-2 h-4 w-4"/> Like
            </Button>
            <Button variant="ghost" className="rounded-none border-x">
                <MessageSquare className="mr-2 h-4 w-4"/> Comment
            </Button>
            <Button variant="ghost" className="rounded-none rounded-br-lg">
                <Share2 className="mr-2 h-4 w-4"/> Share
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
