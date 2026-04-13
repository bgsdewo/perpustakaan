<?php

use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::controller(CategoryController::class)->group(function () {
    Route::get(uri: 'categories', action: 'index')->name(name: 'admin.categories.index');
    Route::post(uri: 'categories/create', action: 'store')->name(name: 'admin.categories.store');
    Route::get(uri: 'categories/edit/{category}', action: 'edit')->name(name: 'admin.categories.edit');
    Route::put(uri: 'categories/edit/{category}', action: 'update')->name(name: 'admin.categories.update');
    Route::delete(uri: 'categories/destroy/{category}', action: 'destroy')->name(name: 'admin.categories.destroy');
    Route::get(uri: 'categories/create', action: 'create')->name(name: 'admin.categories.create');
    });
});
