
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Search, Star } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function TalentHubPage() {
    return (
        <div className="container py-12">
            <header className="text-center mb-12">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Star className="w-12 h-12 text-primary"/>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Talent Hub</h1>
                <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                    The premier marketplace for artists and event organizers to connect and create opportunities.
                </p>
            </header>

            <Tabs defaultValue="find-talent" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="find-talent" asChild>
                        <Link href="/entertainment/artists/find-talent">
                            <Search className="mr-2 h-4 w-4"/> Find Talent
                        </Link>
                    </TabsTrigger>
                    <TabsTrigger value="find-gigs">
                        <Briefcase className="mr-2 h-4 w-4"/> Find Gigs
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="find-gigs" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Find Gigs</CardTitle>
                            <CardDescription>Browse opportunities posted by event organizers.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64 flex items-center justify-center bg-muted/30 rounded-b-lg">
                            <p className="text-muted-foreground">The job board for artists is coming soon.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
