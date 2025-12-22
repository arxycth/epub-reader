import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Lock, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 🔥 Import i18n

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    const { t } = useTranslation(); // 🔥 Hook i18n

    return (
        <>
            <Head title={t('auth.login.title')} />

            <div className="flex h-screen w-full overflow-hidden bg-neutral-50 text-neutral-900 selection:bg-indigo-500 selection:text-white dark:bg-[#050505] dark:text-white">
                {/* --- SEKSI KIRI (FORM) --- */}
                <div className="scrollbar-hide relative flex w-full flex-col justify-center overflow-y-auto px-6 py-12 lg:w-1/2 lg:px-20 xl:px-24">
                    {/* Background Pattern */}
                    <div className="pointer-events-none absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:hidden"></div>
                        <div className="absolute inset-0 hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150 dark:block"></div>
                    </div>

                    {/* Tombol Kembali */}
                    <div className="absolute top-6 left-6 z-20 lg:left-12">
                        <Link
                            href="/"
                            className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            <span>{t('common.back')}</span>
                        </Link>
                    </div>

                    {/* Content Wrapper */}
                    <div className="relative z-10 mx-auto w-full max-w-sm lg:max-w-md">
                        {/* Logo */}
                        <div className="mb-10 flex items-center gap-2 text-2xl font-bold tracking-tight">
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
                                {t('auth.login.title')}
                            </h1>
                            <p className="mt-3 text-neutral-500 dark:text-neutral-400">
                                {t('auth.login.subtitle')}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-600 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                {t('auth.login.label_email')}
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder={t(
                                                        'auth.login.placeholder_email',
                                                    )}
                                                    className="h-12 border-neutral-200 bg-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">
                                                    {t(
                                                        'auth.login.label_password',
                                                    )}
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                                        tabIndex={5}
                                                    >
                                                        {t(
                                                            'auth.login.forgot_password',
                                                        )}
                                                    </TextLink>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="h-12 border-neutral-200 bg-white pl-10 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-neutral-800 dark:bg-neutral-900"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="cursor-pointer font-normal text-neutral-600 dark:text-neutral-400"
                                        >
                                            {t('auth.login.label_remember')}
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 h-12 w-full rounded-xl bg-neutral-900 text-base font-semibold text-white shadow-xl shadow-neutral-900/10 transition-all hover:scale-[1.01] hover:bg-neutral-800 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-none dark:hover:bg-neutral-200"
                                        tabIndex={4}
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <Spinner className="mr-2 h-4 w-4" />
                                        )}
                                        {t('auth.login.button_submit')}
                                    </Button>
                                </>
                            )}
                        </Form>

                        {canRegister && (
                            <p className="mt-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                {t('auth.login.no_account')}{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                >
                                    {t('auth.login.link_register')}
                                </TextLink>
                            </p>
                        )}

                        <div className="mt-10 border-t border-neutral-100 pt-6 text-center text-xs text-neutral-400 dark:border-neutral-800 dark:text-neutral-600">
                            &copy; 2025 {t('welcome.footer.copy')}
                        </div>
                    </div>
                </div>

                {/* --- SEKSI KANAN (ARTWORK) --- */}
                <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden border-l border-white/5 bg-neutral-900 lg:flex">
                    <div className="absolute inset-0 bg-[#0a0a0a]">
                        <div className="absolute top-[-20%] right-[-10%] h-[800px] w-[800px] rounded-full bg-indigo-600/20 mix-blend-screen blur-[120px]"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] h-[800px] w-[800px] rounded-full bg-blue-600/20 mix-blend-screen blur-[120px]"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    </div>

                    <div className="relative z-10 max-w-lg p-10 text-center">
                        <div className="group relative mb-8 inline-flex justify-center">
                            <div className="absolute inset-0 bg-indigo-500 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40"></div>
                            <div className="relative flex h-48 w-48 transform items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-800 to-neutral-950 shadow-2xl transition-transform duration-700 hover:scale-105 hover:rotate-3">
                                <BookOpen className="h-20 w-20 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
                                <div className="absolute top-4 left-4 h-2 w-2 rounded-full bg-red-500/50"></div>
                                <div className="absolute top-4 left-8 h-2 w-2 rounded-full bg-yellow-500/50"></div>
                                <div className="absolute top-4 left-12 h-2 w-2 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>

                        <h2 className="mb-4 text-3xl leading-tight font-bold text-white">
                            {t('auth.visual_login.title_top')} <br />
                            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                                {t('auth.visual_login.title_gradient')}
                            </span>
                        </h2>
                        <p className="mx-auto max-w-sm text-lg text-neutral-400">
                            {t('auth.visual_login.description')}
                        </p>

                        <div className="mt-12 flex justify-center gap-4">
                            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-md">
                                🚀 Fast Access
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-md">
                                🌙 Dark Mode
                            </div>
                            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-md">
                                📱 Responsive
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
