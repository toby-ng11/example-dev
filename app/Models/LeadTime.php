<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeadTime extends Model
{
    protected $primaryKey = 'lead_time_id';

    public $timestamps = false;

    protected $fillable = ['lead_time_desc'];

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class, 'quote_id');
    }
}
