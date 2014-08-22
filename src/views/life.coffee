head ->

  title "Conway's Game of Life"

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
    # Application source 
    script type: "text/javascript", src: "/dev/js/libs/jquery.min.js"
    script type:"text/javascript", src: "/dev/js/life.js"

  if !@isDevelopment
    script type: 'text/javascript', src: '/release/jquery.min.js'
    script type: 'text/javascript', src: '/release/life.min.js'


body style:'overflow:hidden; height:100%; width:100%;', ->
