<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Book;

class Publisher extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'address',
        'email',
        'phone',
        'logo',
    ];
    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
    
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
    
        });
    }
    public function scopeSorting(Builder $query, array $sorts): void
{
    $query->when(
        $sorts['field'] ?? null && $sorts['direction'] ?? null,
        function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        }
    );
}
}
