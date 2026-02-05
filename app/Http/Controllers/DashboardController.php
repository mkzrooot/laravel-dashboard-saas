<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with stats, charts, and recent orders.
     */
    public function index(): Response
    {
        // Stats cards data
        $stats = [
            [
                'label' => 'Total Users',
                'value' => '1,200',
                'icon' => 'users',
                'trend' => '+12%',
                'trendUp' => true,
                'color' => 'blue',
            ],
            [
                'label' => 'Revenue',
                'value' => '$45,230',
                'icon' => 'dollar',
                'trend' => '+8.2%',
                'trendUp' => true,
                'color' => 'green',
            ],
            [
                'label' => 'Orders',
                'value' => '356',
                'icon' => 'cart',
                'trend' => '-3.1%',
                'trendUp' => false,
                'color' => 'purple',
            ],
            [
                'label' => 'Conversion',
                'value' => '24.5%',
                'icon' => 'trending',
                'trend' => '+4.3%',
                'trendUp' => true,
                'color' => 'orange',
            ],
        ];

        // Sales chart data (last 7 days)
        $salesChart = [
            ['name' => 'Mon', 'sales' => 4000, 'visitors' => 2400],
            ['name' => 'Tue', 'sales' => 3000, 'visitors' => 1398],
            ['name' => 'Wed', 'sales' => 5000, 'visitors' => 3800],
            ['name' => 'Thu', 'sales' => 2780, 'visitors' => 3908],
            ['name' => 'Fri', 'sales' => 6890, 'visitors' => 4800],
            ['name' => 'Sat', 'sales' => 5390, 'visitors' => 3800],
            ['name' => 'Sun', 'sales' => 4490, 'visitors' => 4300],
        ];

        // Recent orders data
        $recentOrders = [
            [
                'id' => 'ORD-001',
                'user' => 'John Doe',
                'product' => 'MacBook Pro 14"',
                'status' => 'Completed',
                'amount' => '$2,499',
            ],
            [
                'id' => 'ORD-002',
                'user' => 'Jane Smith',
                'product' => 'iPhone 15 Pro',
                'status' => 'Pending',
                'amount' => '$1,199',
            ],
            [
                'id' => 'ORD-003',
                'user' => 'Bob Johnson',
                'product' => 'AirPods Pro',
                'status' => 'Completed',
                'amount' => '$249',
            ],
            [
                'id' => 'ORD-004',
                'user' => 'Alice Brown',
                'product' => 'iPad Air',
                'status' => 'Processing',
                'amount' => '$599',
            ],
            [
                'id' => 'ORD-005',
                'user' => 'Charlie Wilson',
                'product' => 'Apple Watch',
                'status' => 'Pending',
                'amount' => '$399',
            ],
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'salesChart' => $salesChart,
            'recentOrders' => $recentOrders,
        ]);
    }
}
