<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * App\Models\Activity
 *
 * @property int $id
 * @property string|null $log_name
 * @property string $description
 * @property string|null $subject_type
 * @property int|null $subject_id
 * @property string|null $causer_type
 * @property int|null $causer_id
 * @property \Illuminate\Support\Collection|null $properties
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $event
 * @property string|null $batch_uuid
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $causer
 * @property-read \Illuminate\Support\Collection $changes
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $subject
 * @method static Builder|Activity causedBy(\Illuminate\Database\Eloquent\Model $causer)
 * @method static Builder|Activity forBatch(string $batchUuid)
 * @method static Builder|Activity forEvent(string $event)
 * @method static Builder|Activity forSubject(\Illuminate\Database\Eloquent\Model $subject)
 * @method static Builder|Activity hasBatch()
 * @method static Builder|Activity inLog(...$logNames)
 * @method static Builder|Activity newModelQuery()
 * @method static Builder|Activity newQuery()
 * @method static Builder|Activity query()
 * @method static Builder|Activity whereBatchUuid($value)
 * @method static Builder|Activity whereCauserId($value)
 * @method static Builder|Activity whereCauserType($value)
 * @method static Builder|Activity whereCreatedAt($value)
 * @method static Builder|Activity whereDescription($value)
 * @method static Builder|Activity whereEvent($value)
 * @method static Builder|Activity whereId($value)
 * @method static Builder|Activity whereLogName($value)
 * @method static Builder|Activity whereProperties($value)
 * @method static Builder|Activity whereSubjectId($value)
 * @method static Builder|Activity whereSubjectType($value)
 * @method static Builder|Activity whereUpdatedAt($value)
 * @method static Builder|Activity withFilters(\Illuminate\Http\Request $request)
 * @method static Builder|Activity withOrder(\Illuminate\Http\Request $request)
 * @method static Builder|Activity withPaginate(\Illuminate\Http\Request $request)
 * @mixin \Eloquent
 */
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
                if ($causerType === 'user') $causerTypeClass = get_class(new User());
                $query->where($this->getTable() . ".causer_type", $causerTypeClass);
            })
            ->when($request->query('subject_type'), function (Builder $query, $subjectType) {
                $subjectTypeClass = get_class(new Order());
                if ($subjectType === 'order') $subjectTypeClass = get_class(new Order());
                if ($subjectType === 'user') $subjectTypeClass = get_class(new User());
                if ($subjectType === 'parthner') $subjectTypeClass = get_class(new Parthner());
                if ($subjectType === 'client') $subjectTypeClass = get_class(new Client());
                $query->where($this->getTable() . ".subject_type", $subjectTypeClass);
            });
    }

    protected function getColumnNames()
    {
        return DB::getSchemaBuilder()->getColumnListing($this->getTable());
    }
}
