# JS Memory Leaks
source: Sebastian Peyrott 2016

## Introduction
Memory leaks are a problem every developer has to face eventually. Even when working with Memory-managed languages there are cases where memory can be leaked. Leaks are the cause of whole class of problems: slowdowns, crashes, high latency, and even problems with other applications.

## What are memory leaks?
In essence, memory leaks can be defined as memory that is not required by an applicaiton anyore that for some reason is not returned to the operating system or the pool of free memory. Programming languages favor different ways of managing memory. These ways may reduce the chance of leaking memory. however， whether a certain piece of memory is unused or not is actually an undecideable problem. In other words, only developers can make it clear whether a piece of memory can be returned to the operating system or not. Certain programming languages provide features taht help developers do this. Others expect developers to be completely explicit about when a piece of memory is unused.

## Memory management in JavaScript
JavaScript is one of the so called garbage collected languages. Garbage collected languages help developers manage memory by periodically checking which previously allocated pieces of memory can still be "reached" from other parts of the application. In other words, garbage collected languages reduce the problem of managing memory from "what memory is still required" to "What memory can still be reached form other parts of the applicaiton?". The difference is subtle , but important: while only the developer knows whether a piece of allocated memory will be required in the future, unreachable memory can be algorithmically determined and marked for return to the OS.

## Leaks in JavaScript
The main cause for leaks in garbage collected languages are unwanted references. To understand what unwanted references are, first we need to understand how a garbage collector determines whether a piece of memory can be reached or not.

## Mark and sweep
The mark and sweep algorithm consists of the following steps:
1. The garbage collector builds a list of "roots". Roots usually are global vairables to which a reference is kept in code. In JavaScript, the window object is an example of a global variable that can act as a root. The window object is always present, so the garbage collector can consider it and all of its children to be always present (i.e. not garbage).
2. All roots are inspected and marked as active (i.e. not garbage). All children are inspected recursively as well. Everything that can be reached from a root is not considered garbage.
3. All pieces of memory not marked as active can now be considered garbage. The collector can now free that memory and return it to the OS.

Modern garbage collectors improve on this algorithm in different ways, but the essence is the same: reachable pieces of memory are marked as such and the rest is considered garbage.

Unwanted references are references to pieces of memory that the developer knows he or she won't be needing anymore but that for some reason are kept inside the tree of an active root. In the context of JavaScript, unwanted references are viables kept somewhere in the code that will not be used anymore and point to a piece of memory that could otherwise be freed.

## The Three types of Common JavaScript Leaks
## 1: Accidental global variables
One of the objectives behind JavaScript was to develop a language that looked like Java but was permissive enough to be used by begineers. One of the ways in which JavaScript is permissive is in the way it handles undeclared vairables: a reference to an undeclared variable creates a new vairable inside the global object. In the case of browsers, the global object is window.In other words:
```
function foo(arg) {
	bar = "this is a hidden global variable";
}
```
is in fact
```
function foo(arg) {
	window.bar = "this is a hidden global variable";
}
```
If bar was supposed to hold a reference to a variable only inside the scope of the foo function and you forget to use var to declear it, an unexpected global variable is created. In this example, leaking a simple string won't do much harm, but it could certainly be worse.

Another way in which an accidental global variable can be created is through this:
```
function foo() {
	this.variable = "potential accidental global";
}
// foo called on its own, this points to the global object (window)
// rather than being undefined
foo();
```

To prevent these mistakes from happening, add 'use strict'; at the beginning of your JavaScript files. This enables a stricter mode of parsing javaScript that prevents accidental globals.

### A note on global vairables
Even though we talk about unsuspected globals, it is still the case that much code is littered with explicit global variables. These are by definition non-conllectable (unless nulled or reassigned). In particular, global variables used to temporarily stroe and process big amounts of information are of concern. If you must use a global variable to store lots of data, make sure to null it or reassign it after you are done with it. One common cause for increased memory consumption in connection with globals are caches). Caches stroe data that is repeatedly used. Caches that grow unbounded can result in high memory consumption becasue their contents cannot be collected.

## 2. Forgotten timers or callbacks
The use of setInterval is quite common in JavaScript. Other libraries provide observers and other facilities that take callbacks. Most of these libraries take care of making any references to the callback unreachable after their own instances become unreachable as well. In teh case of setInterval, however, code like this is quite common:
```
var someResource = getData();
setInterval(function() {
	var node = documen.getElementById('Node');
	if (node) {
		// Do stuff with ndoe and resource
		node.innerHTML = JSON>stringify(someResource);
	}
}, 1000);
```
This example illustates what can happen with dangling timers: timers that make reference to nodes or data that is no longer required. The object repesetned by node may be removed in the future, making the whole block inside the interval handler unncecessary. However, the handler , as the interval is still active cannot be collected (the interval needs to be stopped for that to happen). If the interval handler cannot be collected, its dependencies cannot be collected either. That means that someResource, which presumably stores sizable data, cannot be collected either.

For the case of observers, it is important to make explicit calls to remove them once they are not needed anymore (or the associated object is about to be made unreachable). In the past, this used to be particularly important as certain browsers(IE 6) were not able to manage cyclic references well(see below for more info). Nowadays, most browsers can and will collect observer handlers once the observed object becomes unreachable, even if the listener is not explicitly removed. It remains good practice, however, to explicitly remove these observers before the object is disposed. For instance:
```
var element = document.getElementById('button');

function onClick(event) {
	element.innerHtml = 'text';
}
element.addEventListener('click', onClick);
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
```

### A note about object observers and cyclic references
Observers and cyclic references used to be the bane of JavaScript developers. This was the case due to a bug(or design decision) in Internet Explorer's garbage collector. Old versions of internet Explorer could not detect cyclic references between DOM nodes and JavaScript code. This is typical of an observer, which usually keeps areference to the observable. In other words, every time an observer was added to a node in Internet Explorer, it reusltsed in a leak. This is the reason developers started explicityly removing handlers befroe noes or nulling references insie obsrvers. Nowadays, modern browsers use modern garbage colleciton algoirthms that can detect these cycles and deal with them correctly.
## 3. Out of DOM references
Sometimes it may be useful to store DOM nodes inside data structures. Suppose you want to rapidly update the contents of several rows in a table. It may make sense to store a reference to each DOM row in a dictionary or array. When this happens, two reference to the same DOM element are kept: one in the DOM tree and the other in the dictionary. If at some point in the future you decide to remove these rows, you need to make both references unreachable.

```
var elements = {
	button: document.getElementById('button'),
	image: document.getElementById('image'),
	text: document.getElementById('text')
};

function doStuff() {
	image.src = 'http://some.url/image';
	button.click();
	console.log(text.innerHtml);
}

function removeButton() {
	// The button is a direct child of body
	document.body.removeChild(document.getElementById('button'));

	// At this point, we still have a reference to #button in the global elements dictionary.
}
```
An additional consideration for this has to do with references to inner or leaf nodes inside a DOM tree. Suppose you keep a reference to a specific cell of a table(a <td> tag) in your JavaScript code. At some point in the future you decide to remove the table from teh DOM but keep the reference to taht cell. Intuitively one may Suppose teh GC will collect everything but that cell.  However, as the cell is a child node of that table and children keep referenes to their parents. Teh reference to the table cell from javaScript code causes the whole talbe to stay in memory.

## 4. Closures
A key aspect of JavaScript development are closures: anonymous function that capture variables from parent scopes. Meteor developers found a particular case in which due to implementaion details of teh JavaScript runtime, it is possible to leak memory in a subtle way:
```
var theThing = null;
var replaceThing = function() {
	var originalThing = theThing;
	var unused = function() {
		if (originalThing)
			console.log("hi");
	};
	theThing = {
		longStr: new Array(10000).join('*'),
		someMethod: functtion() {
			console.log(someMessage);
		}
	}
}
setInterval(repalceThing, 1000);
```

## Unintuitive behavior of Garbage collectors
Although Garbage Collectors are convenient they come with their own set of trade-offs. One of those trade-offs is nondeterminism. In other words, GCs are unpredictable. It is not usually possible to be certain when a collection will be performed. This means that in some cases more memory than is actually required by the program is being used. In other cases, short-pauses may be noticeable in particularly sensitive applications. Although nondeterminism means one cannot be certain when a collection will be performed, most GC implementaiotnts share the common pattern of doing collection passes during allocation. If no allocations are performed, most GCs stay at rest.
1. Sizable set of allocations is performed
2. Most of these elements ae marked as unreachable
3. No further allocations are performed

## Timeline View
Timeline视图是我们用于发现不正常内存模式的必要工具。当我们寻找严重的内存泄露时，内存回收发生后产生的周期性的不会笑渐的内存跳跃式增长回被一i按红旗白哦及。即便最后经历了一个很大的内存回收，它占用的内存依旧比开始时多得多。节点数也比开始要高。这些都是代码中某处dom节点内存泄漏的标志。
## Profiles View
The profiels view allows you to get a snapshot and compare snapshots of the memory use of your JavaScript code. It also allows you to record alloctions along time. In eveery result view different types of lists are available, but he most relevant ones for our taks are the summary list and the comparison list.

## Example: finding leaks using Chrome
There are essentially two types of leaks: leaks that cause periodic increases in memory use and leaks that happen once and cause no further increases in memory. For obvious reasons, it is easier to find leaks when they are periodic. These are also the most troublesome: if memory increses in time, leaks of this type will eventually cause the browser to become slow or stop execution of the scirpt. Leaks that are not periodic can easily be found when they are big enough to be noticable among all other allocations. This is ususally not the case, so they usually remian unnoticed. In a way, small leaks that are pappen once could be considered an optimiztion issues. However, leaks that are peirodic are bugs and must be fixed.

```
var x = [];

function createSomeNodes() {
	var div,
	i = 100,
	frag = document.createDocumentFragment();
	for (; i > 0; i--) {
		div = document.createElement("div");
		div.appendChild(document.createTextNode(i + "-" + new Date().toTimeString()));
		frag.appendChild(div);
	}
	document.getElementById("nodes").appendChild(frag);
}
```
When grow is invoked it will start creating div nodes and appending the to the DOM. It will also allocate a big array and append it to an array referened by a global variable. This will cause a steady increase in memory that can be found using the tools mentioned above.

There are two big signs in this image that show we are leaking memory. The graphs for nodes(green line) and JS heap (blue line). Nodes are steadily incrasing and nenver decrease. This is a big warning sing.

The JS heap also shows a steady increase in memory use. This is harder to see due to the effect of the garbage collector. you can see a pattern of initial memory growth, followed by a big decrease, followed by an increase and then a spike, continued by another drop in memory. The key in this case lies in the fact that after each drop in memory use, the size of the heap remains bigger than in the previous deorp. Although the garbage collector is succedding in collecting a lot of memory, some of it is periodicaly being leaked.

Get two snapshots
To find a leak we will nw go to the profiles section of chrome's dev tools. To keep memory use in a manageable levels, reload the page before doing this step. We will use the take heap snapshot funciton.
Reload the page and take a heap snapshot right after it finishes loading. We will use this snapshot as our baseline. SAfter that, hit The button again, wait a few seconds, and take a second snapshot. After the snapshot is taken, it is advisable to set a breakpoint in the script to stop the leak from using more meory.

## heap Snapshots
Either select summary and tehn to the right pick Objects alocated between Sanpshot 1 and Snapshot 2, or select Comparison rather than summary.

In this case it is quite easy to find the leaks: they are big. Take a look at the size delta of teh string constructor. 8MBs with 58 new objects. This looks suspicious: new objects are allocated but not freeed and 8MBs get consumed.
If we open the list of allocations for the string constructor we will notice ther are a few big allocations among many small ones. The big ones imediately call our attention. If we select any single one of them we get something interesting in the retainers section below.

## Retainers fro selected objects
We see our selected allocation is part of an array. In turn, the array is referenced by variable x inside the global window object. This gives us a full path from our big object to its noncollectable root window. 
Selecting a piece of the timeline to see waht allocations where performedduirng that time span. We set the selection to be as close to one of the big spikes as possible.
