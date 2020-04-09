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

var county_names = [
  'New York, New York',
  'Westchester, New York',
  'Nassau, New York',
  'Suffolk, New York',
  'Cook, Illinois',
  'Wayne, Michigan',
  'Bergen, New Jersey',
  'Unassigned, New Jersey',
  'Los Angeles, California',
  'Rockland, New York',
  'Orleans, Louisiana',
  'Miami-Dade, Florida',
  'Essex, New Jersey',
  'Hudson, New Jersey',
  'King, Washington',
  'Fairfield, Connecticut',
  'Oakland, Michigan',
  'Jefferson, Louisiana',
  'Union, New Jersey',
  'Philadelphia, Pennsylvania',
  'Orange, New York',
  'Passaic, New Jersey',
  'Middlesex, Massachusetts',
  'Suffolk, Massachusetts',
  'Middlesex, New Jersey',
  'Monmouth, New Jersey',
  'Ocean, New Jersey',
  'Broward, Florida',
  'Macomb, Michigan',
  'Marion, Indiana',
  'Snohomish, Washington',
  'Morris, New Jersey',
  'Clark, Nevada',
  'Essex, Massachusetts',
  'Harris, Texas',
  'Maricopa, Arizona',
  'Norfolk, Massachusetts',
  'Milwaukee, Wisconsin',
  'Santa Clara, California',
  'San Diego, California',
  'Dallas, Texas',
  'New Haven, Connecticut',
  'Fulton, Georgia',
  'Montgomery, Pennsylvania',
  'Palm Beach, Florida',
  'Worcester, Massachusetts',
  'Dutchess, New York',
  'Cuyahoga, Ohio',
  'District of Columbia, District of Columbia',
  'Plymouth, Massachusetts',
  'Erie, New York',
  'St. Louis, Missouri',
  'Orange, California',
  'Davidson, Tennessee',
  'Hartford, Connecticut',
  'Hampden, Massachusetts',
  'Denver, Colorado',
  'Somerset, New Jersey',
  'Shelby, Tennessee',
  'Lake, Illinois',
  'Orange, Florida',
  'Mecklenburg, North Carolina',
  'Lehigh, Pennsylvania',
  'Pierce, Washington',
  'Montgomery, Maryland',
  "Prince George's, Maryland",
  'Dougherty, Georgia',
  'Delaware, Pennsylvania',
  'Salt Lake, Utah',
  'Bristol, Massachusetts',
  'Unassigned, Georgia',
  'Franklin, Ohio',
  'Unassigned, Washington',
  'DuPage, Illinois',
  'San Francisco, California',
  'Riverside, California',
  'San Mateo, California',
  'Mercer, New Jersey',
  'Luzerne, Pennsylvania',
  'Washtenaw, Michigan',
  'Allegheny, Pennsylvania',
  'Northampton, Pennsylvania',
  'Monroe, New York',
  'Hillsborough, Florida',
  'Will, Illinois',
  'Bucks, Pennsylvania',
  'DeKalb, Georgia',
  'Alameda, California',
  'Arapahoe, Colorado',
  'St. Tammany, Louisiana',
  'Baltimore, Maryland',
  'Genesee, Michigan',
  'Providence, Rhode Island',
  'Unassigned, Illinois',
  'Camden, New Jersey',
  'Monroe, Pennsylvania',
  'Sacramento, California',
  'East Baton Rouge, Louisiana',
  'Jefferson, Colorado',
  'Tarrant, Texas',
  'Cobb, Georgia',
  'Caddo, Louisiana',
  'Fairfax, Virginia',
  'Burlington, New Jersey',
  'Jefferson, Alabama',
  'Blaine, Idaho',
  'Travis, Texas',
  'El Paso, Colorado',
  'Weld, Colorado',
  'Gwinnett, Georgia',
  'Duval, Florida',
  'Onondaga, New York',
  'Pinellas, Florida',
  ', Puerto Rico',
  'Eagle, Colorado',
  'Barnstable, Massachusetts',
  'Baltimore City, Maryland',
  'Contra Costa, California',
  'Ada, Idaho',
  'San Bernardino, California',
  'Lee, Florida',
  'St. John the Baptist, Louisiana',
  'Sumner, Tennessee',
  'Pima, Arizona',
  'New Castle, Delaware',
  'Lafayette, Louisiana',
  'Wake, North Carolina',
  'Denton, Texas',
  'Albany, New York',
  'Ulster, New York',
  'Adams, Colorado',
  'Bexar, Texas',
  'Putnam, New York',
  'Dane, Wisconsin',
  'Anne Arundel, Maryland',
  'Charleston, South Carolina',
  'Navajo, Arizona',
  'Lake, Indiana',
  'Hennepin, Minnesota',
  'Berkshire, Massachusetts',
  'Yakima, Washington',
  'St. Louis City, Missouri',
  'Honolulu, Hawaii',
  'Oklahoma, Oklahoma',
  'Lucas, Ohio',
  'Lancaster, Pennsylvania',
  'Jefferson, Kentucky',
  'Washington, Oregon',
  'Collin, Texas',
  'Chester, Pennsylvania',
  'Richland, South Carolina',
  'Ascension, Louisiana',
  'Cumberland, Maine',
  'Summit, Utah',
  'Williamson, Tennessee',
  'Fort Bend, Texas',
  'Hamilton, Indiana',
  'Mahoning, Ohio',
  'Unassigned, Connecticut',
  'Unassigned, Michigan',
  'Unassigned, Massachusetts',
  'St. Charles, Louisiana',
  'Sussex, New Jersey',
  'Collier, Florida',
  'Hamilton, Ohio',
  'Bernalillo, New Mexico',
  'Osceola, Florida',
  'Berks, Pennsylvania',
  'Chittenden, Vermont',
  'St. Bernard, Louisiana',
  'Clayton, Georgia',
  'Spokane, Washington',
  'Out of TN, Tennessee',
  'Lafourche, Louisiana',
  'Washoe, Nevada',
  'Gloucester, New Jersey',
  'Whatcom, Washington',
  'San Joaquin, California',
  'Marion, Oregon',
  'Ventura, California',
  'Kane, Illinois',
  'Coconino, Arizona',
  'Tulsa, Oklahoma',
  'Multnomah, Oregon',
  'Greenville, South Carolina',
  'Kern, California',
  'Litchfield, Connecticut',
  'Johnson, Kansas',
  'Douglas, Colorado',
  'Rockingham, New Hampshire',
  'Sullivan, New York',
  'Howard, Maryland',
  'Summit, Ohio',
  'Seminole, Florida',
  'Hillsborough, New Hampshire',
  'Durham, North Carolina',
  'Bartow, Georgia',
  'Skagit, Washington',
  'Ingham, Michigan',
  'Utah, Utah',
  'Warren, New Jersey',
  'Hunterdon, New Jersey',
  'Unassigned, Rhode Island',
  'Unassigned, Colorado',
  'Carroll, Georgia',
  'Saratoga, New York',
  'Waukesha, Wisconsin',
  'Santa Barbara, California',
  'Hinds, Mississippi',
  'Kansas City, Missouri',
  'Hendricks, Indiana',
  'Wyandotte, Kansas',
  'Clark, Washington',
  'Johnson, Indiana',
  'Kent, Michigan',
  'Kershaw, South Carolina',
  'Benton, Washington',
  'Arlington, Virginia',
  'Boulder, Colorado',
  'Beaufort, South Carolina',
  'Prince William, Virginia',
  'Pulaski, Arkansas',
  'Cleveland, Oklahoma',
  'Galveston, Texas',
  'Montgomery, Texas',
  'Loudoun, Virginia',
  'Carroll, Maryland',
  'Virginia Beach, Virginia',
  'Rutherford, Tennessee',
  'Polk, Florida',
  'Volusia, Florida',
  'Henry, Georgia',
  'Larimer, Colorado',
  'Sarasota, Florida',
  'Douglas, Nebraska',
  'Brazoria, Texas',
  'Davis, Utah',
  'Madison, Alabama',
  'Livingston, Michigan',
  'York, Pennsylvania',
  'St. Johns, Florida',
  'Calcasieu, Louisiana',
  'Lackawanna, Pennsylvania',
  'Island, Washington',
  'Marin, California',
  'Linn, Iowa',
  'Sussex, Delaware',
  'Lubbock, Texas',
  'Fayette, Kentucky',
  'St. James, Louisiana',
  'Lee, Georgia',
  'Ouachita, Louisiana',
  'Hampshire, Massachusetts',
  'Escambia, Florida',
  'Unassigned, Kentucky',
  'Henrico, Virginia',
  'DeSoto, Mississippi',
  'Alachua, Florida',
  'Schenectady, New York',
  'Westmoreland, Pennsylvania',
  'Shelby, Alabama',
  'St. Charles, Missouri',
  'Manatee, Florida',
  'Cherokee, Georgia',
  'James City, Virginia',
  'Mobile, Alabama',
  'Jackson, Missouri',
  ', Grand Princess',
  'McHenry, Illinois',
  'Terrebonne, Louisiana',
  'Polk, Iowa',
  'Lee, Alabama',
  'Knox, Tennessee',
  'Placer, California',
  'Sonoma, California',
  'Bossier, Louisiana',
  'Monroe, Michigan',
  'Lorain, Ohio',
  'Kitsap, Washington',
  'Fresno, California',
  'Niagara, New York',
  'San Luis Obispo, California',
  'Gallatin, Montana',
  'Middlesex, Connecticut',
  'Charles, Maryland',
  'Saginaw, Michigan',
  'York, Maine',
  'Franklin, Massachusetts',
  'Chesterfield, Virginia',
  'Lake, Florida',
  'Guilford, North Carolina',
  'Tompkins, New York',
  'Gunnison, Colorado',
  'Sedgwick, Kansas',
  'El Paso, Texas',
  ', Guam',
  'Johnson, Iowa',
  'Pike, Pennsylvania',
  'Tulare, California',
  'Iberville, Louisiana',
  'Rapides, Louisiana',
  'Kenosha, Wisconsin',
  'Chambers, Alabama',
  'Forsyth, North Carolina',
  'Tolland, Connecticut',
  'Hall, Georgia',
  'Canyon, Idaho',
  'Medina, Ohio',
  'Dauphin, Pennsylvania',
  'Hidalgo, Texas',
  'Iberia, Louisiana',
  'Lexington, South Carolina',
  'Pinal, Arizona',
  'Pasco, Florida',
  'Floyd, Georgia',
  'Madison, New York',
  'Olmsted, Minnesota',
  'Richmond City, Virginia',
  'Plaquemines, Louisiana',
  'Jackson, Mississippi',
  'Butler, Pennsylvania',
  'Sumter, South Carolina',
  'Grant, Washington',
  'Out of MI, Michigan',
  'Anchorage, Alaska',
  'York, South Carolina',
  'St. Joseph, Indiana',
  'Acadia, Louisiana',
  'Atlantic, New Jersey',
  'San Juan, New Mexico',
  'Stark, Ohio',
  'Trumbull, Ohio',
  'Brazos, Texas',
  'Douglas, Georgia',
  'Ramsey, Minnesota',
  'Oneida, New York',
  'Wilson, Tennessee',
  'Williamson, Texas',
  'Decatur, Indiana',
  'Clay, Florida',
  'St. Martin, Louisiana',
  'Jackson, Michigan',
  'Harrison, Mississippi',
  'Boone, Missouri',
  'Wasatch, Utah',
  'Sumter, Florida',
  'St. Landry, Louisiana',
  'Minnehaha, South Dakota',
  'Madison, Indiana',
  'Rensselaer, New York',
  'Hamilton, Tennessee',
  'St. Clair, Michigan',
  'Sandoval, New Mexico',
  'Miami, Ohio',
  'Clackamas, Oregon',
  'Madison, Mississippi',
  'Lake, Ohio',
  'Beaver, Pennsylvania',
  'Webb, Texas',
  'Cleburne, Arkansas',
  'Rankin, Mississippi',
  'Portage, Ohio',
  'Rockdale, Georgia',
  'Schuylkill, Pennsylvania',
  'Brevard, Florida',
  'Anderson, South Carolina',
  'Solano, California',
  'Delaware, Ohio',
  'St. Lucie, Florida',
  'Forsyth, Georgia',
  'Union, North Carolina',
  'Spartanburg, South Carolina',
  'Montgomery, Alabama',
  'Sumter, Georgia',
  'Kent, Rhode Island',
  'Chatham, Georgia',
  'Fayette, Georgia',
  'Kankakee, Illinois',
  'Allen, Indiana',
  'Cabarrus, North Carolina',
  'Weber, Utah',
  'Thurston, Washington',
  'Santa Cruz, California',
  'Clarke, Georgia',
  'St. Clair, Illinois',
  'Washington, Louisiana',
  'Montgomery, Ohio',
  'Broome, New York',
  'Alexandria, Virginia',
  'Clark, Indiana',
  'Tangipahoa, Louisiana',
  'Cameron, Texas',
  'Kent, Delaware',
  'Okaloosa, Florida',
  'Frederick, Maryland',
  'Dakota, Minnesota',
  'Greene, Missouri',
  'Lebanon, Pennsylvania',
  'Unassigned, Tennessee'
]
var total_cases = [
  57159,
  12351,
  12024,
  10154,
  6111,
  6096,
  4866,
  4808,
  4566,
  4289,
  3476,
  3364,
  3067,
  2835,
  2787,
  2716,
  2540,
  2495,
  2487,
  2430,
  2397,
  2216,
  2202,
  2183,
  2125,
  1743,
  1685,
  1598,
  1560,
  1429,
  1376,
  1298,
  1279,
  1238,
  1106,
  1049,
  1045,
  1023,
  1019,
  966,
  921,
  891,
  882,
  875,
  858,
  825,
  809,
  780,
  757,
  745,
  734,
  712,
  711,
  685,
  679,
  661,
  643,
  641,
  640,
  ,
  608,
  602,
  601,
  584,
  571,
  566,
  563,
  560,
  542,
  541,
  517,
  507,
  503,
  501,
  500,
  497,
  493,
  486,
  484,
  484,
  477,
  476,
  466,
  464,
  463,
  455,
  450,
  448,
  443,
  441,
  435,
  427,
  422,
  418,
  415,
  406,
  397,
  390,
  389,
  385,
  383,
  381,
  377,
  372,
  367,
  351,
  351,
  351,
  340,
  329,
  329,
  323,
  322,
  318,
  316,
  314,
  314,
  313,
  307,
  307,
  304,
  304,
  290,
  283,
  280,
  279,
  276,
  275,
  273,
  267,
  263,
  260,
  254,
  252,
  252,
  249,
  247,
  245,
  244,
  242,
  240,
  240,
  239,
  237,
  237,
  233,
  232,
  228,
  228,
  227,
  226,
  224,
  222,
  222,
  222,
  221,
  221,
  220,
  220,
  218,
  215,
  213,
  210,
  210,
  203,
  203,
  202,
  201,
  201,
  199,
  196,
  195,
  194,
  187,
  185,
  184,
  183,
  182,
  180,
  178,
  177,
  176,
  175,
  175,
  175,
  174,
  173,
  173,
  172,
  171,
  170,
  168,
  166,
  165,
  163,
  163,
  159,
  154,
  153,
  152,
  150,
  149,
  148,
  146,
  144,
  143,
  141,
  141,
  139,
  139,
  139,
  138,
  137,
  137,
  136,
  136,
  136,
  136,
  135,
  132,
  131,
  131,
  130,
  130,
  130,
  130,
  130,
  129,
  128,
  127,
  126,
  125,
  125,
  124,
  124,
  124,
  123,
  122,
  121,
  121,
  121,
  119,
  119,
  119,
  119,
  118,
  118,
  117,
  117,
  116,
  116,
  115,
  114,
  114,
  113,
  113,
  112,
  111,
  110,
  110,
  110,
  109,
  105,
  104,
  104,
  104,
  103,
  103,
  103,
  102,
  102,
  100,
  99,
  98,
  97,
  95,
  95,
  95,
  95,
  95,
  94,
  94,
  93,
  93,
  91,
  90,
  90,
  89,
  89,
  89,
  88,
  88,
  87,
  86,
  85,
  85,
  84,
  83,
  83,
  81,
  81,
  81,
  81,
  80,
  80,
  79,
  79,
  79,
  79,
  79,
  79,
  78,
  78,
  77,
  77,
  77,
  77,
  76,
  76,
  75,
  75,
  75,
  75,
  75,
  74,
  73,
  73,
  72,
  72,
  72,
  72,
  72,
  72,
  72,
  71,
  71,
  71,
  71,
  71,
  70,
  69,
  69,
  69,
  69,
  69,
  69,
  68,
  68,
  68,
  67,
  67,
  67,
  66,
  66,
  66,
  66,
  65,
  65,
  65,
  65,
  64,
  64,
  64,
  63,
  63,
  62,
  62,
  61,
  61,
  60,
  60,
  60,
  60,
  59,
  59,
  59,
  58,
  58,
  58,
  58,
  58,
  58,
  58,
  57,
  57,
  57,
  57,
  57,
  56,
  56,
  55,
  55,
  55,
  54,
  54,
  54,
  54,
  54,
  54,
  54
] //total confirmed cases

var views = [] //popularity of youtube videos. uses same index ranking as link_order
var song_titles = []
var video_thmbs = []
var xmlhttp = new XMLHttpRequest()

var growthtrendover1000 = [
  'St. Martin, Louisiana',
  'Chesapeake, Virginia',
  'Porter, Indiana',
  'St. Lawrence, New York',
  'Benton, Arkansas',
  'Hidalgo, Texas',
  'Iberia, Louisiana',
  'Crittenden, Arkansas',
  'Acadia, Louisiana',
  'Northampton, North Carolina',
  'Carbon, Pennsylvania',
  'Vanderburgh, Indiana',
  'Twin Falls, Idaho',
  'Scott, Iowa',
  'Sumter, Georgia',
  'Unassigned, Colorado',
  'Darke, Ohio',
  'Hampden, Massachusetts',
  'Shelby, Indiana',
  'Hillsdale, Michigan',
  'Johnson, Missouri',
  'Carroll, Maryland',
  'Jackson, Indiana',
  'Salem, New Jersey',
  'Early, Georgia',
  'Rock Island, Illinois',
  'Calcasieu, Louisiana',
  'St. Mary, Louisiana',
  'Lancaster, Pennsylvania',
  'Luzerne, Pennsylvania',
  'Lafayette, Louisiana',
  'White, Arkansas',
  'St. Landry, Louisiana',
  'Madison, Indiana',
  'Lawrence, Indiana',
  'Lapeer, Michigan',
  'Granville, North Carolina',
  'Harrisonburg, Virginia',
  'Beaver, Pennsylvania',
  'Lehigh, Pennsylvania',
  'Barrow, Georgia',
  'Otsego, New York',
  'Pike, Pennsylvania',
  'Lafayette, Missouri',
  'Adams, Washington',
  'Dauphin, Pennsylvania',
  'Linn, Iowa',
  'Madison, New York',
  'Washington, Louisiana',
  'Nassau, Florida',
  'Camden, Missouri',
  'Charles, Maryland',
  'Trumbull, Ohio',
  'Lebanon, Pennsylvania',
  'Cumberland, New Jersey',
  'Mono, California',
  'Bay, Florida',
  'Lucas, Ohio',
  'Houston, Georgia',
  'Licking, Ohio',
  'Morgan, Indiana',
  'Mobile, Alabama',
  'Davidson, North Carolina',
  'Colquitt, Georgia',
  'Allen, Louisiana',
  'Christian, Illinois',
  'Genesee, New York',
  'Pickens, South Carolina',
  'Madison, Tennessee',
  'Tom Green, Texas',
  'Bristol, Massachusetts',
  'Terrell, Georgia',
  'Assumption, Louisiana',
  'Ouachita, Louisiana',
  'Will, Illinois',
  'Webb, Texas',
  'Ada, Idaho',
  'Chambers, Alabama',
  'Portage, Ohio',
  'Fairfield, Ohio',
  'Teton, Wyoming',
  'Marion, Alabama',
  'Merced, California',
  'Walton, Georgia',
  'DeKalb, Illinois',
  'Muskogee, Oklahoma',
  'Canyon, Idaho',
  'Eaton, Michigan',
  'Madison, Illinois',
  'Jennings, Indiana',
  'McKinley, New Mexico',
  'Cass, North Dakota',
  'Benton, Washington',
  'Spartanburg, South Carolina',
  'Broomfield, Colorado',
  'Tift, Georgia',
  "St. Mary's, Maryland",
  'Tuscola, Michigan',
  'Columbia, Pennsylvania',
  'Cape May, New Jersey',
  'Tulsa, Oklahoma',
  'Kankakee, Illinois',
  'Lake, Indiana',
  'Charlotte, Florida',
  'Mitchell, Georgia',
  'Hampshire, Massachusetts',
  'Northampton, Pennsylvania',
  'St. Charles, Louisiana',
  'Oswego, New York',
  'Washington, Oklahoma',
  'Montrose, Colorado',
  'Pierce, Georgia',
  'Marion, Tennessee',
  'Chippewa, Wisconsin',
  'St. John the Baptist, Louisiana',
  'Tangipahoa, Louisiana',
  'Minnehaha, South Dakota',
  'Frederick, Maryland',
  'Windham, Connecticut',
  'Washington, Maryland',
  'Monroe, Florida',
  'Monroe, Indiana',
  'Kalamazoo, Michigan',
  'Kern, California',
  'St. Charles, Missouri',
  'Albemarle, Virginia',
  'Dawson, Georgia',
  'Kauai, Hawaii',
  'Putnam, Indiana',
  'Jessamine, Kentucky',
  'Tate, Mississippi',
  'Madison, Ohio',
  'Klamath, Oregon',
  'Gregg, Texas',
  'Mason, Washington',
  'St. James, Louisiana',
  'Champaign, Illinois',
  'Boone, Indiana',
  'Schuylkill, Pennsylvania',
  'Berks, Pennsylvania',
  'Butler, Pennsylvania',
  'Dearborn, Indiana',
  'Genesee, Michigan',
  'Out of MI, Michigan',
  'Avoyelles, Louisiana',
  'Newport News, Virginia',
  'Sedgwick, Kansas',
  'Hudson, New Jersey',
  'Orange, Florida',
  'Atlantic, New Jersey',
  'Santa Rosa, Florida',
  'Dorchester, South Carolina',
  'Morgan, Alabama',
  'Autauga, Alabama',
  'Houston, Alabama',
  'Turner, Georgia',
  'Montgomery, Indiana',
  "Queen Anne's, Maryland",
  'Montcalm, Michigan',
  'Davie, North Carolina',
  'Josephine, Oregon',
  'Franklin, Tennessee',
  'Hanover, Virginia',
  'Jefferson, Missouri',
  'Sussex, New Jersey',
  'Decatur, Indiana',
  'Yavapai, Arizona',
  'Chemung, New York',
  'Plymouth, Massachusetts',
  'Lafourche, Louisiana',
  'Utah, Utah',
  'Jackson, Michigan',
  'Middlesex, Connecticut',
  'Worcester, Massachusetts',
  'Escambia, Florida',
  'Saginaw, Michigan',
  'Clark, Indiana',
  'Blount, Tennessee',
  'Henderson, North Carolina',
  'Aiken, South Carolina',
  'Juneau, Alaska',
  'Cedar, Iowa',
  'Perry, Mississippi',
  'Cibola, New Mexico',
  'Schoharie, New York',
  'Armstrong, Pennsylvania',
  'Grundy, Tennessee',
  'Chambers, Texas',
  'Jackson, West Virginia'
]
var growthtrend500to1000 = [
  'Hendricks, Indiana',
  'Clark, Washington',
  'Essex, Massachusetts',
  'Adams, Colorado',
  'St. Louis City, Missouri',
  'Anne Arundel, Maryland',
  'St. Bernard, Louisiana',
  'San Juan, New Mexico',
  'Passaic, New Jersey',
  'Baltimore, Maryland',
  'Wilson, Tennessee',
  'Ingham, Michigan',
  'Union, New Jersey',
  'New Haven, Connecticut',
  'Westmoreland, Pennsylvania',
  'St. Lucie, Florida',
  'Miami-Dade, Florida',
  'Warren, New Jersey',
  'San Bernardino, California',
  'Rutherford, Tennessee',
  'Blaine, Idaho',
  'Lubbock, Texas',
  'Coconino, Arizona',
  'Polk, Florida',
  'Philadelphia, Pennsylvania',
  'Gloucester, New Jersey',
  'Henry, Georgia',
  'Yakima, Washington',
  'Washtenaw, Michigan',
  'Lee, Florida',
  'Sandoval, New Mexico',
  'Caddo, Louisiana',
  'Niagara, New York',
  'Plaquemines, Louisiana',
  'Sumter, South Carolina',
  'Ocean, New Jersey',
  'Suffolk, Massachusetts',
  'Livingston, Michigan',
  'Clayton, Georgia',
  'Rockdale, Georgia',
  'Essex, New Jersey',
  "Prince George's, Maryland",
  'Franklin, Massachusetts',
  'Chesterfield, Virginia',
  'Marion, Indiana',
  'Monroe, Pennsylvania',
  'Hamilton, Indiana',
  'Burlington, New Jersey',
  'Riverside, California',
  'Hillsborough, New Hampshire',
  'Jefferson, Louisiana',
  'El Paso, Texas',
  'Palm Beach, Florida',
  'Kent, Rhode Island',
  'Hamilton, Tennessee',
  'St. Tammany, Louisiana',
  'Mercer, New Jersey',
  'Sumner, Tennessee',
  'Chatham, Georgia',
  'Allen, Indiana',
  'Harris, Texas',
  'St. Clair, Michigan',
  'Allegheny, Pennsylvania',
  ', Puerto Rico',
  'Norfolk, Massachusetts',
  'Rapides, Louisiana',
  'Fairfax, Virginia',
  'Providence, Rhode Island',
  'Henrico, Virginia',
  'Camden, New Jersey',
  'Lackawanna, Pennsylvania',
  'Bossier, Louisiana',
  'Monroe, Michigan',
  'Litchfield, Connecticut',
  'Mahoning, Ohio',
  'Barnstable, Massachusetts',
  'Fayette, Kentucky',
  'Osceola, Florida',
  'Santa Barbara, California',
  'Hartford, Connecticut',
  'Middlesex, New Jersey',
  'Navajo, Arizona',
  'Baltimore City, Maryland',
  'Arapahoe, Colorado',
  'Johnson, Indiana',
  'Virginia Beach, Virginia',
  'Ulster, New York',
  'Jackson, Mississippi',
  'Forsyth, Georgia',
  'Unassigned, New Jersey',
  'Jackson, Missouri',
  'Kane, Illinois',
  'Gwinnett, Georgia',
  'Sullivan, New York',
  'McHenry, Illinois',
  'Terrebonne, Louisiana',
  'Middlesex, Massachusetts',
  'Fresno, California',
  'Galveston, Texas',
  'Loudoun, Virginia',
  'Denton, Texas',
  'St. Louis, Missouri',
  'Oneida, New York',
  'Seminole, Florida',
  'Fairfield, Connecticut',
  'Pinellas, Florida',
  'Jefferson, Colorado',
  'Multnomah, Oregon',
  'Floyd, Georgia',
  'Wayne, Michigan',
  'Volusia, Florida',
  'Bergen, New Jersey',
  'Macomb, Michigan',
  'Jefferson, Kentucky',
  'Richmond City, Virginia',
  'Clay, Florida',
  'Los Angeles, California',
  'Brevard, Florida',
  'Charleston, South Carolina',
  'Sumter, Florida',
  'York, Pennsylvania',
  'East Baton Rouge, Louisiana',
  'Franklin, Ohio',
  'Spokane, Washington',
  'Pima, Arizona',
  'Polk, Iowa',
  'York, South Carolina',
  'Kansas City, Missouri',
  'Weld, Colorado',
  'Montgomery, Alabama',
  'Knox, Tennessee',
  'Dutchess, New York',
  'Bucks, Pennsylvania',
  'Manatee, Florida',
  'Berkshire, Massachusetts',
  'Duval, Florida',
  'Douglas, Georgia',
  'Delaware, Pennsylvania',
  'Erie, New York',
  'Rockland, New York',
  'Morris, New Jersey',
  'Unassigned, Rhode Island',
  'Lake, Florida',
  'Somerset, New Jersey',
  'Unassigned, Georgia',
  'Kenosha, Wisconsin',
  'Wyandotte, Kansas',
  'Dougherty, Georgia',
  'Ascension, Louisiana',
  'Monmouth, New Jersey',
  'Clark, Nevada'
] //covers values greater than or equal to 500% and less than 1000%
var growthtrend0to500 = [
  'Beaufort, South Carolina',
  'Oakland, Michigan',
  'Hunterdon, New Jersey',
  'Cleveland, Oklahoma',
  'Lake, Ohio',
  'Gallatin, Montana',
  'Cabarrus, North Carolina',
  'Iberville, Louisiana',
  'Oklahoma, Oklahoma',
  'Madison, Alabama',
  'Lee, Georgia',
  'Forsyth, North Carolina',
  'Prince William, Virginia',
  'Montgomery, Texas',
  'Chester, Pennsylvania',
  'Hall, Georgia',
  'Marion, Oregon',
  'York, Maine',
  'Delaware, Ohio',
  'Stark, Ohio',
  'Howard, Maryland',
  'Montgomery, Pennsylvania',
  'Carroll, Georgia',
  'Guilford, North Carolina',
  'Lake, Illinois',
  'Dallas, Texas',
  'Tompkins, New York',
  'St. Johns, Florida',
  'Suffolk, New York',
  'Tarrant, Texas',
  'District of Columbia, District of Columbia',
  'Onondaga, New York',
  'Hamilton, Ohio',
  'Montgomery, Maryland',
  'Kitsap, Washington',
  'Maricopa, Arizona',
  'Medina, Ohio',
  'Orleans, Louisiana',
  'Broward, Florida',
  'Pasco, Florida',
  'Cook, Illinois',
  'Hillsborough, Florida',
  'Sussex, Delaware',
  'Williamson, Texas',
  'Ventura, California',
  'Collin, Texas',
  'Richland, South Carolina',
  'Chittenden, Vermont',
  'Collier, Florida',
  'El Paso, Colorado',
  'Rankin, Mississippi',
  'DuPage, Illinois',
  'Placer, California',
  'Fayette, Georgia',
  'Orange, New York',
  'Fort Bend, Texas',
  'Fulton, Georgia',
  'Johnson, Kansas',
  'Sarasota, Florida',
  'DeKalb, Georgia',
  'Tulare, California',
  'Island, Washington',
  'Shelby, Tennessee',
  'Bernalillo, New Mexico',
  'Orange, California',
  'Cuyahoga, Ohio',
  'Madison, Mississippi',
  'Wasatch, Utah',
  'Summit, Ohio',
  'Waukesha, Wisconsin',
  'Brazos, Texas',
  'Hinds, Mississippi',
  'Rockingham, New Hampshire',
  'Unassigned, Washington',
  'Greenville, South Carolina',
  'Sacramento, California',
  'Cobb, Georgia',
  'Brazoria, Texas',
  'Kent, Michigan',
  'Monroe, New York',
  'Salt Lake, Utah',
  'Denver, Colorado',
  'Anchorage, Alaska',
  'San Diego, California',
  'Mecklenburg, North Carolina',
  'Olmsted, Minnesota',
  'Milwaukee, Wisconsin',
  'Nassau, New York',
  'Washoe, Nevada',
  'Wake, North Carolina',
  'Tolland, Connecticut',
  'Pierce, Washington',
  'Lexington, South Carolina',
  'Honolulu, Hawaii',
  'Travis, Texas',
  'Shelby, Alabama',
  'St. Joseph, Indiana',
  'Davis, Utah',
  'New Castle, Delaware',
  'Clackamas, Oregon',
  'Anderson, South Carolina',
  'Jefferson, Alabama',
  'DeSoto, Mississippi',
  'Lee, Alabama',
  'Whatcom, Washington',
  'Arlington, Virginia',
  'Cherokee, Georgia',
  'Bexar, Texas',
  ', Grand Princess',
  'Larimer, Colorado',
  'Contra Costa, California',
  'Douglas, Colorado',
  'San Joaquin, California',
  'Dane, Wisconsin',
  'Pinal, Arizona',
  'Miami, Ohio',
  'Williamson, Tennessee',
  'Boone, Missouri',
  'Eagle, Colorado',
  'Skagit, Washington',
  'Boulder, Colorado',
  'Union, North Carolina',
  'Alameda, California',
  'Sonoma, California',
  'San Francisco, California',
  'Grant, Washington',
  'Douglas, Nebraska',
  'Westchester, New York',
  'Lorain, Ohio',
  'Putnam, New York',
  'Gunnison, Colorado',
  'San Mateo, California',
  'Washington, Oregon',
  'Cumberland, Maine',
  'Alachua, Florida',
  'Solano, California',
  'Harrison, Mississippi',
  'James City, Virginia',
  'Ramsey, Minnesota',
  'Santa Clara, California',
  'Davidson, Tennessee',
  'Summit, Utah',
  'Saratoga, New York',
  ', Guam',
  'Marin, California',
  'Unassigned, Massachusetts',
  'Schenectady, New York',
  'Unassigned, Kentucky',
  'King, Washington',
  'Hennepin, Minnesota',
  'Kershaw, South Carolina',
  'Johnson, Iowa',
  'Snohomish, Washington',
  'Durham, North Carolina',
  'San Luis Obispo, California',
  'Bartow, Georgia',
  'Pulaski, Arkansas',
  'Rensselaer, New York',
  'Cleburne, Arkansas',
  'Out of TN, Tennessee',
  'Albany, New York',
  'New York, New York'
]
//var growthtrend100to250 =["Netherlands","Indonesia","Peru","Armenia","Czechia","Luxembourg","Iraq","Germany","Jordan","Latvia","Albania","Tanzania","Cyprus","Uruguay","Mauritania","Costa Rica","Ethiopia","Finland","Zimbabwe","Pakistan","Switzerland","Sweden","Lebanon","Nicaragua","Greece","West Bank and Gaza","Bulgaria","Estonia","Egypt","French Polynesia","Iceland","French Guiana","Malaysia","Malta","Vietnam","Jamaica","Suriname","Georgia","Guatemala","Norway","Iran","Denmark","Guadeloupe","Singapore","Togo","Taiwan","Slovenia","Cambodia","Bangladesh","Slovakia","Belarus","Equatorial Guinea","Cabo Verde","Saint Barthelemy","Bhutan"]
//var growthtrend0to100 = ["Italy","Japan","Venezuela","Bahrain","Sri Lanka","Liechtenstein","Faroe Islands","Trinidad and Tobago","Guyana","Kuwait","San Marino","Qatar","Brunei","Seychelles","Maldives","Mongolia","Korea, South","China","Central African Republic","Liberia","Papua New Guinea","Saint Vincent and the Grenadines"]
var growthrates = [
  73.93,
  217.42,
  319.1,
  440.11,
  411.81,
  595.89,
  594.15,
  645.43,
  589.73,
  539.2,
  414.96,
  895.27,
  796.78,
  1111.54,
  138.21,
  607.29,
  493.46,
  751.54,
  910.98,
  864.29,
  381.33,
  925.93,
  624.34,
  832.91,
  667.15,
  505.21,
  836.11,
  413.83,
  593.33,
  787.58,
  124.1,
  536.27,
  503.3,
  949.15,
  725.37,
  427.14,
  710.08,
  320.99,
  171.73,
  327.43,
  444.97,
  901.12,
  379.35,
  450.31,
  749.5,
  1030.14,
  552.42,
  367.07,
  436.88,
  1064.06,
  543.86,
  612.0,
  367.76,
  170.75,
  671.59,
  2654.17,
  334.46,
  528.43,
  374.07,
  447.75,
  1104.0,
  323.24,
  2062.96,
  313.77,
  428.97,
  793.65,
  522.22,
  545.24,
  336.29,
  1567.74,
  525.93,
  570.67,
  347.32,
  385.44,
  226.97,
  764.91,
  201.86,
  734.48,
  2204.76,
  854.0,
  720.69,
  1312.12,
  337.74,
  408.79,
  1525.0,
  552.17,
  376.6,
  228.15,
  660.34,
  736.54,
  916.67,
  1141.18,
  703.85,
  null,
  696.08,
  782.22,
  343.18,
  570.69,
  600.0,
  439.44,
  343.02,
  842.5,
  708.7,
  773.81,
  285.71,
  875.0,
  308.14,
  392.75,
  558.0,
  631.11,
  546.0,
  436.67,
  606.67,
  710.26,
  241.3,
  685.0,
  663.41,
  256.98,
  1515.79,
  880.65,
  850.0,
  1280.95,
  732.35,
  566.67,
  292.96,
  2200.0,
  316.67,
  618.42,
  82.88,
  651.43,
  940.0,
  268.12,
  207.32,
  250.0,
  937.5,
  586.11,
  665.63,
  1335.29,
  134.95,
  548.65,
  860.0,
  939.13,
  308.62,
  478.05,
  1692.31,
  2220.0,
  590.91,
  200.0,
  404.44,
  465.0,
  397.78,
  516.67,
  200.0,
  170.73,
  245.31,
  380.43,
  780.0,
  685.71,
  null,
  null,
  150.59,
  1300.0,
  1066.67,
  395.12,
  434.21,
  369.77,
  673.08,
  1156.25,
  397.5,
  931.58,
  828.57,
  568.97,
  96.84,
  1056.25,
  318.18,
  863.16,
  279.17,
  252.94,
  456.25,
  405.71,
  633.33,
  872.22,
  1358.33,
  600.0,
  346.15,
  1230.77,
  686.36,
  377.78,
  256.25,
  347.37,
  630.43,
  453.33,
  358.33,
  608.7,
  757.89,
  123.94,
  108.11,
  240.0,
  913.33,
  1053.85,
  893.33,
  492.0,
  534.78,
  2780.0,
  450.0,
  166.04,
  354.84,
  672.22,
  348.39,
  561.9,
  961.54,
  522.73,
  953.85,
  655.56,
  338.71,
  134.48,
  1411.11,
  275.0,
  238.46,
  495.45,
  469.57,
  103.13,
  490.91,
  622.22,
  465.22,
  622.22,
  2480.0,
  652.94,
  876.92,
  869.23,
  594.44,
  861.54,
  264.71,
  376.92,
  217.95,
  339.29,
  293.55,
  476.19,
  830.77,
  572.22,
  440.91,
  2280.0,
  693.33,
  376.0,
  151.06,
  1866.67,
  408.7,
  875.0,
  673.33,
  1188.89,
  475.0,
  1528.57,
  1325.0,
  1030.0,
  145.65,
  700.0,
  282.76,
  197.3,
  150.0,
  900.0,
  303.7,
  1212.5,
  550.0,
  271.43,
  181.08,
  1616.67,
  635.71,
  267.86,
  628.57,
  628.57,
  566.67,
  280.77,
  553.33,
  385.0,
  227.59,
  691.67,
  691.67,
  216.67,
  427.78,
  623.08,
  840.0,
  121.43,
  481.25,
  1037.5,
  1700.0,
  1025.0,
  456.25,
  790.0,
  790.0,
  528.57,
  450.0,
  443.75,
  207.14,
  1114.29,
  750.0,
  162.5,
  124.32,
  1975.0,
  376.47,
  478.57,
  710.0,
  523.08,
  1500.0,
  471.43,
  315.79,
  464.29,
  1480.0,
  426.67,
  1875.0,
  3850.0,
  3800.0,
  310.53,
  250.0,
  413.33,
  600.0,
  1825.0,
  322.22,
  590.91,
  837.5,
  650.0,
  1150.0,
  837.5,
  226.09,
  1133.33,
  329.41,
  563.64,
  300.0,
  3500.0,
  1100.0,
  928.57,
  453.85,
  1700.0,
  350.0,
  545.45,
  173.08,
  610.0,
  914.29,
  407.14,
  1066.67,
  590.0,
  6800.0,
  1050.0,
  187.5,
  245.0,
  360.0,
  580.0,
  2166.67,
  1260.0,
  2133.33,
  103.03,
  737.5,
  725.0,
  842.86,
  247.37,
  288.24,
  364.29,
  490.91,
  2066.67,
  1525.0,
  100.0,
  392.31,
  1500.0,
  800.0,
  1160.0,
  588.89,
  287.5,
  190.48,
  454.55,
  900.0,
  650.0,
  233.33,
  1400.0,
  555.56,
  2850.0,
  742.86,
  728.57,
  383.33,
  1350.0,
  728.57,
  480.0,
  544.44,
  427.27,
  159.09,
  256.25,
  714.29,
  1800.0,
  470.0,
  522.22,
  600.0,
  1000.0,
  1275.0,
  816.67,
  440.0,
  285.71,
  1250.0,
  157.14,
  184.21,
  1700.0,
  42.11
]
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

  function getActiveLinks () {
    //sorts for a given set of values from the data obtained above
    var f = county_names.entries()

    for (x of f) {
      var song_value = x[1].toString()
      var song_index = x[0]

      if (growthtrendover1000.includes(song_value)) {
        highest.push(song_index)
      }

      if (growthtrend500to1000.includes(song_value)) {
        high.push(song_index)
      }

      if (growthtrend0to500.includes(song_value)) {
        medium.push(song_index)
      }

      /*if (growthtrend100to250.includes(song_value)){
        
        low.push(song_index);
      }

      if (growthtrend0to100.includes(song_value)){
        
        lowest.push(song_index);
      }*/
    }
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

  function showDetails () {
    //this is only necessary when hide/show info toggle switch is enabled

    document.getElementById('thumb').style.visibility = 'visible'
    document.getElementById('views').style.visibility = 'visible'
    document.getElementById('rank').style.visibility = 'visible'
    document.getElementById('nowplaying').style.visibility = 'visible'
  }

  geometricLinks()
  showDetails()

  document.getElementById('nowplaying').innerHTML =
    '<b>Location</b><p>' + '<b>' + county_names[0] + '</b>'
  document.getElementById('thumb').innerHTML =
    '<b>Percent Growth</b><p>' + growthrates[0] + ' %'
  document.getElementById('rank').innerHTML = '<b>Rank</b><p>' + '<b>1</b>'
  document.getElementById('views').innerHTML =
    '<b>Confirmed Cases</b><p>' + total_cases[0]

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
    document.getElementById('thumb').innerHTML =
      '<b>Percent Growth</b><p>' + growthrates[l] + ' %'
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
