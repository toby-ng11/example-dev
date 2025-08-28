<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $job_title
 * @property int $architect_id
 * @property string $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $legacy_id
 * @property-read \App\Models\Address|null $address
 * @property-read \App\Models\Architect $architect
 * @method static \Database\Factories\SpecifierFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereArchitectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereJobTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereLegacyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Specifier withoutTrashed()
 * @mixin \Eloquent
 */
class Specifier extends Model
{
    /**
     * @use HasFactory<\Database\Factories\SpecifierFactory>
     */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'job_title',
        'architect_id',
        'address_id',
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public function address(): MorphOne
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function architect(): BelongsTo
    {
        return $this->belongsTo(Architect::class);
    }
}
