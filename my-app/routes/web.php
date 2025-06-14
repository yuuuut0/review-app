<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ShopController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/sample', function () {
    return Inertia::render('Sample');
});


Route::get('/', [ShopController::class, 'index'])->name('shop.index');


Route::get('/shop/user/{userId}', [ShopController::class, 'indexByUser'])->name('shop.user');
Route::get('/shop/{id}/detail', [ShopController::class, 'detail'])->name('shop.detail');
Route::middleware('auth')->group(function () {
    Route::get('/shop/create', [ShopController::class, 'create'])->name('shop.create');
    Route::post('/shop/store', [ShopController::class, 'store'])->name('shop.store');
    Route::get('/shop/{shop}/edit', [ShopController::class, 'edit'])->name('shop.edit');
    Route::post('/shop/update', [ShopController::class, 'update'])->name('shop.update');
    Route::post('/shop/{shop}/destroy', [ShopController::class, 'destroy'])->name('shop.destroy');
});


Route::get('/review/user/{userId}', [ReviewController::class, 'indexByUser'])->name('review.user');
Route::middleware('auth')->group(function () {
    Route::get('/review/create/shop/{shop}', [ReviewController::class, 'create'])->name('review.create');
    Route::post('/review/store', [ReviewController::class, 'store'])->name('review.store');
    Route::get('/review/{id}/edit', [ReviewController::class, 'edit'])->name('review.edit');
    Route::post('/review/update', [ReviewController::class, 'update'])->name('review.update');
    Route::post('/review/{review}/delete', [ReviewController::class, 'destroy'])->name('review.destroy');
    
});


require __DIR__.'/auth.php';
