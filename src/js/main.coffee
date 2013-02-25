console.log("IN MAIN")

# Everything for jvkoh for now:w
$('#jp-no-solution-wrapper').hide()
setTitle = (title) ->
  $('#jp-title-text').html(title)
setSoundCloudLink = (url) ->
  if !url
    $('#soundCloudLink').hide()
  else
    $('#soundCloudLink').show()
    $('#soundCloudLink').html( '<a href="' + url + '"  target="_blank" id="asdf"> <img src="/images/soundcloud.png"/> </a>')
jPlayerDiv = $("#jquery_jplayer_1")
jPlayerDiv.jPlayer( {
  ready: () ->
  supplied: 'mp3'
  wmode: 'window'
})

playSong = (songUrl, songTitle, soundCloudUrl, dontStartPlaying) ->
  if dontStartPlaying #false  if not passed in
    jPlayerDiv.jPlayer("setMedia", {
      mp3: songUrl
    }).jPlayer()
  else
    jPlayerDiv.jPlayer("setMedia", {
      mp3: songUrl
    }).jPlayer('play')
  setTitle(songTitle)
  setSoundCloudLink(soundCloudUrl)

$('.playableSong').click((e) ->
  e.preventDefault()
  songDiv = $(this)
  songUrl = songDiv.attr('url')
  songTitle = songDiv.attr('title')
  soundCloudUrl = songDiv.attr('soundCloudUrl')
  playSong(songUrl, songTitle, soundCloudUrl)
)
playSong('https://s3.amazonaws.com/jvkoh-music/floatintheocean.mp3', 'Float in the Ocean', '', true)

$('#soundCloudLink').css({
  position: 'relative'
  left: 45
  top: 8
}).show()

# Hide no solution warning because it flickers at first
setTimeout(
  () ->
    $('#jp-no-solution-wrapper').show()
  5000
)
