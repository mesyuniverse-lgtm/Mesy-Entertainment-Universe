
import { redirect } from 'next/navigation';

export default function MainPage() {
  // Redirect to the member dashboard by default.
  // This can be changed to a different default page later.
  redirect('/dashboard');
}
