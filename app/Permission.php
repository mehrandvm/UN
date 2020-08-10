<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'roles_join_permissions');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_join_permissions');
    }
}
