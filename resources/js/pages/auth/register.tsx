import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next'; // 🔥 Import i18n

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import {
    ArrowLeft,
    BookOpen,
    Lock,
    Mail,
    ShieldCheck,
    User,
} from 'lucide-react';

export default function Register() {
    const { t } = useTranslation(); // 🔥 Hook i18n

    return (
        <>
            <Head title={t('auth.register.title')} />

            {/* PARENT WRAPPER */}
            <div className="flex h-screen w-full overflow-hidden bg-neutral-50 text-neutral-900 selection:bg-indigo-500 selection:text-white dark:bg-[#050505] dark:text-white">
                {/* --- SEKSI KIRI (FORM) --- */}
                <div className="scrollbar-hide relative flex w-full flex-col justify-center overflow-y-auto px-6 py-12 lg:w-1/2 lg:px-20 xl:px-24">
                    {/* Background Visuals */}
                    <div className="pointer-events-none absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:hidden"></div>
                        <div className="absolute inset-0 hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150 dark:block"></div>
                    </div>

                    {/* Back Button */}
                    <div className="absolute top-6 left-6 z-20 lg:left-12">
                        <Link
                            href="/"
                            className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            <span>{t('common.back')}</span>
                        </Link>
                    </div>

                    {/* Form Container */}
                    <div className="relative z-10 mx-auto my-auto w-full max-w-sm lg:max-w-md">
                        {/* Logo */}
                        <div className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tight">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <span className="text-neutral-900 dark:text-white">
                                FST{' '}
                                <span className="text-indigo-600 dark:text-indigo-400">
                                    Reader
                                </span>
                                .
                            </span>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                                {t('auth.register.title')}
                            </h1>
                            <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                                {t('auth.register.subtitle')}
                            </p>
                        </div>

                        <Form
                            {...store.form()}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                            disableWhileProcessing
                            className="flex flex-col gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-4">
                                        {/* Name Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                {t('auth.register.label_name')}
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    name="name"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    placeholder={t(
                                                        'auth.register.placeholder_name',
                                                    )}
                                                    className="h-12 border-neutral-200 bg-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
                                                />
                                            </div>
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Email Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                {t('auth.register.label_email')}
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="email"
                                                    placeholder={t(
                                                        'auth.register.placeholder_email',
                                                    )}
                                                    className="h-12 border-neutral-200 bg-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* Password Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password">
                                                {t(
                                                    'auth.register.label_password',
                                                )}
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                    tabIndex={3}
                                                    autoComplete="new-password"
                                                    placeholder={t(
                                                        'auth.register.placeholder_password',
                                                    )}
                                                    className="h-12 border-neutral-200 bg-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        {/* Confirm Password Field */}
                                        <div className="space-y-2">
                                            <Label htmlFor="password_confirmation">
                                                {t(
                                                    'auth.register.label_confirm_password',
                                                )}
                                            </Label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    placeholder={t(
                                                        'auth.register.placeholder_confirm_password',
                                                    )}
                                                    className="h-12 border-neutral-200 bg-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
                                                />
                                            </div>
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 h-12 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white shadow-xl shadow-neutral-900/10 transition-all hover:scale-[1.01] hover:bg-neutral-800 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-neutral-200"
                                        tabIndex={5}
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <Spinner className="mr-2 h-4 w-4" />
                                        )}
                                        {t('auth.register.button_submit')}
                                    </Button>
                                </>
                            )}
                        </Form>

                        <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                            {t('auth.register.has_account')}{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                                {t('auth.register.link_login')}
                            </TextLink>
                        </p>

                        <div className="mt-10 border-t border-neutral-100 pt-6 text-center text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
                            &copy; 2025 {t('welcome.footer.copy')}
                        </div>
                    </div>
                </div>

                {/* --- SEKSI KANAN (ARTWORK) --- */}
                <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden border-l border-white/5 bg-neutral-900 lg:flex">
                    <div className="absolute inset-0 bg-[#0a0a0a]">
                        <div className="absolute top-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-purple-600/20 mix-blend-screen blur-[120px]"></div>
                        <div className="absolute right-[-10%] bottom-[-20%] h-[800px] w-[800px] rounded-full bg-indigo-600/20 mix-blend-screen blur-[120px]"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-10 max-w-lg p-10 text-center">
                        <div className="group relative mb-10 inline-flex justify-center">
                            <div className="absolute inset-0 bg-purple-500 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40"></div>
                            <div className="relative flex h-64 w-48 transform flex-col items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 p-6 shadow-2xl transition-transform duration-700 hover:scale-105 hover:-rotate-3">
                                <div className="flex w-full items-center justify-between opacity-50">
                                    <div className="h-6 w-8 rounded bg-yellow-500/80"></div>
                                    <div className="font-mono text-[10px] text-white">
                                        FST-ID
                                    </div>
                                </div>
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                                <div className="w-full space-y-2">
                                    <div className="h-2 w-full rounded-full bg-white/10"></div>
                                    <div className="h-2 w-2/3 rounded-full bg-white/10"></div>
                                </div>
                            </div>
                        </div>

                        <h2 className="mb-4 text-3xl leading-tight font-bold text-white">
                            {t('auth.visual.title_top')} <br />
                            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                {t('auth.visual.title_gradient')}
                            </span>
                        </h2>
                        <p className="mx-auto max-w-sm text-lg text-neutral-400">
                            {t('auth.visual.description')}
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4 text-left">
                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 backdrop-blur-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-sm font-medium text-neutral-300">
                                    {t('auth.visual.feature_free')}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 backdrop-blur-sm">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <span className="text-sm font-medium text-neutral-300">
                                    {t('auth.visual.feature_access')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
