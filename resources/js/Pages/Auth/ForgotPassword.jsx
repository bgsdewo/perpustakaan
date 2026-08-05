import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950">
            {/* 1. Background Image Penuh dengan Overlay */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                    src="/images/download.jfif"
                    alt="forgot password background"
                    className="h-full w-full object-cover opacity-60 blur-[1px] dark:brightness-[0.4]"
                />
                {/* Lapisan gelap agar card kontras dan teks terbaca jelas */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            {/* 2. Container Utama & Floating Glass Card */}
            <div className="relative z-10 w-full max-w-md px-4">
                {/* Logo & Judul di atas Card */}
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-semibold text-white">Perpustakaan</h2>
                    <p className="text-xs text-white/80">Pengetahuan Tanpa Batas</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/90 p-8 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                Lupa Password
                            </h1>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Lupa password? Tidak masalah. Cukup beri tahu alamat email Anda dan kami akan
                                mengirimkan tautan reset password melalui email.
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
                                        placeholder="budi@gmail.com"
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <InputError message={errors.email} />}
                                </div>

                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="lg"
                                    className="w-full py-3 text-base shadow-lg transition-all hover:opacity-90"
                                    disabled={processing}
                                >
                                    Kirim Tautan Reset Password
                                </Button>
                            </div>
                        </form>

                        <div className="text-center text-sm">
                            Sudah ingat password?{' '}
                            <Link href={route('login')} className="font-medium text-primary underline">
                                Masuk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ForgotPassword.layout = (page) => <GuestLayout children={page} title="Lupa Password" />;
