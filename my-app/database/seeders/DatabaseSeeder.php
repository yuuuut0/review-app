<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Shop;
use App\Models\ShopImage;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 10人のユーザーを作成
        $users = User::factory(10)->create();

        // 各ユーザーに対してショップを1〜5件作成
        $users->each(function ($user) use ($users) {
            $shopCount = rand(1, 5);
            $shops = Shop::factory($shopCount)->create([
                'created_by' => $user->id,
                'updated_by' => $user->id,
            ]);

            $shops->each(function ($shop) use ($users) {
                // 画像を0〜5枚作成
                $imageCount = rand(0, 5);
                ShopImage::factory($imageCount)->create([
                    'shop_id' => $shop->id,
                ]);

                // レビューを0〜10件ランダムに作成（他のユーザーから）
                $reviewCount = rand(0, 10);
                $reviewers = $users->where('id', '!=', $shop->user_id)->random(min($reviewCount, $users->count() - 1));

                foreach ($reviewers as $reviewer) {
                    Review::factory()->create([
                        'user_id' => $reviewer->id,
                        'shop_id' => $shop->id,
                    ]);
                }
            });
        });
    }
}
