import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Developer Zones</h1>
      <Link href="/developer-zones/create-function">
        <Button>สร้าง Function ใหม่</Button>
      </Link>
    </div>
  );
}
