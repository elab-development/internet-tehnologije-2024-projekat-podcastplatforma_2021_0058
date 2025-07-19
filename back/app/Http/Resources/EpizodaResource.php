<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EpizodaResource extends JsonResource
{
    public function toArray($request)
    {
        $fajlPutanja = rawurlencode($this->fajl->putanja); 
        $fajlPutanja = str_replace('%2F', '/', $fajlPutanja);
        $tipFajla = $this->fajl->tip;

        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'datum' => $this->datum_i_vreme_odrzavanja->toIso8601String(),
            'fajl' => [
                'naziv' => $this->fajl->naziv,
                'tip' => $tipFajla,
                'streaming_url' => route('epizoda.audio', ['id' => $this->fajl->id]),
                 
            ],
            'kreator_epizode'=>new UserResource($this->podkast->kreator),
        ];
    }
}
