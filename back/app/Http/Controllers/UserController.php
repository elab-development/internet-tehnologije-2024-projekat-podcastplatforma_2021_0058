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

   

     
 }