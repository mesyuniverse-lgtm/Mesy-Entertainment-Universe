'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Cpu, Bot, Wand2, Terminal, AlertCircle, ArrowRight } from 'lucide-react';

const aiModelsData = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    type: 'Language Model',
    status: true,
    credits: 850,
    maxCredits: 1000,
  },
  {
    id: 'imagen-4',
    name: 'Imagen 4',
    type: 'Image Generation',
    status: true,
    credits: 15,
    maxCredits: 1000,
  },
  {
    id: 'npc-dialogue-v1',
    name: 'NPC Dialogue System',
    type: 'In-Game NPC',
    status: true,
    credits: 670,
    maxCredits: 1000,
  },
  {
    id: 'content-moderation',
    name: 'AI Content Moderation',
    type: 'Safety & Moderation',
    status: false,
    credits: 990,
    maxCredits: 1000,
  },
];

export default function AiSystemPage() {
  const [models, setModels] = useState(aiModelsData);

  const handleStatusChange = (id: string, newStatus: boolean) => {
    setModels(
      models.map((model) => (model.id === id ? { ...model, status: newStatus } : model))
    );
  };
  
  const lowCreditModel = models.find(m => m.credits / m.maxCredits < 0.1);

  return (
    <div className="space-y-6">
      <Card className="bg-card/50">
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle className="text-2xl">AI System Management</CardTitle>
                <CardDescription>
                    Configure, monitor, and manage all AI resources in the MESY Universe.
                </CardDescription>
            </div>
            <Button asChild>
                <Link href="/ai-admin/dashboards">
                    Go to AI-Admin Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </CardHeader>
      </Card>
      
      {lowCreditModel && (
         <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Low Credit Warning!</AlertTitle>
            <div className="flex justify-between items-center">
                <AlertDescription>
                    The model '{lowCreditModel.name}' is running low on credits. Top up now to avoid service disruption.
                </AlertDescription>
                <Button size="sm">Top Up Now</Button>
            </div>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>AI Models & NPCs</CardTitle>
          <CardDescription>
            Enable, disable, and monitor the credit usage of each AI service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model / NPC</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[250px]">Credit Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    {model.type.includes('Language') && <Cpu className="w-5 h-5 text-primary" />}
                    {model.type.includes('Image') && <Wand2 className="w-5 h-5 text-primary" />}
                    {model.type.includes('NPC') && <Bot className="w-5 h-5 text-primary" />}
                    {model.type.includes('Safety') && <Terminal className="w-5 h-5 text-primary" />}
                    {model.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{model.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Switch
                            checked={model.status}
                            onCheckedChange={(checked) => handleStatusChange(model.id, checked)}
                            aria-label={`Toggle ${model.name}`}
                        />
                        <span className={model.status ? 'text-green-400' : 'text-muted-foreground'}>
                            {model.status ? 'Enabled' : 'Disabled'}
                        </span>
                    </div>
                  </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2">
                        <Progress value={(model.credits / model.maxCredits) * 100} className="w-[60%]" />
                        <span className="text-sm text-muted-foreground font-mono">
                            {model.credits}/{model.maxCredits}
                        </span>
                     </div>
                  </TableCell>
                   <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      Top Up
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
