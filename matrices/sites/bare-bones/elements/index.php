<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bare Bones - Elements</title>

    <link rel="stylesheet" href="../css/bare-bones.css">
</head>

<body>

    <h1>Heading 1 - &lt;h1&gt;</h1>
    <h2>Heading 2 - &lt;h2&gt;</h2>
    <h3>Heading 3 - &lt;h3&gt;</h3>
    <h4>Heading 4 - &lt;h4&gt;</h4>
    <h5>Heading 5 - &lt;h5&gt;</h5>
    <h6>Heading 6 - &lt;h6&gt;</h6>

    <br>

    <p>Paragraph - &lt;p&gt;</p>

    <br>

    <a href="#">Link - &lt;a&gt;</a>

    <br>
    <br>

    <button>Button - &lt;button&gt;</button>

    <br>
    <br>

    <ol>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
        <li>List Item 4</li>
    </ol>

    <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
        <li>List Item 3</li>
        <li>List Item 4</li>
    </ul>

    <br>

    <img src="../assets/images/red-mobile.jpg" alt="">

    <br>
    <br>

    <picture>
        <source media="(min-width: 992px)" srcset="../assets/images/red-desktop.jpg">
        <source media="(min-width: 641px)" srcset="../assets/images/red-tablet-v2.jpg">
        <source media="(max-width: 640px)" srcset="../assets/images/red-mobile.jpg">
        <img src="../images/red-desktop.jpg" alt="">
    </picture>

    <br>
    <br>

    <video controls autoplay>
        <source src="../assets/videos/big-buck.mp4" type="video/mp4">
        <source src="../assets/videos/big-buck.ogg" type="video/ogg">
        Your browser does not support the video tag.
    </video>

    <br>
    <br>

        <canvas id="myCanvas" style="background: #000;"></canvas>

    <br>
    <br>

    <iframe src="https://www.youtube.com/embed/5gcjGuKVcbM" title="YouTube video player"></iframe>

</body>

</html>