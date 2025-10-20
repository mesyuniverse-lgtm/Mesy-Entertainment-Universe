import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Star, BarChart, ExternalLink, ThumbsUp, Crown } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const aiPlatforms = [
    { name: "Google AI", logoId: "glowing-gem-1", description: "Cutting-edge models for complex reasoning and creativity.", users: "1.5M", rating: 4.8 },
    { name: "OpenAI", logoId: "fantasy-landscape-1", description: "Pioneering models known for their conversational abilities.", users: "2.2M", rating: 4.9 },
    { name: "Ollama", logoId: "fantasy-landscape-2", description: "Run powerful open-source models locally on your machine.", users: "350K", rating: 4.6 },
    { name: "Hugging Face", logoId: "fantasy-landscape-3", description: "The largest hub of open-source models and datasets.", users: "1.8M", rating: 4.7 },
    { name: "OpenRouter", logoId: "fantasy-landscape-4", description: "Access a wide range of models through a unified API.", users: "450K", rating: 4.5 },
];

const topUsers = [
    { name: "Aria", avatarId: "female-archer-1", score: 15200 },
    { name: "Kael", avatarId: "fighter-character", score: 12800 },
    { name: "Chronicler", avatarId: "knight-1", score: 11500 },
]

export function AiPlatforms() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <main className="lg:col-span-2">
                <Card className="bg-card/50">
                    <CardHeader>
                        <CardTitle className="text-2xl">Featured AI Platforms</CardTitle>
                        <CardDescription>Explore and connect with leading AI models. (Full integration coming soon)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {aiPlatforms.map(platform => (
                            <Card key={platform.name} className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-secondary/40 transition-colors">
                                <Image 
                                    src={PlaceHolderImages.find(i => i.id === platform.logoId)?.imageUrl || ''}
                                    alt={`${platform.name} logo`}
                                    data-ai-hint="abstract logo"
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover w-20 h-20 sm:w-16 sm:h-16"
                                />
                                <div className="flex-grow text-center sm:text-left">
                                    <h3 className="font-bold text-lg">{platform.name}</h3>
                                    <p className="text-sm text-muted-foreground">{platform.description}</p>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1" title="Users">
                                        <Users className="h-4 w-4" />
                                        <span>{platform.users}</span>
                                    </div>
                                    <div className="flex items-center gap-1" title="Rating">
                                        <Star className="h-4 w-4 text-yellow-400" />
                                        <span>{platform.rating}</span>
                                    </div>
                                    <ExternalLink className="h-5 w-5 text-primary cursor-pointer hover:text-primary/80"/>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </main>
            <aside className="lg:col-span-1 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Crown className="text-yellow-400"/> AI Quest Leaderboard</CardTitle>
                        <CardDescription>Top members completing AI-related quests.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {topUsers.map((user, index) => (
                             <div key={user.name} className="flex items-center gap-3">
                                <span className="font-bold text-lg w-6 text-center">{index + 1}</span>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={PlaceHolderImages.find(i => i.id === user.avatarId)?.imageUrl} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-sm text-muted-foreground">{user.score.toLocaleString()} Points</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ThumbsUp/> Community Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">The ability for members to rate and review different AI models is coming soon!</p>
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
}
