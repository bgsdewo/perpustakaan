import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { MultiSelect } from '@/Components/MultiSelect';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconLayoutKanban } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Edit(props) {
    const [selectedRoles, setSelectedRoles] = useState(Array.from(new Set(props.user.roles.map((role) => role.id))));

    const { data, setData, reset, post, processing, errors } = useForm({
        email: props.user.email ?? '',
        roles: selectedRoles, // Diperbaiki dari SelectedPermissions ke selectedPermissions
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const handleRoleChange = (selected) => {
        setSelectedRoles(selected);
        setData('roles', selected);
    };

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
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconLayoutKanban}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.assign-users.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Pengguna</Label>
                            <Input
                                name="email"
                                id="email"
                                type="text"
                                placeholder="Masukan email..."
                                value={data.email}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.email && <InputError message={errors.email} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="roles">peran</Label>
                            <MultiSelect
                                options={props.roles}
                                onValueChange={handleRoleChange}
                                defaultValue={selectedRoles}
                                placeholder="Pilih peran"
                                variant="inverted"
                            />
                            {errors.roles && <InputError message={errors.roles} />}
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

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
