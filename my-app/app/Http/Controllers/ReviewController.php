<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{

    public function indexByUser($userId)
    {
        $user = User::find($userId);
        $reviews = Review::with('shop', 'user')
            ->where('user_id', $userId)
            ->orderBy('updated_at', 'desc')
            ->get();

        return Inertia::render('Review/IndexByUser', [
            'reviews' => $reviews,
            'user' => $user,
        ]);
    }

    public function create(Shop $shop)
    {
        return Inertia::render('Review/Create', ['shop' => $shop]);
    }

    public function store(Request $request)
    {
        $status = "review-error";

        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);
        
        $data = array_merge(
            $request->only(['shop_id', 'user_id', 'rating', 'comment']),
            ['user_id' => Auth::id()],
        );

        $review = Review::create($data);
        if($review){
            $status = 'review-created';
        }
        return redirect()->route('shop.detail', ['id' => $request->shop_id, 'status' => $status]);
    }

    public function edit(int $id)
    {
        $review = Review::with('shop')->find($id);
        return Inertia::render('Review/Edit', ['review' => $review]);
    }

    public function update(Request $request)
    {
        $status = "error";

        $request->validate([
            'rating' => 'required|integer|between:1,5',
            'comment' => 'required|string|max:255',
        ]);

        $review = Review::findOrFail($request->review_id);
        $updated = $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        if($updated) {
            $status = "review-updated";
        }

        return redirect()->route('shop.detail', [
            'id' => $review->shop_id,
            'status' => $status,
        ]);
    }

    public function destroy(Review $review)
    {
        $status = "review-deleted";

        $review->delete();

        return redirect()->route('shop.detail', [
            'id' => $review->shop_id,
            'status' => $status,
        ]);
    }
}
