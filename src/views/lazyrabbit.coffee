head ->

  title "Lazy Rabbit"

  meta charset:'utf-8'
  meta 'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'
  meta name: "viewport", content: "initial-scale=1.0 maximum-scale=1.0 minimum-scale=1.0 user-scalable=no"

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

  if @isDevelopment
    link rel:"stylesheet", type:'text/css', href:"/dev/css/music.css"

  if !@isDevelopment
    link rel:'stylesheet', type:'text/css', href:"/css/music.css"


body class:"lazyrabbit", ->

    div class:"music-logo", ->
        img src:'/images/LazyRabbit.jpg', width:'600px', ->
    div class:"music-links", ->
        a class:"music-link", target:"_blank", href:"http://lazyrabbit.bandcamp.com", ->
            img src:"https://s1.bcbits.com/img/buttons/bandcamp_60x60_black.png", ->
        a class:"music-link", target:"_blank", href:"https://www.soundcloud.com/lazyrabbitmusic", ->
            img src:"https://developers.soundcloud.com/assets/logo_big_black-75c05c178d54c50c8ff0afbb282d2c21.png", ->
        a class:"music-link", target:"_blank", href:"https://www.facebook.com/lazyrabbitmusic", ->
            img src:"/images/FB-f-Logo__blue_58.png", ->



