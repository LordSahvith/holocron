<?php
include 'assets/include.php';
require 'assets/db-connection.php';

$query = 'SELECT id, first_name, last_name, pen_name FROM Authors ORDER BY id';
$authors = $connection->query($query);

if (isset($_POST['email'])) {
    if ($_POST['email'] != '') {
        $_SESSION['formPostData'] = $_POST;
        header('Location: final.php');
    } else {
        $emailError = 'validation';
    }
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>PHP Fundamentals</title>
		<link href="assets/styles.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
		<div id="Header">
			<img src="assets/Dickens_Gurney_head.jpg" border="0" alt="">
			<h2>
				Join Our Literature Mailing List
			</h2>
		</div>        
        <div id="Body">
            <form method="post" action="index.php" >
                <div>
                    <label>Favorite Author:</label>
                    <select name="author">
                        <?php while ($singleAuthor = $authors->fetch_assoc()) : ?>
                        <option value="<?= $singleAuthor['id'] ?>"><?= $singleAuthor['first_name'] . ' ' . $singleAuthor['last_name']; ?></option>
                        <?php endwhile; ?>
                    </select>
                </div>		
                <div class="multiple">
                    <label>Favorite Century:</label>
                    17th Century <input type="checkbox" name="century[]" value="17th">
                    18th Century <input type="checkbox" name="century[]" value="18th">
                    19th Century <input type="checkbox" name="century[]" value="19th">
                </div>
                <div>
                    <label>Comments:</label>
                    <textarea name="comments"></textarea>
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" />
                </div>
                <div class="<?= $emailError; ?>">
                    <label>E-mail Address:</label>
                    <input type="text" name="email" />
                </div>
                <div  class="multiple">
                    <label>Receive Newsletter:</label>
                    Yes <input type="radio" name="newsletter" value="yes">
                    No <input type="radio" name="newsletter" value="no">
                </div>
                <div class="multiple">
                    <label>&nbsp;</label>
                    <input type="submit" name="submit" value="Join Mailing List">
                </div>
            </form>
        </div>
	</body>
</html>