import { MembershipTable } from "@/components/dashboard/membership-table"
import { IncomeCalculator } from "@/components/dashboard/income-calculator"

export default function MembershipsPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">Memberships</h1>
        <p className="text-muted-foreground">
          Track your downline, income, and calculate your potential earnings.
        </p>
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
  )
}
