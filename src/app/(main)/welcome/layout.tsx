import React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  // This layout can be customized for public-facing pages
  return <>{children}</>;
}