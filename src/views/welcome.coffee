head ->

  title "Jonathan Koh"

  meta charset:'utf-8'
  meta 'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'
  meta name: "viewport", content: "initial-scale=1.0 maximum-scale=1.0 minimum-scale=1.0 user-scalable=no"
  #meta(name='viewport', content='width=640, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')
  #meta name:'apple-mobile-web-app-capable', content:'yes'

  text '''
    <script type="text/javascript">

      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-35896590-1']);
      _gaq.push(['_setDomainName', 'jvkoh.com']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();

    </script>
       '''

  # TODO: Add description, keywords, robots, author, favicon

  if @isDevelopment
    link rel:"stylesheet", type:'text/css', href:"/dev/css/master.css"

    # Application source 
    script type: "text/javascript", src: "/dev/js/libs/jquery.min.js"
    script type: "text/javascript", src: "/dev/js/libs/jquery.jplayer.min.js"
    script type:"text/javascript", src: "/dev/js/main.js"

  if !@isDevelopment
    link rel: 'stylesheet', type:'text/css', href: "/release/master.min.css"
    script type: 'text/javascript', src: '/release/jquery.min.js'
    script type: 'text/javascript', src: '/release/javascript.min.js'


body ->

  div id: 'curSongID', class: 'hidden', ->

  div id: 'allSongs', class: 'hidden', ->
    for song in @allSongs
      div id: song.songid, title: song.title, ->
        song.url

  div id: 'modalDim', class: 'mobileHide', ->

  div id: 'header', ->

    div id: "info-bar", ->
      div id: "page-title", ->
        text "Jonathan Koh"
      div id: "nav", class: "mobileHide", ->
        a class: 'navButton aboutButton', href: '', ->
          text 'About Me/Contact'
      div id: 'jplayerBar', ->
          div class: 'container', ->
            div id: 'jquery_jplayer_1', class: 'jp-jplayer'
            text '''
              <div id="jp_container_1" class="jp-audio">
                <div class="jp-type-single">
                  <div class="jp-gui jp-interface">

                    <ul class="jp-controls">
                      <li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>
                      <li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>
                      <li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>
                      <li><a href="javascript:;" class="jp-mute" tabindex="1" title="mute">mute</a></li>
                      <li><a href="javascript:;" class="jp-unmute" tabindex="1" title="unmute">unmute</a></li>
                      <li><a href="javascript:;" class="jp-volume-max" tabindex="1" title="max volume">max volume</a></li>
                    </ul>
                    
                    <div class="jp-volume-bar">
                      <div class="jp-volume-bar-value"></div>
                    </div>
                    
                    <div class="jp-title">
                      <ul>
                        <li id="jp-title-text">Cro Magnon Man</li>
                      </ul>
                    </div>

                    <div class="jp-time-holder">
                      <div class="jp-current-time"></div>
                       / 
                      <div class="jp-duration"></div>
                    </div>

                    <div class="clear-both"></div>

                  </div>

                  <div id="jp-no-solution-wrapper">
                    <div class="jp-no-solution">
                      <span>Update Required</span>
                      To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                    </div>
                  </div>
                </div>
              </div>
          '''
      div class: "clear-both", ->


  ## Background Image ##  
  div id: 'main-bg-wrapper', ->
    div id: 'main-bg-image', ->

  ## Contact Modal ##
  div id: 'aboutContainer', class: 'mobileHide', ->
    div id: 'aboutModal', ->
      a href: '', class: 'aboutButton aboutClose', ->
        img src: '/images/close.png'
      h2 "About"
      img src: '/images/profile.jpeg', alt:'Me', class: 'inline-image', width:'180px', ->
      p ->
       text 'I am a 22 year old male human, and my spirit animal is a rabbit.  I have been programming for 5 years, and producing and recording music for about 8 years.  I have been playing guitar since I was 10 years old, and drums since I was 14 (although I am a completely self-taught drummer).  Having recently graduated from Brown University with a dual-degree in Computer Science and Electronic music, I am always looking for interesting ways that I can put either my programming or musical abilities to good use. So if you need someone to help you with your technology needs, your sound needs, or both, I\'m your guy.'
      p ->
        text 'If you would like to get in touch with me, feel free to send me an email at '
        a class: 'text-link', href: 'mailto:jonathanvkoh@gmail.com' , 'jonathanvkoh@gmail.com'
        text '. If you would like to see my resume, click '
        a class: 'text-link', href: 'http://resume.jvkoh.com/', target: '_blank', 'here'
        text '.'
      p ->
        a class: 'socialLink', target: '_blank', href: 'http://www.linkedin.com/pub/jonathan-koh/2b/911/689', ->
          img src: '/images/linkedin.png'
        a class: 'socialLink', target: '_blank', href: 'http://facebook.com/jonnyk', ->
          img src: '/images/facebook.png'
        a class: 'socialLink', target: '_blank', href: 'http://twitter.com/jvkoh', ->
          img src: '/images/twitter.png'
      
      div class: 'clear-both', ->

  ## MAIN CONTENT ##
  div id: 'main-content', ->

    ## HOME/MUSIC PAGE ##
    div id: 'homePage', ->

      ## WELCOME ##
      div class: 'box', ->
        h2 "Welcome"
        div class: 'indentedSection', ->
          div class: 'textPadding', "My name is Jonathan Koh, and I am a computer scientist and musician.  This website is a sampling of my musical endeavors.  If you would like to know more about me, check out the about section. I hope you enjoy listening, and if you're unsure of where to start, here are a few of my favorites!"
          div class: 'textPadding', ->
            b 'NOTE: If your internet connection is slow, songs may not load immeadiately, please be patient.<br> This music player does not currently support the web browsers MOZILLA FIREFOX or OPERA.'
          div class: 'songsContainer', ->
            for song in @favorites
              a class: 'playableSong songContainer', href: '', url: song.url, title: song.title,id: song.songid, ->
                img class: 'playButton', src: '/images/playbutton.png'
                div class: 'songTitle', ->
                  song.title
                div class: 'clear-both'
            div class: 'clear-both', ->
          div class: 'clear-both', ->

      ## FOR BEATS SAKE ##
      div class: 'box', ->
        h2 ->
          text "For Beats Sake"
        div class: 'indentedSection', ->
          div class: 'textPadding', ->
            text "For Beats Sake is my first full-length album.  It was released January 3rd of 2013 on "
            a class: 'text-link', href: 'http://lazyrabbitmusic.com', 'Bandcamp'
            text ". I released it under the artist name Lazy Rabbit because of the albums relaxed nature and my love of lettuce. The entire album was recorded, mixed, and mastered in my home studio using Ableton Live."
          div class: 'songsContainer', ->
            for song in @forBeatsSake
              a class: 'playableSong songContainer', href: '', url: song.url, title: song.title,id: song.songid, ->
                img class: 'playButton', src: '/images/playbutton.png'
                div class: 'songTitle', ->
                  song.title
                div class: 'clear-both'
            div class: 'clear-both', ->
          div class: 'clear-both', ->
          
      ## ELECTROFUNK ##
      div class: 'box', ->
        h2 "Electronic Explorations"
        div class: 'indentedSection', ->
          div class: 'textPadding', "This section is for a few largely electronic songs that I made in my last two years of college. These tracks are primarily composed of samples, analog synthesizers, slap bass, and funk guitar.  Everything that was recorded, was recorded at my home studio.  These tracks were all made with Ableton Live."
          div class: 'songsContainer', ->
            for song in @electronic
              a class: 'playableSong songContainer', href: '', url: song.url, title: song.title,id: song.songid, ->
                img class: 'playButton', src: '/images/playbutton.png'
                div class: 'songTitle', ->
                  song.title
                div class: 'clear-both'
            div class: 'clear-both', ->
          div class: 'clear-both', ->

      ## MUSICAL STUDIES ##
      div class: 'box', ->
        h2 "Academic Compositions"
        div class: 'indentedSection', ->
          div class: 'textPadding', "These are a few songs that I made for my various classes computer music classes at Brown University.  These were also all made in my home studio.  The majority of these songs were made using ProTools."
          div class: 'songsContainer', ->
            for song in @musicalStudies
              a class: 'playableSong songContainer', href: '', url: song.url, title: song.title,id: song.songid,  ->
                img class: 'playButton', src: '/images/playbutton.png'
                div class: 'songTitle', ->
                  song.title
                div class: 'clear-both'
            div class: 'clear-both', ->
          div class: 'clear-both', ->

      ## OLD TRACKS ##
      div class: 'box', ->
        h2 "Older Tracks"
        div class: 'indentedSection', ->
          div class: 'textPadding', "These are songs that I wrote/improvised in my first two years of college.  The majority of the tracks are all played by me, one instrument at a time.  This was also recorded in my home studio with either Sonar or ProTools."
          div class: 'songsContainer', ->
            for song in @miscOld
              a class: 'playableSong songContainer', href: '', url: song.url, title: song.title,id: song.songid, ->
                img class: 'playButton', src: '/images/playbutton.png'
                div class: 'songTitle', ->
                  song.title
                div class: 'clear-both'
            div class: 'clear-both', ->
          div class: 'clear-both', ->

      ## VIRION ##
      div class: 'box', ->
        h2 "Virion Music"
        div class: 'indentedSection', ->
          div class: 'textPadding', ->
            text "This is the soundtrack that I made to the video game Virion.  It is an arcade style game based on the human immune system and viruses.  Varun Singh and Jonah Kagan did a great job developing the game, and Charis Loke did amazing work with the art. I made this soundtrack and designed all of the sound effects."
          div class: 'songsContainer', ->
            for song in @virion
              a class: 'playableSong songContainer', href: '', url: song.url, title: song.title,id: song.songid, ->
                img class: 'playButton', src: '/images/playbutton.png'
                div class: 'songTitle', ->
                  song.title
                div class: 'clear-both'
            div class: 'clear-both', ->
          div class: 'clear-both', ->
          
      ## About ## (MOBILE ONLY)
      div class: 'box mobileShow', ->
        div class: 'link-target', id: 'contact', ->
        h2 "About"
        img src: '/images/profile.jpeg', alt:'Me', class: 'inline-image', width:'200px', ->
        p ->
         text 'I am a 22 year old male human, and my spirit animal is a rabbit.  I have been programming for 5 years, and producing and recording music for about 8 years.  I have been playing guitar since I was 10 years old, and drums since I was 14 (although I am a completely self-taught drummer).  Having recently graduated from Brown University with a dual-degree in Computer Science and Electronic music, I am always looking for interesting ways that I can put either my programming or musical abilities to good use. So if you need someone to help you with your technology needs, your sound needs, or both, I\'m your guy.'
        p ->
          text 'If you would like to get in touch with me, feel free to send me an email at '
          a class: 'text-link', href: 'mailto:jonathanvkoh@gmail.com' , 'jonathanvkoh@gmail.com'
          text '. If you would like to see my resume, click '
          a class: 'text-link', href: 'http://resume.jvkoh.com/', target: '_blank', 'here'
          text '.'
        p ->
          a class: 'socialLink', target: '_blank', href: 'http://www.linkedin.com/pub/jonathan-koh/2b/911/689', ->
            img src: '/images/linkedin.png'
          a class: 'socialLink', target: '_blank', href: 'http://facebook.com/jonnyk', ->
            img src: '/images/facebook.png'
          a class: 'socialLink', target: '_blank', href: 'http://twitter.com/jvkoh', ->
            img src: '/images/twitter.png'
        
        div class: 'clear-both', ->
