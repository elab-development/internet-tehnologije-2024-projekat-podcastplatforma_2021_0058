<?php

namespace App\Http\Controllers;

use App\Models\Podkast;
use Illuminate\Http\Request;
use App\Http\Resources\PodkastResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;


class PodkastController extends Controller
{
    public function index(Request $request)
    {
        $query = Podkast::query();
    
       
        if ($request->filled('naziv')) {
            $query->where('naziv', 'like', '%' . $request->naziv . '%');
        }
    
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1); 
        
       
        $podkasti = $query->paginate($perPage);
    
   
        return PodkastResource::collection($podkasti);
    }
    



    public function store(Request $request)
    {
     
        try{


            $user = Auth::user();
            if($user->role!='kreator'){
                return response()->json([
                    'error' => 'Nemate dozvolu za prikaz porudzbina.',
                ], 403); 
            }
            

            Log::info('Request Data:', $request->all());
            $request->validate([
                'naziv' => 'required|string',
                'opis' => 'required|string',
                'kategorija_id' => 'required|exists:kategorije,id',
                'baner' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
              
                
            ]);
    
          
    
            $podkast = Podkast::create([
                'naziv' => $request->naziv,
                'opis' => $request->opis,
                'kategorija_id' => $request->kategorija_id,
                'putanja_do_banera' => $this->uploadBaner($request->file('baner'), $request->naziv), // Poziv za upload slike banera
                'kreator_id'=>$user->id,
            ]);
    
    
           
    
          
    
            return response()->json(['message' => 'Podkast je uspešno sačuvan', 'podkast' => $podkast], 201);
        }
        catch (\Exception $e) {
            return response()->json([
                'message' => 'Greška prilikom ažuriranja podkasta',
                'error' => $e->getMessage()
            ], 500);
        }
        
        
       
    }

    
    private function uploadBaner($file, $naziv)
    {
        
        $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
        $extension = $file->getClientOriginalExtension(); 
        $filename = $sanitizedNaziv . '.' . $extension;

       
        $path = 'app/' . $sanitizedNaziv;

        
        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }

       
        $pathFile = $file->storeAs($path, $filename,"public");

        return Storage::url($pathFile);
    }


    
    public function show($id)
    {
        $podkast = Podkast::with('epizode')->findOrFail($id);
        return new PodkastResource($podkast);
    }


    
    public function destroy($id)
{
    try {
        $podkast = Podkast::findOrFail($id);
        $user = Auth::user();
        if($user->role=='administrator' || $user->id==$podkast->kreator->id){
        
        if ($podkast->putanja_do_banera) {
            $putanjaBanera = public_path($podkast->putanja_do_banera);
            $putanja = str_replace('/', '\\', $putanjaBanera); 
            $direktorijum = dirname($putanja);
            Log::info($direktorijum);
            if (File::exists($direktorijum)) {
                File::deleteDirectory($direktorijum);
            }
        }

       
        $podkast->epizode->each(function ($epizoda) {
           
            if ($epizoda->fajl) {
                $putanjaFajla = public_path($epizoda->fajl->putanja);
                Log::info($putanjaFajla);
                $putanja = str_replace('/', '\\', $putanjaFajla);
                Log::info($putanja);

                $direktorijum = dirname($putanja);
                Log::info($direktorijum);
                if (File::exists($direktorijum)) {
                    File::deleteDirectory($direktorijum);
                }

           
                $epizoda->fajl->delete();
            }

         
            $epizoda->delete();
        });

       
        $podkast->delete();

        return response()->json(['message' => 'Podkast i sve njegove epizode su uspešno obrisani.'], 200);
    }
        else{
            return response()->json([
                'error' => 'Nemate dozvolu za brisanje podkasta.',
            ], 403); 
        }
    } catch (\Exception $e) {
        Log::error('Greška prilikom brisanja podkasta: ' . $e->getMessage());
        return response()->json(['message' => 'Došlo je do greške prilikom brisanja podkasta.'], 500);
    }
}





    



}

