<ul>
<?php
$db = new mysqli(
    'localhost',
    'root',
    '',
    'php_getting_started'
);

$sql = 'SELECT * FROM users';
$result = $db->query($sql);

foreach ($result as $row) {
    printf(
        '<li><span style="color: %s">%s (%s)</span> 
        <a href="update.php?id=%s">Update</a>
        <a href="delete.php?id=%s">Delete</a>
        </li>',
        htmlspecialchars($row['color'], ENT_QUOTES),
        htmlspecialchars($row['name'], ENT_QUOTES),
        htmlspecialchars($row['gender'], ENT_QUOTES),
        htmlspecialchars($row['id'], ENT_QUOTES),
        htmlspecialchars($row['id'], ENT_QUOTES)
    );
}

$db->close();

?>
</ul>
