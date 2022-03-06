/*


PAGINACION ---> FECHA (DATE) si la url del archivo tiene una fecha, se debe paginar con esa variable, ejemplo --> https://linkalojamiento_pais_2021-12-9.xml, se separa la fecha 
del resto del link para paginar 


$job = array();
$job['temp'] = 1;
$job['title'] = (String) $j->JOBTITLE;
$job['url'] = (String) $j->URL;
$job['location'] = (String) $j->LOCATION;
$job['reqid'] = (String) $j->JOBID;
$job['source_jobtype'] = (String) $j->JOB_TYPE;
$job['dateposted_raw'] = (String) $j->POSTDATE;

$arraydateposted = array();
$day = explode("-",$job['dateposted_raw']);
$arraydateposted[] = $day[1];
$month = explode("-",$job['dateposted_raw']);
$arraydateposted[] = $month[2];
$year = explode("-",$job['dateposted_raw']);
$arraydateposted[] = $year[0];

$dateposted = implode("/", $arraydateposted);
$job['dateposted_raw'] = $dateposted;

$job['dateclosed_raw'] = (String) $j->CLOSINGDATE;
$arraydateclosed = array();
$day = explode("-",$job['dateclosed_raw']);
$arraydateclosed[] = $day[1];
$month = explode("-",$job['dateclosed_raw']);
$arraydateclosed[] = $month[2];
$year = explode("-",$job['dateclosed_raw']);
$arraydateclosed[] = $year[0];

$dateclosed = implode("/", $arraydateclosed);
$job['dateclosed_raw'] = $dateclosed;

$arraydescription = array();
$sumary = (String) $j->SUMMARY;
$arraydescription[] = $sumary;
$job['html'] = html_entity_decode((String) $j->JobDescription);
$job['jobdesc'] = strip_tags($job['html']);
$arraydescription[] = $job['jobdesc'];

$description = implode(" ", $arraydescription);
$job['jobdesc'] = $description;


*/

//$job['dateposted_raw'] = explode("T",$job['dateposted_raw']);
