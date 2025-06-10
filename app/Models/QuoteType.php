<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class QuoteType extends Model
{
    protected $table = 'quote_type';

    protected $primaryKey = 'type_id';

    public $timestamps = false;

    protected $fillable = ['type_desc'];

    public function quotes(): HasMany
    {
        return $this->hasMany(Quote::class, 'quote_id');
    }
}
