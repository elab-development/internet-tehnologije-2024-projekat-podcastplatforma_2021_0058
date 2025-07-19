<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Epizoda;
use App\Models\Fajl;
use App\Models\Podkast;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\EpizodaResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;

class EpizodaController extends Controller
{
    


    public function show($id)
    {
        $epizoda = Epizoda::with('fajl')->findOrFail($id);
        return new EpizodaResource($epizoda);
    }


    public function destroy($id)
    {
        try {

            $user = Auth::user();
          
            $epizoda = Epizoda::findOrFail($id);
            if($user->id==$epizoda->podkast->kreator->id){
            $fajl = $epizoda->fajl;
    
            if ($fajl) {
                $putanjaFajla = public_path($fajl->putanja);
                $putanja = str_replace('/', '\\', $putanjaFajla); 
                $direktorijum = dirname($putanja);
                if (File::exists($direktorijum)) {
                    File::deleteDirectory($direktorijum);
                }
    
                $fajl->delete();
            }
    
            $epizoda->delete();
    
            return response()->json(['message' => 'Epizoda uspešno obrisana.'], 200);

        }
            else{
                return response()->json([
                    'error' => 'Nemate dozvolu za brisanje epizode.',
                ], 403); 
            }
        } catch (\Exception $e) {
            return response()->json(['message' => 'Došlo je do greške prilikom brisanja epizode.'], 500);
        }
    }

}
