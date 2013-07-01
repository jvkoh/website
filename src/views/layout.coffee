doctype 5
html ->
  head ->

    title "Jonathan Koh"

    meta charset:'utf-8'
    meta 'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'
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
      link rel:"stylesheet", type:'text/css', href:"/css/master.css"

      # Application source 
      script type: "text/javascript", src: "/js/libs/jquery.min.js"
      script type: "text/javascript", src: "/js/libs/jquery.jplayer.min.js"
      script type:"text/javascript", src:"/js/main.js"

    if !@isDevelopment
      link rel: 'stylesheet', type:'text/css', href: "/release/master.min.css"
      script type: 'text/javascript', src: '/release/javascript.min.js'


  body ->

    div id: 'header', ->

      div id: "info-bar", ->
        div id: "page-title", ->
          text "Jonathan Koh"
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
        div id: "nav", ->
          a class: 'navButton', href: '#home', ->
            text 'Home'
          a class: 'navButton', href: '#music', ->
            text 'Music'
          a class: 'navButton', href: '#about', ->
            text 'About'
        div class: "clear-both", ->


      
    div id: 'main-bg-wrapper', ->
      div id: 'main-bg-image', ->

    ## MAIN CONTENT ##
    div id: 'main-content', ->

      ## HOME PAGE ##
      div id: 'homePage', ->
        div id: 'home', class: 'link-target', ->
        div class: 'box', ->
          h2 "Welcome"
          p ->
            b "News: "
            text "I just released an album.  The album is called \"For Beats\' Sake\" by Lazy Rabbit.  You can download it "
            a class: 'text-link', href: 'https://www.dropbox.com/sh/eguu1u3wdr5nuus/Jkv333lu3a', 'here'
            text " or from the "
            a class: 'text-link', href: 'http://lazyrabbit.bandcamp.com', "Lazy Rabbit Bandcamp"
            text "."
          p "I am a 21 year old guitarist/multi-instrumentalist.  I have an affinity for computers and work as a recording engineer/producer.  This is a showcase of some of my work.  I hope you enjoy listening."
          div class: 'divider', ->
          ## MUSIC HIGHLIGHTS ##
          h2 "Highlighted Music"
          ul class: 'project-list', ->
            for song in @homepageMusic
              li -> a class: 'playableSong hovergallery', href: '', url: song.url, title: song.title, ->
                img src: song.img, title: song.alt
                div class: 'mobile-white-link hoverSong', ->
                  text song.title
          div class: 'clear-both', ->

      ## MUSIC PAGE ##
      div id: 'musicPage', ->
        div id: 'music', class: 'link-target', ->
        div class: 'box', ->
          h2 "Music"
          p "Click a song title to listen!"

          ## FOR BEATS SAKE ##
          div class: 'indentedSection', ->
            h3 ->
              text "For Beats Sake - "
              a class: 'text-link', href: 'https://www.dropbox.com/sh/eguu1u3wdr5nuus/Jkv333lu3a', 'Download Album'
            div class: 'songsContainer', ->
              for song in @forBeatsSake
                a class: 'playableSong songTitle', href: '', url: song.url, title: song.title, ->
                  text song.title
              div class: 'clear-both', ->
            div class: 'textPadding', "For Beats Sake is my first full album.  It was released Januray 3rd of 2013.  The track All Around The World is a remix of the Theophilus London song, made for a remix contest of his."
            div class: 'clear-both', ->

          div class: 'divider', ->
            
          ## ELECTROFUNK ##
          div class: 'indentedSection', ->
            h3 "ElectroFunk"
            div class: 'songsContainer', ->
              for song in @electroFunk
                a class: 'playableSong songTitle', href: '', url: song.url, title: song.title, ->
                  text song.title
              div class: 'clear-both', ->
            div class: 'textPadding', "These are all largely digital tracks made through a combination of sampling techniques, synthesizers, and funk bass and guitar.  The result is in my mind somewhere between dance music, electro, and funk.  Beat the Clock is a remix I made for the ableton \'Beat the Clock\' remix contest, a contest where the song must be completed using ableton live in less than 24 hours."
            div class: 'clear-both', ->

          div class: 'divider', ->

          ## MUSICAL STUDIES ##
          div class: 'indentedSection', ->
            h3 "Academic Compositions"
            div class: 'songsContainer', ->
              for song in @musicalStudies
                a class: 'playableSong songTitle', href: '', url: song.url, title: song.title, ->
                  text song.title
              div class: 'clear-both', ->
            div class: 'textPadding', "These are tracks I have made for various classes."
            div class: 'clear-both', ->

          div class: 'divider', ->

          ## LIVE TRACKS ##
          div class: 'indentedSection', ->
            h3 "Misc Live Tracks"
            div class: 'songsContainer', ->
              for song in @miscLive
                a class: 'playableSong songTitle', href: '', url: song.url, title: song.title, ->
                  text song.title
              div class: 'clear-both', ->
            div class: 'textPadding', "This a set of jazz/funk tracks that I improvised one instrument at a time.  These were recorded during the summer after my freshman year in college."
            div class: 'clear-both', ->

          div class: 'divider', ->

          ## MISC BEATS ##
          div class: 'indentedSection', ->
            h3 "Misc Beats"
            div class: 'songsContainer', ->
              for song in @miscBeats
                a class: 'playableSong songTitle', href: '', url: song.url, title: song.title, ->
                  text song.title
              div class: 'clear-both', ->
            div class: 'textPadding', "This is a set of beats that I made in Ableton Live the summer after my sophomore year in college."
            div class: 'clear-both', ->

          div class: 'divider', ->

          ## VIRION ##
          div class: 'indentedSection', ->
            h3 "Viron Music"
            div class: 'songsContainer', ->
              for song in @virion
                a class: 'playableSong songTitle', href: '', url: song.url, title: song.title, ->
                  text song.title
              div class: 'clear-both', ->
            div class: 'textPadding', ->
              text "This is the soundtrack that I made to the video game "
              a href: 'https://apps.facebook.com/viriongame/', target:'_blank' , "Virion"
              text ".  This is an arcade style game based on the human immune system and viruses, that I produced all the sound and music for.  Varun Singh and Jonah Kagan did a great job developing the game, and Charis Loke did amazing work with the art."
            div class: 'clear-both', ->
            
      ## ABOUT PAGE ##
      div id: 'aboutPage', ->
        div id: 'about' , class: 'link-target', ->
        div class: 'box', ->
          h2 "About"
          img src: '/images/profile.jpeg', alt:'Me', class: 'inline-image', width:'200px', ->
          p ->
            text 'Currently pursuing a Computer Music and Computer Science double major at Brown University, I spend my time away from classes primarily on my music.  While I am by no means striving to be a solo artist, I love playing music and understand the importance of being able to hold a groove in any sort of ensemble.  I am primarily a guitarist, but also am a very competent bassist and drummer.  I also have experience as a sound engineer, having spent summers at '
            a href: 'http://www.qdivisionstudios.com/index.html', target:'_blank' , "Q-Division Studios"
            text ' and '
            a href: 'http://www.wellspringsound.com/', target:'_blank' , "Wellspring Sound"
            text ', and am hoping to make a living as either a sound engineer, a producer, or a performer (or some combination).  If you are interested in getting in contact with me, you can email me at '
            a href: 'mailto:jonathanvkoh@gmail.com' , 'jonathanvkoh@gmail.com'
          
          div class: 'clear-both', ->

      div class: 'spaceDiv', ->

