import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
            {/* 1. Background Image Penuh dengan Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/download.jfif"
                    alt="register background"
                    className="h-full w-full object-cover dark:brightness-[0.4]"
                />
                {/* Lapisan gelap/blur tipis agar card lebih kontras */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
            </div>

            {/* 2. Container Utama & Floating Glass Card */}
            <div className="relative z-10 w-full max-w-md px-4 py-8">
                {/* Logo Opsional di atas Card */}
                <div className="mb-6 text-center">
                    {/* <ApplicationLogo size="size-12" /> */}
                    <h2 className="text-xl font-semibold text-white">Perpustakaan</h2>
                    <p className="text-xs text-white/80">Pengetahuan Tanpa Batas</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/85 p-8 shadow-2xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/85">
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight">Daftar</h1>
                            <p className="text-sm text-muted-foreground">Masukan informasi anda untuk membuat akun</p>
                        </div>

                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                {/* Input Nama */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        autoComplete="name"
                                        placeholder="John Doe"
                                        onChange={onHandleChange}
                                    />
                                    {errors.name && <InputError message={errors.name} />}
                                </div>

                                {/* Input Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        placeholder="anda@email.com"
                                        onChange={onHandleChange}
                                    />
                                    {errors.email && <InputError message={errors.email} />}
                                </div>

                                {/* Input Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={onHandleChange}
                                    />
                                    {errors.password && <InputError message={errors.password} />}
                                </div>

                                {/* Konfirmasi Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        autoComplete="new-password"
                                        onChange={onHandleChange}
                                    />
                                    {errors.password_confirmation && (
                                        <InputError message={errors.password_confirmation} />
                                    )}
                                </div>

                                {/* Tombol Daftar */}
                                <Button
                                    type="submit"
                                    variant="orange"
                                    size="lg"
                                    className="mt-2 w-full py-3 text-base shadow-lg transition-all hover:opacity-90"
                                    disabled={processing}
                                >
                                    Daftar
                                </Button>
                            </div>
                        </form>

                        {/* Tautan Masuk */}
                        <div className="text-center text-sm">
                            Sudah Punya Akun?{' '}
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

Register.layout = (page) => <GuestLayout children={page} title="Daftar" />;
