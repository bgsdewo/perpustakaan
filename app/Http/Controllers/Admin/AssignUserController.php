<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssignUserRequest;
use App\Http\Resources\Admin\AssignUserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;
use Spatie\Permission\Models\Role;

class AssignUserController extends Controller
{
    public function index(): Response
    { {

            $users = User::query()

                ->select(['id', 'email', 'username'])

                ->when(request()->search, function ($query, $search) {

                    $query->where('email', 'REGEXP', $search);
                })

                ->when(request()->field && request()->direction, fn($query) => $query->orderBy(request()->field, request()->direction))

                ->with('roles')

                ->paginate(request()->load ?? 10)

                ->withQueryString();
            return inertia(component: 'Admin/AssignUsers/Index', props: [

                'page_settings' => [
                    'title' => 'Tetapkan Peran',
                    'subtitle' => 'Menampilkan semua data tetapkan peran yang tersedia pada platform ini',
                ],
                'users' => AssignUserResource::collection(resource: $users)->additional(data: [
                    'meta' => [
                        'has_pages' => $users->hasPages(),
                    ],
                ]),
                'state' => [
                    'page' => request()->page ?? 1,
                    'search' => request()->serach ?? '',
                    'load' => 10,
                ],
            ]);
        }
    }

    public function edit(User $user): Response
    {
        return inertia(component: 'Admin/AssignUsers/Edit', props: [
            'page_settings' => [
                'title' => 'Sinkronisasi peran',
                'subtitle' => 'Sinkronisasi peran di sini. Klik simpan setelah selesai',
                'method' => 'PUT',
                'action' => route('admin.assign-users.update', $user),
            ],

            'user' => $user->load('roles'),

            'roles' => Role::query()
                ->select(['id', 'name'])
                ->where('guard_name', 'web')
                ->get()
                ->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
        ]);
    }
    public function update(User $user, AssignUserRequest $request): RedirectResponse
    {
        try {
            $user->syncRoles($request->roles);

            flashMessage(
                message: "Berhasil menyinkronkan peran ke pengguna {$user->name}"
            );

            return to_route('admin.assign-users.index');
        } catch (Throwable $e) {

            flashMessage(
                message: MessageType::ERROR->message($e->getMessage()),
                type: 'error'
            );

            return to_route('admin.assign-users.index');
        }
    }
}
