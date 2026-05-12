<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\FineSettingController;
use App\Http\Controllers\Admin\LoanController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::controller(CategoryController::class)->group(function () {
    Route::get( 'categories', 'index')->name('admin.categories.index');
    Route::post('categories/create',  'store')->name('admin.categories.store');
    Route::get('categories/edit/{category}',  'edit')->name( 'admin.categories.edit');
    Route::put('categories/edit/{category}',  'update')->name( 'admin.categories.update');
    Route::delete('categories/destroy/{category}',  'destroy')->name( 'admin.categories.destroy');
    Route::get('categories/create',  'create')->name( 'admin.categories.create');
    });

    Route::controller(PublisherController::class)->group(function () {
        Route::get( 'publishers', 'index')->name('admin.publishers.index');
        Route::post('publishers/create',  'store')->name('admin.publishers.store');
        Route::get('publishers/edit/{publisher}',  'edit')->name( 'admin.publishers.edit');
        Route::put('publishers/edit/{publisher}',  'update')->name( 'admin.publishers.update');
        Route::delete('publishers/destroy/{publisher}',  'destroy')->name( 'admin.publishers.destroy');
        Route::get('publishers/create',  'create')->name( 'admin.publishers.create');
        });

    Route::controller(BookController::class)->group(function () {
        Route::get( 'books', 'index')->name('admin.books.index');
        Route::post('books/create',  'store')->name('admin.books.store');
        Route::get('books/edit/{book}',  'edit')->name( 'admin.books.edit');
        Route::put('books/edit/{book}',  'update')->name( 'admin.books.update');
        Route::delete('books/destroy/{book}',  'destroy')->name( 'admin.books.destroy');
        Route::get('books/create',  'create')->name( 'admin.books.create');
        });

        Route::controller(UserController::class)->group(function () {
            Route::get( 'users', 'index')->name('admin.users.index');
            Route::post('users/create',  'store')->name('admin.users.store');
            Route::get('users/edit/{user}',  'edit')->name( 'admin.users.edit');
            Route::put('users/edit/{user}',  'update')->name( 'admin.users.update');
            Route::delete('users/destroy/{user}',  'destroy')->name( 'admin.users.destroy');
            Route::get('users/create',  'create')->name( 'admin.users.create');
            });

            Route::controller(FineSettingController::class)->group(function () {
                Route::get('fine-settings/create',  'create')->name('admin.fine-settings.create');
                Route::put('fine-settings/create', 'store')->name('admin.fine-settings.store');
            });

            Route::controller(LoanController::class)->group(function () {
                Route::get( 'loans', 'index')->name('admin.loans.index');
                Route::post('loans/create',  'store')->name('admin.loans.store');
                Route::get('loans/edit/{loan}',  'edit')->name( 'admin.loans.edit');
                Route::put('loans/edit/{loan}',  'update')->name( 'admin.loans.update');
                Route::delete('loans/destroy/{loan}',  'destroy')->name( 'admin.loans.destroy');
                Route::get('loans/create',  'create')->name( 'admin.loans.create');
                });
});
