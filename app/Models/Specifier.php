<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Specifier extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'job_title',
        'architect_id',
        'address_id',
    ];

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function architect(): BelongsTo
    {
        return $this->belongsTo(Architect::class, 'architect_id', 'architect_id');
    }
}
