<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'roles_join_permissions');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_join_roles');
    }

    public function getInfo()
    {
        $info = (object) null;
        $info->id = $this->id;
        $info->name = $this->name;
        $info->slug = $this->slug;
        return $info;
    }
}
