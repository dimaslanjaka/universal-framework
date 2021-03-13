<?php
/**
 * Template Name: Redirect
*/ 
?>

<?php if (have_posts()) : the_post(); ?>

<?php $URL = get_the_excerpt(); if (!preg_match('/^http:\/\//', $URL)) $URL = 'http://' . $URL; ?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Refresh" content="0; url=<?php echo $URL; ?>"> 
</head>

<body>
</body>
</html>

<?php endif; ?>