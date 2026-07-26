<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    { {
            return inertia(component: 'Dashboard', props: [
                'page_settings' => [
                    'title' => 'Dashboard',
                    'subtitle' => 'Menampilkan semua statistik pada platform ini.',
                ],

            ]);
        }
    }
}
