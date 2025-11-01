
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

export default function CreateNewQuestPage() {
    const [jobType, setJobType] = useState("online");

    return (
        <div className="container py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/connections/post-quest">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Post a Quest
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <FilePlus2 className="h-8 w-8 text-primary" />
                            Create a New Quest
                        </CardTitle>
                        <CardDescription>
                            Post a job to find the perfect talent for your needs. Only verified members can post quests.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4 p-4 border rounded-lg bg-secondary/30">
                            <Label htmlFor="member-id" className="flex items-center text-base font-bold"><KeyRound className="mr-2 h-5 w-5 text-primary"/>MESY Member ID Verification</Label>
                            <Input id="member-id" placeholder="Enter your Member ID to begin..." />
                            <p className="text-xs text-muted-foreground">We require ID verification to ensure a secure and trusted marketplace for all members.</p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="quest-title" className="text-base"><Briefcase className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Quest Title</Label>
                            <Input id="quest-title" placeholder="e.g., 'Personal Assistant for Shopping Spree'" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quest-description" className="text-base">Quest Description</Label>
                            <Textarea id="quest-description" placeholder="Describe the job in detail. What are the tasks, requirements, and expectations?" rows={5} />
                        </div>
                        
                        <div className="space-y-3">
                            <Label className="text-base">Job Type</Label>
                            <RadioGroup defaultValue="online" value={jobType} onValueChange={setJobType} className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="online" id="type-online" />
                                    <Label htmlFor="type-online">Online Job (งานออนไลน์)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="onsite" id="type-onsite" />
                                    <Label htmlFor="type-onsite">On-site Job (งานจริงมีสถานที่)</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        
                        {jobType === 'onsite' && (
                             <div className="space-y-2 animate-in fade-in duration-300">
                                <Label htmlFor="location" className="text-base"><MapPin className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Location</Label>
                                <Input id="location" placeholder="e.g., 'Siam Paragon, Bangkok' or full address" />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="start-date" className="text-base"><Calendar className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Start Date & Time</Label>
                                <Input id="start-date" type="datetime-local" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="end-date" className="text-base"><Clock className="inline-block mr-2 h-5 w-5 text-muted-foreground" />End Date & Time</Label>
                                <Input id="end-date" type="datetime-local" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="compensation" className="text-base"><DollarSign className="inline-block mr-2 h-5 w-5 text-muted-foreground" />Compensation (ค่าจ้าง)</Label>
                            <Input id="compensation" type="number" placeholder="Enter total payment amount in MESY Coins or USD" />
                        </div>
                        
                        {jobType === 'onsite' && (
                            <div className="space-y-4 pt-4 border-t animate-in fade-in duration-300">
                                <Label className="text-base">Allowances & Support (สวัสดิการเพิ่มเติม)</Label>
                                <p className="text-sm text-muted-foreground">Select any additional support you will provide for on-site jobs.</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3">
                                        <Checkbox id="allowance-advance" />
                                        <Label htmlFor="allowance-advance" className="flex items-center gap-2 font-normal"><DollarSign className="h-4 w-4 text-green-400"/> Advance Payment (จ่ายล่วงหน้า)</Label>
                                    </div>
                                     <div className="flex items-center space-x-3">
                                        <Checkbox id="allowance-travel" />
                                        <Label htmlFor="allowance-travel" className="flex items-center gap-2 font-normal"><Plane className="h-4 w-4 text-blue-400"/> Travel Expenses (ค่าเดินทาง)</Label>
                                    </div>
                                     <div className="flex items-center space-x-3">
                                        <Checkbox id="allowance-accomodation" />
                                        <Label htmlFor="allowance-accomodation" className="flex items-center gap-2 font-normal"><Bed className="h-4 w-4 text-purple-400"/> Accommodation (ค่าที่พัก)</Label>
                                    </div>
                                     <div className="flex items-center space-x-3">
                                        <Checkbox id="allowance-food" />
                                        <Label htmlFor="allowance-food" className="flex items-center gap-2 font-normal"><Utensils className="h-4 w-4 text-orange-400"/> Food Allowance (ค่าอาหาร)</Label>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end pt-6">
                            <Button size="lg">Post Your Quest</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
