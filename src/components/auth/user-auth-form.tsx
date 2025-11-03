
"use client"

import * as React from "react"
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Chrome, User as UserIcon } from "lucide-react"
import { useAuth, useFirestore } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  UserCredential,
  signInAnonymously,
  sendEmailVerification,
  User,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    action: "login" | "signup";
    redirectPath?: string;
}

export function UserAuthForm({ className, action, redirectPath, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleSuccessfulAuth = async (user: User) => {
    if (action === 'signup') {
      await updateProfile(user, { displayName: username });

      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        role: 'User',
        level: 0
      }, { merge: true });

      const userProfileDocRef = doc(firestore, `users/${user.uid}/profile`, user.uid);
      await setDoc(userProfileDocRef, {
        userId: user.uid,
        nickname: username,
        firstname: firstname,
        lastname: lastname,
        phoneNumber: { number: phoneNumber, countryCode: '' },
      });

      await sendEmailVerification(user);
       toast({
        title: "Verification Email Sent",
        description: "Please check your email to verify your account.",
      });
    }
    router.push(redirectPath || '/home');
  };

  React.useEffect(() => {
    setIsLoading(true);
    if (!auth) return;
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          handleSuccessfulAuth(result.user);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        handleAuthError(error);
        setIsLoading(false);
      });
  }, [auth]);


  const handleAuthError = (error: any) => {
    let title = "An error occurred";
    let description = "Please try again.";

    switch (error.code) {
      case 'auth/user-not-found':
        title = "Login Failed";
        description = "No account found with this email address.";
        break;
      case 'auth/wrong-password':
        title = "Login Failed";
        description = "Incorrect password. Please try again.";
        break;
      case 'auth/email-already-in-use':
        title = "Signup Failed";
        description = "This email is already associated with an account.";
        break;
      case 'auth/weak-password':
        title = "Signup Failed";
        description = "The password is too weak. Please use at least 6 characters.";
        break;
      case 'auth/popup-closed-by-user':
        title = 'Sign-in Cancelled';
        description = 'The Google sign-in window was closed.';
        break;
       default:
        title = "Authentication Error"
        description = error.message;
    }

    toast({
      variant: "destructive",
      title: title,
      description: description,
    });
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    if (!auth) {
        console.error("Auth service is not available.");
        setIsLoading(false);
        return;
    }

    try {
      let userCredential: UserCredential;
      if (action === 'signup') {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      await handleSuccessfulAuth(userCredential.user);
    } catch (error: any) {
      handleAuthError(error);
    } finally {
        setIsLoading(false);
    }
  }

  async function onGoogleSignIn() {
    setIsLoading(true);
    if (!auth) return;
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      handleAuthError(error);
      setIsLoading(false);
    }
  }
  
  async function onAnonymousSignIn() {
    setIsLoading(true);
    if (!auth) return;
    try {
      await signInAnonymously(auth);
      router.push(redirectPath || "/home");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {action === 'signup' && (
            <>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input id="firstname" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} disabled={isLoading} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input id="lastname" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} disabled={isLoading} />
                </div>
              </div>
            </>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Your password"
              type="password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {action === 'signup' && (
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Your phone number" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={isLoading} />
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {action === "login" ? "Sign In with Email" : "Create Account"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled={isLoading} onClick={onGoogleSignIn}>
            {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ) : (
            <Chrome className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>
         <Button variant="outline" type="button" disabled={isLoading} onClick={onAnonymousSignIn}>
            {isLoading ? (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ) : (
            <UserIcon className="mr-2 h-4 w-4" />
            )}{" "}
            Guest
        </Button>
      </div>
    </div>
  )
}
