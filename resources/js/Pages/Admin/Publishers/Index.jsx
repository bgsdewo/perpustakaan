import HeaderTitle from '@/Components/HeaderTitle';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { UseFilter } from '@/hooks/UseFilter';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import {
    IconArrowsDownUp,
    IconBuildingCommunity,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';
export default function Index(props) {
    const { data: publishers, meta } = props.publishers;
    const [params, setParams] = useState(props.state);
    const onSortable = (field) => {
        setParams({
            ...params,

            field: field,

            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };
    UseFilter({
        route: route('admin.publishers.index'),
        values: params,
        only: ['publishers'],
    });
    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBuildingCommunity}
                />
                <Button variant="orange" size="lg">
                    <Link href={route('admin.publishers.create')} className="flex items-center gap-2">
                        <IconPlus className="size-5" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="Search..."
                            value={params?.search}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value, page: 1 }))}
                        />
                        <Select
                            value={params?.load?.toString() || ''}
                            onValueChange={(e) => setParams({ ...params, load: Number(e) })}
                        >
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 25, 50, 75, 100].map((number, index) => (
                                    <SelectItem key={index} value={number.toString()}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button
                            variant="red"
                            size="xl"
                            onClick={() => {
                                router.get(route('admin.publishers.index'), {}, { replace: true });
                            }}
                        >
                            <IconRefresh className="size-4" />
                            Bersihkan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button variant="ghost" onClick={() => onSortable('id')}>
                                        #
                                        <IconArrowsDownUp className="ml-2 size-4 text-muted-foreground" />
                                    </Button>
                                </TableHead>

                                <TableHead>
                                    <Button variant="ghost" onClick={() => onSortable('name')}>
                                        Nama
                                        <IconArrowsDownUp className="ml-2 size-4 text-muted-foreground" />
                                    </Button>
                                </TableHead>

                                <TableHead>
                                    <Button variant="ghost" onClick={() => onSortable('address')}>
                                        Alamat
                                        <IconArrowsDownUp className="ml-2 size-4 text-muted-foreground" />
                                    </Button>
                                </TableHead>

                                <TableHead>
                                    <Button variant="ghost" onClick={() => onSortable('email')}>
                                        Email
                                        <IconArrowsDownUp className="ml-2 size-4 text-muted-foreground" />
                                    </Button>
                                </TableHead>

                                <TableHead>
                                    <Button variant="ghost" onClick={() => onSortable('phone')}>
                                        Nomor Handphone
                                        <IconArrowsDownUp className="ml-2 size-4 text-muted-foreground" />
                                    </Button>
                                </TableHead>

                                <TableHead>
                                    <Button variant="ghost" onClick={() => onSortable('created_at')}>
                                        Dibuat Pada
                                        <IconArrowsDownUp className="ml-2 size-4 text-muted-foreground" />
                                    </Button>
                                </TableHead>

                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {publishers.map((publisher, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{publisher.name}</TableCell>
                                    <TableCell>{publisher.address}</TableCell>
                                    <TableCell>{publisher.email}</TableCell>
                                    <TableCell>{publisher.phone}</TableCell>
                                    <TableCell>{publisher.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            {/* EDIT */}
                                            <Button variant="blue" size="sm" asChild>
                                                <Link href={route('admin.publishers.edit', [publisher])}>
                                                    <IconPencil className="size-4" />
                                                </Link>
                                            </Button>

                                            {/* DELETE */}
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="red" size="sm">
                                                        <IconTrash className="size-4" />
                                                    </Button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Apakah anda benar yakin?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Data akan dihapus permanen dari server.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(
                                                                    route('admin.publishers.destroy', [publisher]),
                                                                    {
                                                                        preserveScroll: true,
                                                                        preserveState: true,
                                                                        onSuccess: (success) => {
                                                                            const flash = flashMessage(success);
                                                                            if (flash) toast[flash.type](flash.message);
                                                                        },
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            Continue
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                    <p className="mb-2 text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-orange-500"></span>
                        {meta.from ?? 0} dari {meta.total ?? 0} penerbit
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && (
                            <Pagination>
                                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                    {meta.links.map((link, index) => (
                                        <PaginationItem key={index} className="lb:mb-0 mx-1 mb-1">
                                            <PaginationLink
                                                href={link.url}
                                                isActive={link.active}
                                                className="flex h-9 w-9 items-center justify-center rounded-md p-0"
                                            >
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
