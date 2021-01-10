<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - Caleb Anderson</title>

    <link rel="stylesheet" href="../uikit/designing/css/uikit.min.css">

    <style>
        .projects {
            margin: 0 auto;
            max-width: 300px;
        }
    </style>
</head>
<body>

    <?php include 'components/navigation.html'; ?>

    <main>
        <section class="projects">
            <?php // include 'components/projects-carousel.html'; ?>
        </section>
    </main>

    <div class="test" do-as-i-please="fuck yeah"></div>

    <script>
        let test = document.querySelector('.test');
        let attr = test.getAttribute('do-as-i-please');
        console.log(attr);
    </script>


    <script src="../uikit/designing/js/uikit.min.js"></script>    
</body>
</html>