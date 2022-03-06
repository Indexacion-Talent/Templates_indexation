/*
$job = array();
$job['temp'] = 1;
$job['title'] = (String) $j->title;
$job['url'] = (String) $j->url;

$arrayCity = array();
$ciudad = (String) $j->city;
$arrayCity[] = $ciudad;
$country = (String) $j->region;
$arrayCity[] = $country;
$locacion = implode(", ", $arrayCity);
$job['location'] = $locacion;

$job['reqid'] = (String) $j->id;

$job['dateposted_raw'] = (String) $j->date;
$arrayDatePosted = array();
$day = explode("/",$job['dateposted_raw']);
$arrayDatePosted[] = $day[0];
$month = explode("/",$job['dateposted_raw']);
$arrayDatePosted[] = $month[1];
$year = explode("/",$job['dateposted_raw']);
$arrayDatePosted[] = $year[2];
$dateposted = implode("/", $arrayDatePosted);
$job['dateposted_raw'] = $dateposted;

$job['resource_jobtype'] = (String) $j->jornada;

$arrayDescription = array();
$experiencia = (String) $j->experience;
if($experiencia == "Indefinido"){
      $experiencia = " ";
}
$requisitos = (String) $j->requirements;
if($requisitos == "Indefinido"){
      $requisitos = " ";
}
$estudios = (String) $j->studies;
if($estudios == "Indefinido"){
      $estudios = " ";
}
$escolaridad = (String) $j->escolaridade;
if($escolaridad == "Indefinido"){
      $escolaridad = " ";
}
$beneficios = (String) $j->beneficios;
if($beneficios == "Indefinido"){
      $beneficios = " ";
}
$idiomas = (String) $j->idioma;
if($idiomas == "Indefinido"){
      $idiomas = " ";
}
$job['html'] = html_entity_decode((String) $j->content);
$job['jobdesc'] =  strip_tags($job['html']);

$arrayDescription[] = $job['jobdesc'];
$arrayDescription[] = $experiencia;
$arrayDescription[] = $requisitos;
$arrayDescription[] = $estudios;
$arrayDescription[] = $escolaridad;
$arrayDescription[] = $beneficios;
$arrayDescription[] = $idiomas;
$descripcion = implode(" ", $arrayDescription);

$job['jobdesc'] = $descripcion;




*/