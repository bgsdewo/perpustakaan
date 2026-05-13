<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder; // tambahkan ini

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\User;
use App\Models\Book;
use App\Models\ReturnBook;

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
        $query->when($filters ['search'] ?? null, function($query, $search) {
            $query->where(function($query) use($search){
                $query->whereAny([
                    'loan_code',
                    'loan_date',
                    'due_date',
                ], 'REGEXP', $search);
            });
        });
    }
        public function scopeSorting(Builder $query, array $sorts): void
        {
            $query->when($sorts['field'] ?? null && $sorts ['direction'] ?? null, function($query) use($sorts){
                $query->orderBy($sorts['field'], $sorts['direction']);
            });
        }

}
