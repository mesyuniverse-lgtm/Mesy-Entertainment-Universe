
'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, KeyRound, FilePlus2, Briefcase, MapPin, Calendar, Clock, DollarSign, Plane, Bed, Utensils } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateNewRequestPage() {
    const [jobType, setJobType] = useState("online");

    return (
        <div className="container py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/connections/need-jobs">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Need Jobs
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <FilePlus2 className="h-8 w-8 text-primary" />
                            Post Your Job Request
                        </CardTitle>
                        <CardDescription>
                            Let potential hirers know you're available. Detail your skills and the type of work you're looking for.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4 p-4 border rounded-lg bg-secondary/30">
                            <Label htmlFor="member-id" className="flex items-center text-base font-bold"><KeyRound className="mr-2 h-5 w-5 text-primary"/>MESY Member ID Verification</Label>
                            <Input id="member-id" placeholder="Enter your Member ID to post a request..." />
                            <p className="text-xs text-muted-foreground">Only verified members can post job requests to ensure community trust.</p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="quest-title" className="text-base"><Briefcase className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Headline</Label>
                            <Input id="quest-title" placeholder="e.g., 'Experienced Bodyguard Available for Hire'" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quest-description" className="text-base">Your Skills & Experience</Label>
                            <Textarea id="quest-description" placeholder="Describe your skills, what you can do, and your past experience. e.g., '5 years of experience in royal security detail...'" rows={5} />
                        </div>
                        
                        <div className="space-y-3">
                            <Label className="text-base">Preferred Job Type</Label>
                            <RadioGroup defaultValue="online" value={jobType} onValueChange={setJobType} className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="online" id="type-online" />
                                    <Label htmlFor="type-online">Online Job (งานออนไลน์)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="onsite" id="type-onsite" />
                                    <Label htmlFor="type-onsite">On-site Job (งานจริงมีสถานที่)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="both" id="type-both" />
                                    <Label htmlFor="type-both">Both (ทั้งสองแบบ)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-base"><MapPin className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Preferred Location(s)</Label>
                            <Input id="location" placeholder="e.g., 'Bangkok', 'Remote', 'Anywhere in Chonburi'" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="compensation" className="text-base"><DollarSign className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Expected Compensation (ค่าจ้างที่คาดหวัง)</Label>
                            <Input id="compensation" type="text" placeholder="e.g., '1,500 MC / day', 'Project-based', 'Negotiable'" />
                        </div>
                        
                        <div className="flex justify-end pt-6">
                            <Button size="lg">Post Job Request</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
