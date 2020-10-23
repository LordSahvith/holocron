<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PO Box Regex</title>
</head>

<body>

    <?php

    $poBoxRegex = '/^(P\.?O\.?)?\s?Box\s*\d+/i';
    $addresses = ['pO Box 1234', 'P.O. Box 1234', 'Box 1234', 'Boxer 1234', 'PO Boxer 1234', '1234 Box'];

    foreach ($addresses as $address) {
    ?>
        <div class="display"><?= $address; ?></div>
        <?php
    }

    ?>
    <br>
    <?php

    foreach ($addresses as $address) {
        if (preg_match($poBoxRegex, strtolower($address))) {
        ?>
            <div class="display"><?= $address; ?></div>
    <?php
        }
    }

    ?>

</body>

</html>