<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PodkastController;
use App\Http\Controllers\EpizodaController;
use App\Http\Controllers\FajlController;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\UserController;

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


Route::get('/epizode/audio/{id}', [FajlController::class, 'audio'])->name('epizoda.audio');

Route::get('/kategorije', [KategorijaController::class, 'index']);
Route::post('/kategorije', [KategorijaController::class, 'store']);

Route::get('/users/search', [UserController::class, 'search']);
Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{userId}', [UserController::class, 'destroy']);
Route::put('/users/{id}', [UserController::class, 'update']);


});     