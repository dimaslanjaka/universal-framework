var fs = require('fs');
var YoutubeMp3Downloader = require('youtube-mp3-downloader');

var file_put_contents = function(filename, content) {
  var typedata = typeof content;
  if (Array.isArray(content)) {
    typedata = 'array';
  }
  if (typedata == 'object' || Array.isArray(content)) {
    content = JSON.stringify(content, null, 4);
  }
  fs.writeFile(filename, content, {
    flag: 'w'
  }, function(err) {
    if (err)
      return console.error(err);
    fs.readFile(filename, 'utf-8', function(err, data) {
      if (err)
        return console.error(err);
      console.log(data);
    });
  });
}
var create_folder = function(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    });
  }
}

var arg = '';
var VID;
for (let j = 0; j < process.argv.length; j++) {
  arg = process.argv[j];
}

if (arg == 'install') {
  create_folder('log');
  create_folder('log/progress');
  create_folder('log/error');
  create_folder('log/progress');
  create_folder('mp3');
  return;
}

var YD = new YoutubeMp3Downloader({
  'ffmpegPath': 'D:\\bin\\ffmpeg\\bin\\ffmpeg.exe', // Where is the FFmpeg binary located?
  'outputPath': 'mp3/', // Where should the downloaded and encoded files be stored?
  'youtubeVideoQuality': 'highest', // What video quality should be used?
  'queueParallelism': 2, // How many parallel downloads/encodes should be started?
  'progressTimeout': 2000 // How long should be the interval of the progress reports
});

//Download video and save as MP3 file
YD.download(arg);
YD.on('finished', function(err, data) {
  //console.log(JSON.stringify(data));
  var file_finish = 'finish.json';
  if (VID) {
    file_finish = `${VID}.json`;
  }
  if (data.hasOwnProperty('videoId')) {
    file_finish = `${data.videoId}.json`;
  }
  file_put_contents(`log/finish/${file_finish}`, data);
});

YD.on('error', function(error) {
  //console.log(error);
  var file_error = 'error.json';
  if (VID) {
    file_error = `${VID}.json`;
  }
  file_put_contents(`log/error/${file_error}`, error);
});

YD.on('progress', function(progress) {
  //console.log(JSON.stringify(progress));
  var file_progress = 'progress.json';
  if (progress.hasOwnProperty('videoId')) {
    file_progress = `${progress.videoId}.json`;
  }
  file_put_contents(`log/progress/${file_progress}`, progress);
});