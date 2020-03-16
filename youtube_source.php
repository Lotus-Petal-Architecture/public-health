<?php

// YouTube API keys
$apikey = 'AIzaSyDCAot4lETPRwRlYRwGWUVfrDMagOyOqGU';
$apikey2 = 'AIzaSyDvNg5enf6G6R88pALlXRbsLUOzTv92tN4';
$apikey3 = 'AIzaSyDFd_rOk2q-kC_deCS7ROs7eSTRsETLgDo';
$apikey4 = 'AIzaSyBu-EdogFJe60KxbM14MaAQwc8dfN2c9Cw';
$apikey5 = 'AIzaSyDfoZgGnbD6JeoBF_6PVxn8R5kmJjd9S1M';


function getAPI($u) {
    $headers = [ 'Accepts: application/json' ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $u);          // url passed into function
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_VERBOSE, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);     // set the headers
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);         // ask for raw response instead of bool
    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}


$genre = "rock";
$playlistId = array();
$playlistId = ['PLEuUPYukC_M5osNiNN4y62zGvkjDkL9ep','PLEuUPYukC_M4WeZutOSk12nwgNHMXl8LK']; 


// YouTube v3 API playlistItems call - 

$items = array();

//for( $i=0; $i<=1;$i++) {

$url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url .= '&playlistId='.$playlistId[0];
$url .= '&order=viewCount&maxResults=50';
$url .= '&key='.$apikey;

$results.= getAPI($url);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array
$items = array(); 
$items = $json_results[0]["items"];  // save playlist items to items array

foreach($items as $item) {
         $rock_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

//$vid_ids = rtrim($vid_ids, ','); // remove final comma

//echo "ROCK: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$rock_ids."<br><br>";


$nextPage = $json_results[0]["nextPageToken"]; 

// Loop through nextPage queries for 50 items
for( $i=0; $i<=5;$i++) {
    if($nextPage != '') {
        $urlnext = $url."&pageToken=".$nextPage; // create URL with nextpageToken
        $results_next = getAPI($urlnext); // get nextPage results
    $json_results_next[] = json_decode($results_next,true);
    $items_next = array();
    $items_next = $json_results_next[$i]["items"];

    $j = $i + 1;  // counter for nextPage results array index

    $vid_ids = '';  
    foreach($items_next as $item) {
           $vid_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
    }

//echo $vid_ids;

    $rock_ids = $vid_ids.$rock_ids;

    //$vid_ids = rtrim($vid_ids, ','); // remove final comma  

    //print_r($items_next);
    $items =  array_merge($items,$items_next);
    $nextPage = $json_results_next[$i]["nextPageToken"];    
    }
}

echo "ROCK: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$rock_ids."<br><br>";


// YouTube v3 API playlistItems call - 


$genre = "punk";

$url3 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url3 .= '&playlistId='.$playlistId[1];
$url3 .= '&order=viewCount&maxResults=50';
$url3 .= '&key='.$apikey;

$results3.= getAPI($url3);
$json_results3 = array();
$json_results3[] = json_decode($results3,true); // decode API JSON to PHP array
$items_c = array(); 
$items_c = $json_results3[0]["items"];  // save playlist items to items array

$punk_ids = '';  
foreach($items_c as $item) {
         $punk_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

//$punk_ids = rtrim($punk_ids, ','); // remove final comma  

echo "PUNK: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$punk_ids."<br><br>";

$items =  array_merge($items,$items_c);


//  ------

$genre = "pop";

$url4 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url4 .= '&playlistId='.'PLEuUPYukC_M6b7S5d2DP06fvusTySkEej';
$url4 .= '&order=viewCount&maxResults=50';
$url4 .= '&key='.$apikey2;

$results4.= getAPI($url4);
$json_results4 = array();
$json_results4[] = json_decode($results4,true); // decode API JSON to PHP array
$items_d = array(); 
$items_d = $json_results4[0]["items"];  // save playlist items to items array

$pop_ids = '';  
foreach($items_d as $item) {
         $pop_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

//$pop_ids = rtrim($vid_ids, ','); // remove final comma

echo "POP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$pop_ids."<br><br>";  

$items = array_merge($items,$items_d);


// ---- Format for direct copy and paste into YouTube API Query

//$all = str_replace('","',',',$all); 


//  ------

$genre = "country";

$url5 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url5 .= '&playlistId='.'PLEuUPYukC_M4BkdDKRlisAV9w9fyM_4Xm';
$url5 .= '&order=viewCount&maxResults=50';
$url5 .= '&key='.$apikey2;

$results5.= getAPI($url5);
$json_results5 = array();
$json_results5[] = json_decode($results5,true); // decode API JSON to PHP array
$items_e = array(); 
$items_e = $json_results5[0]["items"];  // save playlist items to items array

$country_ids = '';  
foreach($items_e as $item) {
         $country_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "COUNTRY: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$country_ids."<br><br>";  

$items = array_merge($items,$items_e);

//  ------

$genre = "funk";

$url6 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url6 .= '&playlistId='.'PLEuUPYukC_M79gw7nE0f0RjghzCsb25i8';
$url6 .= '&order=viewCount&maxResults=50';
$url6 .= '&key='.$apikey3;

$results6.= getAPI($url6);
$json_results6 = array();
$json_results6[] = json_decode($results6,true); // decode API JSON to PHP array
$items_f = array(); 
$items_f = $json_results6[0]["items"];  // save playlist items to items array

$funk_ids = '';  
foreach($items_f as $item) {
         $funk_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

//$vid_ids = rtrim($vid_ids, ','); // remove final comma  

echo "FUNK: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$funk_ids."<br><br>";  

$items = array_merge($items,$items_f);


//  ------


$genre = "folk";

$url7 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url7 .= '&playlistId='.'PLEuUPYukC_M45mTtI3P3bQYEiucPifeRM';
$url7 .= '&order=viewCount&maxResults=50';
$url7 .= '&key='.$apikey3;

$results7.= getAPI($url7);
$json_results7 = array();
$json_results7[] = json_decode($results7,true); // decode API JSON to PHP array
$items_g = array(); 
$items_g = $json_results7[0]["items"];  // save playlist items to items array

$folk_ids = '';  
foreach($items_g as $item) {
        $folk_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "FOLK: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$folk_ids."<br><br>";  

$items = array_merge($items,$items_g);

//  ------


$genre = "metal";

$url8 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url8 .= '&playlistId='.'PLEuUPYukC_M56ScMWNyCcp7r6C3eOj3Za';
$url8 .= '&order=viewCount&maxResults=50';
$url8 .= '&key='.$apikey4;

$results8.= getAPI($url8);
$json_results8 = array();
$json_results8[] = json_decode($results8,true); // decode API JSON to PHP array
$items_h = array(); 
$items_h = $json_results8[0]["items"];  // save playlist items to items array

$metal_ids = '';  
foreach($items_h as $item) {
        $metal_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "METAL: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$metal_ids."<br><br>";  

$items = array_merge($items,$items_h);

//  ------

$genre = "jazz";

$url9 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url9 .= '&playlistId='.'PLEuUPYukC_M7-BEQT2jnaP-QV6Zar_u5r';
$url9 .= '&order=viewCount&maxResults=50';
$url9 .= '&key='.$apikey4;

$results9.= getAPI($url9);
$json_results9 = array();
$json_results9[] = json_decode($results9,true); // decode API JSON to PHP array
$items_i = array(); 
$items_i = $json_results9[0]["items"];  // save playlist items to items array

$jazz_ids = '';  
foreach($items_i as $item) {
        $jazz_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "JAZZ: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$jazz_ids."<br><br>";  

$items = array_merge($items,$items_i);

//  ------

$genre = "psych";

$url10 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url10 .= '&playlistId='.'PLEuUPYukC_M5wmdyB1KjciHzvAOqCKyOO';
$url10 .= '&order=viewCount&maxResults=50';
$url10 .= '&key='.$apikey5;

$results10.= getAPI($url10);
$json_results10 = array();
$json_results10[] = json_decode($results10,true); // decode API JSON to PHP array
$items_j = array(); 
$items_j = $json_results10[0]["items"];  // save playlist items to items array

$psych_ids = '';  
foreach($items_j as $item) {
        $psych_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "PSYCH: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$psych_ids."<br><br>";  

$items = array_merge($items,$items_j);


//  ------

$genre = "hiphop";

$url11 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url11 .= '&playlistId='.'PLEuUPYukC_M4l67BM76cnsAXofuqIKF-_';
$url11 .= '&order=viewCount&maxResults=50';
$url11 .= '&key='.$apikey5;

$results11.= getAPI($url11);
$json_results11 = array();
$json_results11[] = json_decode($results11,true); // decode API JSON to PHP array
$items_k = array(); 
$items_k = $json_results11[0]["items"];  // save playlist items to items array

$hiphop_ids = '';  
foreach($items_k as $item) {
        $hiphop_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "HIPHOP: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$hiphop_ids."<br><br>";  

$items = array_merge($items,$items_k);

//  ------

$genre = "electronica";

$url12 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url12 .= '&playlistId='.'PLEuUPYukC_M6KVFhuJfFwg7seSlHIYqiZ';
$url12 .= '&order=viewCount&maxResults=50';
$url12 .= '&key='.$apikey5;

$results12.= getAPI($url12);
$json_results12 = array();
$json_results12[] = json_decode($results12,true); // decode API JSON to PHP array
$items_l = array(); 
$items_l = $json_results12[0]["items"];  // save playlist items to items array

$electronica_ids = '';  
foreach($items_l as $item) {
        $electronica_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "ELECTRONICA: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$electronica_ids."<br><br>";  

$items = array_merge($items,$items_l);


//  ------

$genre = "blues";

$url1 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet';
$url1 .= '&playlistId='.'PLEuUPYukC_M6nw3FhBEf8xzdjcxZwCxt_';
$url1 .= '&order=viewCount&maxResults=50';
$url1 .= '&key='.$apikey4;

$results1.= getAPI($url1);
$json_results1 = array();
$json_results1[] = json_decode($results1,true); // decode API JSON to PHP array
$items_a = array(); 
$items_a = $json_results1[0]["items"];  // save playlist items to items array

$blues_ids = '';  
foreach($items_a as $item) {
        $blues_ids .= '"'.$item["snippet"]["resourceId"]["videoId"].'",'; // get string of videoIds 
}

echo "BLUES: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$blues_ids."<br><br>";  

$items = array_merge($items,$items_a);




// ---- Format for copy and paste into PHP array to be parsed 50 items at a time


$all .= $rock_ids.$punk_ids.$pop_ids.$country_ids.$funk_ids.$folk_ids.$metal_ids.$jazz_ids.$psych_ids.$hiphop_ids.$electronica_ids.$blues_ids;

$all = rtrim($all, ','); // remove final comma

echo "ALL:".$all."<br><br>";







?>