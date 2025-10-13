
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function DownlineMembersTable() {

    const downlineMembers = [
        { rank: 1, username: 'casey_jones', level: 'Level.0', joinDate: '2023-11-05', downlineCount: 5, monthlyIncome: 5, fee: 'pay3%', avatarId: 'female-archer-1' },
        { rank: 2, username: 'april_oneil', level: 'Level.0', joinDate: '2023-10-15', downlineCount: 4, monthlyIncome: 4, fee: 'pay3%', avatarId: 'female-archer-1' },
        { rank: 3, username: 'donatello', level: 'Level.0', joinDate: '2023-09-20', downlineCount: 3, monthlyIncome: 3, fee: 'pay3%', avatarId: 'fighter-character' },
        { rank: 4, username: 'michelangelo', level: 'Level.0', joinDate: '2023-09-01', downlineCount: 2, monthlyIncome: 2, fee: 'pay3%', avatarId: 'fighter-character' },
        { rank: 6, username: 'leonardo', level: 'Level.0', joinDate: '2023-08-12', downlineCount: 1, monthlyIncome: 1, fee: 'pay3%', avatarId: 'fighter-character' },
        { rank: 7, username: 'raphael', level: 'Level.0', joinDate: '2023-08-11', downlineCount: 0, monthlyIncome: 0, fee: 'Free', avatarId: 'fighter-character' }
    ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Downline Members</CardTitle>
        <CardDescription>Here are the members in your direct downline.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto rounded-md border">
            <Table>
                <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                    <TableRow>
                        <TableHead className="w-[50px]">Rank</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>จำนวนดาวน์ไลน์</TableHead>
                        <TableHead>Monthly Income</TableHead>
                        <TableHead>หัก3%จากรายได้</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {downlineMembers.map((member) => (
                        <TableRow key={member.rank}>
                            <TableCell className="font-bold">{member.rank}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={PlaceHolderImages.find(i => i.id === member.avatarId)?.imageUrl} />
                                        <AvatarFallback>{member.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <span>{member.username}</span>
                                </div>
                            </TableCell>
                            <TableCell><Badge variant="secondary">{member.level}</Badge></TableCell>
                            <TableCell>{member.joinDate}</TableCell>
                            <TableCell>{member.downlineCount > 0 ? member.downlineCount : 'ยังไม่มีผู้ติดตาม'}</TableCell>
                            <TableCell>{member.monthlyIncome > 0 ? `...$${member.monthlyIncome}`: 'ยังไม่มีรายได้'}</TableCell>
                            <TableCell>
                                <Badge variant={member.fee === 'Free' ? 'outline' : 'destructive'}>{member.fee}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  )
}
