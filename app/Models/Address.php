<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string|null $phys_address1
 * @property string|null $phys_address2
 * @property string|null $phys_city
 * @property string|null $phys_state
 * @property string|null $phys_postal_code
 * @property string|null $phys_country
 * @property string|null $central_phone_number
 * @property string|null $email_address
 * @property string|null $url
 * @property string $addressable_type
 * @property int $addressable_id
 * @property string $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $legacy_id
 * @property-read Model|\Eloquent $addressable
 * @property-read \App\Models\Architect|null $architect
 * @property-read \App\Models\Specifier|null $specifier
 * @method static \Database\Factories\AddressFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereAddressableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereAddressableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCentralPhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereEmailAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereLegacyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhysAddress1($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhysAddress2($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhysCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhysCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhysPostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhysState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address withoutTrashed()
 * @mixin \Eloquent
 */
class Address extends Model
{
    /**
     * @use HasFactory<\Database\Factories\AddressFactory>
     */
    use HasFactory, SoftDeletes;

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
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public function addressable(): MorphTo
    {
        return $this->morphTo();
    }

    public function architect(): BelongsTo
    {
        return $this->belongsTo(Architect::class);
    }

    public function specifier(): BelongsTo
    {
        return $this->belongsTo(Specifier::class);
    }
}
