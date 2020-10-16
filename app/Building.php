<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Building extends Model
{
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->formatMyPoint();
        });

        static::updating(function ($model) {
            $model->formatMyPoint();
        });
    }

    protected function formatMyPoint()
    {
        $this->geom = DB::raw('ST_SetSRID(ST_Point(' . $this->long . ',' . $this->lat . '),4326)');// DB::raw('POINT(' . $this->x . ' ' . $this->y . ')');
    }
}
