
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout can be customized for the main authenticated part of the app
  return <>{children}</>;
}
