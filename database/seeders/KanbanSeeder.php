<?php

namespace Database\Seeders;

use App\Models\CardColumn;
use App\Models\TaskCard;
use Illuminate\Database\Seeder;

class KanbanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Column 1: Backlog
        $backlog = CardColumn::create([
            'title' => 'Backlog',
            'order' => 1,
        ]);
        
        TaskCard::create([
            'content' => 'Analyze Competitors',
            'order' => 1,
            'card_column_id' => $backlog->id,
        ]);
        
        TaskCard::create([
            'content' => 'Sketch UI',
            'order' => 2,
            'card_column_id' => $backlog->id,
        ]);

        // Column 2: In Progress
        $inProgress = CardColumn::create([
            'title' => 'In Progress',
            'order' => 2,
        ]);
        
        TaskCard::create([
            'content' => 'Setup Database',
            'order' => 1,
            'card_column_id' => $inProgress->id,
        ]);

        // Column 3: Review (Empty)
        CardColumn::create([
            'title' => 'Review',
            'order' => 3,
        ]);

        // Column 4: Done
        $done = CardColumn::create([
            'title' => 'Done',
            'order' => 4,
        ]);
        
        TaskCard::create([
            'content' => 'Install Laravel',
            'order' => 1,
            'card_column_id' => $done->id,
        ]);
    }
}
