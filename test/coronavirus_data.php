<?php
/* 
    Author: 
        Jorge Garifuna (jgarifuna) <garifuna@gmail.com>
        http://garistore.com/jgari.com/resume/

    Date: 4/2/20

    This API reads COVID-19 data from CSV from the "coronavirus" database table. 
    The data is expected to be inserted into the database on daily basis by the coronavirus_cron.php script.
    The source of the data is the John Hopkins University COVID-19 repo.

    Requirements:
        PHP 5.2+ with mysqli extension installed
    
    Usage:
        1) To use this script, you need to update the following constants:
            DB_SERVER, DB_USER, DB_PASSWORD and DB_NAME

    Endpoints:
        1) Get list of cases for all countries, including historical data:
            coronavirus_api.php

            JSON result:
                Please refer to the following file for an example:
                    coronavirus_api_all_countries.json

        2) Get list of all states for a specific country, including historical data:
            coronavirus_api.php?action=get_states&country=COUNTRY_NAME

            COUNTRY_NAME: name of country as provided by the call to the endpoint that returns all countries from above

            Example to get cases for all states of the United States:
                coronavirus_api.php?action=get_states&country=US

            JSON result:
                Please refer to the following file for an example:
                    coronavirus_api_all_states_for_USA.json

        3) Get list of all counties of a specific state for a specific country:
            coronavirus_api.php?action=get_cities&country=COUNTRY_NAME&state=STATE_NAME

            COUNTRY_NAME: name of country as provided by the call to the endpoint that returns all countries from above
            STATE_NAME: name of state as provided by the call to the endpoint that returns all states for a given country from above

            Example to get cases for California, United States:
                coronavirus_api.php?action=get_cities&country=US&state=California

            JSON result:
                Please refer to the following file for an example:
                    coronavirus_api_all_counties_for_state_california.json

        4) Get the historical data for a specific county of a specific state of a specific country:
            coronavirus_api.php?action=get_city&country=COUNTRY_NAME&state=STATE_NAME&city=COUNTY_NAME

            COUNTRY_NAME: name of country as provided by the call to the endpoint that returns all countries from above
            STATE_NAME: name of state as provided by the call to the endpoint that returns all states for a given country from above
            COUNTY_NAME: name of country as provided by the call to the endpoint that returns all counties of a given state for a given country from above

            Example to get cases for all states of the United States:
                coronavirus_api.php?action=get_city&country=US&state=California&city=Sacramento

            JSON result:
                Please refer to the following file for an example:
                    coronavirus_api_county_specific_sacramento_california.json

    Implemented at:
        http://garifunainstitute.com/math/coronavirus.php

*/
error_reporting(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR);
header('content-type: application/json');

    #<editor-fold defaultstate="collapsed" desc="SVN Revision Information">
    # ------------------------------------------------------------
    # SVN revision information:
    # @url          $URL:  $:
    # @version      $Revision:  $: 1.0
    # @editor       $Author:  $: Jorge Garifuna (jgarifuna) <garifuna@gmail.com>
    # @date         $Date:  $: 4/2/20
    # @id           $Id:  $: 1
    # ------------------------------------------------------------
    # @author       Jorge Garifuna (jgarifuna) <garifuna@gmail.com>
    # @createdDate  4/2/20
    # ------------------------------------------------------------
    #
    # All code (c)2020 Jorge Garifuna. All Rights Reserved.
    #</editor-fold>

    /* DB helpers */
    define('DEBUG', 1);       
    define('DEBUG_FILE', 'coronavirus_logs.txt');
    define('DB_SERVER', '127.0.0.1');       // server
    define('DB_USER', 'root');              // user
    define('DB_PASSWORD', 'MY_PASSWORD');              // password
    define('DB_NAME', 'MY_DATABASE_NAME'); // database

    define('DEFAUTL_TIME_ZONE', 'America/Los_Angeles');
    define('ACTION_COUNTRIES', 'get_countries');
    define('ACTION_STATES', 'get_states');
    define('ACTION_CITIES', 'get_cities');
    define('ACTION_CITY', 'get_city');
    define('ACTION_COUNTRY_CHART', 'get_country_chart_data');

    $conn = connect_db();
    setTimezone();
    execute($conn);

    /**
     * Starting point to start database operation
     *
     * @access public
     *
     * @name    execute
     * @return  void
     * @date 4/2/20
     * @author Jorge Garifuna
     */
    function execute($conn) {
        $lStrAction = isset($_REQUEST['action'])?$_REQUEST['action']:null;
        $lAryResponse = array('status'=>0,'msg'=>null, 'results'=>array(), 'chart_data' => arraY());
        switch($lStrAction){
            case ACTION_STATES: // get states: example: http://localhost:8082/coronavirus_api.php?action=get_states&country=US
                $lStrCountry = isset($_REQUEST['country'])?$_REQUEST['country']:null;
                $lAryResponse['results'] = getStates($conn, $lStrCountry);
                $lAryResponse['chart_data'] = getChartingData($conn, ACTION_STATES, array('country' => $lStrCountry));
                $lAryResponse['status'] = !empty($lAryResponse['results']);
                $lAryResponse['msg'] = empty($lAryResponse['results'])?'No data found for country, '.$lStrCountry:'';
                break;
            case ACTION_CITIES: // get cities: http://localhost:8082/coronavirus_api.php?action=get_cities&country=US&state=California
                    $lStrCountry = isset($_REQUEST['country'])?$_REQUEST['country']:null;
                    $lStrState = isset($_REQUEST['state'])?$_REQUEST['state']:null;
                    $lAryResponse['results'] = getCities($conn, $lStrCountry,$lStrState);
                    $lAryResponse['chart_data'] = getChartingData($conn, ACTION_CITIES, array('country' => $lStrCountry, 'state' => $lStrState));
                    $lAryResponse['status'] = !empty($lAryResponse['results']);
                    $lAryResponse['msg'] = empty($lAryResponse['results'])?'No data found for state, '.$lStrState.' from country, '.$lStrCountry:'';
                    break;    
            case ACTION_CITY: // get states: example: http://localhost:8082/coronavirus_api.php?action=get_city&country=US&state=California&city=Sacramento
                $lStrCountry = isset($_REQUEST['country'])?$_REQUEST['country']:null;
                $lStrState = isset($_REQUEST['state'])?$_REQUEST['state']:null;
                $lStrCity = isset($_REQUEST['city'])?$_REQUEST['city']:null;
                $lAryResponse['results'] = getCity($conn, $lStrCountry,$lStrState, $lStrCity);
                $lAryResponse['chart_data'] = getChartingData($conn, ACTION_CITY, array('country' => $lStrCountry, 'state' => $lStrState, 'city' => $lStrCity));
                $lAryResponse['status'] = !empty($lAryResponse['results']);
                $lAryResponse['msg'] = empty($lAryResponse['results'])?'No data found for city, '.$lStrCity.' from state, '.$lStrState.' and country, '.$lStrCountry:'';
            break;
        
            default: // get countries: http://localhost:8082/coronavirus_api.php
                $lAryResponse['results'] = getCountries($conn);
                $lAryResponse['chart_data'] = getChartingData($conn, ACTION_COUNTRIES);
                $lAryResponse['status'] = !empty($lAryResponse['results']);
                $lAryResponse['msg'] = empty($lAryResponse['results'])?'No data found for countries':'';
                break;
        }
        mydebug('');
        echo json_encode($lAryResponse);
    }

    function getCities($conn, $lStrCountry, $lStrState){
        if(empty($lStrCountry) || empty($lStrState)){
            return array();
        }
        $query = "SELECT Country_Region, Province_State,Admin2, Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths 
                    FROM coronavirus 
                        WHERE batchid IN (SELECT max(batchid) FROM coronavirus) AND Country_Region ='".addslashes($lStrCountry)."' AND Province_State ='".addslashes($lStrState)."' 
                            GROUP BY Admin2 
                            ORDER BY Confirmed DESC";
        // mydebug($query);
        $result_array = get_query_result_array($conn, $query);
        return $result_array;
    }


    function getCity($conn, $lStrCountry, $lStrState, $lStrCity){
        if(empty($lStrCountry) || empty($lStrState) || empty($lStrCity)){
            return array();
        }
        $query = "SELECT Country_Region, Province_State,Admin2, Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths  
                    FROM coronavirus 
                        WHERE batchid IN (SELECT max(batchid) FROM coronavirus) AND Country_Region ='".addslashes($lStrCountry)."' AND Province_State ='".addslashes($lStrState)."'  AND Admin2 ='".addslashes($lStrCity)."' 
                            GROUP BY Admin2 
                            ORDER BY Confirmed DESC";
        // mydebug($query);
        $result_array = get_query_result_array($conn, $query);
        return $result_array;
    }

    function getStates($conn, $lStrCountry){
        if(empty($lStrCountry)){
            return array();
        }
        $query = "SELECT 
                    Country_Region, Province_State,Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths, count(Admin2) AS sub_count 
                  FROM coronavirus 
                    WHERE batchid IN (SELECT max(batchid) FROM coronavirus) AND Country_Region ='".addslashes($lStrCountry)."' 
                        GROUP BY Province_State 
                        ORDER BY Confirmed DESC";
        // mydebug($query);
        $result_array = get_query_result_array($conn, $query);
        return $result_array;
    }
    
    /**
     * Obtains corona virus data by country
     *
     * @author Jorge Garifuna <garifuna@gmail.com>
     * @date 4/2/20
     * @param obj $conn
     * @return array
     */
    function getCountries($conn){
        $query = "SELECT 
                    Country_Region,Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths, count(Province_State) AS sub_count 
                    FROM coronavirus 
                        WHERE batchid IN (SELECT max(batchid) FROM coronavirus) 
                            GROUP BY Country_Region 
                            ORDER BY Confirmed DESC";
        // mydebug($query);
        $result_array = get_query_result_array($conn, $query);
        return $result_array;
    }

    /**
     * Obtains  charting data
     *
     * @author Jorge Garifuna <garifuna@gmail.com>
     * @date 4/2/20
     * @param obj $conn
     * @param string $lStrAction
     * @param array $lAryOptions
     * @return array
     */
    function getChartingData($conn, $lStrAction = null, $lAryOptions = array()){
        $result_array = array();
        switch ($lStrAction) {
            case ACTION_STATES: // get charting for all states of specific country
                if(isset($lAryOptions['country']) && !empty($lAryOptions['country'])){
                    $query = "SELECT DATE(Last_Update) AS Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths, count(Province_State) AS sub_count FROM coronavirus  WHERE Country_Region ='".addslashes($lAryOptions['country'])."' GROUP BY DATE(Last_Update) ORDER BY DATE(Last_Update) ASC";
                }else{
                    return $result_array;
                }

                break;
            case ACTION_CITIES: // get charting for all cities of specific state
                    if(isset($lAryOptions['country']) && !empty($lAryOptions['country']) && isset($lAryOptions['state']) && !empty($lAryOptions['state'])){
                        $query = "SELECT DATE(Last_Update) AS Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths, count(Province_State) AS sub_count FROM coronavirus  WHERE Country_Region ='".addslashes($lAryOptions['country'])."'  AND Province_State ='".addslashes($lAryOptions['state'])."' GROUP BY DATE(Last_Update) ORDER BY DATE(Last_Update) ASC";
                    }else{
                        return $result_array;
                    }
    
                    break;
            case ACTION_CITY: // get charting for a specific city of specific state and specific country
                if(isset($lAryOptions['country']) && !empty($lAryOptions['country']) && isset($lAryOptions['state']) && !empty($lAryOptions['state'])  && isset($lAryOptions['city']) && !empty($lAryOptions['city'])){
                    $query = "SELECT DATE(Last_Update) AS Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths, count(Province_State) AS sub_count FROM coronavirus  WHERE Country_Region ='".addslashes($lAryOptions['country'])."'  AND Province_State ='".addslashes($lAryOptions['state'])."'  AND Admin2='".addslashes($lAryOptions['city'])."'  GROUP BY DATE(Last_Update) ORDER BY DATE(Last_Update) ASC";
                }else{
                    return $result_array;
                }

                break;
                    
            default: // get charting for all countries around the world
                $query = "SELECT DATE(Last_Update) AS Last_Update, sum(Confirmed) AS Confirmed, sum(Deaths) AS Deaths, sum(New_Confirmed) as New_Confirmed, sum(New_Deaths) as New_Deaths, sum(Prev_New_Confirmed) as Prev_New_Confirmed, sum(Prev_New_Deaths) as Prev_New_Deaths, count(Province_State) AS sub_count FROM coronavirus GROUP BY DATE(Last_Update) ORDER BY DATE(Last_Update) ASC";
                break;
        }
        
        // mydebug($query);
        $result_array = get_query_result_array($conn, $query);
        return $result_array;
    }

    /**
     * Obtains result of query
     *
     * @access public
     *
     * @name    get_query_result_array
     * @param   string $query
     * @return  array
     * @date 1/12/12
     * @author Jorge Garifuna
     */
    function get_query_result_array($conn, $query) {
        $rv = array();
//        $result = mysql_query($query);
        $result = $conn->query($query);

        if ($result !== FALSE) {
//        while ($row = mysql_fetch_assoc($result)) {
            while ($row = $result->fetch_assoc()) {
                $rv[] = $row;
            }
        }


        return $rv;
    }

    /**
     * Obtains result of query
     *
     * @access public
     *
     * @name    get_query_result_array
     * @param   string $query
     * @return  array
     * @date 1/12/12
     * @author Jorge Garifuna
     */
    function get_query_insert_id($conn, $query, $action = 'insert') {

        if (mysqli_query($conn, $query)) {
            if ($action == 'update') {
                return true;
            }
            else {
                return mysqli_insert_id($conn);
            }
        }
        else {
            return false;
        }
    }

    /**
     * Connect to database
     *
     * @access public
     *
     * @name    connect_db
     * @return  bool
     * @date 1/12/12
     * @author Jorge Garifuna
     */
    function connect_db() {
//        if (mysql_connect(DB_SERVER, DB_USER, DB_PASSWORD)) {
//            if (mysql_select_db(DB_NAME)) {
//                return true;
//            }
//        }
//
//        die("\nDB ERROR: " . mysql_error() . "\n");
// Create connection
        $conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME);

// Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        mydebug( "Connected successfully");
        return $conn;
    }


    /*
     * Saves model code to class file
     *
     * @param string $model_file_name
     * @param string $model_code
     *
     * @return bool
     * @date 12/3/13
     * @author Jorge Garifuna
     */

    function saveFile($lStrFileName, $lStrData, $includePhpOpening = false) {
        if ($includePhpOpening)
            $model_code = '<?php' . "\n\n" . $lStrData;

        return file_put_contents($lStrFileName, $lStrData);
    }

    /*
     * Creates models directory
     *
     * @param string $dir
     *
     * @return bool
     * @date 12/3/13
     * @author Jorge Garifuna
     */

    function createDir($dir) {
        $exists = false;

        if (file_exists($dir)) {
            $exists = true;
        }
        else if (mkdir($dir, 0777, true)) {
            $exists = true;
        }

        return $exists;
    }

    function setTimezone() {
        ini_set('date.timezone', DEFAUTL_TIME_ZONE);
        date_default_timezone_set(DEFAUTL_TIME_ZONE);
    }

    /**
     * Logs debug messages to file
     *
     * @access public
     *
     * @name    mydebug
     * @param   string $msg
     * @return  VOID
     *
     * @author Jorge Garifuna
     */
    function mydebug($msg = '') {
        if (DEBUG) {
            if (strlen($msg) < 1) {
                $msg = print_r($_REQUEST, true);
            }
            else if (is_array($msg)) {
                $msg = print_r($msg, true);
            }

            $server = $_SERVER['REMOTE_ADDR'] . ":";
            // $server = print_r($_SERVER, true);

            $msg = date('Y-m-d H:i') . ' : ' . str_repeat('@', 30) . "\n\n" . $server . __FILE__ . "\n" . $msg;
            $msg .= "\n";
            // echo $msg;
            file_put_contents(DEBUG_FILE, $msg, FILE_APPEND);
        }
    }

?>