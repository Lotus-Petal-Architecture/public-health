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
  var countries = [] // values of countries from chart
  var day_one = [] //number of cases on first day tracked
  var day_ten = [] //number of cases on day 10



  var country_links = [] //index values of genre links
  var song_names = ["OqeKV2UYq1Q", "kkcbxjWG9Mc", "MUfgAbFY4CA", "W05cPXpUHGI", "Bm1g5Yg0hUw", "iPAr7kL-mmg", "APrpB-i4d_E", "D1vQJFF2TKQ", "qR9DjdMrpHg", "E5H8DwJI0uA", "ksTFj6L0mao", "Kc1htX3q-F0", "GiZHmwzNAqE", "n7zyfArxibk", "vZA_7FtttRY", "hjg39XRkjVc", "E7fzUGR8ZH4", "ON6pn6suSzc", "W3m7Uz7hF-s", "CmBgxP56R1I", "QJu611UdfxA", "-DjpNgrocKo", "qOM107PIxV8", "FuFtfhOipNQ", "zJXQSBWO5Qc", "yQYu51hlkLk", "HwgNMrs-i80", "tRNDB9VqI3Q", "iLilpPtY2JU", "pO3_ZG7wJPc", "wcICuFnkxe4", "pnfryoGog0A", "hPsdjlPVaJU", "MbxRu7fwR24", "f-MroGCKDcM", "Mub2i2BoHpM", "6r1-HTiwGiY", "d9MA4rFNf7I", "E5uAH0vNn2s", "OCVgWq9B_HE", "4K8ou0iA_68", "PE1ges9nn6A", "w39qx5X_Owg", "aUfu-lEflbQ", "6P8mfvCGKyg", "TpLhrLzSaFQ", "rCy1VIy8Hj0", "ZyvYIYwLzTw", "cgr8e7da52o", "Cg4c0RA2DJQ", "f-FOTHUir_4", "BzkHp6EswEM", "YbP-Aa3V6bA", "7hneF9Iu71g", "FNFYq8O7DTY", "UNUmSwWq-LU", "4qljGaHJbCs", "2wnDyOHPxrE", "cr5uFjA4TNI", "MP_2p79Ems4", "-ITl4-Kyey0", "iG8D1Kb7xgQ", "au-mBoepJUA", "XMUxca7gXv4", "pB08AUiTP3w", "srwAMHbHVAE", "K_5lt23PRVs", "OFOowKu7WjA", "Ti1liRM6cao", "V4Yw6A_rlHc", "vtS54c9sP0U", "6RzlgEyS-BE", "Rh2YmGujtFI", "VTd4JCIqL7U", "uIP0iIxHLY4", "Pjw-qzT6qBs", "K0q6EYTGXXQ", "gK04XhlTLOM", "weW-VnINl-E", "QAhMakentwA", "IgfIh-NBoCw", "cwHmeFidLbE", "pGOO7EE4Lhw", "nKJeB03TrJg", "yMku_xfki1U", "WGnqoZx7_QY", "6SGy0zUCtsk", "X9BWRh92ifs", "9NrC7pRra9o", "E9yTHSyZeKg", "Z9RsVV-zfgY", "EIpzPVAHpVg", "LS7KFVYUQT4", "uS1PyjaR8WM", "WJi9MXfl3zA", "yntvBrlZNeA", "8QcTCIsFJ2Q", "RemMNe7z6vg", "4fr8k6O-Bko", "Ed_16Cblg9s", "Gv7iV4n7cXM", "uL8Dipf5kXc", "ClVNU2-C3rQ", "tAZko_MSZhc", "IbE4ynQd_qQ", "_P63qccOdzs", "zClCsQnRj-c", "uA4RNW3HkcQ", "Palxbwco9pM", "i94eFYHHAOY", "hBF8YGF17rQ", "bbt3qhOiH3M", "VkavEUCwm0M", "9Rz4kMBD8jU", "LJbtcit8Byg", "bS22uZHDr54", "bU2WUSEC6PY", "Duot03grNv8", "ull6hOYs5ZY", "ZEhWfrVOWlE", "W8CrBGhfSiA", "yHNB4m1dfKE", "GFfN5mFjOFo", "slua80kJ8zA", "AXHi-B2VbU0", "6Y_B3wdQLgg", "fPEoI43MMhs", "uJMn4WGaIOc", "rddu5TgrTmE", "SBrMBqFbWok", "DHXYSbs6Rb0", "s9t2QH5zTCQ", "qMol4iSzXis", "6u8lUKuaUx8", "_86LQH-c1d8", "c1UTArVwyZs", "HcB7ZnkMnB8", "slqKrANo7Uo", "0nt2Yn1M0oU", "yyayVIXwg74", "2bHvzuupe4w", "mKZBingy2OA", "aVwVvtP5qJ4", "s5Eyu9-kchQ", "Cqp-hL-I90A", "OV2lquaPxSU", "SBOK9CBjCK8", "9x6Mxs5DyxI", "GdK4jqnDNN8", "LesJtYAG8zM", "w_otXEVPgOk", "Pp_e6vZuhBI", "--w4Ui8Alzc", "cQhGxSge7aA", "rx4woNwVS8g", "50ADWH1d3E8", "eNcSFnr3508", "p1nmsaPh31E", "9IjxNwHkttU", "1jY7kdEIhaA", "YypAGqIBrX0", "eg5Emkcjfdo", "iF0IhEpDces", "FAL01pUnhGI", "DWeB6hWoKyI", "c8H7Anvad6E", "LH7XPoWPz-4", "TkIloV7OMAk", "_ZydMszfZlQ", "YGv-OSvQwKY", "AguOdYNF2d4", "TN9upnrVwog", "FxdnqfyvIkY", "-dJXBCBZwQg", "5AHz8HeDk3c", "DCI5XqT-AZs", "t7Pv3eZEy4k", "tG2F72T-ixY", "8drkE_zLnLk", "0deHAT_KOqE", "Q72ENpHcrDQ", "COICJal838M", "pfjyV0qtNlk", "sSCb-a2McRI", "M1hSddzlxL4", "RSfii8RLmNM", "rVqIhE53D_w", "UX1BvCRg6gs", "gahV15Oe9Xs", "pCgEUBf5y18", "vAuwQugGdS4", "jt068Vdmfww", "ENODBnQ5ed0", "JOUmxw0DPsg", "QYDXRoHpF0w", "-Rfqo7OSimw", "BVh6Jb3DQxE", "Ra616vyPBp8", "5xFP4ikGCLk", "HmuGq5weoZA", "KqXN_5G_kuo", "SVi7fXWKqSk", "fAcdBmxu-6s", "3jWQzkoPFTg", "nptjor9ee_Q", "rQfs5UTzwFQ", "wsF4TVHr42A", "xRFTYRXS3aw", "AwkDVMr4Kso", "H3GXCAeWMb0", "x9_1ia_nB_E", "Ys4YGRN8hgY", "t50c2AiAkpw", "q93hgeROqvk", "3zDO7P_P3Aw", "mfA9K1hj2eg", "0Jpqb5IYlEE", "BL8AJFQv9V4", "4n8vZyzBWNs", "1WaMgWUiYg0", "Hu0wknFNTOk", "iZtFjqZxBxw", "5SeI6r8lI_U", "A4uAL0T_CUI", "r6i5PCn7_oY", "ba_SMlx-gi0", "8Ux6UnYOLvk", "t1IMifXyJLc", "sk4aZSLSkMs", "XTCUjmhWL4Y", "2sKF3MHrHEY", "z0lHW09eQRA", "RFmIOaRhOnE", "H7vVXIiisSw", "-G1XWvUBXk4", "CyDHTJCIfHQ", "njHZdD0MGDs", "0_GeShK7aaY", "WWWKRqzvxMg", "_oQIIAdG8xM", "H_6GtBFCTyQ", "VZu1Z0oeFzo", "-Q53gXuXd5s", "oErErOGaAv0", "U3iWpewLuyA", "XPR2bV8u5rk", "_S0esU0n6sY", "U-eK9RcU90s", "KYhsehUH5b0", "9_N4gVkx9_w", "s_vgHgIKPQs", "Y6BeTnjUqlo", "kXFGQYGFeFU", "MP8Fd0mN50E", "qepl1N0P-SA", "bqogMblcal0", "_liZNFe-TDM", "SBA_vLLrXr0", "q-XpcMTnB-A", "c-kLsqvD6q8", "ZGmXbfF8uvM", "Bi4K58Fd_1o", "XfgAXwaseM8", "pOYN1p4Rc6o", "c4cBdT5WCoE", "599tHbAQVts", "8BhdoriXe9Q", "l5JhD4wKsrs", "iv0ej8cJScM", "uE2R5d6cPYs", "vxnYp5NyD4k", "aCgTgyBBswA", "C7r5KziEspU", "KR6DysiE9Sk", "trZ244Ih_E4", "71u8cSuyZrI", "DElGhE2NhtQ", "kYKcf7EWEfc", "KGKJQNtxjhI", "KiHrn43djYc", "qIhPPceIEV0", "U53SHxO4sbk", "zDoDWbB6RN8", "j0iohXlRXKA", "LEKxlNbjgmE", "6ZowS0dDW1k", "KLgWHoGLDx4", "V0HIfZmn3oU", "yDOi6phVQXM", "xxi6VQkCJPY", "bBMPzOX_VUo", "YZJ2rOm-PVA", "xuXln0HC-Lg", "ms2iYyh6jLI", "MJLe_O2J5Xg", "skvGTkW-qG4", "rFP4gxn_uME", "OLTeVRvPq04", "3MfJ9qMXBVQ", "xL94jLzIGt0"] //list of youtube videos. uses the same index ranking as link_order
  var views = [] //popularity of youtube videas. uses same index ranking as link_order
  var song_titles = []
  var video_thmbs = []
  var xmlhttp = new XMLHttpRequest()

  //These song IDs are periodically queried from the Lotus YouTube genre playlists.  

  var countrygenre = ["_86LQH-c1d8","ENODBnQ5ed0","z0lHW09eQRA","SBA_vLLrXr0","c4cBdT5WCoE","nKJeB03TrJg","Pp_e6vZuhBI"]
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

    var f = song_names.entries(); 

    for (x of f) {
      var song_value = x[1].toString();
      var song_index = x[0];
      

      if (countrygenre.includes(song_value)){
        
        country_links.push(song_index);
      }
    }
}



function addLinks() {  // adds links for selected values

//document.getElementById("rock").style.backgroundColor = "#2387aa"


addcountryLinks()


parentTransform = new THREE.Object3D()
group.add(parentTransform)

for (i = 0; i < 304; i++) {  //this value should match entries.length

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

// generates clickable and color-coded links sorted by genre and popularity

function addTop8Songs() {  // adds links for selected values

document.getElementById("nowplaying").innerHTML = `<span style="font-size: 18px;font-family:Source Sans Pro; color: #FFF;"><strong>Top Eight Songs...</strong></span>`
top8Transform = new THREE.Object3D()
group.add(top8Transform) 

for (i = 0; i < 8; i++) {

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
        .8,
        top8Transform
      )
  }
top8Transform.visible = true

}

function addTopSongs() {  // adds links for selected values

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

document.getElementById("nowplaying").innerHTML = `<span style="font-size: 18px;font-family:Source Sans Pro; color: #FFF; margin-left:0px;"><strong>Top 100 Songs...</strong></span>`
}

//setTimeout(spacer, 1000);
//setTimeout(addTop8Songs, 200);
//setTimeout(addTopSongs, 1200);
setTimeout(geometricLinks, 1500);
setTimeout('document.getElementById("nowplaying").innerHTML = `<span style="font-size: 18px;font-family:Source Sans Pro; color: #FFF; margin-left:0px; text-align:right; margin-top:10px;"></span>`'
, 2000);
setTimeout(spacer,5500);
setTimeout(showDetails,6300);




function getData() //processes JSON data and returns arrays for 5 main variables
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
    song_names.length = 0;
    if(entries.length > 0) {
    for (var i = 0; i < entries.length; i++) {
    //console.log (song_names.length) // current actual number of songs being ranked
      var song = entries[i];
      var song_name = song.id;
      var popularity = song.statistics.viewCount;
      var song_title = song.snippet.title;
  //console.log(popularity);
  //console.log(song_title);
      views.push([popularity]);
      song_names.push([song_name]);
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

getData();





var URL = "https://www.youtube.com/embed/" + "-Rfqo7OSimw" + "?autoplay=1&mute=1"
window.open(URL, 'iframe_a')

function showDetails()

{
document.getElementById("nowplaying").innerHTML = "<b>Song Name</b><p>" + "Small Million \u2022 Sirens";
document.getElementById("thumb").innerHTML = "<img src='https://i.ytimg.com/vi/-Rfqo7OSimw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDkHyVpHwFKobtpTzY8zYgRKWxE7A' width='120'>";  
document.getElementById("rank").innerHTML = "<b>Rank</b><p>" + 154;
document.getElementById("views").innerHTML = "<b>Views</b><p>" + 3251;
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
  document.getElementById("nowplaying").innerHTML = "<b>Song Name</b><p>" + song_title;
  if (fullyloaded == false)
          {
            document.getElementById("nowplaying").style.visibility  = "hidden";
          }
  else
          {
            document.getElementById("nowplaying").style.visibility  = "visible";
          }
}

function showThumb(k) {
  l = link_order.indexOf(k) 
  document.getElementById("thumb").innerHTML = "<img src=" + video_thmbs[l] + ">";
  if (fullyloaded == false)
          {
            document.getElementById("thumb").style.visibility  = "hidden";
          }
  else
          {
            document.getElementById("thumb").style.visibility  = "visible";
          }
}

function showRank(k) {
  l = link_order.indexOf(k)
  var songViews= views[l]; 
  document.getElementById("rank").innerHTML = "<b>Rank</b><p>" + (l+1);
  document.getElementById("views").innerHTML = "<b>Views</b><p>" + songViews;
  if (fullyloaded == false)
          {
            document.getElementById("rank").style.visibility  = "hidden";
            document.getElementById("views").style.visibility  = "hidden";
          }
    else
          {
            document.getElementById("rank").style.visibility  = "visible";
            document.getElementById("views").style.visibility  = "visible";
          }
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
      var URL = "https://www.youtube.com/embed/" + song_names[l] + "?autoplay=1&mute=0"
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
