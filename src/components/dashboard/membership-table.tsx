import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
  import { membershipData, type MembershipLevel } from "@/lib/data"
  
  export function MembershipTable() {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Membership Levels & Income</CardTitle>
          <CardDescription>Income is calculated based on $1 per member per month, with a 3% service fee.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-[600px] rounded-md border">
              <Table>
                  <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                      <TableRow>
                      <TableHead className="font-bold">Level</TableHead>
                      <TableHead className="font-bold text-right">Members</TableHead>
                      <TableHead className="font-bold text-right">Total Income (USD/mo)</TableHead>
                      <TableHead className="font-bold text-right">Service Fee (3%)</TableHead>
                      <TableHead className="font-bold text-right text-primary">Net Income (USD/mo)</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {membershipData.map((level: MembershipLevel) => (
                      <TableRow key={level.level} className="hover:bg-accent/20">
                          <TableCell className="font-medium">{level.level === 50 ? `${level.level} (Fixed)` : level.level}</TableCell>
                          <TableCell className="text-right">{level.members.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${level.totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="text-right text-muted-foreground">${level.serviceFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                          <TableCell className="font-semibold text-right text-primary">${level.netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    )
  }
  