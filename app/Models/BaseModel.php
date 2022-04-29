<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * App\Models\BaseModel
 *
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel query()
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withOrder(\Illuminate\Http\Request $request)
 * @method static \Illuminate\Database\Eloquent\Builder|BaseModel withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
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

    public function scopeWithPaginate($query, Request $request) {
        $pageParam = $request->query('page');
        $perPage = 15;
        $number = 1;
        if (!empty($pageParam)) {
            $number = $pageParam['number'] ?? $number;
            $perPage = $pageParam['size'] ?? $perPage;
        }
        $filterParams = $request->query->all();

        return $query->paginate($perPage, ['*'], 'page[number]', $number)->appends($filterParams);
    }

    protected function getColumnNames() {
        return DB::getSchemaBuilder()->getColumnListing($this->getTable());
    }

    public static function getTableName(): string
    {
        return with(new static)->getTable();
    }

    protected static function isJoined($query, $table)
    {
        $joins = $query->getQuery()->joins;
        if($joins == null) {
            return false;
        }

        foreach ($joins as $join) {
            if ($join->table == $table) {
                return true;
            }
        }

        return false;
    }
}
