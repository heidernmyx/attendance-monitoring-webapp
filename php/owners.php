<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');



class Owner {
  function getOwner () {
    include './connection/connection.php';
    $sql = "SELECT
        `OwnerID`,
        `Name`,
        `ContactDetails`,
        `Address`
    FROM
        `owners`";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    unset($conn);
    unset($stmt);
    echo json_encode($result);

  }

  function addOwner($json) {
    include './connection/connection.php';


    $sql = "INSERT INTO `owners`(
        `Name`,
        `ContactDetails`,
        `Address`
    )
    VALUES(
        :owner,
        :contact_details,
        :address
    )";


    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':owner', $json['owner'], PDO::PARAM_STR);
    $stmt->bindParam(':contact_details', $json['contact_details'], PDO::PARAM_STR);
    $stmt->bindParam(':address', $json['address'], PDO::PARAM_STR);

    $stmt->execute();

    $result = $stmt->rowCount() > 0 ? 1 : 0;

    unset($conn);
    unset($stmt);
    echo json_encode($result);
  }

  function searchOwner($json) {
    include './connection/connection.php';
    $sql = "SELECT OwnerID, Name FROM owners WHERE Name LIKE :search"; 
    $stmt = $conn->prepare($sql);

    $searchParam = $json['search'] . '%';
    $stmt->bindParam(':search', $searchParam, PDO::PARAM_STR);
    $stmt->execute();

    $return = $stmt->fetchAll(PDO::FETCH_ASSOC);

    unset($conn);
    unset($stmt);
    echo json_encode($return);

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

$owner = new Owner();
switch ($operation) {
  case 'getOwner':
    $owner -> getOwner();
    break;
  case 'addOwner':
    $owner -> addOwner($json);
    break;
  case 'searchOwner':
      $owner -> searchOwner($json);
      break;
}
