<?php
$roles = \DB\schema::get_enumset_values(pdo(), 'userdata', 'role');
