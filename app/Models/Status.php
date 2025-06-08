<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    protected $table = 'status';

    protected $primaryKey = 'status_id';

    public $timestamps = false;

    protected $fillable = [
        'status_desc',
        'project_flag',
        'quote_flag',
    ];

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'status_id', 'status_id');
    }
}
