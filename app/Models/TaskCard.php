<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaskCard extends Model
{
    protected $fillable = ['content', 'order', 'card_column_id'];

    /**
     * Get the column that owns this task card.
     */
    public function cardColumn(): BelongsTo
    {
        return $this->belongsTo(CardColumn::class);
    }
}
