The call ack for this event receives two special objects. A request object and a response object. the user initaiting the request will se anything we write to the respone object. while we can use the requetst object t read from tehrequst. For example, what url was rewutsted?

We can supply the request event listenr callback as the argument for create server itself.

And Node will automatically attach the argument to teh reqeust event.

## Express server
Instead of listening to a single request event, an Express server also handles server side routing for us. So it express an API to listen to certain routes. We do a server.get, specify the route we're interested in as the first argument. And the second argument to this .get call is the event handler, which similar to the HTTP module, receives both a request and a response object.

Express has a static middleware tht we can use to automatically serve static assets like this about.html file. All we need to do is this magic: .use is how we put a middleware in the Express middleware stack, and public is where we want our static assets to be hosted on the file system. With this line, we don't need to handle the route fro /about.html, or even use the fs module.

With Express, we can also manage a group of routes in their own module, instead of having everything here in server.js. For example, we're going to manage all API requests in this API module index.js.

So we import here, then we create a route object by calling the router from channel in Express. The router object is similar to teh server object we used before, we can define .get calls on it and handle them in teh second argument.

## Use the EJS template languages
We usually need the server to respond with an HTML view template, but with dynamic content inside. We can just use a dyanmaic tempalte language like EJS, short for embedded JavaScript. There are many options for a tempalte language, but EJS is teh simplest of them all. We will be using the EJS template language engine to server-render our JavaScript front end components. Setting up EJS to work with Express is very simple. 
