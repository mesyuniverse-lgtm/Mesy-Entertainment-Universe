'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, KeyRound, UserPlus } from "lucide-react";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateDatingProfilePage() {

    return (
        <div className="container py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Button asChild variant="outline">
                        <Link href="/connections/dating/for-singles">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Singles
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl">
                            <UserPlus className="h-8 w-8 text-primary" />
                            Create Your Dating Profile
                        </CardTitle>
                        <CardDescription>
                            Provide detailed information to help our AI find the best matches for you. This profile is exclusive to the Dating Zone.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4 p-4 border rounded-lg bg-secondary/30">
                            <Label htmlFor="member-id" className="flex items-center text-base font-bold"><KeyRound className="mr-2 h-5 w-5 text-primary"/>MESY Member ID Verification</Label>
                            <Input id="member-id" placeholder="Enter your Member ID to begin..." />
                             <p className="text-xs text-muted-foreground">Only verified MESY Members can create a dating profile.</p>
                        </div>
                        
                        <div className="space-y-2">
                             <Label>Gender (เพศ)</Label>
                             <Select>
                                <SelectTrigger><SelectValue placeholder="Select your gender..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male (ชาย)</SelectItem>
                                    <SelectItem value="female">Female (หญิง)</SelectItem>
                                    <SelectItem value="lgbtq+">LGBTQ+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="age">Age (อายุ)</Label>
                            <Input id="age" type="number" placeholder="Enter your age" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Date of Birth (วันเกิด)</Label>
                                <Input type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label>Day of the Week (เกิดวันอะไร)</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select day..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mon">Monday (จันทร์)</SelectItem>
                                        <SelectItem value="tue">Tuesday (อังคาร)</SelectItem>
                                        <SelectItem value="wed">Wednesday (พุธ)</SelectItem>
                                        <SelectItem value="thu">Thursday (พฤหัสบดี)</SelectItem>
                                        <SelectItem value="fri">Friday (ศุกร์)</SelectItem>
                                        <SelectItem value="sat">Saturday (เสาร์)</SelectItem>
                                        <SelectItem value="sun">Sunday (อาทิตย์)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Zodiac Sign (ราศี)</Label>
                                 <Select>
                                    <SelectTrigger><SelectValue placeholder="Select zodiac sign..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="aries">Aries (เมษ)</SelectItem>
                                        <SelectItem value="taurus">Taurus (พฤษภ)</SelectItem>
                                        <SelectItem value="gemini">Gemini (มิถุน)</SelectItem>
                                        <SelectItem value="cancer">Cancer (กรกฏ)</SelectItem>
                                        <SelectItem value="leo">Leo (สิงห์)</SelectItem>
                                        <SelectItem value="virgo">Virgo (กันย์)</SelectItem>
                                        <SelectItem value="libra">Libra (ตุลย์)</SelectItem>
                                        <SelectItem value="scorpio">Scorpio (พิจิก)</SelectItem>
                                        <SelectItem value="sagittarius">Sagittarius (ธนู)</SelectItem>
                                        <SelectItem value="capricorn">Capricorn (มังกร)</SelectItem>
                                        <SelectItem value="aquarius">Aquarius (กุมภ์)</SelectItem>
                                        <SelectItem value="pisces">Pisces (มีน)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label>Chinese Zodiac (ปีนักษัตร)</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select chinese zodiac..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rat">Rat (ชวด)</SelectItem>
                                        <SelectItem value="ox">Ox (ฉลู)</SelectItem>
                                        <SelectItem value="tiger">Tiger (ขาล)</SelectItem>
                                        <SelectItem value="rabbit">Rabbit (เถาะ)</SelectItem>
                                        <SelectItem value="dragon">Dragon (มะโรง)</SelectItem>
                                        <SelectItem value="snake">Snake (มะเส็ง)</SelectItem>
                                        <SelectItem value="horse">Horse (มะเมีย)</SelectItem>
                                        <SelectItem value="goat">Goat (มะแม)</SelectItem>
                                        <SelectItem value="monkey">Monkey (วอก)</SelectItem>
                                        <SelectItem value="rooster">Rooster (ระกา)</SelectItem>
                                        <SelectItem value="dog">Dog (จอ)</SelectItem>
                                        <SelectItem value="pig">Pig (กุน)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="occupation">Occupation (อาชีพ)</Label>
                            <Input id="occupation" placeholder="e.g., Knight, Mage, Merchant..." />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="hobbies">Hobbies & Interests (งานอดิเรก / ความชอบ)</Label>
                            <Textarea id="hobbies" placeholder="e.g., Dragon slaying, potion brewing, stargazing..." />
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="personality">Personality (นิสัยส่วนตัว)</Label>
                            <Textarea id="personality" placeholder="Describe your personality..." />
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Blood Type (กรุ๊ปเลือด)</Label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select blood type..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="a">A</SelectItem>
                                        <SelectItem value="b">B</SelectItem>
                                        <SelectItem value="ab">AB</SelectItem>
                                        <SelectItem value="o">O</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Pre-existing conditions (มีโรคประจำตัวไหม)</Label>
                                <RadioGroup defaultValue="no" className="flex items-center gap-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="cond-yes" />
                                        <Label htmlFor="cond-yes">Yes (มี)</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="cond-no" />
                                        <Label htmlFor="cond-no">No (ไม่มี)</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                         <div className="space-y-2">
                            <Label htmlFor="partner-preference">Partner Preference (ต้องการคนแบบไหน)</Label>
                            <Textarea id="partner-preference" placeholder="Describe your ideal partner..." />
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button size="lg">Create & Find Matches</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
