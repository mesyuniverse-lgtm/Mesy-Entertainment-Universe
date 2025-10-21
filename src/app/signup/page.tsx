import { UserAuthForm } from "@/components/auth/user-auth-form"
import { Gem } from "@/components/icons"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"
import Link from "next/link"

export default function SignupPage() {
    const bgImage = PlaceHolderImages.find((i) => i.id === 'auth-background');
    
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        {bgImage && (
             <Image
                src={bgImage.imageUrl}
                alt={bgImage.description}
                data-ai-hint={bgImage.imageHint}
                fill
                className="object-cover"
            />
        )}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Gem className="mr-2 h-6 w-6" /> MESY Universe
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This universe is your canvas. Create, connect, and conquer. Your journey begins now.&rdquo;
            </p>
            <footer className="text-sm">The Founders</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm action="signup"/>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
