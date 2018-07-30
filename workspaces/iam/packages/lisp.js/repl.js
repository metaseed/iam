var repl = require('repl');
var lisp = require('./littlelisp').littleLisp;

var s = `(let ((a 0) (b 1) (c 0))(
            (print a)
            (loop (< b 50)(
              (= c b)
              (= b (+ a b))
              (= a c)
              (print a)
            ))
          )
        )`;
var v = lisp.interpret(lisp.parse(s));
console.log(v);
repl.start({
  prompt: '> ',
  eval: function(cmd, context, filename, callback) {
    var ret = lisp.interpret(lisp.parse(cmd));
    callback(null, ret);
  }
});
