<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MarketSegment extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'market_segment';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'market_segment_id';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'market_segment_desc',
    ];

    /**
     * A project semgent can be assigned to many projects.
     *
     * @return HasMany
     */
    public function projects()
    {
        return $this->hasMany(Project::class, 'market_segment_id', 'market_segment_id');
    }
}
