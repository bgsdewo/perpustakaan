import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBuildingCommunity } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputLogo = useRef(null);
    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        address: '',
        email: '',
        phone: '',
        logo: null,
        _method: props.page_settings.method,
    });
    const onHandleChange = (e) => setData(e.target.name, e.target.value);
    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (page) => {
                const flash = page.props.flash_message;

                if (flash?.type && flash?.message) {
                    toast[flash.type](flash.message);
                }
            },
        });
    };
    const onHandleReset = () => {
        reset();
        fileInputLogo.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.publishers.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                placeholder="Masukan nama..."
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                name="address"
                                id="address"
                                placeholder="Masukan alamat..."
                                value={data.address}
                                onChange={onHandleChange}
                            ></Textarea>
                            {errors.address && <InputError message={errors.address} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Masukan email..."
                                value={data.email}
                                onChange={onHandleChange}
                            />
                            {errors.email && <InputError message={errors.email} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="phone">Nomor Handphone</Label>
                            <Input
                                name="phone"
                                id="phone"
                                type="phone"
                                placeholder="Masukan nomor handphone..."
                                value={data.phone}
                                onChange={onHandleChange}
                            />
                            {errors.phone && <InputError message={errors.phone} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="logo">Logo</Label>
                            <input
                                name="logo"
                                id="logo"
                                type="file"
                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                ref={fileInputLogo}
                            />
                            {errors.logo && <InputError message={errors.logo} />}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" size="lg" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" variant="orange" size="lg" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
