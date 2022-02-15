<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class Activity extends \Spatie\Activitylog\Models\Activity
{
    use HasFactory;

    public function scopeWithOrder($query, Request $request)
    {
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

    public function scopeWithPaginate($query, Request $request)
    {
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

    public function scopeWithFilters($query, Request $request)
    {
        return $query->when($request->query('causer_id'), function (Builder $query, $causerId) {
            $query->where($this->getTable() . ".causer_id", $causerId);
        })
            ->when($request->query('subject_id'), function (Builder $query, $subjectId) {
                $query->where($this->getTable() . ".subject_id", $subjectId);
        })
            ->when($request->query('causer_type'), function (Builder $query, $causerType) {
                $causerTypeClass = get_class(new User());
                if ($causerType === 'parthner') $causerTypeClass = get_class(new Parthner());
                if ($causerType === 'order') $causerTypeClass = get_class(new Order());
                $query->where($this->getTable() . ".causer_type", $causerTypeClass);
            })
            ->when($request->query('subject_type'), function (Builder $query, $subjectType) {
                $subjectTypeClass = get_class(new Order());
                if ($subjectType === 'order') $causerTypeClass = get_class(new Order());
                $query->where($this->getTable() . ".subject_type", $subjectTypeClass);
            });
    }

    protected function getColumnNames()
    {
        return DB::getSchemaBuilder()->getColumnListing($this->getTable());
    }
}
