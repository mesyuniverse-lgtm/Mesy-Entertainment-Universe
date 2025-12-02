'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AiModelsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>AI Model Management</CardTitle>
          <CardDescription>
            Manage, configure, and deploy different AI models for various tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>A list of available AI models (e.g., Gemini, Imagen) with options for configuration and assignment to specific features will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
