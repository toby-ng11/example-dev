<?php

namespace App\Models\Views;

use App\Models\Quote;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class P21Contact extends Model
{
    public $incrementing = false;

    public $timestamps = false;

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class, 'contact_id');
    }
}
