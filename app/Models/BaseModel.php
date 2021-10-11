<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BaseModel extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at'];
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function scopeWithOrder($query, Request $request) {
        $sorts = explode(',', $request->query('sort', $this->getTable() . '.id'));
        $columnNames = $this->getColumnNames();
        foreach ($sorts as $sortColumn) {
            $sortDirection = Str::startsWith($sortColumn, '-') ? 'desc' : 'asc';
            $sortColumn = ltrim($sortColumn, '-');
            if (in_array($sortColumn, $columnNames)) {
                $query->orderBy($this->getTable() . '.' . $sortColumn, $sortDirection);
            }
        }

        return $query;
    }

    protected function getColumnNames() {
        return DB::getSchemaBuilder()->getColumnListing($this->getTable());
    }
}
