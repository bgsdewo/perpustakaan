import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-zinc-950">
            {/* 1. Background Image Penuh dengan Overlay */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img
                    src="/images/download.jfif"
                    alt="reset password background"
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
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                Reset Password
                            </h1>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Gunakan password yang mudah Anda ingat!
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
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <InputError message={errors.email} />}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <InputError message={errors.password} />}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    {errors.password_confirmation && (
                                        <InputError message={errors.password_confirmation} />
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="lg"
                                    className="w-full py-3 text-base shadow-lg transition-all hover:opacity-90"
                                    disabled={processing}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

ResetPassword.layout = (page) => <GuestLayout children={page} title="Reset Password" />;
