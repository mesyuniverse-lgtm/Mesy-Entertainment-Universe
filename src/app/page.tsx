
'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function RootPage() {
  useEffect(() => {
    redirect('/welcome');
  }, []);

  return null; 
}
