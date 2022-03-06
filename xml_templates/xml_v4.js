//algunas url del jobsite no funcionan, por lo tanto debemos validar cuales estan habilitadas
$url = trim((String) $j->link['href']); //capturamos la url

//usamos los metodos curl para viajar a la url y vemos si hay contenido
$TravelUrl = curl_init($url);//iniciamos el proceso de viaje con curl
curl_setopt($TravelUrl, CURLOPT_RETURNTRANSFER, true);//preparamos la url del job
curl_exec($TravelUrl);//enviamos con este metodo la url al navegador
$http_response_code = curl_getinfo($TravelUrl, CURLINFO_HTTP_CODE); //obtenemos la informacion obtenida y el codigo de operacion
echo "Codigo de la conexion: ".$http_response_code.", todo ok \n"; //imprimimos el codigo de la conexion

//validar la respuesta
if($http_response_code !== 200){
  echo "Ups, la url ".$url." No se puede abrir, al parecer esta fuera de servicio \n";
}else{
  $city = trim((string) $j->children('job', true)->location->municipality);//se utiliza esta etiqueta porque la locacion esta en un atributo

  $job=array();
  $job['title'] = trim((String) $j->title);
  $job['location'] = $city;
  $job['url'] = trim((String) $j->link['href']);
  $extractReqid = explode("/",$job['url']);
  $job['reqid'] = $extractReqid[6];
  $job['dateposted_raw'] = trim((String) $j->updated);
  $FechaClean = explode("T",$job['dateposted_raw']);
  $job['dateposted_raw'] = $FechaClean[0];
  
  $arraydateposted = array();
  $day = explode("-",$job['dateposted_raw']);
  $arraydateposted[] = $day[1];
  $month = explode("-",$job['dateposted_raw']);
  $arraydateposted[] = $month[2];
  $year = explode("-",$job['dateposted_raw']);
  $arraydateposted[] = $year[0];

  $dateposted = implode("/", $arraydateposted);
  $job['dateposted_raw'] = $dateposted;
  
  $job['html'] = (String) $j->content;
  $job['jobdesc'] = strip_tags($job["html"]);
}