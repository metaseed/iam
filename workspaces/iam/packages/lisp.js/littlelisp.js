(function(exports) {
  var library = {
    first: function(x) {
      return x[0];
    },

    rest: function(x) {
      return x.slice(1);
    },

    print: function(x) {
      console.log(x);
      return x;
    },
    printArgs: function() {
      console.log(JSON.stringify(arguments));
    },
    toHtml: function(tag, attributes) {
      let attr = '';
      const content = attributes.content;
      delete attributes.content;
      Object.keys(attributes).forEach(key => (attr += ' ' + key + '="' + attributes[key] + '"'));
      const html = `<${tag}${attr}>${content || ''}</${tag}>`;
      return html;
    },
    A: function(attributes) {
      return library.toHtml('A', attributes);
    }
  };

  var Context = function(scope, parent) {
    this.scope = scope;
    this.parent = parent;

    this.get = function(identifier) {
      let id = identifier.split('.');
      if (id[0] in this.scope) {
        let scope = this.scope;
        id.forEach(v => {
          scope = scope[v];
        });
        return scope;
      } else if (this.parent !== undefined) {
        return this.parent.get(identifier);
      }
    };
  };

  var special = {
    let: function(input, context) {
      var letContext = input[1].reduce(function(acc, x) {
        acc.scope[x[0].value] = interpret(x[1], context);
        return acc;
      }, new Context({}, context));

      return interpret(input[2], letContext);
    },

    lambda: function(input, context) {
      return function() {
        var lambdaArguments = arguments;
        var lambdaScope = input[1].reduce(function(acc, x, i) {
          acc[x.value] = lambdaArguments[i];
          return acc;
        }, {});

        return interpret(input[2], new Context(lambdaScope, context));
      };
    },

    if: function(input, context) {
      return interpret(input[1], context)
        ? interpret(input[2], context)
        : interpret(input[3], context);
    }
  };

  var interpretValue = function(inputItem, context) {
    if (inputItem.type === 'identifier') {
      return context.get(inputItem.value);
    } else if (inputItem.type === 'number' || inputItem.type === 'string') {
      return inputItem.value;
    }
  };

  var interpretInput = function(input, context) {
    let namedParams = {};
    var list = [];
    input.forEach(function(x) {
      const v = interpret(x, context);
      if (v && v.isNamedParam) {
        namedParams = { ...namedParams, ...{ [v.name]: v.value } };
      } else {
        list.push(v);
      }
    });
    if (Object.keys(namedParams).length) list.push(namedParams);
    return list;
  };

  var interpretList = function(input, context) {
    if (!input.length) return input;
    let list = input;
    if (list[0].value in special) {
      return special[list[0].value](list, context);
    } else {
      list = interpretInput(input, context);
      if (list[0] instanceof Function) {
        return list[0].apply(undefined, list.slice(1));
      } else {
        return list;
      }
    }
  };

  var interpret = function(input, context) {
    if (context === undefined) {
      context = new Context(
        library,
        new Context(special, new Context(typeof window !== 'undefined' ? window : global))
      );
      return interpret(input, context);
    } else if (input instanceof Array) {
      return interpretList(input, context);
    } else if (input.type === 'namedParam') {
      const v = input.param.value;
      return { isNamedParam: true, name: input.name, value: interpret(input.param) };
    } else {
      return interpretValue(input, context);
    }
  };

  var parseValue = function(input) {
    if (!isNaN(parseFloat(input))) {
      return { type: 'number', value: parseFloat(input) };
    } else if (input[0] === "'" && input.slice(-1) === "'") {
      return { type: 'string', value: input.slice(1, -1) };
    } else {
      return { type: 'identifier', value: input };
    }
  };

  var categorize = function(input) {
    const a = input.split(':');
    if (a.length === 2) {
      const p = a[1] === '' ? undefined : parseValue(a[1]);
      return { type: 'namedParam', name: a[0], param: p };
    } else {
      return parseValue(input);
    }
  };

  var parenthesize = function(input, list) {
    if (list === undefined) {
      return parenthesize(input, []);
    } else {
      var token = input.shift();
      if (token === undefined) {
        return list.pop();
      } else if (token === '(') {
        const last = list[list.length - 1];
        const array = parenthesize(input, []);
        if (last && last.type === 'namedParam' && last.param === undefined) {
          last.param = array;
        } else {
          list.push(array);
        }
        return parenthesize(input, list);
      } else if (token === ')') {
        return list;
      } else {
        return parenthesize(input, list.concat(categorize(token)));
      }
    }
  };

  var tokenize = function(input) {
    return input
      .replace(/\s*:\s*/g, ':') // remove spaces around :
      .split("'")
      .map(function(x, i) {
        if (i % 2 === 0) {
          // not in string
          return x.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ');
        } else {
          // in string
          return x.replace(/ /g, '!whitespace!');
        }
      })
      .join("'")
      .trim()
      .split(/\s+/)
      .map(function(x) {
        return x.replace(/!whitespace!/g, ' ');
      });
  };

  var parse = function(input) {
    const tokens = tokenize(input);
    const a = parenthesize(tokens);
    return a;
  };

  var execute = function(input) {
    return interpret(parse(input));
  };

  exports.littleLisp = {
    tokenize: tokenize,
    parse: parse,
    interpret: interpret,
    execute: execute
  };
})(typeof exports === 'undefined' ? this : exports);
