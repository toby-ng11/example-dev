<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'status';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'status_id';

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
        'status_desc',
        'project_flag',
        'quote_flag',
    ];

    /**
     * A status can be assigned to many projects.
     *
     * @return HasMany
     */
    public function projects()
    {
        return $this->hasMany(Project::class, 'status_id', 'status_id');
    }
}
