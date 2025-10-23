import { redirect } from 'next/navigation';

export default function MemberInsidePage() {
  // This page should always redirect to the member dashboard.
  redirect('/dashboard');
}
