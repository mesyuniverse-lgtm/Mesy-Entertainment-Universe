
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { IncomeCalculator } from "@/components/dashboard/income-chart";
import { MembershipTable } from "@/components/dashboard/membership-table";

export default function MyIncomePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">รายได้ของฉัน</h1>
        <p className="text-muted-foreground">ผลแห่งการเติบโต: ภาพรวมรายได้ รายจ่าย และศักยภาพในการสร้างรายได้ของคุณ</p>
      </div>
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <MembershipTable />
        </div>
        <div className="lg:col-span-2">
            <IncomeCalculator />
        </div>
      </div>
    </div>
  );
}
