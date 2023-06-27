<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use Illuminate\Http\Request;



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
        $ads = Ad::all();
        if($ads) {
            return response()->json($ads);
        }
        return response()->json([], 500);
    }
    

    public function removeAd($id)
    {
        $ad = Ad::findOrFail($id);
        $ad->delete();

        return response()->json(['message' => 'Ad deleted successfully']);
    }
}
