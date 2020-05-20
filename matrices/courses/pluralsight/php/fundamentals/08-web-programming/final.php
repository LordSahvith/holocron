<?php
include 'assets/include.php';

echo "<pre>";
print_r($_SESSION);
echo "</pre>";

$postedData = $_SESSION['formPostData'];
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
				Mailing List Information
			</h2>
		</div>        
        <div id="Body">
            <div>
                <label>Favorite Author:<?= $postedData['author']; ?>&nbsp;</label> 
                <span>&nbsp;</span>
            </div>		
            <div>
                <label>Favorite Century:<?= $postedData['century']; ?>&nbsp;</label>
                <span>&nbsp;</span>
            </div>
            <div>
                <label>Comments:<?= $postedData['comments']; ?>&nbsp;</label>
                <span>&nbsp;</span>
            </div>
            <div>
                <label>Name:<?= $postedData['name']; ?>&nbsp;</label>
                <span>&nbsp;</span>
            </div>
            <div>
                <label>E-mail Address:<?= $postedData['email']; ?>&nbsp;</label>
                <span>&nbsp;</span>
            </div>
            <div>
                <label>Receive Newsletter:<?= $postedData['submit']; ?>&nbsp;</label>
                <span>&nbsp;</span>
            </div>
        </div>
	</body>
</html>