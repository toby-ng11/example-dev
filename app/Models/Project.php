<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The custom create_at column.
     *
     * @var string
     */
    const CREATED_AT = 'create_date';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'project_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'project_id_ext',
        'project_name',
        'project_name',
        'project_address',
        'centura_location_id',
        'owner_id',
        'shared_id',
        'status_id',
        'reed',
        'market_segment_id',
        'specifier_id',
        'general_contractor_id',
        'awarded_contractor_id',
        'require_date',
        'due_date',
        'create_date',
        'last_maintained_by',
        'delete_flag',
        'architect_id',
        'architect_address_id',
    ];

    /**
     * A project has a status.
     *
     * @return HasMany
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
    }

    /**
     * A project has a segment.
     *
     * @return HasMany
     */
    public function segment(): BelongsTo
    {
        return $this->belongsTo(MarketSegment::class, 'market_segment_id', 'market_segment_id');
    }

    /**
     * A project has a cetura location.
     *
     * @return HasMany
     */
    public function location()
    {
        return $this->belongsTo(Location::class, 'centura_location_id', 'location_id');
    }
}
