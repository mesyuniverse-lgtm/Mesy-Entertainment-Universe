import { MembershipTable } from "@/components/dashboard/membership-table"
import { IncomeChart } from "@/components/dashboard/income-chart"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MemberPlanPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Membership & Income</h1>
        <p className="max-w-3xl mx-auto mt-4 text-muted-foreground text-lg">
          Understand the journey, the levels, and the potential rewards. Our structure is designed to reward growth and dedication.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <MembershipTable />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                  src={PlaceHolderImages.find((img) => img.id === 'member-plan-video')?.imageUrl || ''}
                  alt="Member plan video"
                  data-ai-hint="presentation video"
                  fill
                  className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent flex items-center justify-center">
                  <h2 className="text-3xl font-bold text-white" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.9)'}}>The MESY Vision</h2>
              </div>
          </div>
          <IncomeChart />
        </div>
      </div>
      
      <div className="text-center mt-16 p-8 bg-secondary/40 rounded-lg">
        <h2 className="text-3xl font-bold">Ready to Begin Your Journey?</h2>
        <p className="max-w-xl mx-auto mt-2 text-muted-foreground">Join the Mesy Universe and start building your legacy today.</p>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/signup">Register Now</Link>
        </Button>
      </div>
    </div>
  )
}
