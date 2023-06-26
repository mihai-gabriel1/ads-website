<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;


class ExampleController extends Controller
{
    public function storeAd(Request $request)
    {
        $ad = new Ad;
        $ad->title = $request->input('title');
        $ad->body = $request->input('body');
        $ad->save();

        return response()->json(['message' => 'Ad created successfully', 'ad' => $ad]);
    }


    public function getAds()
    {
        $ads = Ad::select('id', 'title', 'body', 'created_at')->get();
    
        $ads->transform(function ($ad) {
            $ad->created_at = Carbon::parse($ad->created_at)->format('F d, Y h:i A');
            return $ad;
        });
        
    
        return response()->json($ads);
    }
    

    public function removeAd($id)
    {
        $ad = Ad::findOrFail($id);
        $ad->delete();

        return response()->json(['message' => 'Ad deleted successfully']);
    }
}
