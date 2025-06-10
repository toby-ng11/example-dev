<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuoteItem extends Model
{
    use SoftDeletes;

    protected $primaryKey = 'item_uid';

    protected $fillable = [
        'item_id',
        'quote_id',
        'quantity',
        'unit_price',
        'uom',
        'subtotal',
        'note',
        'added_by',
        'last_maintained_by',
    ];

    public function quote(): BelongsTo
    {
        return $this->belongsTo(Quote::class, 'quote_id', 'quote_id');
    }
}
