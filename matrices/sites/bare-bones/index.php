<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Holocron - Bare Bones</title>

    <link rel="stylesheet" href="css/bare-bones.css">
</head>

<body>

    <nav class="bb-navbar">
        <div class="bb-navbar-contents">
            <div class="bb-navbar-contents-logo">
                <a href="http://holocron.local/"><img src="https://via.placeholder.com/70?text=Logo" alt="Logo"></a>
            </div>
            <div class="bb-navbar-contents-links">
                <ul> <!-- TODO: add lists for "Elements" & "Components" : need to update height of dropdown -->
                    <li><a href="components/button/button.php">Button</a></li>
                    <li><a href="components/card/card.php">Card</a></li>
                    <li><a href="components/columns/col.php">Columns</a></li>
                    <li><a href="components/footer/footer.php">Footer</a></li>
                    <li><a href="components/hero/hero.php">Hero</a></li>
                    <li><a href="components/media-block/media-block.php">Media Block</a></li>
                    <li><a href="components/navigation/main-nav.php">Navigation</a></li>
                </ul>
            </div>
            <div class="bb-navbar-contents-mobileIcon bb-mobileIcon">
                <div class="toggle-button">
                    <div class="menu-bar menu-bar--top"></div>
                    <div class="menu-bar menu-bar--middle"></div>
                    <div class="menu-bar menu-bar--bottom"></div>
                </div>
            </div>
        </div>
    </nav>

    <script src="js/utils.js"></script>
    <script src="js/components/navbar.js"></script>
    <script src="js/components/menu-list.js"></script>

</body>

</html>