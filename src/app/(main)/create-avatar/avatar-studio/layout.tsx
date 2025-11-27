import React from 'react';
import './avatar-studio.module.global.css';

export default function AvatarStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="avatar-studio-container">
      {/* This layout will wrap all pages inside the avatar-studio */}
      {children}
    </div>
  );
}
