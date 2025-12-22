import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { Globe, Home, Library, UploadCloud } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // Import i18n
import AppLogo from './app-logo';

import { type NavItem } from '@/types';

export function AppSidebar() {
    const { t } = useTranslation();

    // Menu Utama Dashboard (Sekarang di dalam komponen agar t() bekerja)
    const mainNavItems: NavItem[] = [
        {
            title: t('sidebar.dashboard'),
            href: route('dashboard'),
            icon: Home,
        },
        {
            title: t('sidebar.library'),
            href: route('books.index'),
            icon: Library,
        },
        {
            title: t('sidebar.upload'),
            href: route('books.upload'),
            icon: UploadCloud,
        },
    ];

    // Menu "Website Utama"
    const websiteNavItems: NavItem[] = [
        {
            title: t('sidebar.front_page'),
            href: '/',
            icon: Globe,
        },
    ];

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

                {/* 2. Grup Aplikasi / Web Utama */}
                <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>
                        {t('sidebar.application_group')}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {websiteNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                    >
                                        <a
                                            href={item.href}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
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
