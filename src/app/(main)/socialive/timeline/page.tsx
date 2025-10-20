
import { CreatePost } from "@/components/socialive/create-post";
import { PostCard } from "@/components/socialive/post-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
        <CreatePost />
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
    </div>
  );
}
