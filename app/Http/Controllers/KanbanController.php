<?php

namespace App\Http\Controllers;

use App\Models\CardColumn;
use Inertia\Inertia;
use Inertia\Response;

class KanbanController extends Controller
{
    /**
     * Display the Kanban board.
     */
    public function index(): Response
    {
        $board = CardColumn::with('cards')
            ->orderBy('order', 'asc')
            ->get();

        return Inertia::render('KanbanBoard', [
            'board' => $board,
        ]);
    }
}
