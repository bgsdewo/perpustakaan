import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        phone: user.phone || '',
        gender: user.gender || '',
        date_of_birth: user.date_of_birth || '',
        address: user.address || '',
    });

    const onHandleChange = (e) => {
        const { name, value } = e.target;

        // Jika field yang diubah adalah 'phone', filter hanya ambil angka (0-9)
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            setData(name, numericValue);
        } else {
            setData(name, value);
        }
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account's profile information and personal details.</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={onHandleSubmit} className="mt-6 space-y-6">
                    {/* Nama */}
                    <div>
                        <Label htmlFor="name">Nama</Label>
                        <Input id="name" name="name" value={data.name} onChange={onHandleChange} autoComplete="name" />
                        {errors.name && <InputError className="mt-2" message={errors.name} />}
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={onHandleChange}
                            autoComplete="username"
                        />
                        {errors.email && <InputError className="mt-2" message={errors.email} />}
                    </div>
                    {/* username */}
                    {/* Username */}
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            value={data.username}
                            onChange={onHandleChange}
                            placeholder="Masukkan username..."
                        />
                        {errors.username && <InputError className="mt-2" message={errors.username} />}
                    </div>
                    {/* Nomor Handphone (Hanya Angka) */}
                    <div>
                        <Label htmlFor="phone">Nomor Handphone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="text"
                            inputMode="numeric"
                            value={data.phone}
                            onChange={onHandleChange}
                            placeholder="Masukan nomor handphone..."
                        />
                        {errors.phone && <InputError className="mt-2" message={errors.phone} />}
                    </div>

                    {/* Jenis Kelamin */}
                    <div>
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <select
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={onHandleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        {errors.gender && <InputError className="mt-2" message={errors.gender} />}
                    </div>

                    {/* Tanggal Lahir */}
                    <div>
                        <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                        <Input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            value={data.date_of_birth}
                            onChange={onHandleChange}
                        />
                        {errors.date_of_birth && <InputError className="mt-2" message={errors.date_of_birth} />}
                    </div>

                    {/* Alamat */}
                    <div>
                        <Label htmlFor="address">Alamat</Label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            value={data.address}
                            onChange={onHandleChange}
                            placeholder="Masukan alamat..."
                        />
                        {errors.address && <InputError className="mt-2" message={errors.address} />}
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-foreground">
                                Your email address is unverified.{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                >
                                    Click here to re-send the verification email.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <Alert variant="success" className="mt-2">
                                    <AlertDescription>
                                        A new verification link has been sent to your email address.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button variant="orange" size="lg" disabled={processing}>
                            Save
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-muted-foreground">Saved.</p>
                        </Transition>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
