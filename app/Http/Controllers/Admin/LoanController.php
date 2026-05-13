<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\LoanResource;
use App\Models\Loan;
// use Illuminate\Http\Request;
use Inertia\Response;
class LoanController extends Controller
{
    public function index(): Response
    {
        $loans = Loan::query()
        ->select(['id','loan_code', 'user_id', 'book_id', 'loan_date', 'due_date', 'created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field','direction']))
        ->with(['book', 'user', 'returnBook'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();

        return inertia('Admin/Loans/Index', [
            'page_settings' => [
                'title' => 'Peminjaman',
                'subtitle' => 'Menampilkan semua data peminjaman yang tersedia pada platform ini',
            ],
            'loans' => LoanResource::collection($loans)->additional([
                'meta' => [
                    'has_pages' => $loans->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ]
            ]);
    }
}
