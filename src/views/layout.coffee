doctype 5
html ->
  head ->

    meta charset:'utf-8'
    meta 'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'
    #meta(name='viewport', content='width=640, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')
    #meta name:'apple-mobile-web-app-capable', content:'yes'

    script type: "text/javascript", src: "/js/libs/jquery.min.js"
    script type: "text/javascript", src: "/js/libs/jquery.jplayer.min.js"

    # TODO: Add description, keywords, robots, author, favicon
    if @isDevelopment
      link rel:"stylesheet", type:'text/css', href:"/css/master.css"

      # Application source 
      script type:"text/javascript", src:"/js/main.js"

    if !@isDevelopment 
      link rel: 'stylesheet', type:'text/css', href: "/release/master.min.css"
      script type: 'text/javascript', src: '/release/javascript.min.js'

  body ->

    div id: 'header', ->

      div id: "info-bar", ->
        div id: "page-title", ->
          text "Jonathan Koh"
        div id: "nav", ->
          a class: 'navButton', href: '#home', ->
            text 'Home'
          a class: 'navButton', href: '#music', ->
            text 'Music'
          a class: 'navButton', href: '#about', ->
            text 'About'
        div class: "clear-both", ->

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

      
    div id: 'main-bg-wrapper', ->
      div id: 'main-bg-image', ->

    div id: 'main-content', ->

      div id: 'homePage', ->
        div id: 'home', class: 'link-target', ->
        div class: 'box', ->
          h2 "Welcome"
          p "I am a 21 year old guitarist/multi-instrumentalist.  I have an affinity for computers and work as a recording engineer/producer.  This is a showcase of some of my work.  I hope you enjoy listening."

          h2 ->
            text "Musical Highlights"
          ul class: 'project-list', ->
            for song in @homepageMusic
              li -> a class: 'playableSong hovergallery', href: '', url: song.url, title: song.title, soundCloudUrl: song.soundCloudUrl, ->
                img src: song.img, title: song.alt
                div class: 'songTitle', ->
                  text song.title
          div class: 'clear-both', ->


      div id: 'aboutPage', ->
        div id: 'about' , class: 'link-target', ->
        div class: 'box', ->
          h2 ->
            text "About"
          p -> 
            img src: '/images/profile.jpeg', alt:'Me', class: 'inline-image', width:'200px', ->
            text 'Currently pursuing a Computer Music and Computer Science double major at Brown University, I spend my time away from classes primarily on my music.  While I am by no means striving to be a solo artist, I love playing music and understand the importance of being able to hold a groove in any sort of ensemble.'
          p "I am primarily a guitarist, but also a very competent bassist and drummer having played each for 10, 8, and 6 years respectively.  While I don't get to consistently practice drums at school I find that as all the more incentive to practice at home.  At school that time void can be easily filled with work on electronic music composition."
          p ->
            text "My experience working in music thus far has been very well rounded.  Whether it's playing jazz guitar for a private party on new years eve, lending a hand around the studio at ", ->
            a href: 'http://www.wellspringsound.com/', target: '_blank', 'Wellspring Sound'
            text ", teaching guitar in the Greater Boston Area, or even playing bass for the rock band "
            a href: 'http://www.myspace.com/whatsyourmoniker', target: '_blank', 'Moniker',
            text ", I always seem to have a good time."

          p ->
            text "In addition to guitar lessons, this coming summer I will be offering my "
            a href: 'http://jvkoh.tumblr.com/post/2808658080/mini-studio', target: '_blank', 'mini-studio'
            text "for use recording low-budget demos, primarily aimed at high school students looking to make a portfolio for their college applications.  If you are interested in working in my mini-studio please take a minute to visit my tumblr page as I use it exclusively to post my music, most of which are samples created in said studio."
          p "If you would like to collaborate with me musically please do not hesitate to send me an email, I'm always looking for more ways to make music."
