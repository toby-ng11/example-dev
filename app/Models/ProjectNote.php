<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectNote extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'project_note';

    protected $primaryKey = 'project_note_id';

    protected $fillable = [
        'project_id',
        'note_title',
        'project_note',
        'next_action',
        'owner_id',
        'follow_up_date',
        'notified_flag',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id', 'project_id');
    }
}
