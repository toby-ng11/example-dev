<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArchitectType extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'architect_type_desc',
    ];

    public function architects(): HasMany
    {
        return $this->hasMany(Architect::class);
    }
}
