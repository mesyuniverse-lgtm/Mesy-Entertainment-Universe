import { redirect } from 'next/navigation';

export default function DevelopersPage() {
  // The new developer zone is located at /developer-zone.
  // This page redirects to the new location.
  redirect('/developer-zone');
}
