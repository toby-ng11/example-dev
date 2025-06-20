<?php

namespace App\Models;

use App\Models\Views\P21LocationxBranch;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Architect extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'architect_name',
        'architect_rep_id',
        'company_id',
        'architect_type_id',
        'class_id',
    ];

    public function addresses()
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
