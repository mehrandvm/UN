<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyForm extends Model
{
    protected $fillable = [
        'name', 'incident',
    ];
}
