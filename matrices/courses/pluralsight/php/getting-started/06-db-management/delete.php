<?php

if (isset($_GET['id']) && ctype_digit($_GET['id'])) {
    $id = $_GET['id'];
} else {
    header('Location: read.php');
}

$db = new mysqli(
    'localhost',
    'root',
    '',
    'php_getting_started'
);

$sql = "DELETE FROM users WHERE id=$id";
$db->query($sql);
echo '<p>User deleted.</p>';
$db->close();
?>