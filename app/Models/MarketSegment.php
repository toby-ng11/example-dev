<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MarketSegment extends Model
{
    /**
     * @use HasFactory<\Database\Factories\MarketSegmentFactory>
     */
    use HasFactory;

    public $timestamps = false;

    protected $casts = [
        'id' => 'string',
    ];

    protected $fillable = ['market_segment_desc'];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
