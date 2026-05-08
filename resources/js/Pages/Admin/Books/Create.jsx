import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBooks } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const fileInputCover = useRef(null);

    const { data, setData, reset, post, processing, errors } = useForm({
        title: '',
        author: '',
        publication_year: '',
        isbn: '',
        language: '',
        synopsis: '',
        number_of_pages: '',
        cover: null,
        price: '',
        category_id: '',
        publisher_id: '',
        total: 0,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => setData(e.target.name, e.target.value);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(props.page_settings.action, {
            preserveScroll: true,
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
        fileInputCover.current.value = null;
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBooks}
                />
                <Button variant="orange" size="lg" asChild>
                    <Link href={route('admin.books.index')}>
                        <IconArrowLeft className="size-4" />
                        Kembali
                    </Link>
                </Button>
            </div>

            <Card>
                <CardContent className="p-6">
                    <form className="space-y-6" onSubmit={onHandleSubmit}>
                        {/* Judul */}
                        <div>
                            <Label>Judul</Label>
                            <Input name="title" value={data.title} onChange={onHandleChange} />
                            {errors.title && <InputError message={errors.title} />}
                        </div>

                        {/* Penulis */}
                        <div>
                            <Label>Penulis</Label>
                            <Input name="author" value={data.author} onChange={onHandleChange} />
                            {errors.author && <InputError message={errors.author} />}
                        </div>

                        {/* Tahun */}
                        <div>
                            <Label>Tahun Terbit</Label>
                            <Select
                                value={data.publication_year}
                                onValueChange={(value) => setData('publication_year', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publicationYears.map((year, i) => (
                                        <SelectItem key={i} value={String(year)}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publication_year && <InputError message={errors.publication_year} />}
                        </div>

                        {/* ISBN */}
                        <div>
                            <Label>ISBN</Label>
                            <Input name="isbn" value={data.isbn} onChange={onHandleChange} />
                            {errors.isbn && <InputError message={errors.isbn} />}
                        </div>

                        {/* Bahasa */}
                        <div>
                            <Label>Bahasa</Label>
                            <Select value={data.language} onValueChange={(value) => setData('language', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih bahasa" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.languages.map((item, i) => (
                                        <SelectItem key={i} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.language && <InputError message={errors.language} />}
                        </div>

                        {/* Sinopsis */}
                        <div>
                            <Label>Sinopsis</Label>
                            <Textarea name="synopsis" value={data.synopsis} onChange={onHandleChange} />
                        </div>

                        {/* Halaman */}
                        <div>
                            <Label>Jumlah Halaman</Label>
                            <Input
                                type="number"
                                name="number_of_pages"
                                value={data.number_of_pages}
                                onChange={onHandleChange}
                            />
                            {errors.number_of_pages && <InputError message={errors.number_of_pages} />}
                        </div>

                        {/* Cover */}
                        <div>
                            <Label>Cover</Label>
                            <input
                                type="file"
                                name="cover"
                                onChange={(e) => setData('cover', e.target.files[0])}
                                ref={fileInputCover}
                            />
                            {errors.cover && <InputError message={errors.cover} />}
                        </div>

                        {/* Harga */}
                        <div>
                            <Label>Harga</Label>
                            <Input type="number" name="price" value={data.price} onChange={onHandleChange} />
                            {errors.price && <InputError message={errors.price} />}
                        </div>

                        {/* Kategori */}
                        <div>
                            <Label>Kategori</Label>
                            <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.categories.map((item, i) => (
                                        <SelectItem key={i} value={String(item.value)}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <InputError message={errors.category_id} />}
                        </div>

                        {/* Penerbit */}
                        <div>
                            <Label>Penerbit</Label>
                            <Select value={data.publisher_id} onValueChange={(value) => setData('publisher_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih penerbit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publishers.map((item, i) => (
                                        <SelectItem key={i} value={String(item.value)}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publisher_id && <InputError message={errors.publisher_id} />}
                        </div>

                        {/* Stok */}
                        <div>
                            <Label>Stok</Label>
                            <Input type="number" name="total" value={data.total} onChange={onHandleChange} />
                        </div>

                        {/* Button */}
                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={onHandleReset}>
                                Reset
                            </Button>
                            <Button type="submit" disabled={processing}>
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
