<?php

namespace App\Http\Controllers;

use App\Http\Resources\LoanFrontResource;
use App\Http\Resources\LoanFrontSingleResource;
use App\Models\Book;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
// use Illuminate\Routing\Controllers\HasMiddleware;
// use Illuminate\Routing\Controllers\Middleware;
use Inertia\Response;

class LoanFrontController extends Controller
{
    // implements HasMiddleware
    // public static function middleware(): array

    // {

    //     return [

    //         new Middleware(middleware: 'password.confirm', except: ['store']),

    //     ];
    // }
    public function index(): Response
    {
        $loans = Loan::query()
            ->select(['id', 'loan_code', 'user_id', 'book_id', 'loan_date', 'due_date', 'created_at'])
            ->where('user_id', auth()->user()->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['book', 'user'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia(component: 'Front/Loans/Index', props: [
            'page_settings' => [
                'title' => 'Peminjaman',
                'subtitle' => 'Menampilkan semua data peminjaman anda yang tersedia pada platform ini',
            ],
            'loans' => LoanFrontResource::collection(resource: $loans)->additional(data: [
                'meta' => [
                    'has_pages' => $loans->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }
    public function show(Loan $loan): Response

    {

        return inertia(component: 'Front/Loans/Show', props: [

            'page_settings' => [

                'title' => 'Detail Peminjaman Buku',

                'subtitle' => 'Dapat melihat informasi detail buku yang anda pinjam',

            ],

            'loan' => new LoanFrontSingleResource(resource: $loan->load(relations: ['book', 'user', 'returnBook'])),

        ]);
    }
    public function store(Book $book): RedirectResponse
    {
        $userId = auth()->user()->id;

        // Cek menggunakan method checkLoanBook yang sudah diperbarui
        if (Loan::checkLoanBook(user_id: $userId, book_id: $book->id)) {

            // Cek spesifik apakah statusnya sedang menunggu pengecekan admin atau masih aktif dipinjam
            $isPendingCheck = Loan::where('user_id', $userId)
                ->where('book_id', $book->id)
                ->whereHas('returnBook', function ($query) {
                    $query->whereDoesntHave('returnBookCheck');
                })
                ->exists();

            if ($isPendingCheck) {
                flashMessage(message: 'Tunggu pengecekan oleh admin, baru bisa meminjam buku yang sama', type: 'error');
            } else {
                flashMessage(message: 'Anda sudah meminjam buku ini, harap kembalikan bukunya terlebih dahulu', type: 'error');
            }

            return to_route(route: 'front.books.show', parameters: $book->slug);
        }

        if ($book->stock->available <= 0) {
            flashMessage(message: 'Stok buku tidak tersedia', type: 'error');
            return to_route(route: 'front.books.show', parameters: $book->slug);
        }

        $loan = tap(value: Loan::create([
            'loan_code' => str()->lower(str()->random(10)),
            'user_id' => $userId,
            'book_id' => $book->id,
            'loan_date' => Carbon::now()->toDateString(),
            'due_date' => Carbon::now()->addDays(7)->toDateString(),
        ]), callback: function ($loan) {
            $loan->book->stock_loan();
            flashMessage(message: 'Berhasil melakukan peminjaman buku');
        });

        return to_route(route: 'front.loans.index');
    }
}
