<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Architect extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'architect';

    protected $primaryKey = 'architect_id';

    protected $fillable = [
        'architect_name',
        'architect_rep_id',
        'company_id',
        'architect_type_id',
        'class_id',
    ];

    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, 'architect_id');
    }

    public function specifiers(): HasMany
    {
        return $this->hasMany(Specifier::class, 'architect_id');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'architect_id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(P21LocationxBranch::class, 'company_id', 'company_id');
    }
}
