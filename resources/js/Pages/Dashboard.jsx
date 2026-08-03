import CardStat from '@/Components/CardStat';
import ChartCustom from '@/Components/ChartCustom';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    IconArrowUpRight,
    IconBooks,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconMoneybag,
    IconUsersGroup,
} from '@tabler/icons-react';

export default function Dashboard(props) {
    const auth = props.auth.user;
    return (
        <div className="flex w-full flex-col space-y-6 pb-32">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconDashboard}
                />
            </div>

            {/* admin */}
            {auth.role.some((role) => ['admin', 'operator'].includes(role)) && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <CardStat
                        data={{
                            title: 'Total Buku',
                            icon: IconBooks,
                            background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_books}</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Total Pengguna',
                            icon: IconUsersGroup,
                            background: 'text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_users}</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Peminjaman',
                            icon: IconCreditCardPay,
                            background: 'text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Pengembalian',
                            icon: IconCreditCardRefund,
                            background: 'text-white bg-gradient-to-r from-lime-400 via-lime-500 to-lime-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
                    </CardStat>
                </div>
            )}

            {/* member */}
            {auth.role.some((role) => ['member'].includes(role)) && (
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <CardStat
                        data={{
                            title: 'Total Peminjaman',
                            icon: IconCreditCardPay,
                            background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_loans}</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Total Pengembalian',
                            icon: IconCreditCardRefund,
                            background: 'text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{props.page_data.total_returns}</div>
                    </CardStat>
                    <CardStat
                        data={{
                            title: 'Denda',
                            icon: IconMoneybag,
                            background: 'text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-500',
                            iconClassName: 'text-white',
                        }}
                    >
                        <div className="text-2xl font-bold">{formatToRupiah(props.page_data.total_fines)}</div>
                    </CardStat>
                </div>
            )}

            {/* Chart Custom Tetap Dipertahankan dengan Styling Kartu */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
                <ChartCustom chartData={props.page_data.transactionChart} />
            </div>

            {/* Tabel Transaksi dengan Aksen Warna */}
            <div className="flex w-full flex-col justify-between gap-6 lg:flex-row">
                {/* Card Transaksi Peminjaman */}
                <Card className="w-full overflow-hidden rounded-2xl border-none shadow-md ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10 lg:w-1/2">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                            <div className="flex flex-col gap-y-1">
                                <CardTitle className="text-xl font-bold text-white">Transaksi Peminjaman</CardTitle>
                                <CardDescription className="text-xs text-blue-100">
                                    Anda dapat melihat 5 transaksi terakhir peminjaman
                                </CardDescription>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                asChild
                                className="rounded-xl border-0 bg-white/20 text-white hover:bg-white/30"
                            >
                                {auth.role.some((role) => ['admin', 'operator'].includes(role)) ? (
                                    <Link href={route('admin.loans.index')} className="flex items-center gap-1">
                                        Lihat Semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                ) : (
                                    <Link href="#" className="flex items-center gap-1">
                                        Lihat Semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader className="bg-blue-50/50 dark:bg-blue-950/20">
                                <TableRow>
                                    <TableHead className="font-semibold text-blue-900 dark:text-blue-200">#</TableHead>
                                    <TableHead className="font-semibold text-blue-900 dark:text-blue-200">
                                        Kode Peminjaman
                                    </TableHead>
                                    <TableHead className="font-semibold text-blue-900 dark:text-blue-200">
                                        Buku
                                    </TableHead>
                                    <TableHead className="font-semibold text-blue-900 dark:text-blue-200">
                                        Member
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {props.page_data.loans.map((loan, index) => (
                                    <TableRow
                                        key={index}
                                        className="transition-colors hover:bg-blue-50/30 dark:hover:bg-blue-950/10"
                                    >
                                        <TableCell className="font-medium text-zinc-500">{index + 1}</TableCell>
                                        <TableCell className="font-semibold text-blue-600 dark:text-blue-400">
                                            {loan.loan_code}
                                        </TableCell>
                                        <TableCell className="font-medium text-zinc-800 dark:text-zinc-200">
                                            {loan.book.title}
                                        </TableCell>
                                        <TableCell className="text-zinc-600 dark:text-zinc-400">
                                            {loan.user.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Card Transaksi Pengembalian */}
                <Card className="w-full overflow-hidden rounded-2xl border-none shadow-md ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10 lg:w-1/2">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                        <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                            <div className="flex flex-col gap-y-1">
                                <CardTitle className="text-xl font-bold text-white">Transaksi Pengembalian</CardTitle>
                                <CardDescription className="text-xs text-emerald-100">
                                    Anda dapat melihat 5 transaksi terakhir pengembalian
                                </CardDescription>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                asChild
                                className="rounded-xl border-0 bg-white/20 text-white hover:bg-white/30"
                            >
                                {auth.role.some((role) => ['admin', 'operator'].includes(role)) ? (
                                    <Link href={route('admin.return-books.index')} className="flex items-center gap-1">
                                        Lihat Semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                ) : (
                                    <Link href="#" className="flex items-center gap-1">
                                        Lihat Semua
                                        <IconArrowUpRight className="size-4" />
                                    </Link>
                                )}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader className="bg-emerald-50/50 dark:bg-emerald-950/20">
                                <TableRow>
                                    <TableHead className="font-semibold text-emerald-900 dark:text-emerald-200">
                                        #
                                    </TableHead>
                                    <TableHead className="font-semibold text-emerald-900 dark:text-emerald-200">
                                        Kode Pengembalian
                                    </TableHead>
                                    <TableHead className="font-semibold text-emerald-900 dark:text-emerald-200">
                                        Buku
                                    </TableHead>
                                    <TableHead className="font-semibold text-emerald-900 dark:text-emerald-200">
                                        Member
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                {props.page_data.return_books.map((return_bok, index) => (
                                    <TableRow
                                        key={index}
                                        className="transition-colors hover:bg-emerald-50/30 dark:hover:bg-emerald-950/10"
                                    >
                                        <TableCell className="font-medium text-zinc-500">{index + 1}</TableCell>
                                        <TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">
                                            {return_bok.return_book_code}
                                        </TableCell>
                                        <TableCell className="font-medium text-zinc-800 dark:text-zinc-200">
                                            {return_bok.book.title}
                                        </TableCell>
                                        <TableCell className="text-zinc-600 dark:text-zinc-400">
                                            {return_bok.user.name}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title="Dashboard" />;
