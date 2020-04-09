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

// Create array containing video ids from genre playlist API calls

$all = array("uIP0iIxHLY4","E9yTHSyZeKg","VkavEUCwm0M","rddu5TgrTmE","GFfN5mFjOFo","tAZko_MSZhc","RemMNe7z6vg","rx4woNwVS8g","H3GXCAeWMb0","9Rz4kMBD8jU","XPR2bV8u5rk","KGKJQNtxjhI","vi7aVsmH_eo","zYwCmcB0XMw","PUMkxH03V5c","jyqWjl7GkCE","-vm8uWFgBRc","RoLTPcD1S4Q","OkITsv3Nk6M","DHXYSbs6Rb0","zClCsQnRj-c","yHNB4m1dfKE","4fr8k6O-Bko","w_otXEVPgOk","q-XpcMTnB-A","bU2WUSEC6PY","rQfs5UTzwFQ","8Ux6UnYOLvk","CyDHTJCIfHQ","AwkDVMr4Kso","0Jpqb5IYlEE","l5JhD4wKsrs","8BhdoriXe9Q","KLgWHoGLDx4","iv0ej8cJScM","kXFGQYGFeFU","LEKxlNbjgmE","KYhsehUH5b0","kYKcf7EWEfc","DElGhE2NhtQ","j0iohXlRXKA","_oQIIAdG8xM","Ys4YGRN8hgY","Duot03grNv8","2bHvzuupe4w","FxdnqfyvIkY","Y6BeTnjUqlo","cwHmeFidLbE","W3m7Uz7hF-s","APrpB-i4d_E","FuFtfhOipNQ","ON6pn6suSzc","BzkHp6EswEM","W05cPXpUHGI","kkcbxjWG9Mc","-DjpNgrocKo","MUfgAbFY4CA","D1vQJFF2TKQ","f-MroGCKDcM","hjg39XRkjVc","E5uAH0vNn2s","rCy1VIy8Hj0","Kc1htX3q-F0","pGOO7EE4Lhw","tRNDB9VqI3Q","qOM107PIxV8","Ti1liRM6cao","V4Yw6A_rlHc","d9MA4rFNf7I","OqeKV2UYq1Q","ksTFj6L0mao","E5H8DwJI0uA","qR9DjdMrpHg","zJXQSBWO5Qc","wcICuFnkxe4","pB08AUiTP3w","vZA_7FtttRY","cgr8e7da52o","MbxRu7fwR24","6r1-HTiwGiY","TpLhrLzSaFQ","HwgNMrs-i80","QJu611UdfxA","pO3_ZG7wJPc","sSCb-a2McRI","yyayVIXwg74","TkIloV7OMAk","xRFTYRXS3aw","1WaMgWUiYg0","wsF4TVHr42A","trZ244Ih_E4","iG8D1Kb7xgQ","EIpzPVAHpVg","WGnqoZx7_QY","n7zyfArxibk","UNUmSwWq-LU","Rh2YmGujtFI","PE1ges9nn6A","K_5lt23PRVs","DCI5XqT-AZs","QAhMakentwA","aUfu-lEflbQ","YbP-Aa3V6bA","t7Pv3eZEy4k","VZu1Z0oeFzo","_S0esU0n6sY","pOYN1p4Rc6o","mfA9K1hj2eg","OLTeVRvPq04","0_GeShK7aaY","U3iWpewLuyA","ull6hOYs5ZY","Palxbwco9pM","MP8Fd0mN50E","5AHz8HeDk3c","skvGTkW-qG4","-dJXBCBZwQg","aCgTgyBBswA","HcB7ZnkMnB8","hPsdjlPVaJU","0deHAT_KOqE","YypAGqIBrX0","s_vgHgIKPQs","JOUmxw0DPsg","LesJtYAG8zM","pCgEUBf5y18","4qljGaHJbCs","FNFYq8O7DTY","cr5uFjA4TNI","VTd4JCIqL7U","OFOowKu7WjA","_ZydMszfZlQ","LJbtcit8Byg","Hu0wknFNTOk","rFP4gxn_uME","cQhGxSge7aA","5SeI6r8lI_U","WWWKRqzvxMg","LS7KFVYUQT4","uS1PyjaR8WM","LH7XPoWPz-4","hBF8YGF17rQ","0nt2Yn1M0oU","K0q6EYTGXXQ","8QcTCIsFJ2Q","UX1BvCRg6gs","E7fzUGR8ZH4","pnfryoGog0A","Cqp-hL-I90A","YGv-OSvQwKY","IbE4ynQd_qQ","yQYu51hlkLk","w39qx5X_Owg","gK04XhlTLOM","XMUxca7gXv4","iLilpPtY2JU","X9BWRh92ifs","srwAMHbHVAE","yntvBrlZNeA","_P63qccOdzs","7hneF9Iu71g","Cg4c0RA2DJQ","uA4RNW3HkcQ","WJi9MXfl3zA","c-kLsqvD6q8","3MfJ9qMXBVQ","fPEoI43MMhs","3jWQzkoPFTg","c8H7Anvad6E","KqXN_5G_kuo","rVqIhE53D_w","9x6Mxs5DyxI","weW-VnINl-E","bS22uZHDr54","gahV15Oe9Xs","Bm1g5Yg0hUw","OCVgWq9B_HE","GiZHmwzNAqE","vtS54c9sP0U","BVh6Jb3DQxE","_86LQH-c1d8","ENODBnQ5ed0","z0lHW09eQRA","SBA_vLLrXr0","c4cBdT5WCoE","nKJeB03TrJg","Pp_e6vZuhBI","DWeB6hWoKyI","SBrMBqFbWok","6u8lUKuaUx8","Pjw-qzT6qBs","yMku_xfki1U","ClVNU2-C3rQ","uL8Dipf5kXc","MJLe_O2J5Xg","599tHbAQVts","8drkE_zLnLk","1jY7kdEIhaA","HmuGq5weoZA","c1UTArVwyZs","U-eK9RcU90s","6SGy0zUCtsk","9IjxNwHkttU","COICJal838M","slqKrANo7Uo","C7r5KziEspU","vxnYp5NyD4k","XTCUjmhWL4Y","Q72ENpHcrDQ","iPAr7kL-mmg","SBOK9CBjCK8","-Rfqo7OSimw","uJMn4WGaIOc","CmBgxP56R1I","Mub2i2BoHpM","ZyvYIYwLzTw","-ITl4-Kyey0","2wnDyOHPxrE","i94eFYHHAOY","au-mBoepJUA","6RzlgEyS-BE","6P8mfvCGKyg","4K8ou0iA_68","qMol4iSzXis","pfjyV0qtNlk","ba_SMlx-gi0","TN9upnrVwog","p1nmsaPh31E","V0HIfZmn3oU","5xFP4ikGCLk","Ed_16Cblg9s","xuXln0HC-Lg","xxi6VQkCJPY","slua80kJ8zA","s5Eyu9-kchQ","RFmIOaRhOnE","sk4aZSLSkMs","iZtFjqZxBxw","4n8vZyzBWNs","BL8AJFQv9V4","bbt3qhOiH3M","9NrC7pRra9o","nptjor9ee_Q","r6i5PCn7_oY","6Y_B3wdQLgg","ZEhWfrVOWlE","Ra616vyPBp8","tG2F72T-ixY","t50c2AiAkpw","3zDO7P_P3Aw","A4uAL0T_CUI","KiHrn43djYc","9_N4gVkx9_w","YZJ2rOm-PVA","x9_1ia_nB_E","SVi7fXWKqSk","KR6DysiE9Sk","--w4Ui8Alzc","M1hSddzlxL4","q93hgeROqvk","eNcSFnr3508","aVwVvtP5qJ4","FAL01pUnhGI","Bi4K58Fd_1o","xL94jLzIGt0","zDoDWbB6RN8","71u8cSuyZrI","W8CrBGhfSiA","njHZdD0MGDs","bqogMblcal0","H_6GtBFCTyQ","RSfii8RLmNM","t1IMifXyJLc","OV2lquaPxSU","AguOdYNF2d4","Z9RsVV-zfgY","QYDXRoHpF0w","mKZBingy2OA","oErErOGaAv0","50ADWH1d3E8","Gv7iV4n7cXM","qepl1N0P-SA","U53SHxO4sbk","fAcdBmxu-6s","F3tP0JjUjJU","MP_2p79Ems4","eg5Emkcjfdo","jt068Vdmfww","6ZowS0dDW1k","yDOi6phVQXM","H7vVXIiisSw","bBMPzOX_VUo","qIhPPceIEV0","f-FOTHUir_4","vAuwQugGdS4","_liZNFe-TDM","2sKF3MHrHEY","XfgAXwaseM8","s9t2QH5zTCQ","iF0IhEpDces","GdK4jqnDNN8","-G1XWvUBXk4","ZGmXbfF8uvM","ms2iYyh6jLI","IgfIh-NBoCw","-Q53gXuXd5s","uE2R5d6cPYs","AXHi-B2VbU0");

$count = count($all);

// echo ($count);

//echo "<br><br>";

$ids = array();

$ids = (array_chunk($all,50));

//echo "<br><br>";

//print_r($ids);

$calls = intdiv($count,50) + 1;  // return number of API calls to make

// echo "<br><br>";

// echo $calls;

//echo "<br><br>";

$call = array(); // new array containing strings for API calls


for ( $i=0; $i < $calls ; $i++) {
    $vid_ids = '';  
    $vid_ids .= implode(",",($ids[$i])); // convert array entries to string
    array_push($call,$vid_ids);
}

//echo "<br><br>NEW ID'S: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><br>";

//print_r($call);


// YouTube v3 API statistics call

$url = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[0];    
$url .= "&key=".$apikey;

$results = getAPI($url);
$json_results = array();
$json_results[] = json_decode($results,true); // decode API JSON to PHP array
$items = array(); 
$items = $json_results[0]["items"];  // save items to items array

// YouYube v3 statistics call
$url1 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[1];    
$url1 .= "&key=".$apikey2;

$results1 = getAPI($url1);
$json_results1 = array();
$json_results1[] = json_decode($results1,true); // decode API JSON to PHP array
$items_a = array(); 
$items_a = $json_results1[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_a);

// YouYube v3 statistics call

$url2 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[2];   
$url2 .= "&key=".$apikey3;

$results2 = getAPI($url2);
$json_results2 = array();
$json_results2[] = json_decode($results2,true); // decode API JSON to PHP array
$items_b = array(); 
$items_b = $json_results2[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_b);

/// YouYube v3 statistics call

$url3 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[3];  
$url3 .= "&key=".$apikey4;

$results3.= getAPI($url3);
$json_results3 = array();
$json_results3[] = json_decode($results3,true); // decode API JSON to PHP array
$items_c = array(); 
$items_c = $json_results3[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_c);

// YouTube v3 API playlistItems call - 

$url4 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[4];     
$url4 .= "&key=".$apikey5;

$results4.= getAPI($url4);
$json_results4 = array();
$json_results4[] = json_decode($results4,true); // decode API JSON to PHP array
$items_d = array(); 
$items_d = $json_results4[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_d);

// YouTube v3 API playlistItems call - 


$url5 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[5]; 
$url5 .= "&key=".$apikey;

$results5.= getAPI($url5);
$json_results5 = array();
$json_results5[] = json_decode($results5,true); // decode API JSON to PHP array
$items_e = array(); 
$items_e = $json_results5[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_e);

// YouTube v3 API playlistItems call - 

$url6 = "https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=".$call[6]; 
$url6 .= "&key=".$apikey2;

$results6.= getAPI($url6);
$json_results6 = array();
$json_results6[] = json_decode($results6,true); // decode API JSON to PHP array
$items_f = array(); 
$items_f = $json_results6[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_f);

/*


$url6 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url6 .= "&key=".$apikey;

$results6.= getAPI($url6);
$json_results6 = array();
$json_results6[] = json_decode($results6,true); // decode API JSON to PHP array
$items_f = array(); 
$items_f = $json_results6[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_f);

// YouTube v3 API playlistItems call - 


$url7 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url7 .= "&key=".$apikey;

$results7.= getAPI($url7);
$json_results7 = array();
$json_results7[] = json_decode($results7,true); // decode API JSON to PHP array
$items_g = array(); 
$items_g = $json_results7[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_g);


// YouTube v3 API playlistItems call - 


$url8 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url8 .= "&key=".$apikey;

$results8.= getAPI($url8);
$json_results8 = array();
$json_results8[] = json_decode($results8,true); // decode API JSON to PHP array
$items_h = array(); 
$items_h = $json_results8[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_h);

// YouTube v3 API playlistItems call - 


$url9 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk";    
$url9 .= "&key=".$apikey;

$results9.= getAPI($url9);
$json_results9 = array();
$json_results9[] = json_decode($results9,true); // decode API JSON to PHP array
$items_i = array(); 
$items_i = $json_results9[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_i);

// YouTube v3 API playlistItems call - 


$url10 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk";    
$url10 .= "&key=".$apikey;

$results10.= getAPI($url10);
$json_results10 = array();
$json_results10[] = json_decode($results10,true); // decode API JSON to PHP array
$items_j = array(); 
$items_j = $json_results10[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_j);

// YouTube v3 API playlistItems call - 


$url11 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url11 .= "&key=".$apikey;

$results11.= getAPI($url11);
$json_results11 = array();
$json_results11[] = json_decode($results11,true); // decode API JSON to PHP array
$items_k = array(); 
$items_k = $json_results11[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_k);

// YouTube v3 API playlistItems call - 


$url12 = "https://www.googleapis.com/youtube/v3/videos?part=statistics&snippet&id=8Ux6UnYOLvk,CyDHTJCIfHQ,AwkDVMr4Kso,0Jpqb5IYlEE,l5JhD4wKsrs,8BhdoriXe9Q,KLgWHoGLDx4,iv0ej8cJScM,kXFGQYGFeFU,LEKxlNbjgmE,KYhsehUH5b0,kYKcf7EWEfc,DElGhE2NhtQ,j0iohXlRXKA,_oQIIAdG8xM,Ys4YGRN8hgY,Duot03grNv8,2bHvzuupe4w,FxdnqfyvIkY,Y6BeTnjUqlo,cwHmeFidLbE,hPsdjlPVaJU,0deHAT_KOqE,YypAGqIBrX0,s_vgHgIKPQs,JOUmxw0DPsg,LesJtYAG8zM,pCgEUBf5y18,4qljGaHJbCs,FNFYq8O7DTY,cr5uFjA4TNI,VTd4JCIqL7U,OFOowKu7WjA,_ZydMszfZlQ,LJbtcit8Byg,Hu0wknFNTOk,rFP4gxn_uME,cQhGxSge7aA,5SeI6r8lI_U,WWWKRqzvxMg,LS7KFVYUQT4,uS1PyjaR8WM,LH7XPoWPz-4,hBF8YGF17rQ,0nt2Yn1M0oU";    
$url12 .= "&key=".$apikey;

$results12.= getAPI($url12);
$json_results12 = array();
$json_results12[] = json_decode($results12,true); // decode API JSON to PHP array
$items_l = array(); 
$items_l = $json_results12[0]["items"];  // save playlist items to items array

$items =  array_merge($items,$items_l);
*/


//  ------


//print_r($items);

//print_r($json_results2[0]["items"][0]);


usort($items, function($a, $b) { //Sort the array using a user defined function
    return $a["statistics"]["viewCount"] > $b["statistics"]["viewCount"] ? -1 : 1; //Compare the scores
});

$json_return = json_encode($items);  // encode PHP array as JSON


//print_r($json_results[0]);

print_r($json_return);
/*



?>