'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AccountingPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Accounting</CardTitle>
          <CardDescription>
            Financial command center for MESY Universe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Financial dashboards, transaction management, and reporting tools will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
