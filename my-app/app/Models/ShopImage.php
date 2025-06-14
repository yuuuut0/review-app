<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ShopImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'file_extension',
        'file_mime',
        'file_original_name',
        'file_original_path',
        'thumbnail_id',
    ];

    protected $appends = [
        'image_url',
    ];

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public static function saveImage($data)
    {
        return self::create($data);
    }

    public function getImageUrlAttribute()
    {
        return $this->file_path ? Storage::url($this->file_path) : null;
    }
}
