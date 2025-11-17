
import { redirect } from 'next/navigation';

export default function MainPage() {
  // Redirect to the member dashboard by default.
  redirect('/dashboard');
}
