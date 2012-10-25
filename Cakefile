{spawn, exec} = require 'child_process'
watch         = require 'nodewatch'
path          = require 'path'

task 'coffee:compile', 'Compiles coffee files', ->
  exec 'coffee --output public/js/ --compile src/js/', (err, stdout, stderr) ->
    err && throw err
    console.log 'coffee compiled!'

#
# Watch for changes in source files, and compile as saved
# 
task 'watch', 'watches for changes in source files', ->
  # Compile all on startup
  console.log("compiling...");
  invoke 'coffee:compile'

  console.log("Watching files")
  watch.add("./src/", true).onChange((file,prev,curr,action) ->
    console.log(file)
    ext = path.extname(file).substr(1)
    if ext == 'coffee'
      invoke 'coffee:compile'
  )

task 'build', 'rebuilds source files', ->
  # Compile all files
  console.log("compiling...");
  invoke 'coffee:compile'

