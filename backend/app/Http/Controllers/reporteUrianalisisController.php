<?php

namespace App\Http\Controllers;

use App\Models\Uri_analisis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class reporteUrianalisisController extends Controller
{
    public function index()
    {
        $uri_analisis = DB::table('uri_analisis')
            ->join()
            ->select()
            ->get();
        
        $pdf = PDF::loadView('urianalisis', ['uri_analisis'=> $uri_analisis]);    

        return $pdf->stream;
    }
}
