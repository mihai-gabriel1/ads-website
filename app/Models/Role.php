<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'role_name',
    ];

    public function rolePermissions()
    {
        return $this->hasMany(RolePermission::class);
    }

    public function userRoles()
    {
        return $this->hasMany(UserRole::class);
    }
}
