
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Award } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function MemberRankingPage() {
    const mockRanking = [
        { rank: 1, name: 'Chronicler', level: 50, joinDate: '2025-10-01' },
        { rank: 2, name: 'Aria', level: 48, joinDate: '2025-10-02' },
        { rank: 3, name: 'Kael', level: 47, joinDate: '2025-10-03' },
        { rank: 58, name: 'You', level: 5, joinDate: '2025-11-15' },
        { rank: 59, name: 'Seraphina', level: 5, joinDate: '2025-11-16' },
    ];
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">ลำดับสมาชิก</h1>
        <p className="text-muted-foreground">สายใยแห่งการเชื่อมโยง: ตรวจสอบลำดับของคุณและสมาชิกร่วมจักรวาล</p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Award className="text-primary"/> Member Ranking
            </CardTitle>
            <CardDescription>Members are ranked based on their join date. This is your place in the grand chronicle of MESY.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Join Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockRanking.map(user => (
                        <TableRow key={user.rank} className={user.name === 'You' ? 'bg-primary/10' : ''}>
                            <TableCell className="font-bold">{user.rank}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell><Badge variant="secondary">{user.level}</Badge></TableCell>
                            <TableCell>{user.joinDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
