<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\TransactionLoanResource;
use App\Http\Resources\Admin\TransactionReturnBookResource;
use App\Models\Book;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\ReturnBook;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $isAdmin = $user->hasAnyRole(['admin', 'operator']);

        $loans = Loan::query()
            ->select([
                'id',
                'loan_code',
                'book_id',
                'user_id',
                'created_at'
            ])
            ->when(
                !$isAdmin,
                fn($query) => $query->where('user_id', Auth::id())
            )
            ->latest('created_at')
            ->limit(5)
            ->with(['user', 'book'])
            ->get();

        $returnBooks = ReturnBook::query()
            ->select([
                'id',
                'return_book_code',
                'book_id',
                'user_id',
                'created_at'
            ])
            ->when(
                !$isAdmin,
                fn($query) => $query->where('user_id', Auth::id())
            )
            ->latest('created_at')
            ->limit(5)
            ->with(['user', 'book'])
            ->get();

        $totalLoans = Loan::query()
            ->when(
                !$isAdmin,
                fn($query) => $query->where('user_id', Auth::id())
            )
            ->count();

        $totalReturns = ReturnBook::query()
            ->when(
                !$isAdmin,
                fn($query) => $query->where('user_id', Auth::id())
            )
            ->count();

        $totalFines = $user->hasRole('member')
            ? Fine::query()
            ->where('user_id', Auth::id())
            ->sum('total_fee')
            : 0;

        return inertia('Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard',
                'subtitle' => 'Menampilkan semua statistik pada platform ini.',
            ],

            'page_data' => [
                'loans' => TransactionLoanResource::collection($loans),

                'return_books' => TransactionReturnBookResource::collection($returnBooks),

                'total_books' => $isAdmin
                    ? Book::count()
                    : 0,

                'total_users' => $isAdmin
                    ? User::count()
                    : 0,

                'total_loans' => $totalLoans,

                'total_returns' => $totalReturns,

                'total_fines' => $totalFines,
            ],
        ]);
    }
}
