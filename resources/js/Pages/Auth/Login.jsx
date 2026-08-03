import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
            {/* 1. Background Image Penuh dengan Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/download.jfif"
                    alt="login background"
                    className="h-full w-full object-cover dark:brightness-[0.4]"
                />
                {/* Lapisan gelap/blur tipis agar card lebih kontras */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* 2. Container Utama & Floating Glass Card */}
            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo Opsional di atas Card */}
                <div className="mb-6 text-center">
                    {/* <ApplicationLogo size="size-12" /> */}
                    <h2 className="text-xl font-semibold text-white">Perpustakaan</h2>
                    <p className="text-xs text-white/80">Pengetahuan Tanpa Batas</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/85 p-8 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/85">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-2xl font-bold tracking-tight">Masuk</h1>
                            <p className="text-sm text-muted-foreground">
                                Masukan email anda dibawah ini untuk masuk ke akun anda
                            </p>
                        </div>

                        <form onSubmit={onHandleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        placeholder="budi@gmail.com"
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    {errors.email && <InputError message={errors.email} />}
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="ml-auto inline-block text-sm text-muted-foreground underline hover:text-primary"
                                            >
                                                Lupa Password
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    {errors.password && <InputError message={errors.password} />}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked)}
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-medium leading-none"
                                    >
                                        Ingat Saya
                                    </Label>
                                    {errors.remember && <InputError message={errors.remember} />}
                                </div>

                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="lg"
                                    className="w-full py-3 text-base shadow-lg transition-all hover:opacity-90"
                                    disabled={processing}
                                >
                                    Masuk
                                </Button>
                            </div>
                        </form>

                        <div className="text-center text-sm">
                            Belum Punya Akun?{' '}
                            <Link href={route('register')} className="font-medium text-primary underline">
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Login.layout = (page) => <GuestLayout children={page} title="login" />;
