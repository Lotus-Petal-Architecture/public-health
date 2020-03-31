//Copyright 2020 by Lotus.fm LLC

var camera, scene, raycaster, renderer, parentTransform, rockTransform, activeLink, controlsVisible, allgenresVisible
var mouse = new THREE.Vector2()
var r = 100,
  dot = 0

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(
    20, // This variable controls size -- the lower the value the larger the rendering. Original value was 27.
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

  var country_links = [] //index values of genre links
  var country_names = ["USA", "China", "Canada", "France", "Australia"] //list of countries, ranked in order of number of cases
  var day_one = [1000, 100, 73, 29, 2] //number of cases on first day tracked
  var day_ten = [1500, 950, 250, 72, 32] //number of cases on day 10

  var views = [] //popularity of youtube videos. uses same index ranking as link_order
  var song_titles = []
  var video_thmbs = []
  var xmlhttp = new XMLHttpRequest()

  //These song IDs are periodically queried from the Lotus YouTube genre playlists.  

  var growthtrend = ["USA","Canada","France"]
  // -------------------------------------------- //


init()
function init () {
  container = document.createElement('div')
  document.body.appendChild(container)

function spacer () {
          //top8Transform.visible = false 
          //topTransform.visible = false
          document.getElementById("nowplaying").innerHTML = `<span style="font-size: 18px;font-family:Source Sans Pro; color: #FFF; margin-left:0px; text-align:right; margin-top:10px;"><strong></strong></span>`
  }

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
    
      if (growthtrend.includes(song_value)){
        
        country_links.push(song_index);
      }
    }
}



function addLinks() {  // adds links for selected values

//document.getElementById("rock").style.backgroundColor = "#2387aa"

addcountryLinks()


parentTransform = new THREE.Object3D()
group.add(parentTransform)

for (i = 0; i < 300; i++) {  //this value should match entries.length

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

function addcountryLinks() {  //adds links for selected values

countryTransform = new THREE.Object3D()
group.add(countryTransform) 

for (i = 0; i < link_order.length; i++) {

    if (country_links.includes(i)) {

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
        countryTransform
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
  document.getElementById("thumb").innerHTML = "<img src=" + video_thmbs[l] + ">";
}

function showRank(k) {
  l = link_order.indexOf(k)
  var songViews= views[l]; 
  document.getElementById("rank").innerHTML = "<b>Rank</b><p>" + (l+1);
  document.getElementById("views").innerHTML = "<b>Confirmed Cases</b><p>" + day_ten[l];
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

    countryTransform.visible = true;
    document.getElementById("country").style.backgroundColor  = "#2387aa";

}

function hideAll() {


    countryTransform.visible = false;
    document.getElementById("country").style.backgroundColor = "#a5c6d1";

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
          window.open("https://web.lotus.fm/add-your-song-to-the-lotus-400/", "_self")
        }, false );

  document.getElementById( "enter" ).addEventListener( 'click', function () {

          window.open("https://web.lotus.fm", "_self")
        }, false );


  //genre buttons
  
  document.getElementById( "country" ).addEventListener( 'click', function () {
          toggleLinks(countryTransform,"country");
        }, false );

  document.getElementById( "electronica" ).addEventListener( 'click', function () {
          toggleLinks(electronicaTransform,"electronica");
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
          //howThumb(k);
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
      var URL = "https://www.youtube.com/embed/" + country_names[l] + "?autoplay=1&mute=0"
      window.open(URL, 'iframe_a')
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
