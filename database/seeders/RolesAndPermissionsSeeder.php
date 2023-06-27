<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\RolePermission;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_names = [
            'admin',
            'user',
        ];

        $permission_names = [
            'edit',
            'view',
            'delete'
        ];

        foreach($role_names as $role_name) {
            Role::query()->create([
                'name' => $role_name
            ]);

            UserRole::query()->create([
                'user_id' => User::query()->where('name', $role_name)->first()->id,
                'role_id' => Role::query()->where('name', $role_name)->first()->id,
            ]);
        }

        foreach($permission_names as $permission_name) {
            Permission::query()->create([
                'name' => $permission_name
            ]);

            RolePermission::query()->create([
                'role_id' => Role::query()->where('name', 'admin')->first()->id,
                'permission_id' => Permission::query()->where('name', $permission_name)->first()->id,
            ]);
        }
        
        RolePermission::query()->create([
            'role_id' => Role::query()->where('name', 'user')->first()->id,
            'permission_id' => Permission::query()->where('name', 'view')->first()->id,
        ]);
    }

}
