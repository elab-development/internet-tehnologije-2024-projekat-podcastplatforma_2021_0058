<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodkastController;
use App\Http\Controllers\EpizodaController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware('auth:sanctum')->group(function () {


Route::get('/podkasti', [PodkastController::class, 'index']);
Route::post('/podkasti', [PodkastController::class, 'store']);
Route::get('/podkasti/{id}', [PodkastController::class, 'show']);
Route::delete('podkasti/{id}',[PodkastController::class, 'destroy']);


Route::post('/epizode', [EpizodaController::class, 'store']);
Route::get('/epizode/{id}', [EpizodaController::class, 'show']);
Route::delete('/epizode/{id}', [EpizodaController::class, 'destroy']);

});     