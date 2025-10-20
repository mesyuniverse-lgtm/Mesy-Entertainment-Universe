

import { CreatePost } from "@/components/socialive/create-post";
import { PostCard } from "@/components/socialive/post-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { Clapperboard } from "lucide-react";

export default function TimelinePage() {
  const posts = [
    {
      id: "post1",
      user: {
        name: "Aria",
        avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl || '',
      },
      timestamp: "5h ago",
      content: "Just discovered a hidden waterfall on my morning patrol. The MESY Universe never ceases to amaze me! 🌿✨ #ExplorerLife #Nature",
      image: PlaceHolderImages.find(i => i.id === 'fantasy-landscape-2')?.imageUrl,
      imageHint: "fantasy waterfall",
      likes: 125,
      comments: 18,
      shares: 7,
    },
    {
      id: "post2",
      user: {
        name: "Kael",
        avatar: PlaceHolderImages.find(i => i.id === 'fighter-character')?.imageUrl || '',
      },
      timestamp: "1d ago",
      content: "Forged a new blade today. The balance is perfect. Ready for any challenge that comes my way. #Blacksmith #Warrior",
      image: null,
      likes: 98,
      comments: 25,
      shares: 4,
    },
    {
      id: "post3",
      user: {
        name: "The Chronicler",
        avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl || '',
      },
      timestamp: "2d ago",
      content: "The archives reveal a prophecy of a new era. The stars are aligning. Members, prepare yourselves for the unfolding of destiny. #Chronicle #Destiny",
      image: PlaceHolderImages.find(i => i.id === 'fantasy-castle-1')?.imageUrl,
      imageHint: "fantasy castle",
      likes: 230,
      comments: 42,
      shares: 15,
    },
  ];

  return (
    <div className="space-y-6">
       <Card className="flex items-center justify-center min-h-[600px] bg-secondary/20">
            <div className="text-center p-6">
                <Clapperboard className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-medium">Timeline Feed Coming Soon</h3>
                <p className="mt-1 text-sm text-muted-foreground">The familiar post-style feed will be available here.</p>
            </div>
        </Card>
    </div>
  );
}
