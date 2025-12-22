import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import LanguageTabs from '@/components/languange-tabs'; // Import yang baru dibuat
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('settings.appearance_title'),
            href: editAppearance().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('settings.appearance_title')} />

            <SettingsLayout>
                <div className="space-y-8">
                    {/* Bagian Theme/Tema */}
                    <div className="space-y-6">
                        <HeadingSmall
                            title={t('settings.appearance_title')}
                            description={t('settings.appearance_desc')}
                        />
                        <AppearanceTabs />
                    </div>

                    {/* Garis pemisah */}
                    <hr className="border-neutral-200 dark:border-neutral-800" />

                    {/* Bagian Language/Bahasa */}
                    <div className="space-y-6">
                        <LanguageTabs />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
