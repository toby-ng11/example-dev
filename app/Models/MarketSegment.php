<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MarketSegment extends Model
{
    public $timestamps = false;

    protected $fillable = ['market_segment_desc'];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
