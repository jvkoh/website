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
var intermezzo = {
    title: 'Intermezzo'
};
var allAroundTheWorld = {
    title: 'All Around The World',
    alt: 'Theopilius London Remix for his contest',
    soundCloudTitle: 'all-around-the-world'
};
var floatInTheOcean  = {
    title: 'Float In The Ocean',
    img: '/images/floatintheocean.jpg',
    soundCloudTitle: ''
};
var mozart  = {
    title: 'Mozart',
    img: '/images/mozart.gif'
};
var heartbreaker  = {
    title: 'HeartBreaker',
    img: '/images/heartbreaker.jpg'
};
var beatboxjam  = {
    title: 'Beat Box Jam',
    soundCloudTitle: 'beat-box-jam'
};
var venus  = {
    title: 'Venus',
    img: '/images/venus.jpg'
};
var sometime  = {
    title: 'Sometime',
    img: '/images/sometime.jpg'
};
var homepageMusic = [
  floatInTheOcean,
  mozart,
  allAroundTheWorld,
  intermezzo,
  heartbreaker,
  beatboxjam,
  venus,
  sometime
];

var music2012 = [
  venus,
  sometime
]

// Helper functions to add default locations of things
// Remove spaces and make lowercase to get title used in files
var makeShortTitle = function(title) {
  shortTitle = title.replace(/\s/g, "");
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
    if (song.soundCloudUrl != '' && !song.soundCloudUrl) {
      if (song.soundCloudTitle) {
        song.soundCloudUrl = song.soundCloudTitle;
      } else {
        //Default to shortTitle
        if (!song.soundCloudUrl) {
          song.soundCloudUrl = shortTitle;
        }
      }
      song.soundCloudUrl = 'http://www.soundcloud.com/jvkoh/' + song.soundCloudUrl
    }
    if (!song.alt) {
      song.alt = song.title;
    }
  });
};

addImages(homepageMusic);
addSongInfo(homepageMusic);
addSongInfo(music2012);


//**********************************
// Routes
//**********************************
app.get('/', function(req, res) {
  res.render('welcome', {
    isDevelopment: IS_LOCAL_MACHINE, 
    homepageMusic: homepageMusic,
    music2012: music2012
  });
});
