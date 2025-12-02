'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AiTrainingPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>AI Model Training & Fine-Tuning</CardTitle>
          <CardDescription>
            Provide feedback, upload new data, and initiate training jobs to improve model accuracy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Interfaces for content moderation feedback loops and fine-tuning data management will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
