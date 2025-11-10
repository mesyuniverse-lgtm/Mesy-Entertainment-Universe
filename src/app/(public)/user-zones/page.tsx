
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Gift, MessageSquare, Trophy, Users, Video } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { redirect } from 'next/navigation';

const StatCard = ({ icon, title, value, unit }: { icon: React.ReactNode, title: string, value: string, unit?: string }) => (
    <Card className="bg-card/70 backdrop-blur-sm border-white/10">
        <CardContent className="p-6 text-center">
            <div className="mx-auto w-fit p-3 bg-primary/10 rounded-full mb-2 text-primary">
                {icon}
            </div>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-muted-foreground text-sm">{title}</p>
        </CardContent>
    </Card>
);

export default function UsersZoneRedirectPage() {
    useEffect(() => {
        redirect('/users');
    }, []);

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p>Redirecting to your user dashboard...</p>
        </div>
    );
}

