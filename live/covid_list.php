<?php

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

//echo "<br><br>NEW ID'S: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><br>";

//print_r($call);


// YouTube v3 API statistics call

$url = "http://covid19.yesexactly.com/coronavirus_api.php?action=get_states&country=US";    

$results = getAPI($url);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array
$items = array(); 
$items = $json_results[0]["results"];  // save items to items array

$json_return = json_encode($items);  // encode PHP array as JSON


//print_r($json_results[0]);

print_r($json_return);




?>
