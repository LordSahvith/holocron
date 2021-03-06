<?php
$id = null;
if (isset($_GET['id']) && ctype_digit($_GET['id'])) {
    $id = $_GET['id'];
} else {
    header('Location: read.php');
}

$name = '';
$gender = '';
$color = '';

if (isset($_POST['submit'])) {
    $ok = true;

    if (!isset($_POST['name']) || $_POST['name'] === '') {
        $ok = false;
    } else {
        $name = $_POST['name'];
    }

    if (!isset($_POST['gender']) || $_POST['gender'] === '') {
        $ok = false;
    } else {
        $gender = $_POST['gender'];
    }

    if (!isset($_POST['color']) || $_POST['color'] === '') {
        $ok = false;
    } else {
        $color = $_POST['color'];
    }

    if ($ok) {
        $db = new mysqli(
            'localhost',
            'root',
            '',
            'php_getting_started'
        );

        $sql = sprintf(
            "UPDATE users SET name='%s', gender='%s', color='%s' WHERE id=%s",
            $db->real_escape_string($name),
            $db->real_escape_string($gender),
            $db->real_escape_string($color),
            $id
        );

        $db->query($sql);
        echo '<p>User updated.</p>';
        $db->close();
    }
} else {
    $db = new mysqli(
        'localhost',
        'root',
        '',
        'php_getting_started'
    );

    $sql = "SELECT * FROM users WHERE id=$id";
    $result = $db->query($sql);
    foreach ($result as $row) {
        $name = $row['name'];
        $gender = $row['gender'];
        $color = $row['color'];
    }

    $db->close();
}

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Registration Form</title>
</head>
<body>

<form action="" method="post">
    Username: <input type="text" name="name" value="<?= htmlspecialchars($name, ENT_QUOTES) ?>"><br>
    Gender:
    <input type="radio" name="gender" value="f" <?php
    if ($gender === 'f') {
        echo 'checked';
    }?>> Female
    <input type="radio" name="gender" value="m" <?php
    if ($gender === 'm') {
        echo 'checked';
    }?>> Male
    <input type="radio" name="gender" value="o" <?php
    if ($gender === 'p') {
        echo 'checked';
    }?>> Other <br>
    Favorite Color:
    <select name="color">
        <option value="">Please select</option>
        <option value="#f00" <?php
        if ($color === '#f00') {
            echo 'selected';
        }?>>Red</option>
        <option value="#0f0" <?php
        if ($color === '#0f0') {
            echo 'selected';
        }?>>Green</option>
        <option value="#00f" <?php
        if ($color === '#00f') {
            echo 'selected';
        }?>>Blue</option>
    </select> <br>
    <input type="submit" name="submit" value="Update">
</form>

</body>
</html>
