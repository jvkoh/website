head ->

  if @isDevelopment
    link rel:"stylesheet", type:'text/css', href:"/dev/css/resume.css"

  if !@isDevelopment
    link rel:"stylesheet", type:'text/css', href:"/release/resume.min.css"


body ->
  div id: 'header', ->
    h1 'Jonathan Koh'
    div class: 'header-info',  ->
      a href: 'mailto:jonathanvkoh@gmail.com', 'jonathanvkoh@gmail.com'
    div class: 'header-info', '(781)635-7469'



  div id: 'main-content', ->

