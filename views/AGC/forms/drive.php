<?php

$google = new wpgoogle();
$gClient = $google->client;
if ($google->isValid()) {
  header('Content-type: application/json');
  check_subscriber($gClient);
  $service = new Google_Service_Oauth2($gClient);
  $_SESSION['google_user'] = $service->userinfo->get();
  $driveService = new Google_Service_Drive($gClient);
  if (isset($_REQUEST['upload']) && isset($_POST['file']) && isset($_POST['id'])) {
    $file_upload = trim($_POST['file']);
    $id = trim($_POST['id']);
    $upload_now = false;
    $infofile = dirname($file_upload) . '/' . $id . '.json';
    if (file_exists($infofile)) { //reduce IO
      $j_vid = json_decode(file_get_contents($infofile));
      if (!isset($j_vid->drive)) {
        $upload_now = true;
      }
    }
    if ($upload_now && isset($j_vid) && file_exists($file_upload)) {
      try {
        $fileMetadata = new Google_Service_Drive_DriveFile([
          'name' => basename($file_upload),
        ]);
        $fileMetadata->setDescription($id);
        $content = file_get_contents($file_upload);
        $file = $driveService->files->create($fileMetadata, [
          'data' => $content,
          'mimeType' => mime_content_type($file_upload),
          'uploadType' => 'multipart',
          'fields' => 'name,id,webContentLink,webViewLink,mimeType',
        ]);
        if (isset($file->id)) {
          $j['drive'] = true;
          $a = j(printFile($file, $j));
          file_put_contents($infofile, $a);
          @unlink($file_upload);
          $jsinfo = str_replace('.mp3', '.info.json', basename($file_upload));
          exit($a);
        }
      } catch (Exception $th) {
        $core->dump($th);
      }
    } else {
      $core->dump(['error' => 'file has been uploaded', 'info' => [$infofile, file_exists($infofile), 'contents' => file_exists($infofile) ? json_decode(file_get_contents($infofile)) : null]]);
    }
  } else {
    $optParams = [
      //corpora' => 'drive',
      'pageSize' => 10,
      //'fields' => "nextPageToken, files(contentHints/thumbnail,fileExtension,iconLink,id,name,size,thumbnailLink,webContentLink,webViewLink,mimeType,parents)",
      'fields' => 'files(webContentLink,webViewLink,id,mimeType,name,exportLinks)',
      //'q' => "'".$folderId."' in parents"
      'orderBy' => 'modifiedTime',

      'includeItemsFromAllDrives' => 'true',
      'supportsTeamDrives' => 'true',
      'prettyPrint' => 'true',
      'alt' => 'json',
    ];
    $results = $driveService->files->listFiles($optParams);

    echo j($results);
  }
}


/**
 * Print prettyprint json.
 **/
function j($results)
{
  return json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}

/**
 * Print a file's metadata.
 */
function printFile($file, $r = [])
{
  $fileId = $file->id;
  $r['url'] = ["https://drive.google.com/file/d/$fileId/view?usp=sharing", "https://docs.google.com/file/d/$fileId/edit", "https://drive.google.com/uc?id=$fileId&export=download", "https://drive.google.com/file/d/$fileId/view?usp=drivesdk", "https://drive.google.com/open?id=$fileId"];
  if (isset($file->webContentLink) && $file->webContentLink) {
    $r['url'][] = $file->webContentLink;
  }
  if (isset($file->webViewLink) && $file->webViewLink) {
    $r['url'][] = $file->webViewLink;
  }
  $r['name'] = $file->getName();
  $r['id'] = $file->id;

  return $r;
}

exit;
