<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\RouteAccessResource;
use App\Models\RouteAccess;
use Illuminate\Http\Request;
use Inertia\Response;

class RouteAccessController extends Controller
{
    public function index(): Response
    {
        $route_accesses = RouteAccess::query()
            ->select(['id', 'route_name', 'role_id', 'permission_id', 'created_at'])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['role', 'permission'])
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia(component: 'Admin/RouteAccesses/Index', props: [
            'page_settings' => [
                'title' => 'Akses Rute',
                'subtitle' => 'Menampilkan semua data akses rute pada platform ini.',
            ],
            'route_accesses' => RouteAccessResource::collection($route_accesses)->additional(data: [
                'meta' => [
                    'has_pages' => $route_accesses->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }
}
