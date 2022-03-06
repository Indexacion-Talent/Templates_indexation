/*

http://boo1.neuvoo.com/xml-spiders/view/xml-spider2.php?style=dark&id=200093


$aux_url = (String) $j->applylink;

if(strpos($aux_url, 'https://emea5') ===false) {

$city = trim((string) $j->location);
$country = trim((string) $j->country);

$arrloc=array();
if($city) $arrloc[] = $city;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();
$job['temp'] = 22;
$job['title'] = (String) $j->title;
$job['url'] = (String) $j->url;
$job['location'] = $loc;
$loc = preg_replace('/[0-9]/i', '', $loc);
$job['dateposted_raw'] = (String) $j->date;
  $arraydate = array();
  $dia = explode(".", $job['dateposted_raw']);
  $arraydate[] = $dia[0];
  $mes = explode(".", $job['dateposted_raw']);
  $arraydate[] = $mes[1];
  $year = explode(".", $job['dateposted_raw']);
  $arraydate[] = $year[2];
  $dateposted = implode("/", $arraydate);
  $job['dateposted_raw'] = $dateposted;
$job['source_empname'] = (String) $j->company;
$job['reqid'] = (String) $j->referencenumber;

$job['html'] = html_entity_decode((String) $j->description);
$job['jobdesc'] = strip_tags($job['html']);



strip_tags
(PHP 4, PHP 5, PHP 7)

strip_tags — Retira las etiquetas HTML y PHP de un string

}



*/