
var fullpath = '/home/gbox3d/work/dataset/handsign/voc/hansign2(10).jpeg'

console.log(fullpath.replace(/^.*[\\\/]/, '') ); //get file name

/*

(?:         # begin non-capturing group
  \.        #   a dot
  (         #   begin capturing group (captures the actual extension)
    [^.]+   #     anything except a dot, multiple times
  )         #   end capturing group
)?          # end non-capturing group, make it optional
$           # anchor to the end of the string

*/

console.log( /(?:\.([^.]+))?$/.exec(fullpath)[1] ); //get extension

// let ext = (/[.]/.exec(fullpath)) ? /[^.]+$/.exec(fullpath) : undefined;
// console.log(ext)

