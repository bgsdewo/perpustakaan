<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Response;
use App\Http\Resources\Admin\BookResource;

class BookController extends Controller
{
    public function index(): Response
    {
        $books = Book::query()
            ->select([
                'id',
                'book_code',
                'title',
                'slug',
                'author',
                'publication_year',
                'isbn',
                'language',
                'number_of_pages',
                'status',
                'price',
                'category_id',
                'publisher_id',
                'created_at'
            ])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['category', 'stock', 'publisher'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Admin/Books/Index', [
            'page_settings' => [
                'title' => 'Buku',
                'subtitle' => 'Menampilkan semua data buku yang tersedia pada platform ini'
            ],

            'books' => BookResource::collection($books)->additional([
                'meta' => [
                    'has_pages' => $books->hasPages(),
                ],
            ]),

            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }
}
