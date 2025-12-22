import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,         // Tambahan
    SidebarGroupLabel,    // Tambahan
    SidebarGroupContent,  // Tambahan
} from '@/components/ui/sidebar';
import AppLogo from './app-logo';
import { Link } from '@inertiajs/react';

// Import ikon Globe
import { 
    Home, 
    Library, 
    UploadCloud, 
    Globe, // <--- Ikon untuk Halaman Depan
    LogOut
} from 'lucide-react';

import { type NavItem } from '@/types';

// Menu Utama Dashboard
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: Home,
    },
    {
        title: 'Perpustakaan',
        href: route('books.index'),
        icon: Library,
    },
    {
        title: 'Upload Buku',
        href: route('books.upload'),
        icon: UploadCloud,
    },
];

// Menu "Website Utama"
const websiteNavItems: NavItem[] = [
    {
        title: 'Halaman Depan',
        href: '/', // Arahkan ke root URL (Landing Page)
        icon: Globe,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')}>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* 1. Menu Dashboard */}
                <NavMain items={mainNavItems} />

                {/* 2. Pemisah / Grup Baru untuk Link ke Web Utama */}
                <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Aplikasi</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {websiteNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        {/* Gunakan anchor <a> biasa agar halaman refresh total (opsional), 
                                            atau <Link> jika Landing Page juga pakai Inertia */}
                                        <a href={item.href} className="text-neutral-600 dark:text-neutral-400">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}