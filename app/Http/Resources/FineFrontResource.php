<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FineFrontResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'late_fee' => $this->late_fee,
            'other_fee' => $this->other_fee,
            'total_fee' => $this->total_fee,
            'payment_status' => $this->payment_status,
            'loan' => $this->whenLoaded(relationship: 'returnBook', value: [
                'id' => $this->returnBook?->loan?->id,
                'loan_code' => $this->returnBook?->loan?->loan_code,
                'loan_date' => Carbon::parse(time: $this->returnBook?->loan?->loan_date)->format(format: 'd M Y'),
                'due_date' => Carbon::parse(time: $this->returnBook?->loan?->due_date)->format(format: 'd M Y'),
            ]),
            'return_book' => $this->whenLoaded(relationship: 'returnBook', value: [
                'return_book_code' => $this->returnBook?->return_book_code,
                'return_date' => Carbon::parse(time: $this->returnBook?->return_date)->format(format: 'd M Y'),
            ]),

            'book' => $this->whenLoaded(relationship: 'returnBook', value: [
                'id' => $this->returnBook?->book?->id,
                'title' => $this->returnBook?->book?->title,
                'slug' => $this->returnBook?->book?->slug,
            ]),
            'user' => $this->whenLoaded(relationship: 'user', value: [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ])
        ];
    }
}
