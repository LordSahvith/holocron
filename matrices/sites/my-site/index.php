<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Caleb Anderson</title>

    <link rel="stylesheet" href="../uikit/designing/css/uikit.min.css">

    <style>
        .projects {
            display: flex;
            justify-content: center;
            max-width: 300px;
        }
    </style>
</head>
<body>

    <?php include 'components/navigation.html'; ?>

    <main>
        <section class="projects">
            <?php include 'components/projects-carousel.html'; ?>
        </section>
    </main>



    <script src="../uikit/designing/js/uikit.min.js"></script>    
</body>
</html>