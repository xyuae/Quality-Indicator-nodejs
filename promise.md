## What is promise
Promises 象征着一个异步操作的最终结果。promises交互主要通过他的then方法，then方法接收一个回调函数，这个毁掉函数接收执行成功的返回值或执行失败的错误原因，错误原因一般是error对象。需要注意的是，then方法执行的返回值是一个promise对象，而then 方法接收的回调函数的返回值可以是任意的JavaScript对象。

## promise的状态
promise对象有三种状态： pending(初始状态)、fulfilled(成功执行)、rejected（执行出错）。

```
var fs = require('fs')
var Promise = require('bluebird')
//改造fs.readFile为promise版本
	var readFileAsync = function(path) {
		return new Promise(function(fulfill, reject){
			fs.readFile(path, 'utf8', function(err, content){
				//由pending状态进入rejected 状态
				if (err) return reject(err)
				//由pending状态进入fulfilled状态
				return fulfill(content)
				})
			})
	}
	readFileAsync('./promise-1.js').then(function(content){
		console.log(content)
		})
```

## Introduction
Many languages have libraries of interesting schemes called promises, deferreds, or futures. Those help to tame the whild asynchronous into something more like the mundane sequential. JavaScript promises can promote separation of concerns in lieu of tightly coupled interfaces.
Promise use cases:
- Executing rules
- Multiple remote validations
- Handling timeouts
- Remote data requests
- Animation
- Decoupling event logic from app logic
- Eliminating callback triangle of doom
- Controlling parallel asynchronous operations

A JavaScript promise is an I.O.U. to return a value in the future. It is a data object having a well-defined behavior. A promise has one of three possible states:
1. pending
2. rejected
3. Resolved

A rejected or resolved promise is settled. A promise state can only move from pending to settled Thereafter its state is immutable. A promise can be held long after its associated action has settled. At leisure, we can extract the result multiple times. We carry this out by calling promise.then(). That call won't return unless, or until, the associated action has been settled. We can fluidly chain promises. The chained "then" functions should each either return a promise, or let the original promise be the return value.

Through this paradigm we can write asynchronous code more as if it were synchronous code. The power lies in composing promise tasks:
- Stacked tasks: multiple thens scattered in the code, but on same promise
- Parallel tasks: multiple promises return a single promises.
- Sequential tasks: promise, then, promise
- Combinations of these
## Problems with callbacks
Callbacks are fine fro reacting to simple recurring events such as enabling a form value based on a click, or for storing the result of a REST call. Callbacks also entice one to code in a chain by having one callback make the next REST call, and so forth. This tends toward a pyramid of doom shown.
I once had a dynamic validation situation in AngularJS where form values could be dynamically mandatory, depending on peer from values.  REST service ruled on the valid value of each mandatory item. A REST service ruled on the valid value of each mandatory item. I avided nested callbacks by writing a dispatcher that operated on a stack of functions based on which values were required. The dispatcher would pop a function from the stack and execute it. Each callback recorded any validation error returneed from its remote validation call.

## Server or browser
Promises are useful in a browser as well as in a NodeJS server.

## Parallel Promises
Consider an asynchronous operation feeding another asynchronous action. Let the latter consist of three parallel asynchronous actions that, in turn, feed a final action. It settles only when all parallel child requests settle. This is inspired from a favorable encounter with a chian of twelve MongoDb operations. Some were eligible to operate parallel.
How would we model those parallel promises at the center row of that diagram? The key is that most promise libraries have an all function that produces a parent promise of child promises held in an array. When all the child promises resuolve, the parent promise resolves. If one of the child promises rejects, the parent promise rejects.


## Birthing a Promise
many APIs return a promise having a then function - they're thenable. Normally I could just chain a then to a thenable function's result.
