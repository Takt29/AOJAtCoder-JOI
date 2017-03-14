<?php
$http_origin = $_SERVER['HTTP_ORIGIN'];
preg_match('/^.*¥.goodbaton¥.com$/', $http_origin, $matches);
if(count($matches) > 0){
    header('Access-Control-Allow-Origin: '.$http_origin);
}

if(isset($_GET["url"]) && preg_match("/^https?:/",$_GET["url"])){
    echo file_get_contents($_GET["url"]);
}else{
    echo "error";
}