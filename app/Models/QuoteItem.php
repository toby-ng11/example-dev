<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuoteItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'item_code',
        'quote_id',
        'quantity',
        'unit_price',
        'unit_of_measure',
        'total_price',
        'note',
        'created_by',
        'updated_by',
    ];

    public function quote(): BelongsTo
    {
        return $this->belongsTo(Quote::class, 'quote_id');
    }
}
