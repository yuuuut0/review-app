<?php

namespace Database\Factories;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShopImage>
 */
class ShopImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    $imageUrl = 'https://picsum.photos/600/400';
    $imageContents = Http::get($imageUrl)->body();

    $uuid = Str::uuid();
    $extension = 'jpg';
    $fileName = $uuid . '.' . $extension;
    $originalName = 'dummy_' . now()->timestamp . '.' . $extension;

    // 保存パスを構築
    $relativePath = 'shop_images/' . $fileName;

    // ストレージに保存
    Storage::put($relativePath, $imageContents);

    return [
        'shop_id' => Shop::factory(),
        'file_name' => $fileName,
        'file_path' => $relativePath, // ここが実際の保存パス
        'file_type' => 'image',
        'file_size' => strlen($imageContents),
        'file_extension' => $extension,
        'file_mime' => 'image/jpeg',
        'file_original_name' => $originalName,
        'file_original_path' => $imageUrl,
        'thumbnail_id' => null,
    ];
}
}
