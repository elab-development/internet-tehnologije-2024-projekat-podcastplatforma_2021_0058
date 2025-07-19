<?php
 
 namespace App\Http\Controllers;

 use App\Models\User;
 use Illuminate\Http\Request;
 use App\Http\Resources\UserResource;
 use App\Http\Resources\PodkastResource;
 use Illuminate\Support\Facades\Auth;
 use App\Models\Podkast;
 
 class UserController extends Controller
 {
     public function search(Request $request)
     {
         $username = $request->input('username'); 
         $users = User::when($username, function ($query, $username) {
                 return $query->where('username', 'like', '%' . $username . '%');
             })
             ->paginate(10);
 
         return UserResource::collection($users);
     }

     public function index(Request $request)
     {
        
        try {
           
            $users = User::paginate(5); 
            return UserResource::collection($users);

        } catch (Exception $e) {
           
            return response()->json([
                'message' => 'Došlo je do greške prilikom učitavanja korisnika.',
                'error' => $e->getMessage()
            ], 500); 
        }
    }

   public function destroy($userId)
    {
        try {
            
            $user = User::findOrFail($userId);
            $user->delete();
          
            return response()->json([
                'message' => 'Korisnik uspešno obrisan.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Došlo je do greške prilikom brisanja korisnika.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
     


    public function update(Request $request, $userId)
    {

        try {
            

            $user = Auth::user();
            if($user->role!='administrator'){
                return response()->json([
                    'error' => 'Nemate dozvolu za azuriranje uloge korisnika.',
                ], 403); 
            }


            $user = User::findOrFail($userId);
            if ($user->role === 'gledalac') {
                $user->role = 'kreator'; 
                $user->save(); 
                return response()->json(['message' => 'Uloga korisnika je promenjena na kreator.']);
            }
          
          

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Došlo je do greške prilikom promene uloge korisnika.',
                'message' => $e->getMessage(),
            ], 500);
        }
        
    }

     
 }