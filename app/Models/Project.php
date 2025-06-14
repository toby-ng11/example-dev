<?php

namespace App\Models;

use App\Models\Views\P21LocationxBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

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
        return $this->belongsTo(P21LocationxBranch::class, 'centura_location_id', 'location_id');
    }

    public function architect(): BelongsTo
    {
        return $this->belongsTo(Architect::class, 'architect_id', 'architect_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(ProjectNote::class, 'project_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(ProjectItem::class, 'project_id');
    }

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class, 'project_id');
    }
}
