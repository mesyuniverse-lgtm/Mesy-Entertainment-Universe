'use client';

import React from 'react';
import Link from 'next/link';

// Placeholder for sub-modules
const studioModules = [
    { name: 'Face', path: '/create-avatar/avatar-studio/face' },
    { name: 'Head', path: '/create-avatar/avatar-studio/head' },
    { name: 'Hair Style', path: '/create-avatar/avatar-studio/hair-style' },
    { name: 'Hair Color', path: '/create-avatar/avatar-studio/hair-color' },
    { name: 'Skin Color', path: '/create-avatar/avatar-studio/skin-color' },
    { name: 'Models', path: '/create-avatar/avatar-studio/models' },
    { name: 'Clothing', path: '/create-avatar/avatar-studio/clothing' },
    { name: 'AI Generator', path: '/create-avatar/avatar-studio/ai-generator' },
]

export default function AvatarStudioPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Avatar Studio</h1>
      <p className="text-muted-foreground mt-2">
        Welcome to the Avatar Studio. Choose a category to start customizing.
      </p>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {studioModules.map(mod => (
            <Link key={mod.name} href={mod.path} passHref>
                <div className="p-4 border rounded-lg hover:bg-secondary cursor-pointer text-center">
                    <p className="font-semibold">{mod.name}</p>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
}
