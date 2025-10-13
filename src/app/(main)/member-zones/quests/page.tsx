
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Map, CheckSquare, Square } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function QuestsPage() {
    const quests = [
        { title: 'Beginner\'s Luck', description: 'Log in for 7 consecutive days.', progress: '5/7', status: 'In Progress' },
        { title: 'Social Butterfly', description: 'Join a public Socialive room.', progress: '0/1', status: 'Not Started' },
        { title: 'First Creation', description: 'Generate your first piece of content in the AI Hub.', progress: '1/1', status: 'Completed' },
    ];
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Quest</h1>
        <p className="text-muted-foreground">ภารกิจแห่งการเติบโต: ทำภารกิจเพื่อรับรางวัลและเกียรติยศ</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Map className="text-primary"/> Your Quests
            </CardTitle>
            <CardDescription>Complete these tasks to earn rewards and progress in your journey.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {quests.map(quest => (
            <Card key={quest.title} className="p-4 flex items-center gap-4">
                {quest.status === 'Completed' ? <CheckSquare className="h-6 w-6 text-green-500" /> : <Square className="h-6 w-6 text-muted-foreground"/>}
                <div className="flex-grow">
                    <p className="font-semibold">{quest.title}</p>
                    <p className="text-sm text-muted-foreground">{quest.description}</p>
                </div>
                <div className="text-right">
                    <Badge variant={quest.status === 'Completed' ? 'default' : 'secondary'}>{quest.status}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">{quest.progress}</p>
                </div>
            </Card>
           ))}
        </CardContent>
      </Card>
    </div>
  );
}
