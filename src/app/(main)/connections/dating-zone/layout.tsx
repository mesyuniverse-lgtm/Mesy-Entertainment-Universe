import React from 'react';
import './dating-zone.module.css';

export default function DatingZoneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="dating-zone-container">{children}</div>;
}
