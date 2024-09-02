<?php


header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');




class Pets{
  function getPets(){
    include './connection/connection.php';
    $sql = "SELECT
	pets.PetID,
    owners.Name as OwnerName,
    pets.Name as PetName,
    species.SpeciesName,
    breeds.BreedName,
    DateOfBirth
FROM
    pets
INNER JOIN owners ON owners.OwnerID = pets.OwnerID
INNER JOIN species ON species.SpeciesID = pets.SpeciesID
INNER JOIN breeds ON breeds.BreedID = pets.BreedID
ORDER BY pets.PetID ASC";

    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    unset($conn);
    unset($stmt);
    echo json_encode($result);
  }

  function addPet ($json) {
    include './connection/connection.php';

    $sql = "INSERT INTO `pets`(
        `Name`,
        `SpeciesID`,
        `BreedID`,
        `DateOfBirth`,
        `OwnerID`
    )
    VALUES(
        :petname,
        :species,
        :breed,
        :birthdate,
        :owner
    )";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":petname", $json['petname'], PDO::PARAM_STR);
    $stmt->bindParam(":species", $json['species'], PDO::PARAM_INT);
    $stmt->bindParam(":breed", $json['breed'], PDO::PARAM_INT);
    $stmt->bindParam(":birthdate", $json['birthdate'], PDO::PARAM_STR);
    $stmt->bindParam(":owner", $json['owner'], PDO::PARAM_INT);
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
  $json = isset($_GET['json']) ? json_decode($_GET['json'], true) : null; 
}

$pet = new Pets();
switch ($operation) {
  case 'getPets':
    $pet->getPets();
    break;
  case 'addPet':
    $pet->addPet($json);
    break;

}