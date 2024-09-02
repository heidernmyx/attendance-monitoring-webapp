<?php


header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');



class Species {

  function getSpecies($json) {
    include './connection/connection.php';
    $sql = "SELECT * FROM species";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    unset($conn);
    unset($stmt);

    echo json_encode($result);
  }
  function addSpecies ($json) {

    include './connection/connection.php';
    $sql = "INSERT INTO `species`(`SpeciesName`) VALUES (:species)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':species', $json['species'], PDO::PARAM_STR);

    $stmt->execute();

    $result = $stmt->rowCount() > 0 ? 1 : 0;

    unset($conn);
    unset($stmt);
    echo json_encode($result);
  }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $operation = $_POST['operation'];
  $json = isset($_POST['json']) ? json_decode($_POST['json'], true) : null;
}
else if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $operation = $_GET['operation'];
  $json = isset($_POST['json']) ? json_decode($_GET['json'], true) : null;
}

$species = new Species();
switch ($operation) {
  case "getSpecies":
    $species->getSpecies($json);
    break;
  case "addSpecies":
    $species->addSpecies($json);
    break;
  

}

