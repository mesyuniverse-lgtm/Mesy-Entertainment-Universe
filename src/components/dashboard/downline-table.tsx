import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { PlaceHolderImages } from "@/lib/placeholder-images"
  import { Badge } from "../ui/badge";

  const downlineMembers = [
    {
      username: 'casey_jones',
      level: 'Level.0',
      joinDate: '2023-11-05',
      downlineCount: 5,
      monthlyIncome: 5,
      feeStatus: 'pay3%',
      avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
    },
    {
      username: 'april_oneil',
      level: 'Level.0',
      joinDate: '2023-10-15',
      downlineCount: 4,
      monthlyIncome: 4,
      feeStatus: 'pay3%',
      avatar: PlaceHolderImages.find(i => i.id === 'female-archer-1')?.imageUrl,
    },
    {
      username: 'donatello',
      level: 'Level.0',
      joinDate: '2023-09-20',
      downlineCount: 3,
      monthlyIncome: 3,
      feeStatus: 'pay3%',
      avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
    },
    {
      username: 'michelangelo',
      level: 'Level.0',
      joinDate: '2023-09-01',
      downlineCount: 2,
      monthlyIncome: 2,
      feeStatus: 'pay3%',
      avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
    },
    {
      username: 'leonardo',
      level: 'Level.0',
      joinDate: '2023-08-12',
      downlineCount: 1,
      monthlyIncome: 1,
      feeStatus: 'pay3%',
      avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
    },
    {
      username: 'raphael',
      level: 'Level.0',
      joinDate: '2023-08-11',
      downlineCount: 0,
      monthlyIncome: 0,
      feeStatus: 'Free',
      avatar: PlaceHolderImages.find(i => i.id === 'knight-1')?.imageUrl,
    },
  ];

  export function DownlineTable() {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Downline Members</CardTitle>
          <CardDescription>Here are the members in your direct downline.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto rounded-md border">
              <Table>
                  <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="w-[50px] font-bold">#</TableHead>
                        <TableHead className="font-bold">Username</TableHead>
                        <TableHead className="font-bold">Level</TableHead>
                        <TableHead className="font-bold">Join Date</TableHead>
                        <TableHead className="font-bold text-center">จำนวนดาวน์ไลน์</TableHead>
                        <TableHead className="font-bold text-right">Monthly Income</TableHead>
                        <TableHead className="font-bold text-right">หัก3%จากรายได้</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {downlineMembers.map((member, index) => (
                      <TableRow key={index} className="hover:bg-accent/20">
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={member.avatar} alt={member.username} />
                                    <AvatarFallback>{member.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{member.username}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{member.level}</Badge>
                          </TableCell>
                          <TableCell>{member.joinDate}</TableCell>
                          <TableCell className="text-center">
                            {member.downlineCount > 0 ? member.downlineCount : <span className="text-muted-foreground">ยังไม่มีผู้ติดตาม</span>}
                          </TableCell>
                          <TableCell className="text-right">
                            {member.monthlyIncome > 0 ? `...$${member.monthlyIncome}` : <span className="text-muted-foreground">ยังไม่มีรายได้</span>}
                          </TableCell>
                          <TableCell className="text-right">
                             <Badge variant={member.feeStatus === 'Free' ? 'outline' : 'default'}>
                                {member.feeStatus}
                            </Badge>
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
  