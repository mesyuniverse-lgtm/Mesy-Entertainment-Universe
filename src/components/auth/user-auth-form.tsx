
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    action: "login" | "signup";
    redirectPath?: string;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  firstname: z.string().min(1, { message: "First name is required." }),
  lastname: z.string().min(1, { message: "Last name is required." }),
  nickname: z.string().optional(),
  phoneNumber: z.string().min(9, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
  birthDay: z.string().min(1, { message: "Day is required." }),
  birthMonth: z.string().min(1, { message: "Month is required." }),
  birthYear: z.string().min(1, { message: "Year is required." }),
  gender: z.enum(["female", "male", "custom"], { required_error: "Please select a gender." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});


export function UserAuthForm({ className, action, redirectPath, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = action === 'login' ? loginSchema : signupSchema;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: action === 'signup' ? {
        username: "",
        firstname: "",
        lastname: "",
        nickname: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDay: "",
        birthMonth: "",
        birthYear: "",
    } : {
        email: "",
        password: "",
    },
  });

  const handleSuccessfulAuth = async (user: User, data?: z.infer<typeof signupSchema>) => {
    if (action === 'signup' && data) {
      const displayName = `${data.firstname} ${data.lastname}`.trim();
      await updateProfile(user, { displayName });

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
        username: data.username,
        nickname: data.nickname,
        firstname: data.firstname,
        lastname: data.lastname,
        dob: `${data.birthYear}-${data.birthMonth}-${data.birthDay}`,
        gender: data.gender,
        phoneNumber: {
            countryCode: "+66",
            number: data.phoneNumber,
        }
      });

      await sendEmailVerification(user);
       toast({
        title: "Verification Email Sent",
        description: "Please check your email to verify your account.",
      });
    }
    router.push(redirectPath || '/dashboard');
  };

  React.useEffect(() => {
    if (!auth) return;
    setIsLoading(true);
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);

    if (!auth) {
        console.error("Auth service is not available.");
        toast({ title: "Authentication Error", description: "Auth service not initialized.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
      let userCredential: UserCredential;
      if (action === 'signup') {
        const signupData = data as z.infer<typeof signupSchema>;
        userCredential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
        await handleSuccessfulAuth(userCredential.user, signupData);
      } else {
        const loginData = data as z.infer<typeof loginSchema>;
        userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        await handleSuccessfulAuth(userCredential.user);
      }
    } catch (error: any) {
      handleAuthError(error);
    } finally {
        setIsLoading(false);
    }
  }

  async function onGoogleSignIn() {
    if (!auth) return;
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error: any) {
      handleAuthError(error);
      setIsLoading(false);
    }
  }
  
  async function onAnonymousSignIn() {
    if (!auth) return;
    setIsLoading(true);
    try {
      await signInAnonymously(auth);
      router.push(redirectPath || "/dashboard");
    } catch (error: any) {
      handleAuthError(error);
    } finally {
      setIsLoading(false);
    }
  }
  
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        { value: '01', label: 'January' }, { value: '02', label: 'February' }, { value: '03', label: 'March' },
        { value: '04', label: 'April' }, { value: '05', label: 'May' }, { value: '06', label: 'June' },
        { value: '07', label: 'July' }, { value: '08', label: 'August' }, { value: '09', label: 'September' },
        { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' }
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            {action === 'signup' ? (
              <>
                <FormField control={form.control} name="username" render={({ field }) => (
                  <FormItem><FormLabel>Username</FormLabel><FormControl><Input placeholder="Username" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid grid-cols-2 gap-4">
                  <FormField control={form.control} name="firstname" render={({ field }) => (
                    <FormItem><FormLabel>Firstname</FormLabel><FormControl><Input placeholder="Firstname" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                  )}/>
                  <FormField control={form.control} name="lastname" render={({ field }) => (
                    <FormItem><FormLabel>Lastname</FormLabel><FormControl><Input placeholder="Lastname" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                  )}/>
                </div>
                 <FormField control={form.control} name="nickname" render={({ field }) => (
                  <FormItem><FormLabel>Nickname</FormLabel><FormControl><Input placeholder="Nickname (Optional)" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                 <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                  <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input type="tel" placeholder="Mobile Number" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="Email" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>New Password</FormLabel><FormControl><Input type="password" placeholder="New Password" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem><FormLabel>Confirm New Password</FormLabel><FormControl><Input type="password" placeholder="Confirm New Password" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                <div className="grid gap-2">
                    <Label>Date of Birth</Label>
                    <div className="grid grid-cols-3 gap-2">
                         <FormField control={form.control} name="birthDay" render={({ field }) => (
                            <FormItem>
                               <FormControl>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger><SelectValue placeholder="Day" /></SelectTrigger>
                                      <SelectContent>{days.map(d => <SelectItem key={d} value={String(d)}>{d}</SelectItem>)}</SelectContent>
                                  </Select>
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                        )}/>
                         <FormField control={form.control} name="birthMonth" render={({ field }) => (
                           <FormItem>
                               <FormControl>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <SelectTrigger><SelectValue placeholder="Month" /></SelectTrigger>
                                       <SelectContent>{months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}</SelectContent>
                                   </Select>
                               </FormControl>
                               <FormMessage/>
                           </FormItem>
                        )}/>
                         <FormField control={form.control} name="birthYear" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                                       <SelectContent>{years.map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}</SelectContent>
                                   </Select>
                                </FormControl>
                               <FormMessage/>
                           </FormItem>
                        )}/>
                    </div>
                </div>
                 <FormField control={form.control} name="gender" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                              <Label className="flex items-center gap-2 p-2 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                  <RadioGroupItem value="female" id="female" />
                                  <span>Female</span>
                              </Label>
                               <Label className="flex items-center gap-2 p-2 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                  <RadioGroupItem value="male" id="male" />
                                   <span>Male</span>
                              </Label>
                               <Label className="flex items-center gap-2 p-2 border rounded-md flex-1 justify-center cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                                  <RadioGroupItem value="custom" id="custom" />
                                   <span>Custom</span>
                              </Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage/>
                   </FormItem>
                )}/>
              </>
            ) : (
             <>
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="name@example.com" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="Your password" {...field} disabled={isLoading} /></FormControl><FormMessage /></FormItem>
                )}/>
             </>
            )}
            <Button disabled={isLoading} className="w-full">
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {action === "login" ? "Sign In" : "Sign Up"}
            </Button>
          </div>
        </form>
      </Form>
      { action === "login" && (
        <>
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
        </>
      )}
    </div>
  )
}

    