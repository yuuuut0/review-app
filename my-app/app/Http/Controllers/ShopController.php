<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use App\Models\ShopImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Nette\Utils\Random;
use Stringable;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        $status = request('status');
        $search = null;
        $order = request('order') ?? "created_at";
        
        // 店舗の全件を取得
        $query = Shop::with('reviews', 'images')
        ->withCount('reviews')
        ->withAvg('reviews', 'rating');
        
        
        // 検索条件がある場合
        if($request->has('search')){
            $search = $request->search;
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('location', 'like', '%'.$search.'%')
                ->orWhere('description', 'like', '%'.$search.'%');
        }

        $shops = $query->orderBy($order, 'desc')->paginate(5);

        // 新着のレビューを５件取得
        $newReviews = Review::with('shop', 'user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();


        return Inertia::render('Home', [
            'shops' => $shops,
            'newReviews' => $newReviews,
            'status' => $status ?: null,
            'search' => $search ?: null,
            'order' => $order === "created_at" ? null : $order,
        ]);
    }

    public function indexByUser($userId)
    {
        $user = User::find($userId);
        $shops = Shop::with('images')
            ->where('created_by', $userId)
            ->orWhere('updated_by', $userId)
            ->paginate(5);


        return Inertia::render('Shop/IndexByUser', [
            'user' => $user,
            'shops' => $shops,
        ]);
    }

    public function detail(int $id)
    {
        $resolve = [
            'latest' => ['created_at', 'desc'],
            'oldest' => ['created_at', 'asc'],
            'high_rating' => ['rating', 'desc'],
            'low_rating' => ['rating', 'asc']
        ];

        $status = request('status');
        $sort = request('sort') ?? 'latest';

        $shop = Shop::with('images')->find($id);
        

        // ユーザー取得
        $createdUser = User::find($shop->created_by);
        $updatedUser = User::find($shop->updated_by);

        $reviews = Review::with('user')
            ->where('shop_id', $shop->id)
            ->orderBy($resolve[$sort][0], $resolve[$sort][1])
            ->paginate(5);
        
        return Inertia::render('Shop/Detail', array_filter([
            'shop' => $shop,
            'createdUser' => $createdUser,
            'updatedUser' => $updatedUser,
            'reviews' => $reviews,
            'status' => $status ?: null,
            'sort' => $sort ?: null,
        ]));
    }

    public function create()
    {
        return Inertia::render('Shop/Create');
    }

    public function store(Request $request)
    {
        $status = "shop-error";
        $storedPaths = [];

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);


        // トランザクション開始
        DB::beginTransaction();
        try {
            // 店舗の保存
            $data = array_merge(
                $request->only(['name', 'location', 'description']),
                ['created_by' => Auth::id(), 'updated_by' => Auth::id()]
            );
            $shop = Shop::saveShop($data);

            // 店舗の画像の保存
            if ($request->file('images')) {
                // DB保存用の配列を用意
                $imageList = [];
                $images = $request->file('images');
                foreach ($images as $image) {
                    // storageに保存
                    $path = $image->store('shop_images');
                    $storedPaths[] =$path;
                    // DB保存情報を配列に追加
                    array_push($imageList, [
                        'shop_id' => $shop->id,
                        'file_name' => basename($path),
                        'file_path' => $path,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $image->getExtension(),
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getClientOriginalPath(),
                    ]);
                }
                ShopImage::insert($imageList);
            }
            // コミット
            DB::commit();
        } catch (\Exception $e) {
            Storage::delete($storedPaths);
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();
            throw $e;
        }

        if ($shop) {
            $status = "shop-created";
        }

        return redirect()->route('shop.detail', ['id' => $shop->id, 'status' => $status]);
    }

    public function edit(int $id)
    {
        $shop = Shop::with('images')->find($id);
        
        return Inertia::render('Shop/Edit', [
            'shop' => $shop,
        ]);
    }

    public function update(Request $request)
    {
        $status = 'error';
        $storedPaths =[];
        $deletePaths = [];

        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);

        // トランザクション開始
        DB::beginTransaction();
        try {
            $shop = Shop::with('images')->findOrFail($request->id);
            $shop->update([
                'name' => $request['name'],
                'location' => $request['location'],
                'description' => $request['description'],
                'updated_by' => Auth::id(),
            ]);


            // 削除画像の整理
            $existingImages = $request->existingImages;
            $existingImageIds = $existingImages ? array_column($existingImages, 'id') : [];
            // コレクションから差分で削除する画像リストを取得
            $imagesToDelete = $shop->images->whereNotIn('id', $existingImageIds);

            if($imagesToDelete->isNotEmpty()){
                $deletePaths = $imagesToDelete->pluck('file_path')->toArray();
                ShopImage::whereIn('id', $imagesToDelete->pluck('id')->toArray())->delete();
            }


            // 店舗の画像の保存
            if ($request->file('images')) {
                // DB保存用の配列を用意
                $imageList = [];
                $images = $request->file('images');
                foreach ($images as $image) {
                    // storageに保存
                    $path = $image->store('shop_images');
                    $storedPaths[] = $path;
                    // DB保存情報を配列に追加
                    array_push($imageList, [
                        'shop_id' => $shop->id,
                        'file_name' => basename($path),
                        'file_path' => $path,
                        'file_type' => $image->getClientMimeType(),
                        'file_size' => $image->getSize(),
                        'file_extension' => $image->getClientOriginalExtension(),
                        'file_mime' => $image->getClientMimeType(),
                        'file_original_name' => $image->getClientOriginalName(),
                        'file_original_path' => $image->getClientOriginalPath(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
                ShopImage::insert($imageList);
            }

            DB::commit();
            $status = "shop-updated";
        } catch (\Exception $e) {
            Storage::delete($storedPaths);
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
        }
        Storage::delete($deletePaths);

        return redirect()->route('shop.detail', [
            'id' => $shop->id,
            'status' => $status,
        ]);
    }

    public function destroy(Shop $shop)
    {
        $status = "error";
        $deletePaths = [];

        DB::beginTransaction();
        try {
            $deletePaths = ShopImage::where('shop_id', $shop->id)->pluck('file_path')->toArray();
            ShopImage::where('shop_id', $shop->id)->delete();
            
            Review::where('shop_id', $shop->id)->delete();
            $shop->delete();
            DB::commit();
            $status = "shop-deleted";
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
        }

        Storage::delete($deletePaths);

        return redirect()->route('shop.index', [
            'status' => $status,
        ]);
    }
}
