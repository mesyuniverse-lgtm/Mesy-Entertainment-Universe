
import { redirect } from 'next/navigation';

export default function MainPage() {
  // Redirect to the user hub by default.
  redirect('/user-hub');
}
