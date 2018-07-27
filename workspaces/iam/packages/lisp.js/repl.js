var repl = require('repl');
var lisp = require('./littlelisp').littleLisp;

var s = `(toHtml 'a' b:1 c:'wad' content:(toHtml 'b'  p:'5px' d:8))`;
var v = lisp.interpret(lisp.parse(s));
console.log(v);
repl.start({
  prompt: '> ',
  eval: function(cmd, context, filename, callback) {
    var ret = lisp.interpret(lisp.parse(cmd));
    callback(null, ret);
  }
});
