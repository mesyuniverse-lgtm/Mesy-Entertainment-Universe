
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollText, Search, BookOpen, FileImage, FileAudio, Users, Calendar, UploadCloud, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MesyCloudPage() {
    const mockFiles = [
        { name: "MESY UNIVERSE Launch Blueprint", modified: "11 ต.ค.", owner: "The Chronicler", icon: <BookOpen className="h-5 w-5 text-blue-400" /> },
        { name: "Ancient Runes Translation v3", modified: "9 ต.ค.", owner: "Aria", icon: <ScrollText className="h-5 w-5 text-yellow-400" /> },
        { name: "Forge Inventory - Q4 2025", modified: "8 ต.ค.", owner: "Kael", icon: <ScrollText className="h-5 w-5 text-green-400" /> },
        { name: "Generated Avatar - Griffon", modified: "7 ต.ค.", owner: "You", icon: <FileImage className="h-5 w-5 text-pink-400" /> },
        { name: "Prophecy_audio_log_#1", modified: "5 ต.ค.", owner: "The Chronicler", icon: <FileAudio className="h-5 w-5 text-purple-400" /> },
        { name: "Socialive Feature Proposal", modified: "2 ต.ค.", owner: "You", icon: <ScrollText className="h-5 w-5 text-yellow-400" /> },
    ];

    const fileTypes = [
        { name: "Scrolls", icon: <ScrollText className="h-4 w-4" /> },
        { name: "Tomes", icon: <BookOpen className="h-4 w-4" /> },
        { name: "Images", icon: <FileImage className="h-4 w-4" /> },
        { name: "Audio Logs", icon: <FileAudio className="h-4 w-4" /> },
    ];

    const storageUsed = 256; // GB
    const storageTotal = 1024; // GB (1TB)
    const storagePercentage = (storageUsed / storageTotal) * 100;

    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Mesy Cloud</h1>
                     <Button>
                        <UploadCloud className="mr-2" /> Upload Scroll
                    </Button>
                </div>
                 <p className="text-muted-foreground">ห้องสมุดแห่งความทรงจำ: พื้นที่จัดเก็บข้อมูลส่วนตัวของคุณในรูปแบบคัมภีร์และม้วนคาถา</p>
            </div>

            <div className="flex-shrink-0 mb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Search your scrolls..." className="pl-10" />
                    </div>
                    <div className="flex items-center gap-2">
                        {fileTypes.map(type => (
                            <Button key={type.name} variant="outline" size="sm" className="gap-2">
                                {type.icon} {type.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <Card className="flex-grow">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60%]">Scroll Name</TableHead>
                                <TableHead>Last Modified</TableHead>
                                <TableHead>Owner</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockFiles.map((file, index) => (
                                <TableRow key={index} className="hover:bg-primary/10">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {file.icon}
                                            <span className="font-medium">{file.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>{file.modified}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            <span>{file.owner}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex-shrink-0 mt-6">
                <Card className="bg-card/50">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                             <p className="text-sm font-semibold">Memory Crystal Usage</p>
                             <Progress value={storagePercentage} className="w-full sm:w-64 mt-2" />
                             <p className="text-xs text-muted-foreground mt-2">{`${storageUsed}GB of ${storageTotal / 1024}TB (${storagePercentage.toFixed(0)}%) used`}</p>
                        </div>
                        <Button variant="secondary">
                            <Gem className="mr-2 h-4 w-4"/> Expand Crystal Storage
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
