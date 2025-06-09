<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class P21LocationxBranch extends Model
{
    protected $table = 'P21_Location_x_Branch';

    protected $primaryKey = 'location_id';

    public $incrementing = false;

    public $timestamps = false;

    protected $casts = [
        'location_id' => 'integer',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'centura_location_id', 'location_id');
    }
}
