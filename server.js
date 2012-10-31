/**
 * Module dependencies.
 */

var express = require('express'),
  app = module.exports = express.createServer(),
  siteConf = require('./lib/getConfig'),
  coffeecup = require('coffeecup');


var sys = require('util');
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var IS_LOCAL_MACHINE = siteConf.isLocal;

app.configure(function(){
  app.set('views', './src/views');
  app.set('view engine', 'coffee');
  app.register('.coffee', coffeecup.adapters.express);
  app.set('view options', {layout: true});
  app.use(express.static(__dirname + '/public/'));

  app.use(express.bodyParser());

  app.use(express.methodOverride());
  app.use(app.router);
  // Default route is html/, explicitly specify all others
  app.use(function(req, res, next) {
    res.render('404', { status: 404, error: 'error description' });
  });

  process.on('uncaughtException', function(err) {
    console.log("ZQX Caught Exception: ", err);
  });

});

app.configure('development', function(){
  //app.use(express.logger({format: ':method :uri' }));
  app.use(express.logger());
  app.use(express.errorHandler({
    dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
});

// Error
app.error(function(err, req, res, next) {
  console.log("ZQX GOT ERROR, in app.error");
  console.log(err);
  console.log(err.stack);
  res.render('500', {
    error: err
  });
});


app.listen(3000);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


//**********************************
// Music
//**********************************

// Misc Live Tracks
var threeFour = {
  title: '3-4',
};
var hats = {
  title: 'Hats',
  img: '/images/Graffiti7.jpeg',
};
var brushedCanvas = {
  title: 'Brushed Canvas',
};
var colorsOnceFaded = {
  title: 'Colors Once Faded',
};
var funkJam = {
  title: 'Funk Jam',
};
var hitIt = {
  title: 'Hit It',
};
var underPressure = {
  title: 'Under Pressure',
};
var wayOfDrum = {
  title: 'Way of Drum',
};

// Electro Funk
var discoJams = {
  title: 'Disco Jams',
  img: '/images/Graffiti8.jpeg',
}
var intermezzo = {
  title: 'Intermezzo',
};
var heartbreaker  = {
  title: 'Heartbreaker',
  img: '/images/Graffiti9.jpeg',
};
var venus  = {
  title: 'Venus',
};
var beatTheClock  = {
  title: 'Beat The Clock',
  alt: 'Ableton Beat The Clock Remix',
};

// Misc Beats
var beatBoxJam  = {
  title: 'Beat Box Jam',
  img: '/images/Graffiti5.jpeg',
};
var airports  = {
  title: 'Airports',
};
var allINeed = {
  title: 'All I Need',
};
var comeGetToThis  = {
  title: 'Come Get To This',
};
var love = {
  title: 'Love',
};
var bach = {
  title: 'Bach',
};

// Virion
var incubation  = {
  title: 'Incubation',
};
var infection = {
  title: 'Infection',
};
var infiltration  = {
  title: 'Infiltration',
};
var invasion = {
  title: 'Invasion',
};
var menuMusic = {
  title: 'Menu Music',
};

// Independant Study
var askYou = {
  title: 'Ask You',
  img: '/images/Graffiti2.jpeg',
};
var nothingToSay = {
  title: 'Nothing To Say',
};

// Album
var subwayFunk = {
  title: 'Subway Funk',
}
var bodySoul = {
  title: 'Body and Soul',
  img: '/images/Graffiti4.jpeg',
}
var theDankness = {
  title: 'The Dankness',
}
var floatInTheOcean  = {
  title: 'Float In The Ocean',
};
var mischief = {
  title: 'Mischief',
}
var ponds = {
  title: 'Ponds',
}
var salaBim = {
  title: 'SalaBim',
  img: '/images/Graffiti3.jpeg',
}
var spring = {
  title: 'Spring',
  img: '/images/Graffiti6.jpeg',
};
var angelEyes = {
  title: 'Angel Eyes',
}
var allAroundTheWorld = {
  title: 'All Around The World',
  alt: 'Theopilius London Remix',
};
var sometime  = {
  title: 'Sometime',
};
var mrsBeats = {
  title: 'Mrs Beats',
}
var armchairs = {
  title: 'Armchairs',
};
var mozart  = {
  title: 'Mozart',
};


var homepageMusic = [
  bodySoul,
  discoJams,
  spring,
  heartbreaker,
  askYou,
  salaBim,
  beatBoxJam,
  hats,
];

var miscLive = [
  threeFour,
  brushedCanvas,
  colorsOnceFaded,
  funkJam,
  hats,
  hitIt,
  underPressure,
  wayOfDrum
];

var electroFunk = [
  discoJams,
  heartbreaker,
  intermezzo,
  venus,
  beatTheClock
];

var miscBeats = [
  airports,
  allINeed,
  bach,
  beatBoxJam,
  comeGetToThis,
  love
];

var virion = [
  incubation,
  infection,
  infiltration,
  invasion,
  menuMusic
];

var musicalStudies = [
  askYou,
  nothingToSay
];

var forBeatsSake = [
  subwayFunk,
  bodySoul,
  theDankness,
  floatInTheOcean,
  mischief,
  ponds,
  salaBim,
  spring,
  angelEyes,
  allAroundTheWorld,
  sometime,
  mrsBeats,
  armchairs,
  mozart,
];


// Helper functions to add default locations of things
// Remove spaces and make lowercase to get title used in files
var makeShortTitle = function(title) {
  shortTitle = title.replace(/\s/g, "-");
  shortTitle = shortTitle.toLowerCase();
  return shortTitle;
};

var addImages = function (songs) {
  songs.forEach(function(song) {
    shortTitle = makeShortTitle(song.title);
    if (!song.img) {
      song.img = '/images/' + shortTitle + '.jpeg';
    }
  });
};

var addSongInfo = function(songs) {
  songs.forEach(function(song) {
    //if !addedSongs[song.title]
    //addedSongs[song.title] = true
    var shortTitle = makeShortTitle(song.title);
    //song.url = '/music/' + shortTitle + '.mp3' if !song.url
    if (!song.url) {
      song.url = 'https://s3.amazonaws.com/jvkoh-music/' + shortTitle + '.mp3';
    }

    // empty means no soundcloud
    // Don't set twice
//    if (song.soundCloudUrl != '' && !song.soundCloudUrl) {
//      if (song.soundCloudTitle) {
//        song.soundCloudUrl = song.soundCloudTitle;
//      } else {
//        //Default to shortTitle
//        if (!song.soundCloudUrl) {
//          song.soundCloudUrl = shortTitle;
//        }
//      }
//      song.soundCloudUrl = 'http://www.soundcloud.com/jvkoh/' + song.soundCloudUrl
//    }
    if (!song.alt) {
      song.alt = song.title;
    }
  });
};

addImages(homepageMusic);
addSongInfo(homepageMusic);
addSongInfo(miscLive);
addSongInfo(electroFunk);
addSongInfo(miscBeats);
addSongInfo(virion);
addSongInfo(musicalStudies);
addSongInfo(forBeatsSake);


//**********************************
// Routes
//**********************************
app.get('/', function(req, res) {
  res.render('welcome', {
    isDevelopment: IS_LOCAL_MACHINE, 
    homepageMusic: homepageMusic,
    miscLive: miscLive,
    electroFunk: electroFunk,
    miscBeats: miscBeats,
    virion: virion,
    musicalStudies: musicalStudies,
    forBeatsSake: forBeatsSake,
  });
});
