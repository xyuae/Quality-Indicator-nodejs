## Grokking V8 closures for function
## Contexts
if you program JavaScript you probably know taht every function carries around a lexical environment that is used to resolve variables into their values when you execute function's body. This sounds a bit vague but actually boils down to a very simple thing:
```
function makeF() {
	var x = 11;
	var y = 22;
	return function (what) {
		switch (what) {
			case "x": return x;
			case "y": return y;
		}
	}
}

var f = makeF();
f("X");
```
Function f needs some kind of storage attached to it to keep variables x and y because when f is called makeFs activation taht initially created them no longer exits.
V8 does exactly this: it creates an object called Context and attaches it to teh closure (which is internally represented with an instance of JSFunction class). There are however a couple of important nuances. First of all V8 creates a Context when we enter makeF not when we create a closure itself as many people expect. It is important to keep this in mind when binding variables that are also used in a hot loop. Optimizing compiler will not be able to allocate such variables to registers and each load and store will become a memory operation.
```
function foo() {
	var sum = 0; // sum is promoted to the Context because it is used by a closure below.
	for (var i = 0; i < 1000l i++) {
		sum += Math.sqrt(i);
	}

	if (baz()) {
		setTimeout(function () {alert(sum); }, 1000);
	}
}
```
Another thing to keep in mind: if Context is potentially needed it will be created eagerly when you enter the scope and will be shared by all closures created in the scope. If scope itself is nested inside a closure then newly created Context will have a pointer to the parent. This might lead to surprising memory leaks.  
