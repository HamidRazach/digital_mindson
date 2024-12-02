<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Git:Updating</title>
</head>

<body>
<span style="color: #6BE234;">Git:</span> <span style="color: #729FCF;">Updating</span><BR>
<pre>
<?php 
    // deploy.php

    // Set the project directory path
    $project_dir = '/home/digimdts/repositories/digital_mindson'; // Update with the correct path to your project

    // Change to the project directory
    chdir($project_dir);

    // Run Git pull to fetch the latest code from GitHub
    exec('git pull origin main', $output, $status);

    // Check if the pull was successful
    if ($status === 0) {
        echo "Deployment successful!";
    } else {
        echo "Deployment failed: " . implode("\n", $output);
    }

?>
</pre>
</body>
</html>