
import { UserAuthForm } from "@/components/auth/user-auth-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          สร้างบัญชีใหม่
        </h1>
        <p className="text-sm text-muted-foreground">
          ง่ายและเร็ว
        </p>
      </div>
      <UserAuthForm action="signup" />
      <p className="px-8 text-center text-sm text-muted-foreground">
        เมื่อคลิกสมัคร แสดงว่าคุณยินยอมตามข้อกำหนด นโยบายความเป็นส่วนตัว และนโยบายคุกกี้ของเรา คุณอาจได้รับการแจ้งเตือนทาง SMS จากเราและสามารถเลือกไม่รับได้ทุกเมื่อ
      </p>
       <p className="px-8 text-center text-sm text-muted-foreground">
        มีบัญชีแล้วใช่ไหม?{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          เข้าสู่ระบบ
        </Link>
      </p>
    </>
  )
}
