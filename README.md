# Jvkoh

## Installation Instructions

Install Node

Run this from the command line:
npm install -g coffee-script nodewatch grunt grunt-contrib express

Additionally, in the file doProd I'm using jsmin to minify my javascript for production.

To install jsmin go to www.crockford.com/javascript/jsmin.html and download the minifier.

Note:If you ever get a 'module \<module\> not found' error, just run npm install -g \<module_name\>

## Developing
To run the local server, just run node server from the home directory.
To compile coffeescript you can run cake build (or cake watch if you want it to constantly update your changes).

## Project Structure
Coffeescript is in src/js/  
Html (written on coffeecup) is in src/views/
CSS is all located in public/css/master.css

Thanks to Varun, for setting this whole thing up and helping me understand it all.
