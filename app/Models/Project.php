<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    const CREATED_AT = 'create_date';

    protected $table = 'project';

    protected $primaryKey = 'project_id';

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
        'architect_id',
        'architect_address_id',
    ];

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class, 'status_id', 'status_id');
    }

    public function segment(): BelongsTo
    {
        return $this->belongsTo(MarketSegment::class, 'market_segment_id', 'market_segment_id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'centura_location_id', 'location_id');
    }
}
