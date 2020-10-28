<?php
echo '<br>';
$name = '';
$password = '';
$gender = '';
$color = '';
$languages = [];
$comments = '';
$tc = '';

if (isset($_POST['submit'])) {
    $ok = true;

    if (!isset($_POST['name']) || $_POST['name'] === '') {
        $ok = false;
    } else {
        $name = $_POST['name'];
    }

    if (!isset($_POST['password']) || $_POST['password'] === '') {
        $ok = false;
    } else {
        $password = $_POST['password'];
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

    if (!isset($_POST['languages']) ||
            !is_array($_POST['languages']) ||
            count($_POST['languages']) === 0) {
        $ok = false;
    } else {
        $languages = $_POST['languages'];
    }

    if (!isset($_POST['comments']) || $_POST['comments'] === '') {
        $ok = false;
    } else {
        $comments = $_POST['comments'];
    }

    if (!isset($_POST['tc']) || $_POST['tc'] === '') {
        $ok = false;
    } else {
        $tc = $_POST['tc'];
    }

    if ($ok) {
        printf('Username: %s <br> 
            Password: %s <br>
            Gender: %s <br>
            Color: %s <br>
            Language(s): %s <br>
            Comments: %s <br>
            T&amp;C: %s',
            htmlspecialchars($name, ENT_QUOTES),
            htmlspecialchars($password, ENT_QUOTES),
            htmlspecialchars($gender, ENT_QUOTES),
            htmlspecialchars($color, ENT_QUOTES),
            htmlspecialchars(implode(' ', $languages), ENT_QUOTES),
            htmlspecialchars($comments, ENT_QUOTES),
            htmlspecialchars($tc, ENT_QUOTES)
        );
    }
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
        Username: <input type="text" name="name"><br>
        Password: <input type="password" name="password"><br>
        Gender:
            <input type="radio" name="gender" value="f"> Female
            <input type="radio" name="gender" value="m"> Male
            <input type="radio" name="gender" value="o"> Other <br>
        Favorite Color:
            <select name="color">
                <option value="">Please select</option>
                <option value="#f00">Red</option>
                <option value="#0f0">Green</option>
                <option value="#00f">Blue</option>
            </select> <br>
        Languages:
            <select name="languages[]" multiple size="3">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="it">Italian</option>
            </select> <br>
        Comments: <textarea name="comments"></textarea> <br>
        <input type="checkbox" name="tc" value="ok">
            I accept the T&amp;C; <br>
        <input type="submit" name="submit" value="Search">
    </form>

</body>
</html>
