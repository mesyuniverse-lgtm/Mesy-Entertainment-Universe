
import { redirect } from 'next/navigation';

export default function UserZonesRedirectPage() {
  // By default, when a user enters this zone, redirect them to their main dashboard.
  // This can be changed to any other default user page.
  redirect('/dashboard');
}
