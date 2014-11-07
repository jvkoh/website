head ->

  title "Jonathan Koh - Resume"

  meta charset:'utf-8'
  meta 'http-equiv':'X-UA-Compatible', content:'IE=edge,chrome=1'

  if @isDevelopment
    link rel:"stylesheet", type:'text/css', href:"/dev/css/resume.css"

  if !@isDevelopment
    link rel:"stylesheet", type:'text/css', href:"/release/resume.min.css"


body ->
  div id: 'header', ->
    h1 'Jonathan Koh'
    div class: 'header-info',  ->
      a href: 'mailto:jonathanvkoh@gmail.com', 'jonathanvkoh@gmail.com'

  ## All main resume content
  div id: 'main-content', ->

    ## Skills section
    div class: 'section-wrapper', ->
      h2 'Skills'
      div class: 'entry-wrapper', ->
        ## Proficient
        div class: 'entry-title', 'Proficient with'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li ->
              i 'Javascript, C++, Python, HTML, PHP, SQL,'
              text ' JQuery, AJAX, CSS, SASS, Unix, Vim, Git, bash, '
              i 'ProTools, and Ableton Live.'
      div class: 'entry-wrapper', ->
        ## Basic Proficiency
        div class: 'entry-title', 'Basic Proficiency with'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li ->
              text 'Java, Node.js, Django, Express, AWS, CoffeeScript, WordPress, Regular Expressions, the Facebook API, Final Cut Pro, Logic Pro, Soldering, and Max/MSP.'
      div class: 'entry-wrapper', ->
        ## Exposure to
        div class: 'entry-title', 'Exposure to'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li ->
              text 'Scala, Scalding, Hadoop'

    ## Work Experience Section
    div class: 'section-wrapper', ->
      h2 'Work Experience'

      ## Etsy
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Software Engineer, Etsy Inc.'
        div class: 'entry-date', 'October 2013 - Present'
        div class: 'entry-text', ''

      ## LoveGov
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Web Developer, LoveGov Inc'
        div class: 'entry-date', 'June 2012 - September 2012'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Worked closely with two other developers, two designers, and one CEO to create lovegov.com.'
            li 'Parsed and Analyzed large amounts of legislative data from XML files using Django.'
            li 'Created the notification system, profile pages, and group pages using HTML, SASS/CSS, Javascript, JQuery, AJAX, Python, and Django.'
            li 'Implemented the design for the news feed using HTML, SASS/CSS, Javascript, JQuery, and AJAX.'

      ## Sound Designer and Recording Engineer
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Sound Designer and Recording Engineer, Self Employed'
        div class: 'entry-date', 'February 2011 - May 2013'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            #li 'Recorded and mixed Joe Kenneallys Album'
            li 'Tracked and mixed recordings of songs from the show New Weird America'
            li ->
              text 'Played in, Recorded, and Mixed Eric Axelman\'s album '
              a href: 'http://ericaxelman.bandcamp.com/album/to-be-honest', target: '_blank', 'To Be Honest.'
            li 'Produced and engineered a ten song studio album for the Brown/RISD a cappella group Harmonic Motion.'
            li 'Designed and produced commercial sound and music for A Better World by Design.'
            li 'Created the soundtrack and sound effects for the arcade-style game Virion.'

      ## MEME and Music Coordinator
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Media and Music Technology Coordinator, Brown University'
        div class: 'entry-date', 'November 2011 - May 2013'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Shot, managed, and edited Brown University music department performance videos in Final Cut.'
            li 'Maintained music department studio microphones and professional audio equipment.'
            li 'Worked as sound and lighting technician for music department shows and events.'

      ## Reper
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Web Development Intern, Reper'
        div class: 'entry-date', 'June 2011 - September 2011'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Worked extensively in Python with Django frameworks at reper.com.'
            li 'Built account management system, search engine, reviews with reddit style voting, and related website browsing toolbar using Python, Django, Javascript, JQuery, HTML, CSS, CouchDB, and Django.'
            li 'Edited CSS, HTML, and Javascript to fix front end bugs.'

      ## Q-Division
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Recording Intern, Q-Division Studios'
        div class: 'entry-date', 'May 2011 - September 2011'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
           li 'Recorded and edited audio in Pro Tools.'
           li 'Managed and cared for studio microphones and other audio equipment.'

      ## Wellspring
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Recording Intern, Wellspring Sound'
        div class: 'entry-date', 'May 2010 - September 2010'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Made preliminary mixes for clients with ProTools and RADAR.'
            li 'Managed and cared for studio microphones, instruments, and other audio equipment.'
            li 'Fixed broken audio equipment and sent broken equipment to repair shops.'

    ## Education section
    div class: 'section-wrapper', ->
      h2 'Education'
      ## Brown
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Brown University, Providence RI'
        div class: 'entry-date', 'Undergraduate Class of 2013'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Received a dual Bachelors Degree in Computer Science and Electronic Music'
            li ->
              b 'Relevent Courses:'
              text ' Design and Analysis of Algorithms, Introduction to Computer Graphics, Multiprocessor Synchronization, Computational Photography, Computational Linguistics.'
            li 'GPA: 3.82/4.0'

      ## Concord Academy
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Concord Academy, Concord MA'
        div class: 'entry-date', 'Class of 2009'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li ->
              b 'Relevent Courses:'
              text ' AP Computer Science, Advanced Music Theory, Recording Technology.'
            li 'Head of Jazz and Rock and Roll Clubs.'

    ## Hobbies section
    div class: 'section-wrapper', ->
      h2 'Hobbies'
      ## Meditation
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Meditation'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Regulalry practices mindfulness.'
      ## Musician
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Music'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li ->
              text 'Recorded and released the 15-track album '
              i 'For Beats\' Sake'
              text ' under the artist name '
              a href: 'http://lazyrabbit.bandcamp.com/', target: '_blank', 'Lazy Rabbit'
              text ' (Jan 3rd, 2013).'
            li ->
              text 'Played guitar on '
              a href: 'http://www.clydelawrence.com', target: '_blank', 'Clyde Lawrence'
              text '\'s album '
              i 'Homesick'
            li ->
              text 'Played bass with the band '
              a href: 'http://whatsyourmoniker.bandcamp.com/', target: '_blank', 'Moniker'
              text '. '
            li 'Taught guitar to students of all ages for two years.'
            li ->
              text 'Studied guitar for eight years under teacher '
              a href: 'http://www.jessewilliamsmusic.com/', target: '_blank', 'Jesse Williams'
              text '. '
      ## Ultimate Frisbee
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Ultimate Frisbee'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Played for Brown University’s secondary team, Polyester Funkadelic, for four years.'
            li 'Attended the National Ultimate Training Camp for four summers.'
            li 'Played frisbee on the club team for all four years of high school.'

      ## Soccer
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Soccer'
        div class: 'entry-text', ->
          ul class: 'plain-list', ->
            li 'Played Intramural Outdoor and Indoor Soccer for four years and Brown University.'
            li 'Played Varsity Soccer in high school.'

      ## Others
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Basketball'
        div class: 'entry-text', ->
      div class: 'entry-wrapper', ->
        div class: 'entry-title', 'Hockey'
        div class: 'entry-text', ->
