// patch the obj[prop] = func with partial arguments
// return: unpatch function
/*
example:
un = jsKit.patch(
  this,
  "renderPageQuestions",

  (originalFunc, args, a, b) => {
    originalFunc.apply(this, args);
  },

  a,
  b
  );
*/
export function patch (obj, prop, func, ...args) {
  // backup
  const backupProp = `_$_{prop}`;
  obj[backupProp] = obj[prop];
  // patch
  obj[prop] = (...a) => func.apply(this, [obj[backupProp], a, ...args]);

  return () => {
    if (obj[backupProp]) {
      obj[prop] = obj[backupProp];
      delete obj[backupProp];
    } else {
      console.warn("already unpatched!");
    }
  };
};;

// download the data in the filename.json
export function save(data, filename) {
  if (!data) {
    console.error("Console.save: No data");
    return;
  }

  if (!filename) filename = "data.json";

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], { type: "text/json" }),
    e = document.createEvent("MouseEvents"),
    a = document.createElement("a");

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
};

// watch the property get/set, break when get/set
// return unpatch functiond
export function watchProp(obj, prop, get = true, set = true) {
  var privateProp = `_$_{prop}`; // to minimize the name clash risk
  obj[privateProp] = obj[prop]; // initial backup

  // overwrite with accessor
  Object.defineProperty(obj, prop, {
    get: function () {
      if (get) debugger; // sets breakpoint
      return obj[privateProp];
    },

    set: function (value) {
      //console.log("setting " + prop + " to " + value);
      if (set) debugger; // sets breakpoint
      obj[privateProp] = value;
    },
  });
  return () => (obj[prop] = obj[privateProp]);
};
// console.watch(obj, "someProp");

export function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// if the console function is replaced or patched.
// to recover the original console
export function recoverConsole() {
  var i = document.createElement("iframe");
  i.style.display = "none";
  document.body.appendChild(i);
  window.console = i.contentWindow.console;
}
