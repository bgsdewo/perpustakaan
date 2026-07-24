<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StockRequest;
use App\Http\Resources\Admin\StockResource;
use App\Models\stock;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class BookStockReportController extends Controller
{
    public function index(): Response
    { {
            $stocks = stock::query()
                ->select(['stocks.id', 'book_id', 'total', 'available', 'loan', 'lost', 'damaged', 'stocks.created_at'])
                ->filter(request()->only(['search']))
                ->sorting(request()->only(['field', 'direction']))
                ->paginate(request()->load ?? 10)
                ->withQueryString();

            return inertia('Admin/BookStockReports/Index', props: [
                'page_settings' => [
                    'title' => 'Laporan Stok Buku',
                    'subtitle' => 'Menampilkan laporan stok buku yang tersedia pada platform ini',
                ],
                'stocks' => StockResource::collection($stocks)->additional([
                    'meta' => [
                        'has_pages' => $stocks->hasPages(),
                    ],
                ]),
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->search ?? "",
                    'load' => 10,
                ]

            ]);
        }
    }
    public function edit(Stock $stock): Response
    {
        return inertia(component: 'Admin/BookStockReports/Edit', props: [
            'page_settings' => [
                'title' => 'Edit Stok',
                'subtitle' => 'Edit stok disini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route(name: 'admin.book-stock-reports.update', parameters: $stock)
            ],
            'stock' => $stock,
        ]);
    }
    public function update(Stock $stock, StockRequest $request): RedirectResponse
    {
        try {
            $minimum_total = $request->available + $request->loan + $request->lost + $request->damaged;

            if ($request->total < $minimum_total) {
                flashMessage('Total tidak boleh lebih kecil dari peminjaman yang tersedia, dipinjam, hilang, dan rusak.', 'error');

                return to_route('admin.book-stock-reports.index');
            }

            $stock->update([
                'total' => $request->total,
                'available' => $request->available,
            ]);

            flashMessage(MessageType::CREATED->message('stok buku'));

            return to_route('admin.book-stock-reports.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message($e->getMessage()));

            return to_route('admin.book-stock-reports.index');
        }
    }
}
