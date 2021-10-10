<?php

namespace App\Models;

class Order extends BaseModel
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $additionalHidden = ['source_id', 'parthner_id', 'client_id', 'workshop_id', "addressee_id", 'pick_up_point_id',
            'delivery_point_id', 'courier_receiver_id', 'courier_issuer_id', 'master_id', 'receiver_id'];
        $this->hidden = array_merge($this->hidden, $additionalHidden);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }

    public function parthner()
    {
        return $this->belongsTo(Parthner::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function workshop()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function addressee()
    {
        return $this->belongsTo(Addressee::class);
    }

    public function pickUpPoint()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function deliveryPoint()
    {
        return $this->belongsTo(Workshop::class);
    }

    public function courierReceiver()
    {
        return $this->belongsTo(User::class);
    }

    public function courierIssuer()
    {
        return $this->belongsTo(User::class);
    }

    public function master()
    {
        return $this->belongsTo(User::class);
    }

    public function receiver()
    {
        return $this->belongsTo(Client::class);
    }

    public function history()
    {
        return $this->hasMany(OrderHistory::class);
    }

    public function scopeWithAllRelations($query)
    {
        $query->with('source', 'parthner', 'client', 'workshop', 'addressee', 'pickUpPoint',
            'deliveryPoint', 'courierReceiver', 'courierIssuer', 'master', 'receiver', 'history', 'history.status');
    }
}
