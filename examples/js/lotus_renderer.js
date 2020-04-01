//Copyright 2020 by Lotus.fm LLC

var camera, scene, raycaster, renderer, parentTransform, rockTransform, activeLink, controlsVisible, allgenresVisible
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(
    22, // This variable controls size -- the lower the value the larger the rendering. Original value was 27.
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  var container = document.getElementById('container')

  containerWidth = window.innerWidth
  containerHeight = window.innerHeight

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.minDistance = 0
  controls.maxDistance = 100
  controls.maxPolarAngle = Math.PI / 2
  //controls.addEventListener( 'change', () => renderer.render( scene, camera ) );

  var light = new THREE.PointLight(0xffffff)
  light.position.set(-100, 200, 100)
  scene.add(light)

  var play = true;

  var group
  group = new THREE.Group()
  group.position.y = 0
  scene.add(group)

  var link_order_length = 0
  var controlsVisible = true
  var allgenresVisible = false
  var fullyloaded = false


// sample arrays for testing purposes


  var link_order = [] // list of all link values in the module, with k values assigned to each index position
  var k_values = [] // list of all k values generated for corresponding module chart lines
  var active_links = [] //index values of all active links

  var highest = [] //index values of growth links, growth rate greater 1000%
  var high = [] //index values of growth % links, growth rate greater than or equal to 500% and less than 1000%
  var medium = [] //index values of growth % links, growth rate greater than or equal to 250% and less than 500%
  var low = [] //index values of growth % links, growth rate greater than or equal to 100% and less than 250%
  var lowest = [] //index values of growth % links, growth rate less than 100%


  var country_names = ["US","Italy","Spain","China","Germany","France","Iran","United Kingdom","Switzerland","Turkey","Belgium","Netherlands","Austria","South Korea","Canada","Portugal","Brazil","Israel","Norway","Australia","Sweden","Czechia","Ireland","Denmark","Malaysia","Chile","Russia","Poland","Romania","Ecuador","Luxembourg","Philippines","Japan","Pakistan","Thailand","Saudi Arabia","Indonesia","Finland","India","South Africa","Greece","Panama","Iceland","Dominican Republic","Mexico","Peru","Argentina","Singapore","Colombia","Serbia","Croatia","Slovenia","Qatar","Estonia","Algeria","Diamond Princess","Egypt","Iraq","United Arab Emirates","New Zealand","Ukraine","Morocco","Bahrain","Lithuania","Armenia","Hungary","Lebanon","Bosnia and Herzegovina","Bulgaria","Latvia","Tunisia","Andorra","Slovakia","Moldova","Costa Rica","Kazakhstan","Uruguay","North Macedonia","Taiwan*","Azerbaijan","Kuwait","Jordan","Cyprus","Burkina Faso","Reunion","Albania","San Marino","Vietnam","Cameroon","Oman","Cuba","Cote d'Ivoire","Senegal","Afghanistan","Uzbekistan","Faroe Islands","Malta","Ghana","Belarus","Mauritius","Sri Lanka","Honduras","Channel Islands","Nigeria","Venezuela","Brunei","Martinique","West Bank and Gaza","Guadeloupe","Kosovo","Georgia","Cambodia","Montenegro","Bolivia","Kyrgyzstan","Congo (Kinshasa)","Mayotte","Trinidad and Tobago","Rwanda","Gibraltar","Liechtenstein","Paraguay","Isle of Man","Kenya","Madagascar","Aruba","Monaco","Bangladesh","Uganda","French Guiana","Guatemala","French Polynesia","Jamaica","Zambia","Barbados","Togo","El Salvador","Bermuda","Djibouti","Mali","Niger","Ethiopia","Guinea","Congo (Brazzaville)","Tanzania","Maldives","New Caledonia","Gabon","Eritrea","St Martin","Haiti","Burma","Bahamas","Cayman Islands","Saint Lucia","Equatorial Guinea","Guyana","Mongolia","Dominica","Namibia","Curacao","Greenland","Seychelles","Syria","Libya","Benin","Eswatini","Suriname","Grenada","Laos","Zimbabwe","Mozambique","Guinea-Bissau","Saint Kitts and Nevis","Angola","Antigua and Barbuda","Chad","Sudan","Cabo Verde","Saint Barthelemy","Holy See","Mauritania","Sint Maarten","Fiji","Nepal","Nicaragua","Somalia","Montserrat","Turks and Caicos Islands","Bhutan","Gambia","Botswana","Central African Republic","Liberia","Belize","British Virgin Islands","Anguilla","MS Zaandam","Burundi","Papua New Guinea","Saint Vincent and the Grenadines","Timor-Leste","Sierra Leone"] 
  //list of countries, ranked in order of number of cases
  
  var total_cases = [188172,105792,95923,82279,71808,52128,44605,25150,16605,13531,12775,12595,10180,9786,8527,7443,5717,5358,4641,4559,4435,3308,3235,2860,2766,2738,2337,2311,2245,2240,2178,2084,1953,1938,1651,1563,1528,1418,1397,1353,1314,1181,1135,1109,1094,1065,1054,926,906,900,867,802,781,745,716,712,710,694,664,647,645,617,567,537,532,492,470,420,399,398,394,376,363,353,347,343,338,329,322,298,289,274,262,261,247,243,236,212,193,192,186,179,175,174,172,169,169,161,152,143,143,141,141,135,135,129,128,119,114,112,110,109,109,107,107,98,94,87,75,69,68,65,60,59,57,55,52,51,44,43,38,36,36,35,34,34,32,32,30,28,27,26,22,19,19,18,16,16,15,15,15,15,14,14,13,12,12,12,12,11,11,10,10,10,10,9,9,9,9,9,8,8,8,8,7,7,7,7,6,6,6,6,6,5,5,5,5,5,5,4,4,4,3,3,3,3,2,2,2,1,1,1,1] 
  //total confirmed cases
  
  var views = [] //popularity of youtube videos. uses same index ranking as link_order
  var song_titles = []
  var video_thmbs = []
  var xmlhttp = new XMLHttpRequest()


  var growthtrendover1000 = ["Isle of Man", "Uganda", "Djibouti", "Niger", "Turke", "Madagascar", "Zambia", "Bermuda", "Eritrea", "Ukraine", "Mayotte", "Cote d'Ivoire", "New Zealand", "Aruba","Guinea"]
  var growthtrend500to1000 = ["El Salvador","Mauritius","Dominican Republic","Eswatini","Cuba","Ghana","Kenya","Montenegro","Kyrgyzstan","Russia","Israel","Haiti","US","Afghanistan","Cameroon","Antigua and Barbuda","Chad","Gibraltar","Philippines","Canada","Argentina","Tunisia","Saint Lucia","Kazakhstan","Lithuania","Morocco","Congo (Brazzaville)","Nigeria","Romania","Holy See","Sint Maarten"]
  //covers values less than or equal to 500% and less than 1000%
  var growthtrend250to500 = ["Panama","Honduras","Portugal","Barbados","South Africa","Bolivia","Azerbaijan","Brazil","Reunion","Mexico","Serbia","Algeria","Chile","United Kingdom","Greenland","Fiji","Nepal","Somalia","Montserrat","Hungary","Monaco","Cayman Islands","Colombia","Belgium","Bosnia and Herzegovina","Benin","Ecuador","Moldova","Rwanda","Channel Islands","United Arab Emirates","Poland","Andorra","Congo (Kinshasa)","Australia","India","Croatia","Ireland","Burkina Faso","Thailand","Uzbekistan","Martinique","New Caledonia","Gabon","Gambia","Saudi Arabia","North Macedonia","Spain","St Martin","Senegal","Oman","Namibia","Curacao","France","Austria","Paraguay","Bahamas","Angola","Sudan"]
  var growthtrend100to250 =["Netherlands","Indonesia","Peru","Armenia","Czechia","Luxembourg","Iraq","Germany","Jordan","Latvia","Albania","Tanzania","Cyprus","Uruguay","Mauritania","Costa Rica","Ethiopia","Finland","Zimbabwe","Pakistan","Switzerland","Sweden","Lebanon","Nicaragua","Greece","West Bank and Gaza","Bulgaria","Estonia","Egypt","French Polynesia","Iceland","French Guiana","Malaysia","Malta","Vietnam","Jamaica","Suriname","Georgia","Guatemala","Norway","Iran","Denmark","Guadeloupe","Singapore","Togo","Taiwan","Slovenia","Cambodia","Bangladesh","Slovakia","Belarus","Equatorial Guinea","Cabo Verde","Saint Barthelemy","Bhutan"]
  var growthtrend0to100 = ["Italy","Japan","Venezuela","Bahrain","Sri Lanka","Liechtenstein","Faroe Islands","Trinidad and Tobago","Guyana","Kuwait","San Marino","Qatar","Brunei","Seychelles","Maldives","Mongolia","Korea, South","China","Central African Republic","Liberia","Papua New Guinea","Saint Vincent and the Grenadines"]
  var growthrates = [638.25,97.45,278.04,1.20,223.27,264.99,116.42,401.20,152.55,1919.55,353.82,246.87,261.76,11.22,567.74,481.48,459.94,652.53,119.12,325.68,151.56,232.46,312.10,115.69,133.81,409.87,663.73,331.16,511.72,342.69,225.07,578.83,93.94,165.48,301.70,298.72,239.56,171.13,323.33,463.75,147.92,490.50,139.96,890.18,438.92,234.91,567.09,114.35,362.24,426.32,320.87,109.40,62.37,143.46,415.11,0.00,141.50,224.30,333.99,1144.23,1272.34,542.71,85.90,546.99,232.50,377.67,151.34,351.61,144.79,220.97,556.67,327.27,103.93,341.25,196.58,547.17,207.27,287.06,110.46,462.26,64.20,222.35,211.90,307.81,448.89,219.74,63.89,125.53,614.81,269.23,785.71,1178.57,272.34,625.00,300.00,83.70,131.51,747.37,100.00,921.43,85.71,487.50,340.63,513.64,92.86,55.42,300.00,147.92,115.09,null,124.49,105.66,678.57,463.16,664.29,326.09,1242.86,77.55,341.18,590.00,83.78,261.11,5900.00,742.86,1800.00,1000.00,372.73,104.00,4300.00,138.89,123.53,140.00,125.00,1650.00,466.67,112.50,966.67,1500.00,2900.00,null,2600.00,188.89,1000.00,533.33,216.67,38.46,300.00,300.00,1400.00,275.00,650.00,null,250.00,366.67,550.00,100.00,71.43,20.00,null,266.67,266.67,400.00,42.86,null,null,350.00,800.00,125.00,null,null,166.67,null,null,null,250.00,600.00,600.00,250.00,100.00,100.00,500.00,200.00,500.00,400.00,400.00,150.00,400.00,400.00,null,100.00,300.00,null,0.00,0.00,null,null,null,null,null,0.00,0.00,null,null]
  //percentage growth in cases over the last 10 days
  // -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)


//Petal Constructor - draws outline of petal
function drawPetal (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points = curve.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points = curve2.getPoints(50)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })

    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)
  }


  //Chart Position Arc - returns points for top of chart lines
  function chartTop (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points1 = curve.getSpacedPoints(25)
    var geometry = new THREE.BufferGeometry().setFromPoints(points1)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points2 = curve2.getSpacedPoints(25)
    var geometry = new THREE.BufferGeometry().setFromPoints(points2)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    group.add(curveObject)

    var points = points1.concat(points2)
    return points
  }

  
  //Chart Position Arc - returns points for top of chart lines
  function chartTop (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    x1,
    y1,
    z1,
    petalheight,
    ctrlpt,
    color_code
  ) {
    var curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0 + petalheight, z0)
    )

    var points1 = curve.getSpacedPoints(10)
    var geometry = new THREE.BufferGeometry().setFromPoints(points1)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    //group.add(curveObject)

    var curve2 = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0 + petalheight, z0),
      new THREE.Vector3(x1, ctrlpt, z1),
      new THREE.Vector3(x1, y1, z1)
    )

    var points2 = curve2.getSpacedPoints(10)
    var geometry = new THREE.BufferGeometry().setFromPoints(points2)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    //group.add(curveObject)

    var points = points1.concat(points2)
    return points
  }


  //Chart Position - draws chart lines within petal arc
  function chartPosition (x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code) {
    var cPcurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var points = cPcurve.getPoints(20)
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var material = new THREE.LineBasicMaterial({ color: color_code })
    var curveObject = new THREE.Line(geometry, material)
    //curves.push(curveObject);
    group.add(curveObject)
  }


//Invisible Spaghetti - add TubeGeometry objects that sheath chart lines representing active geometric links.
function invisibleSpaghetti (k, x, y, z, x0, y0, z0, petalheight, ctrlpt, color_code, opacity, category) {
    var link_curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x, y, z),
      new THREE.Vector3(x, ctrlpt, z),
      new THREE.Vector3(x0, y0, z0)
    )

    var geometry = new THREE.TubeGeometry(link_curve, 64, 0.004, 8, false)
    var material = new THREE.MeshBasicMaterial({ color: color_code })
    var object = new THREE.Mesh(geometry, material)
    //object.visible = true
    material.transparent = true
    material.opacity = opacity
    object.label = k
    category.add(object)
    category.visible = false
  }


//Draw Petals - draws ring of lotus petals
function drawPetalRing (segmentCount, radius, depth, color_code, chartLines, divisor){
  var geometry = new THREE.Geometry(),
  material = new THREE.LineBasicMaterial({ color: color_code })

  for (var i = 0; i <= segmentCount; i++) {
    var theta = (i / segmentCount) * Math.PI * 2
    var iota = ((i + 0.5) / segmentCount) * Math.PI * 2
    var kappa = ((i + 1) / segmentCount) * Math.PI * 2
    drawPetal(
      Math.cos(theta) * radius,
      0,
      Math.sin(theta) * radius,
      Math.cos(iota) * (radius - depth),
      0,
      Math.sin(iota) * (radius - depth),
      Math.cos(kappa) * radius,
      0,
      Math.sin(kappa) * radius,
      0.5,
      0.45,
      color_code
    )
  }
  group.add(new THREE.Line(geometry, material))


  //Draws Chart Lines 
  var geometry = new THREE.Geometry(),
    material = new THREE.LineBasicMaterial({ color: color_code })

  for (var i = 0; i < chartLines; i++) {
    var k = 0
    var theta = (i / chartLines) * Math.PI * 2
    var iota = ((i + 0.5) / chartLines) * Math.PI * 2
    var kappa = ((i + 1) / chartLines) * Math.PI * 2
    var iota0 = ((i + divisor / 2) / chartLines) * Math.PI * 2
    var kappa0 = ((i + divisor) / chartLines) * Math.PI * 2
    var modulus = i % divisor

    var base_x = Math.cos(theta) * radius
    var base_y = 0
    var base_z = Math.sin(theta) * radius
    var petalheight = 0.5
    var ctrlpt = 0 //ctrl pt for chart lines (within petal)
    var arcpt = 0.45 //ctrl pt for petal arc (outline)

    if (modulus == 0) {

//this resets chart line variables for each new petal drawn

      var chartPoint = chartTop(
        Math.cos(theta) * radius,
        0,
        Math.sin(theta) * radius,
        Math.cos(iota0) * (radius - depth),
        0,
        Math.sin(iota0) * (radius - depth),
        Math.cos(kappa0) * radius,
        base_y,
        Math.sin(kappa0) * radius,
        petalheight,
        arcpt,
        0x00769d
      )

      for (var j = 1; j <= divisor; j++) {
        k = i + j
        k=k-1
        var theta0 = (k / chartLines) * Math.PI * 2
        var base_xk = Math.cos(theta0) * radius
        var base_yk = 0
        var base_zk = Math.sin(theta0) * radius
        if (chartLines==160) {  //this ensures that each k value is unique within the lotus flower
          k=k;
          }
        if (chartLines==240) {
          k=k+160;
          }
        //if (chartLines==800) {
          //k=k+1300;
          //}
        

        chartPosition(
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt,
          color_code
        )


        k_values.push([    //k values each define a unique curve in 3D space. They are not associated with a specific petal ring.
          k,
          chartPoint[j].x,
          chartPoint[j].y,
          chartPoint[j].z,
          base_xk,
          base_yk,
          base_zk,
          petalheight,
          ctrlpt,
        ])
      }
    }


 

    geometry.vertices.push(
      new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
    )
  }


  group.add(new THREE.Line(geometry, material));

}
  

// -------------------------------- // 


drawPetalRing (8, .55, .1, 0x00769d, 160, 20) //center petals

drawPetalRing (12, 1, .1, 0x0289b6, 240, 20)  //middle petals

group.position.set( 0, -.3, 0);
group.rotation.set(0,-.3,.0);

  //animate and render

  camera.position.z = 3.75  //this value was originally 3.75, and can be tweaked as needed

  function animate () {

    if (play) {

    requestAnimationFrame(animate)
    render()
    group.rotation.x += 0.0000
    group.rotation.y += 0.0001
    }

    else {

    requestAnimationFrame(animate)
    render()
    }
  }

  animate()

  function render () {
    dot += 0
    renderer.setClearColor(0x000000, 1)
    renderer.render(scene, camera)
  }


function assignLinks () //this assigns k values to the ranked link ids, so that the highest values occur at the highest chart points for each concentric ring.

  {
  var interval = 20;

  for (var i = 0; i < 8; i++) { //link ids for the innermost petal ring
    k = (i * interval )+ 10;
    link_order.push(k);
  }
  for (var h = 0; h < 9; h++) {
    for (var j = 0; j < 8; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }

  var start = link_order.length;
  var stop= start + 12

  for (var i = 0; i < 12; i++) {  //link ids for the middle petal ring
    k = (i * interval )+ 10;
    k = k + 160;
    link_order.push(k);
  }
  for (var h = 0; h < 9; h++) {
    for (var j = start; j < stop; j++) {
      k = link_order[j];
      k1 = k - 2 - h;
      k2 = k - (-1) + h;
      link_order.push(k1);
      link_order.push(k2);
    }
  }

}

assignLinks();


function getActiveLinks()  //sorts for a given set of values from the data obtained above
{
    var f = country_names.entries(); 

    for (x of f) {
      var song_value = x[1].toString();
      var song_index = x[0];
    
      if (growthtrendover1000.includes(song_value)){
        
        highest.push(song_index);
      }

      if (growthtrend500to1000.includes(song_value)){
        
        high.push(song_index);
      }

      if (growthtrend250to500.includes(song_value)){
        
        medium.push(song_index);
      }

      if (growthtrend100to250.includes(song_value)){
        
        low.push(song_index);
      }

      if (growthtrend0to100.includes(song_value)){
        
        lowest.push(song_index);
      }


    }
}

/*function getActiveLinks()  //legacy code from the crypto trading app
{

    if (coin_change_time == "1h") 
      {
        var active_array = coin_change_1h;
      }

    if (coin_change_time == "24h") 
      {
        var active_array = coin_change_24h;
      }

    if (coin_change_time == "1w") 
      {
        var active_array = coin_change_1w;
      }

    var f = active_array.entries();

    for (x of f) {
      var coin =x;
      var coin_value = coin[1];
      var coin_index = coin[0];

      if (volume[coin_index] < volume_adj) 
      {
        coin = null;
      }

      else if (coin_value > 20) {
        
        active_links.push(coin_index);
      }

      else if (coin_value > 5) {
      coin_index = coin[0]
      active_links2.push(coin_index);
      }
    }
}*/



function addLinks() {  // adds links for selected values

document.getElementById("highest_button").style.backgroundColor = "#2387aa"
document.getElementById("high_button").style.backgroundColor = "#2387aa"
document.getElementById("medium_button").style.backgroundColor = "#2387aa"
document.getElementById("low_button").style.backgroundColor = "#2387aa"
document.getElementById("lowest_button").style.backgroundColor = "#2387aa"

addhighestlinks()
highestTransform.visible = true;

addhighlinks()
highTransform.visible = true;

addmediumlinks()
mediumTransform.visible = true;

addlowlinks()
lowTransform.visible = true;

addlowestlinks()
lowestTransform.visible = true;



parentTransform = new THREE.Object3D()
group.add(parentTransform)

for (i = 0; i < 202; i++) {  //this value should match entries.length

      var k = link_order[i];
      var color_code = 0xffffff;

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        0,
        parentTransform  //complete set of navigation links
      )
  }
}


function geometricLinks () {
  getActiveLinks();
  addLinks();
}

/*function addTopSongs() 
{  // adds links for selected values
topTransform = new THREE.Object3D()
group.add(topTransform) 

for (i = 0; i < 100; i++) {

      var k = link_order[i];
      var color_code = 0xCC2D6F;

      invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .5,
        topTransform
      )
  }
topTransform.visible = true
}
*/

geometricLinks();
showDetails();


/*function getData() //processes JSON data and returns arrays for 5 main variables
  {
  var xmlhttp = new XMLHttpRequest();
  //xmlhttp.addEventListener("load", getActiveLinks);
  //xmlhttp.addEventListener("load", addLinks);

  xmlhttp.open("GET", "../youtube_list.php", true);
  xmlhttp.responseType = 'json';
  xmlhttp.send(); 

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var entries = this.response;
    //console.log(entries.length);
    country_names.length = 0;
    if(entries.length > 0) {
    for (var i = 0; i < entries.length; i++) {
    //console.log (country_names.length) // current actual number of songs being ranked
      var song = entries[i];
      var song_name = song.id;
      var popularity = song.statistics.viewCount;
      var song_title = song.snippet.title;
  //console.log(popularity);
  //console.log(song_title);
      views.push([popularity]);
      country_names.push([song_name]);
      song_titles.push([song_title]);
      video_thmbs[video_thmbs.length] = song.snippet.thumbnails.default.url;
  //console.log (video_thmbs)
  //video_titles[video_titles.length] = song.snippet.title;
     }
     fullyloaded = true;
     }
  }
  }
}

getData();*/





function showDetails()

{
document.getElementById("thumb").style.visibility  = "visible";
document.getElementById("views").style.visibility  = "visible";
document.getElementById("rank").style.visibility  = "visible";
document.getElementById("nowplaying").style.visibility  = "visible";
}

//showDetails()

function addhighestlinks() {  //adds links for selected values

highestTransform = new THREE.Object3D()
group.add(highestTransform) 

for (i = 0; i < link_order.length; i++) {

    if (highest.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF5733;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        1,
        highestTransform
      )
    }
  }
}


function addhighlinks() {  //adds links for selected values

highTransform = new THREE.Object3D()
group.add(highTransform) 

for (i = 0; i < link_order.length; i++) {

    if (high.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF5733;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .7,
        highTransform
      )
    }
  }
}


function addmediumlinks() {  //adds links for selected values

mediumTransform = new THREE.Object3D()
group.add(mediumTransform) 

for (i = 0; i < link_order.length; i++) {

    if (medium.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF5733;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .5,
        mediumTransform
      )
    }
  }
}


function addlowlinks() {  //adds links for selected values

lowTransform = new THREE.Object3D()
group.add(lowTransform) 

for (i = 0; i < link_order.length; i++) {

    if (low.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF5733;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .3,
        lowTransform
      )
    }
  }
}


function addlowestlinks() {  //adds links for selected values

lowestTransform = new THREE.Object3D()
group.add(lowestTransform) 

for (i = 0; i < link_order.length; i++) {

    if (lowest.includes(i)) {

      var k = link_order[i];
      var color_code = 0xFF5733;

       invisibleSpaghetti(
        k,
        k_values[k][1],
        k_values[k][2],
        k_values[k][3],
        k_values[k][4],
        k_values[k][5],
        k_values[k][6],
        k_values[k][7],
        k_values[k][8],
        color_code,
        .2,
        lowestTransform
      )
    }
  }
}



  // --- indicator panel code

function nowPlaying(k) {
  l = link_order.indexOf(k)
  var song_title= song_titles[l]; 
  document.getElementById("nowplaying").innerHTML = "<b>Country</b><p>" + country_names[l];
}

function showThumb(k) {
  l = link_order.indexOf(k) 
  document.getElementById("thumb").innerHTML = "<b>Percent Growth</b><p>" + growthrates[l] + " %";
}

function showRank(k) {
  l = link_order.indexOf(k)
  var songViews= views[l]; 
  document.getElementById("rank").innerHTML = "<b>Rank</b><p>" + (l+1);
  document.getElementById("views").innerHTML = "<b>Confirmed Cases</b><p>" + total_cases[l];
}

function showPointer() {
  document.body.style.cursor = "pointer";
}

function hideControls() {
  document.getElementById("genres").style.visibility  = "hidden";
  document.getElementById("message").style.visibility  = "hidden";
  document.getElementById("nowplaying").style.visibility  = "hidden";
  document.getElementById("thumb").style.visibility  = "hidden";
  document.getElementById("views").style.visibility  = "hidden";
  document.getElementById("rank").style.visibility  = "hidden";
  document.getElementById("share").style.visibility  = "hidden";
  document.getElementById("toggleControls").style.backgroundImage  = "url('examples/files/maximize_icon.png')";
}

function showControls() {
  document.getElementById("genres").style.visibility  = "visible";
  document.getElementById("message").style.visibility  = "visible";
  document.getElementById("share").style.visibility  = "visible";
  document.getElementById("toggleControls").style.backgroundImage  = "url('examples/files/minimize_icon.png')";
}

function toggleControls() {

  if (controlsVisible == true) {
    controlsVisible = false;
    hideControls();
  }
  else 
    {
      controlsVisible = true;
      showControls();
  }
}

function hideLink()
{
  group.remove(activeLink)
}


function toggleLinks(linkobject,id) {

  if (linkobject.visible == true) {
    linkobject.visible = false;
    document.getElementById(id).style.backgroundColor = "#a5c6d1";
  }
  else 
    {
      linkobject.visible = true;
    document.getElementById(id).style.backgroundColor = "#2387aa";
  }
}

function allVisible() {

  if (allgenresVisible == true) {
    allgenresVisible = false;
    document.getElementById("all").style.backgroundColor = "#a5c6d1";
    hideAll();
  }
  else 
    {
      allgenresVisible = true;
      document.getElementById("all").style.backgroundColor = "#2387aa";
      showAll();
  }
}

function showAll() {

    highestTransform.visible = true;
    highTransform.visible = true;
    mediumTransform.visible = true;
    lowTransform.visible = true;
    lowestTransform.visible = true;
    document.getElementById("highest_button").style.backgroundColor  = "#2387aa";
    document.getElementById("high_button").style.backgroundColor  = "#2387aa";
    document.getElementById("medium_button").style.backgroundColor  = "#2387aa";
    document.getElementById("low_button").style.backgroundColor  = "#2387aa";
    document.getElementById("lowest_button").style.backgroundColor  = "#2387aa";

}

function hideAll() {


    highestTransform.visible = false;
    highTransform.visible =  false;
    mediumTransform.visible =  false;
    lowTransform.visible =  false;
    lowestTransform.visible =  false;
    document.getElementById("highest_button").style.backgroundColor = "#a5c6d1";
        document.getElementById("high_button").style.backgroundColor  = "#a5c6d1";
    document.getElementById("medium_button").style.backgroundColor  = "#a5c6d1";
    document.getElementById("low_button").style.backgroundColor  = "#a5c6d1";
    document.getElementById("lowest_button").style.backgroundColor  = "#a5c6d1";

}


  // --- raycaster code


  var geometry = new THREE.SphereBufferGeometry(0.01)
  var material = new THREE.MeshBasicMaterial({ color: 0x45a7c5 })

  activeLink = new THREE.Object3D()
  group.add(activeLink)

  raycaster = new THREE.Raycaster()

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('click', onMouseClick, false)
  window.addEventListener('resize', onWindowResize, false)

  
  // BUTTONS


  //top icons

  document.getElementById( "reload" ).addEventListener( 'click', function () {
        window.open("https://lotus.fm", "_self")
        //document.write(video_thmbs);
        }, false );

  document.getElementById( "about" ).addEventListener( 'click', function () {
          window.open("https://web.lotus.fm/data-visualization/", "_self")
        }, false );

  document.getElementById( "toggleControls" ).addEventListener( 'click', function () {
          toggleControls();
        }, false );


  //calls to action

  /*document.getElementById( "info" ).addEventListener( 'mousemove', function(ev) {
  ev.stopPropagatio*/

  document.getElementById( "suggest" ).addEventListener( 'click', function () {
          window.open("https://www.who.int/", "_self")
        }, false );

  document.getElementById( "enter" ).addEventListener( 'click', function () {

          window.open("https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series", "_self")
        }, false );


  //genre buttons
  
  document.getElementById( "highest_button" ).addEventListener( 'click', function () {
          toggleLinks(highestTransform,"highest_button");
        }, false );

  document.getElementById( "high_button" ).addEventListener( 'click', function () {
          toggleLinks(highTransform,"high_button");
        }, false );

  document.getElementById( "medium_button" ).addEventListener( 'click', function () {
          toggleLinks(mediumTransform,"medium_button");
        }, false );

  document.getElementById( "low_button" ).addEventListener( 'click', function () {
          toggleLinks(lowTransform,"low_button");
        }, false );

  document.getElementById( "lowest_button" ).addEventListener( 'click', function () {
          toggleLinks(lowestTransform,"lowest_button");
        }, false );



    document.getElementById( "all" ).addEventListener( 'click', function () {
          allVisible();
        }, false );

  /*document.getElementById( "top100" ).addEventListener( 'click', function () {
          toggleLinks(topTransform);
        }, false );*/


  
  function onDocumentMouseMove (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    if (intersects.length > 0) {
      group.remove(activeLink)
      activeLink = new THREE.Object3D()
      group.add(activeLink)
      for (var i = 0; i < intersects.length; i++) 
      {
          var intersection = intersects[i],
          obj = intersection.object
          k = obj.label
          var color_code = 0xCC2D6F; 
          invisibleSpaghetti (
            k,
            k_values[k][1],
            k_values[k][2],
            k_values[k][3],
            k_values[k][4],
            k_values[k][5],
            k_values[k][6],
            k_values[k][7],
            k_values[k][8],
            color_code,
            .8,
            activeLink
      )
          activeLink.visible = true;
          showPointer();
          showThumb(k);
          showRank(k);
          nowPlaying(k);
      }      
    } 
    else {
      //activeLink.visible = false;
      group.remove(activeLink)
      document.body.style.cursor = "default";
    }
  }


  function onMouseClick (event) {
    event.preventDefault()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    raycaster.setFromCamera(mouse, camera)
    var intersects = raycaster.intersectObjects(parentTransform.children, true)
    for (var i = 0; i < intersects.length; i++) {
      var intersection = intersects[i],
      obj = intersection.object
      k = obj.label
      l = link_order.indexOf(k)   //connects the k value -- position on lotus petal graph -- to ID for link value
      var URL = "https://www.google.com/search?q=" + country_names[l] + "%Coronavirus"
      window.open(URL, '_blank')
    }
  }


  function onWindowResize () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

}



/*/  ---- reference code ----- //  

Site Colors:  
#656565  - medium grey
#87ceeb - cerulean
#CC2D6F - hot pink
button down style="background-color: #0289b6; filter: saturate(85%);"

//  ---- reference code ----- /*/  
