<?php

namespace App\Models;

use App\Models\Views\P21LocationxBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $architect_name
 * @property string $architect_rep_id
 * @property string $company_id
 * @property int $architect_type_id
 * @property string|null $class_id
 * @property int|null $legacy_id
 * @property string $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Address> $addresses
 * @property-read int|null $addresses_count
 * @property-read P21LocationxBranch|null $location
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Project> $projects
 * @property-read int|null $projects_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Specifier> $specifiers
 * @property-read int|null $specifiers_count
 * @property-read \App\Models\ArchitectType|null $type
 * @method static \Database\Factories\ArchitectFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereArchitectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereArchitectRepId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereArchitectTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereClassId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereLegacyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect withTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Architect withoutTrashed()
 * @mixin \Eloquent
 */
class Architect extends Model
{
    /**
     * @use HasFactory<\Database\Factories\ArchitectFactory>
     */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'architect_name',
        'architect_rep_id',
        'company_id',
        'architect_type_id',
        'class_id',
    ];

    protected $casts = [
        'id' => 'string',
    ];

    public function addresses(): MorphMany
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    public function specifiers(): HasMany
    {
        return $this->hasMany(Specifier::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(P21LocationxBranch::class, 'company_id', 'company_id');
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(ArchitectType::class);
    }
}
