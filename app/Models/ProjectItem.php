<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $primaryKey = 'item_uid';

    protected $fillable = [
        'item_id',
        'project_id',
        'quantity',
        'unit_price',
        'uom',
        'subtotal',
        'note',
        'added_by',
        'last_maintained_by',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id', 'project_id');
    }
}
