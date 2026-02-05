<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CardColumn extends Model
{
    protected $fillable = ['title', 'order'];

    /**
     * Get all task cards for this column, ordered by their order field.
     */
    public function cards(): HasMany
    {
        return $this->hasMany(TaskCard::class)->orderBy('order', 'asc');
    }
}
