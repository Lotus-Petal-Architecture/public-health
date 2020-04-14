//Copyright 2020 by Lotus.fm LLC

var camera,
  scene,
  raycaster,
  renderer,
  parentTransform,
  rockTransform,
  activeLink,
  controlsVisible,
  allgenresVisible
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
//controls.addEventListener( 'change', () => renderer.render( scene, camera ) );   //used for non-animated, high-index lotus charts

var light = new THREE.PointLight(0xffffff)
light.position.set(-100, 200, 100)
scene.add(light)

var play = true

var group
group = new THREE.Group()
group.position.y = 0
scene.add(group)

var link_order_length = 0
var controlsVisible = true
var allgenresVisible = true
var fullyloaded = false

// sample arrays for testing purposes

var link_order = [] // list of all link values in the module, with k values assigned to each index position
var k_values = [] // list of all k values generated for corresponding module chart lines
var active_links = [] //index values of all active links

var highest = [] //index values of growth links, growth rate greater 1000%
var high = [] //index values of growth % links, growth rate greater than or equal to 500% and less than 1000%
var medium = [] //index values of growth % links, growth rate greater than or equal to 250% and less than 500%
/*var low = [] //index values of growth % links, growth rate greater than or equal to 100% and less than 250%
  var lowest = [] //index values of growth % links, growth rate less than 100%*/

var county_names = []
var total_cases = [] //total confirmed cases
var total_deaths = [] //total deaths

var old_cases = [] 
var old_deaths = []


var views = [] //popularity of youtube videos. uses same index ranking as link_order
var song_titles = []
var video_thmbs = []
var xmlhttp = new XMLHttpRequest()

var growthtrendover1000 = []
var growthtrend500to1000 = []
var growthtrend0to500 = []
//var growthtrend100to250 =["Netherlands","Indonesia","Peru","Armenia","Czechia","Luxembourg","Iraq","Germany","Jordan","Latvia","Albania","Tanzania","Cyprus","Uruguay","Mauritania","Costa Rica","Ethiopia","Finland","Zimbabwe","Pakistan","Switzerland","Sweden","Lebanon","Nicaragua","Greece","West Bank and Gaza","Bulgaria","Estonia","Egypt","French Polynesia","Iceland","French Guiana","Malaysia","Malta","Vietnam","Jamaica","Suriname","Georgia","Guatemala","Norway","Iran","Denmark","Guadeloupe","Singapore","Togo","Taiwan","Slovenia","Cambodia","Bangladesh","Slovakia","Belarus","Equatorial Guinea","Cabo Verde","Saint Barthelemy","Bhutan"]
//var growthtrend0to100 = ["Italy","Japan","Venezuela","Bahrain","Sri Lanka","Liechtenstein","Faroe Islands","Trinidad and Tobago","Guyana","Kuwait","San Marino","Qatar","Brunei","Seychelles","Maldives","Mongolia","Korea, South","China","Central African Republic","Liberia","Papua New Guinea","Saint Vincent and the Grenadines"]
var growthcalc = []
var growthcalc_today = []
var growthcalc_tenday = []

var growthrates = []
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
  function chartPosition (
    x,
    y,
    z,
    x0,
    y0,
    z0,
    petalheight,
    ctrlpt,
    color_code
  ) {
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
  function invisibleSpaghetti (
    k,
    x,
    y,
    z,
    x0,
    y0,
    z0,
    petalheight,
    ctrlpt,
    color_code,
    opacity,
    category
  ) {
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
  function drawPetalRing (
    segmentCount,
    radius,
    depth,
    color_code,
    chartLines,
    divisor
  ) {
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
          k = k - 1
          var theta0 = (k / chartLines) * Math.PI * 2
          var base_xk = Math.cos(theta0) * radius
          var base_yk = 0
          var base_zk = Math.sin(theta0) * radius
          if (chartLines == 160) {
            //this ensures that each k value is unique within the lotus flower
            k = k
          }
          if (chartLines == 240) {
            k = k + 160
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

          k_values.push([
            //k values each define a unique curve in 3D space. They are not associated with a specific petal ring.
            k,
            chartPoint[j].x,
            chartPoint[j].y,
            chartPoint[j].z,
            base_xk,
            base_yk,
            base_zk,
            petalheight,
            ctrlpt
          ])
        }
      }

      geometry.vertices.push(
        new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius)
      )
    }

    group.add(new THREE.Line(geometry, material))
  }

  // -------------------------------- //

  drawPetalRing(8, 0.55, 0.1, 0x00769d, 160, 20) //center petals

  drawPetalRing(12, 1, 0.1, 0x0289b6, 240, 20) //middle petals

  group.position.set(0, -0.28, -1)
  group.rotation.set(0.3, 0, 0.0)

  /*

BIRDS EYE VIEW VALUES
group.position.set( 0, 0, -5);
group.rotation.set(1,0,0);

SIDE ELEVATION VALUES
group.position.set( 0, -.3, 0);
group.rotation.set(0,-.3,.0);
*/

  //animate and render

  camera.position.z = 3.75 //this value was originally 3.75, and can be tweaked as needed

  function animate () {
    if (play) {
      requestAnimationFrame(animate)
      render()
      group.rotation.x += 0.0
      group.rotation.y += 0.0001
    } else {
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

  function assignLinks () {
    //this assigns k values to the ranked link ids, so that the highest values occur at the highest chart points for each concentric ring.

    var interval = 20

    for (var i = 0; i < 8; i++) {
      //link ids for the innermost petal ring
      k = i * interval + 10
      link_order.push(k)
    }
    for (var h = 0; h < 9; h++) {
      for (var j = 0; j < 8; j++) {
        k = link_order[j]
        k1 = k - 2 - h
        k2 = k - -1 + h
        link_order.push(k1)
        link_order.push(k2)
      }
    }

    var start = link_order.length
    var stop = start + 12

    for (var i = 0; i < 12; i++) {
      //link ids for the middle petal ring
      k = i * interval + 10
      k = k + 160
      link_order.push(k)
    }
    for (var h = 0; h < 9; h++) {
      for (var j = start; j < stop; j++) {
        k = link_order[j]
        k1 = k - 2 - h
        k2 = k - -1 + h
        link_order.push(k1)
        link_order.push(k2)
      }
    }
  }

  assignLinks()

  console.log (link_order)

  function getActiveLinks () {
    //sorts for a given set of values from the data obtained above
    var f = growthrates.entries()

    for (x of f) {
      var song_value = x[1].fips
      var song_index = x[0]

      if (growthtrendover1000.indexOf(song_value) > -1) {
        highest.push(song_index)
      }

      if (growthtrend500to1000.indexOf(song_value) > -1) {
        high.push(song_index)
      }

      if (growthtrend0to500.indexOf(song_value) > -1) {
        medium.push(song_index)
      }

      /*if (growthtrend100to250.includes(song_value)){
        
        low.push(song_index);
      }

      if (growthtrend0to100.includes(song_value)){
        
        lowest.push(song_index);
      }*/
    }
    showDetails();
  }

  function addLinks () {
    // adds links for selected values

    addhighestlinks()
    highestTransform.visible = true

    addhighlinks()
    highTransform.visible = true

    addmediumlinks()
    mediumTransform.visible = true

    /*addlowlinks()
lowTransform.visible = true;

addlowestlinks()
lowestTransform.visible = true;*/

    parentTransform = new THREE.Object3D()
    group.add(parentTransform)

    for (i = 0; i < 380; i++) {
      //this value should match entries.length

      var k = link_order[i]
      var color_code = 0xffffff

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
        parentTransform //complete set of navigation links
      )
    }
  }

  function geometricLinks () {
    getActiveLinks()
    addLinks()
  }

Array.prototype.distinct = function(item){
  var results = [];
    for (var i = 0, l = this.length; i < l; i++)
        if (!item){
            if (results.indexOf(this[i]) === -1)
                results.push(this[i]);
            } else {
            if (results.indexOf(this[i][item]) === -1)
                results.push(this[i][item]);
        }
    return results;
};

function growth_percent_calc(confirmed,old_confirmed) {
        var growth_calc = ((confirmed - old_confirmed)  / old_confirmed) * 1000; 

	return growth_calc;
}



  function getData(callback) //processes JSON data and returns arrays for 5 main variables
  {
  var xmlhttp = new XMLHttpRequest();
  //xmlhttp.addEventListener("load", getActiveLinks);
  //xmlhttp.addEventListener("load", addLinks);

  xmlhttp.open("GET", "covid_list.php", true);
  xmlhttp.responseType = 'json';
  xmlhttp.send(); 

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {

    var entries = this.response;
    console.log(entries.length);
    county_names.length = 0;
    console.log (entries);
    if(entries.length > 0) {
	var dates = entries.distinct('Last_Update');
	console.log(dates);

        for (var i = 0; i < entries.length; i++) {
	    var county = entries[i];
	    var county_name = county.Admin2+' County, '+county.Province_State+', '+county.Country_Region;
	    var county_confirmed = county.Confirmed;
	    var county_deaths = county.Deaths;
	    var old_confirmed = county.Confirmed;
	    var fips = county.FIPS;

	    if(county.Last_Update == dates[0]) {
                county_names.push([county_name]);
		total_cases.push([county_confirmed]);	    
		total_deaths.push([county_deaths]);
	        growthcalc_today.push({ 'fips': fips, 'today': county_confirmed });
	    } 	    	    
	
 
	    //var growth_rate = growth_percent_calc(county_confirmed,old_confirmed);
	    //growthrates.push([growth_rate]);
	
        }

	for (var i = 0; i < entries.length; i++) {
	    var county = entries[i];
	    var county_confirmed = county.Confirmed;
	    var fips = county.FIPS;

	    if(county.Last_Update == dates[1]) {
                growthcalc_tenday.push({ 'fips': fips, 'old': county_confirmed }); 
            }
	}

	const mergeById = (a1, a2) =>
    	    a1.map(itm => ({
        	...a2.find((item) => (item.fips === itm.fips) && item),
        	...itm
    	}));

	growth_calc = mergeById(growthcalc_today, growthcalc_tenday);
	//console.log(growth_calc);

	for (var i = 0; i < growth_calc.length; i++) {
	    var county = growth_calc[i];
	    var today = county.today;
	    var old = county.old;
	    var fips = county.fips;
	    var county_growthratecalc = growth_percent_calc(today,old);
	    var county_growthrate = county_growthratecalc.toFixed(2);

	    growthrates.push({ 'fips': fips, 'growthrate': county_growthrate });

	}

	for (var i = 0; i < growthrates.length; i++) {
	    var county = growthrates[i];
	    if(county.growthrate > 1000) {
	  	growthtrendover1000.push(county.fips);   
	    }
	    else if(county.growthrate <= 1000 && county.growthrate >= 500) {
                growthtrend500to1000.push(county.fips);  
            }
	    else if(county.growthrate < 500) {
                growthtrend0to500.push(county.fips);
            }
	}

     callback();
     fullyloaded = true;
     }
  }
  }
}

getData(geometricLinks);

  function showDetails () {
    var gr = growthrates[0];
    //this is only necessary when hide/show info toggle switch is enabled
     document.getElementById('nowplaying').innerHTML =
    '<b>Location</b><p>' + '<b>' + county_names[0] + '</b>'
    document.getElementById('thumb').innerHTML =
    '<b>Percent Growth</b><p>' + gr.growthrate + ' %'
    document.getElementById('rank').innerHTML = '<b>Rank</b><p>' + '<b>1</b>'
    document.getElementById('views').innerHTML =
    '<b>Confirmed Cases</b><p>' + total_cases[0]  


    document.getElementById('thumb').style.visibility = 'visible'
    document.getElementById('views').style.visibility = 'visible'
    document.getElementById('rank').style.visibility = 'visible'
    document.getElementById('nowplaying').style.visibility = 'visible'
  }

  //geometricLinks()
  //showDetails()

  function addhighestlinks () {
    //adds links for selected values

    highestTransform = new THREE.Object3D()
    group.add(highestTransform)

    for (i = 0; i < link_order.length; i++) {
      if (highest.includes(i)) {
        var k = link_order[i]
        var color_code = 0xffff00

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

  function addhighlinks () {
    //adds links for selected values

    highTransform = new THREE.Object3D()
    group.add(highTransform)

    for (i = 0; i < link_order.length; i++) {
      if (high.includes(i)) {
        var k = link_order[i]
        var color_code = 0x0c4d42

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
          highTransform
        )
      }
    }
  }

  function addmediumlinks () {
    //adds links for selected values

    mediumTransform = new THREE.Object3D()
    group.add(mediumTransform)

    for (i = 0; i < link_order.length; i++) {
      if (medium.includes(i)) {
        var k = link_order[i]
        var color_code = 0x70a39b

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
          0.4,
          mediumTransform
        )
      }
    }
  }

  // --- indicator panel code

  function nowPlaying (k) {
    l = link_order.indexOf(k)
    var song_title = song_titles[l]
    document.getElementById('nowplaying').innerHTML =
      '<b>Location</b><p>' + county_names[l]
  }

  function showThumb (k) {
    l = link_order.indexOf(k)
    var gr = growthrates[l];
    document.getElementById('thumb').innerHTML =
      '<b>Percent Growth</b><p>' + gr.growthrate + ' %'
  }

  function showRank (k) {
    l = link_order.indexOf(k)
    var songViews = views[l]
    document.getElementById('rank').innerHTML = '<b>Rank</b><p>' + (l + 1)
    document.getElementById('views').innerHTML =
      '<b>Confirmed Cases</b><p>' + total_cases[l]
  }

  function showPointer () {
    document.body.style.cursor = 'pointer'
  }

  function hideControls () {
    document.getElementById('genres').style.visibility = 'hidden'
    document.getElementById('message').style.visibility = 'hidden'
    document.getElementById('nowplaying').style.visibility = 'hidden'
    document.getElementById('thumb').style.visibility = 'hidden'
    document.getElementById('views').style.visibility = 'hidden'
    document.getElementById('rank').style.visibility = 'hidden'
    document.getElementById('share').style.visibility = 'hidden'
    document.getElementById('toggleControls').style.backgroundImage =
      "url('examples/files/maximize_icon.png')"
  }

  function showControls () {
    document.getElementById('genres').style.visibility = 'visible'
    document.getElementById('message').style.visibility = 'visible'
    document.getElementById('share').style.visibility = 'visible'
    document.getElementById('toggleControls').style.backgroundImage =
      "url('examples/files/minimize_icon.png')"
  }

  function toggleControls () {
    if (controlsVisible == true) {
      controlsVisible = false
      hideControls()
    } else {
      controlsVisible = true
      showControls()
    }
  }

  function hideLink () {
    group.remove(activeLink)
  }

  function toggleLinks (linkobject, id) {
    if (linkobject.visible == true) {
      linkobject.visible = false
      document.getElementById(id).style.backgroundColor = '#0289b6'
    } else {
      linkobject.visible = true
      document.getElementById(id).style.backgroundColor = '#FFFF00'
    }
  }

  function toggleLinks2 (linkobject, id) {
    if (linkobject.visible == true) {
      linkobject.visible = false
      document.getElementById(id).style.backgroundColor = '#35a1c5'
    } else {
      linkobject.visible = true
      document.getElementById(id).style.backgroundColor = '#408579'
    }
  }

  function toggleLinks3 (linkobject, id) {
    if (linkobject.visible == true) {
      linkobject.visible = false
      document.getElementById(id).style.backgroundColor = '#67b8d3'
    } else {
      linkobject.visible = true
      document.getElementById(id).style.backgroundColor = '#70a39b'
    }
  }

  /*function toggleLinks4(linkobject,id) {

  if (linkobject.visible == true) {
    linkobject.visible = false;
    document.getElementById(id).style.backgroundColor = "#9ad0e2";
  }
  else 
    {
      linkobject.visible = true;
    document.getElementById(id).style.backgroundColor = "#FFBCAD";
  }
}

function toggleLinks5(linkobject,id) {

  if (linkobject.visible == true) {
    linkobject.visible = false;
    document.getElementById(id).style.backgroundColor = "#cce7f0";
  }
  else 
    {
      linkobject.visible = true;
    document.getElementById(id).style.backgroundColor = "#FFDDD6";
  }
}*/

  function allVisible () {
    if (allgenresVisible == true) {
      document.getElementById('all').style.backgroundColor = '#a5c6d1'
      hideAll()
      allgenresVisible = false
    } else {
      allgenresVisible = true
      document.getElementById('all').style.backgroundColor = '#2387aa'
      showAll()
    }
  }

  function showAll () {
    highestTransform.visible = true
    highTransform.visible = true
    mediumTransform.visible = true
    //lowTransform.visible = true;
    //lowestTransform.visible = true;
    document.getElementById('highest_button').style.backgroundColor = '#FFFF00'
    document.getElementById('high_button').style.backgroundColor = '#408579'
    document.getElementById('medium_button').style.backgroundColor = '#70a39b'
    //document.getElementById("low_button").style.backgroundColor  = "#FFBCAD";
    //document.getElementById("lowest_button").style.backgroundColor  = "#FFDDD6";
    document.getElementById('all').innerHTML = 'Hide All'
  }

  function hideAll () {
    highestTransform.visible = false
    highTransform.visible = false
    mediumTransform.visible = false
    //lowTransform.visible =  false;
    //lowestTransform.visible =  false;
    document.getElementById('highest_button').style.backgroundColor = '#0289b6'
    document.getElementById('high_button').style.backgroundColor = '#35a1c5'
    document.getElementById('medium_button').style.backgroundColor = '#67b8d3'
    //document.getElementById("low_button").style.backgroundColor  = "#9ad0e2";
    //document.getElementById("lowest_button").style.backgroundColor  = "#cce7f0";
    document.getElementById('all').style.backgroundColor = '#cce7f0'
    document.getElementById('all').innerHTML = 'Show All'
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

  document.getElementById('reload').addEventListener(
    'click',
    function () {
      window.open('https://lotus.fm', '_self')
      //document.write(video_thmbs);
    },
    false
  )

  document.getElementById('about').addEventListener(
    'click',
    function () {
      window.open('https://web.lotus.fm/data-visualization/', '_self')
    },
    false
  )

  document.getElementById('toggleControls').addEventListener(
    'click',
    function () {
      toggleControls()
    },
    false
  )

  //calls to action

  /*document.getElementById( "info" ).addEventListener( 'mousemove', function(ev) {
  ev.stopPropagation*/

  document.getElementById('suggest').addEventListener(
    'click',
    function () {
      window.open('https://www.who.int/', '_new')
    },
    false
  )

  document.getElementById('enter').addEventListener(
    'click',
    function () {
      window.open(
        'https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series',
        '_new'
      )
    },
    false
  )

  //genre buttons

  document.getElementById('highest_button').addEventListener(
    'click',
    function () {
      toggleLinks(highestTransform, 'highest_button')
    },
    false
  )

  document.getElementById('high_button').addEventListener(
    'click',
    function () {
      toggleLinks2(highTransform, 'high_button')
    },
    false
  )

  document.getElementById('medium_button').addEventListener(
    'click',
    function () {
      toggleLinks3(mediumTransform, 'medium_button')
    },
    false
  )

  /*document.getElementById( "low_button" ).addEventListener( 'click', function () {
          toggleLinks4(lowTransform,"low_button");
        }, false );

  document.getElementById( "lowest_button" ).addEventListener( 'click', function () {
          toggleLinks5(lowestTransform,"lowest_button");
        }, false );*/

  document.getElementById('all').addEventListener(
    'click',
    function () {
      allVisible()
    },
    false
  )

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
      for (var i = 0; i < intersects.length; i++) {
        var intersection = intersects[i],
          obj = intersection.object
        k = obj.label
        var color_code = 0xcc2d6f
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
          0.8,
          activeLink
        )
        activeLink.visible = true
        showPointer()
        showThumb(k)
        showRank(k)
        nowPlaying(k)
      }
    } else {
      //activeLink.visible = false;
      group.remove(activeLink)
      document.body.style.cursor = 'default'
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
      l = link_order.indexOf(k) //connects the k value -- position on lotus petal graph -- to ID for link value
      var URL =
        'https://www.google.com/search?q=' + county_names[l] + '%Coronavirus'
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
