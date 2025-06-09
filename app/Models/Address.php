<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'address';

    protected $primaryKey = 'address_id';

    protected $fillable = [
        'name',
        'phys_address1',
        'phys_address2',
        'phys_city',
        'phys_state',
        'phys_postal_code',
        'phys_country',
        'central_phone_number',
        'email_address',
        'url',
        'architect_id',
        'specifier_id',
    ];

    public function architect(): BelongsTo
    {
        return $this->belongsTo(Architect::class, 'architect_id', 'architect_id');
    }

    public function specifier(): BelongsTo
    {
        return $this->belongsTo(Specifier::class, 'specifier_id', 'specifier_id');
    }
}
