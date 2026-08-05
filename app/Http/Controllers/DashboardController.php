<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\TransactionLoanResource;
use App\Http\Resources\Admin\TransactionReturnBookResource;
use App\Models\Book;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\ReturnBook;
use App\Models\User;
use Carbon\Carbon;
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
            ->where('payment_status', '!=', 'Sukses') //
            ->sum('total_fee')
            : 0;

        return inertia('Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard',
                'subtitle' => 'Menampilkan semua statistik pada platform ini.',
            ],

            'page_data' => [
                'transactionChart' => $this->chart(),
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
    public function chart(): array
    {
        $end_date = Carbon::now();

        $start_date = $end_date->copy()->subMonth()->startOfMonth();

        $loans = Loan::query()
            ->selectRaw('DATE(loan_date) as date, COUNT(*) as loan')
            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function ($query) {
                return $query;
            }, function ($query) {
                return $query->where('user_id', auth()->user()->id);
            }) // <-- Pastikan titik koma (;) ada di sini jika ini akhir chain, atau hapus jika langsung disambung
            ->whereBetween('loan_date', [$start_date, $end_date])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('loan', 'date');

        $return_books = ReturnBook::query()

            ->selectRaw('DATE(return_date) as date, COUNT(*) as returns')

            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function ($query) {

                return $query;
            }, function ($query) {

                return $query->where('user_id', auth()->user()->id);
            })
            ->whereBetween('return_date', [$start_date, $end_date])

            ->groupBy('date')

            ->orderBy('date')

            ->pluck('returns', 'date');

        $charts = [];

        $period = Carbon::parse($start_date)->daysUntil($end_date);

        foreach ($period as $date) {

            $date_string = $date->toDateString();

            $charts[] = [
                'date' => $date_string,
                'loan' => $loans->get($date_string, 0),
                'return_book' => $return_books->get($date_string, 0),
            ];
        }

        return $charts;
    }
}
