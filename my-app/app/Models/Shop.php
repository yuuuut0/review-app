<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'description',
        'created_by',
        'updated_by',
    ];

    // reviewsテーブルとのリレーション
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // imageとのリレーション
    public function images()
    {
        return $this->hasMany(ShopImage::class);
    }

    // 平均評価を小数点第二位まで取得
    public function getReviewsAvgRatingAttribute()
    {
        return round($this->reviews()->avg('rating'), 2);
    }

    public static function saveShop($data)
    {
        return self::create([
            'name' => $data['name'],
            'location' => $data['location'],
            'description' => $data['description'],
            'created_by' => $data['created_by'],
            'updated_by' => $data['updated_by'],
        ]);
    }
}
