'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AiDashboardsPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>AI Dashboards</CardTitle>
          <CardDescription>
            Overview of AI system performance and usage metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Graphs, charts, and key performance indicators for all AI systems will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
