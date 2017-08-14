Let's render some HTML with pure JavaScript. React takes the approach of generating HTML with JavaScript. It does that for many reasons. The most important ones are that we get the full power of JavaScript to work with our data, and before we generate the HTML, we can represent it as a javaScript object tree, which allows React to compare it against future versions of the same tree, and generate partial HTML nodes to take to the browser. This concept is knwon in React as the virtual DOM.  

## React DOM
React.createElement h2 is going to give us a simple object. This object has many properties, but the most important properties are the type of the object, which is an h2, and teh props property, which has a children property, which has a children property that holds the text that we just rendered. So with React, we simply describe HTML elements as objects, and then React put them together into a tree. And it keeps a copy of this tree in memory, so wen things change, React will recalculate the three, and actually compare trees.

## Rendering from server
Our React application is rendering data from the server using JavaScript. But what happens if we don't have JavaScirpt?
Ideally, we want this command to also render our application as seen by React so that we get the benefits of search engine optimization, and also we get a little bit of perfromance benefit. Instead of waiting fro React to warm up, render the component, ad then go back to teh servver to fetch the data, we can have an initial view ready by the server. So, to do that, we're going to have to modify this code, here, to pre-render all the React components on the server using the same data that we have in the API.

## React isn't an MVC framework
React is a library for building composable user interfaces. It encourages the creation of reusable UI components which present data that chagnes over time.

## React doesn't use templates
Traditionally, web application UIs are built using templates or HTML directives. These templates dictate the fulll set of abstractions that you are allowed to use to build your UI.

React approaches building user interfaces differently by breaking them into components. This means React uses a real, full featured programming language to render views, which we see as an advantage over teplates for a few reasons:
1. JavaScript is a flexible, powerful programming lanugage with the ability to build abstractions. This is incredibly important in large applications
2. By unifying your markup with its corresponding view logic, React can actually make views easier to ext3end and maintain.
3. By baking an understanding of markup and content into JavaScript, there is no manual string concatenation and therefore less surface area for XSS vulnerablilities.

We have also created JSX, an optional syntax extenion, in case you prefer the readability of HTML to raw JavaScript.

## Reactive updates are dead simple
React really shines when your data changes over time.
In a traditioanl JavaScript application, you need to look at what data chagned and imperatively make changes to the DOM to keep it up-to-date. Even AngularJS, which provides a declarative interface via directives and data binding requires a linking funciton to manually update DOM nodes.

React takes a different approach.
When your component is first initialized, the render method is called, 

## 简单
简单的表述任意时间点你的应用应该是什么样子的，react将会自动的管理ui见面更新当数据变化的时候。

## 声明式
当数据发生变化的时候，react 仅仅更新了变化的一部分而已。
react式关于构造可重用组件的，实际上，使用react你做得仅仅是构建组建。通过封装，使得组建代码复用、测试以及关注点分离更加容易。

## React主要的原理
传统的web应用，操作dom 一般是直接更新操作的
