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

// Electro Funk
var discoJams = {
  title: 'Disco Jams',
}
var intermezzo = {
  title: 'Intermezzo',
};
var heartbreaker  = {
  title: 'Heartbreaker',
};
var venus  = {
  title: 'Venus',
};

// Misc. Old Projects
var beatBoxin  = {
  title: 'Beat Boxin',
};
var airports  = {
  title: 'Airports',
};
var comeGetToThis  = {
  title: 'Come Get To This',
};
var hats = {
  title: 'Hats',
};
var brushedCanvas = {
  title: 'Brushed Canvas',
};
var colorsOnceFaded = {
  title: 'Colors Once Faded',
};
var hitIt = {
  title: 'Hit It',
};
var thingsToSee = {
  title: 'Things To See',
};
var spilledMilk = {
  title: 'Spilled Milk',
};
var wayOfDrum = {
  title: 'Way of Drum',
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

// Musical Studies
var askYou = {
  title: 'Ask You',
};
var nothingToSay = {
  title: 'Nothing To Say',
};
var overload = {
  title: 'Overload',
};
var spaceLounge = {
  title: 'Space Lounge',
};

// For Beats Sake
var subwayFunk = {
  title: 'Subway Funk',
}
var bodySoul = {
  title: 'Body and Soul',
}
var theDankness = {
  title: 'The Dankness',
}
var floatInTheOcean = {
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
}
var spring = {
  title: 'Spring',
};
var angelEyes = {
  title: 'Angel Eyes',
}
var allAroundTheWorld = {
  title: 'All Around The World',
  alt: 'Theopilius London Remix',
};
var sometime = {
  title: 'Sometime',
};
var mrsBeats = {
  title: 'Mrs Beats',
}
var armchairs = {
  title: 'Armchairs',
};
var mozart = {
  title: 'Mozart',
};
var bodySoulReprise = {
  title: 'Body and Soul (Reprise)',
  short_title: 'body-and-soul-reprise',
};

var favorites = [
  subwayFunk,
  spaceLounge,
  spring,
  discoJams,
  bodySoul,
  beatBoxin,
  thingsToSee,
  theDankness,
];

var miscOld = [
  airports,
  beatBoxin,
  brushedCanvas,
  colorsOnceFaded,
  comeGetToThis,
  hats,
  hitIt,
  spilledMilk,
  thingsToSee,
  wayOfDrum,
];

var electronic = [
  discoJams,
  heartbreaker,
  intermezzo,
  venus,
];

var virion = [
  menuMusic,
  incubation,
  infection,
  infiltration,
  invasion,
];

var musicalStudies = [
  spaceLounge,
  overload,
  askYou,
  nothingToSay,
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
  bodySoulReprise,
];

var collections = [
  forBeatsSake,
  musicalStudies,
  electronic,
  miscOld,
  virion,
];

// Helper functions to add default locations of things
// Remove spaces and make lowercase to get title used in files
var makeShortTitle = function(title) {
  shortTitle = title.replace(/\s/g, "-");
  shortTitle = shortTitle.toLowerCase();
  return shortTitle;
};

var addSongInfo = function(songs) {
  songs.forEach(function(song) {
    //if !addedSongs[song.title]
    //addedSongs[song.title] = true
    if (song.short_title) {
      var shortTitle = song.short_title;
    } else {
      var shortTitle = makeShortTitle(song.title);
    }
    //song.url = '/music/' + shortTitle + '.mp3' if !song.url
    if (!song.url) {
      song.url = 'https://s3.amazonaws.com/jvkoh-music/' + shortTitle ;
    }
    if (!song.alt) {
      song.alt = song.title;
    }
    if (!song.songid) {
      song.songid = shortTitle;
    }
  });
};


addSongInfo(favorites);

var allSongs = [
];
  
collections.forEach( function(c) {
  addSongInfo(c);
  allSongs = allSongs.concat(c);
});

//**********************************
// Routes
//**********************************
app.get('/', function(req, res) {
  res.render('welcome', {
    isDevelopment: IS_LOCAL_MACHINE, 
    favorites: favorites,
    electronic: electronic,
    miscOld: miscOld,
    virion: virion,
    musicalStudies: musicalStudies,
    forBeatsSake: forBeatsSake,
    allSongs: allSongs,
  });
});

app.get('/*', function(req, res) {
  res.redirect('/');
});
