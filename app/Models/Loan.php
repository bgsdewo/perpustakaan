<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder; // tambahkan ini

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\User;
use App\Models\Book;
use App\Models\ReturnBook;
use Carbon\Carbon;

class Loan extends Model
{
    protected $fillable = [
        'loan_code',
        'user_id',
        'book_id',
        'loan_date',
        'due_date',
    ];

    protected function casts(): array
    {
        return [
            'loan_date' => 'date',
            'due_date' => 'date',
        ];
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function returnBook(): HasOne
    {
        return $this->hasOne(ReturnBook::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                // Pencarian pada kolom tabel loans sendiri
                $query->whereAny([
                    'loan_code',
                    'loan_date',
                    'due_date',
                ], 'REGEXP', $search)
                // Pencarian berdasarkan nama user (relasi)
                ->orWhereHas('user', function ($query) use ($search) {
                    $query->where('name', 'REGEXP', $search);
                })
                // Pencarian berdasarkan judul buku (relasi)
                ->orWhereHas('book', function ($query) use ($search) {
                    $query->where('title', 'REGEXP', $search);
                });
            });
        });
    }
    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }

    public static function checkLoanBook(int $user_id, int $book_id): bool
    {
        // 1. Cek apakah user sedang meminjam buku tersebut dan BELUM dikembalikan sama sekali
        $hasActiveLoan = self::query()
            ->where('user_id', $user_id)
            ->where('book_id', $book_id)
            ->whereDoesntHave('returnBook')
            ->exists();

        if ($hasActiveLoan) {
            return true;
        }

        // 2. Cek apakah buku sudah dikembalikan, TAPI BELUM dicek/divalidasi oleh admin (returnBookCheck kosong)
        $hasPendingCheck = self::query()
            ->where('user_id', $user_id)
            ->where('book_id', $book_id)
            ->whereHas('returnBook', function ($query) {
                $query->whereDoesntHave('returnBookCheck');
            })
            ->exists();

        return $hasPendingCheck;
    }

    public static function totalLoanBooks(): array
    {
        return [
            'days' => self::whereDate('created_at', Carbon::now()->toDateString())->count(),
            'weeks' => self::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count(),
            'months' => self::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count(),
            'years' => self::whereYear('created_at', Carbon::now()->year)->count(),

        ];
    }
}
