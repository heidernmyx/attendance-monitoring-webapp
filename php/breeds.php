<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');



class Breed {

  function getBreed () {
    include './connection/connection.php';
    $sql = "SELECT
        `BreedID`,
        `BreedName`,
        species.SpeciesName AS `Species`
    FROM
        `breeds`
    INNER JOIN species ON species.SpeciesID = breeds.SpeciesID
    ORDER BY `BreedName`";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    unset($conn);
    unset($stmt);
    echo json_encode($result);
  }

  function addBreed ($json) {

    include './connection/connection.php';
    $sql = "INSERT INTO `breeds`(`BreedName`, `SpeciesID`) VALUES (:breed, :species)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':breed', $json['breed'], PDO::PARAM_STR);
    $stmt->bindParam(':species', $json['species'], PDO::PARAM_INT);

    $stmt->execute();

    $result = $stmt->rowCount() > 0 ? 1 : 0;

    unset($conn);
    unset($stmt);
    echo json_encode($result);
  }

  function getBreedBySpeciesID ($json) {
    include './connection/connection.php';
    $sql = "SELECT * FROM breeds WHERE SpeciesID = :speciesID";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':speciesID', $json['speciesID'], PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($json['speciesID']);
    // die();
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
  $json = isset($_GET['json']) ? json_decode($_GET['json'], true) : null;
}




$breed = new Breed();
switch ($operation) {
  case "getBreed":
    $breed->getBreed();
    break;
  case "addBreed":
    $breed->addBreed($json);
    break;
  case "getBreedBySpeciesID":
    $breed->getBreedBySpeciesID($json);
    break;
}

