# Clickjacking example

The following exercise shows a practical clickjacking attack by a malicious party who deploys a website they control with a hidden iframe in which an "innocent" website for which they target a click through by unsuspecting users.

## Requirements
Node.js, and npm are expected to be available on your development environment as we will run this exercise locally.

Note: In this exercise there's no strict need for serving the web pages content over HTTPS.

## Source code
Obtain the source code from two official GitHub repositories:
 - https://github.com/lirantal/nodejssecurity-headers-xframe-malicious - which serves the contents of a malicious website that embeds a remote iframe in attempt to trick the user to click on
 - https://github.com/lirantal/nodejssecurity-headers-xframe-innocent - which serves the contents of an innocent website. In our example, this serves a Twitter profile card.

Once you cloned both repositories locally we are ready to run both servers.

## Deployment

To run this exercise we will begin by installing all the dependencies for each npm project and then run the Express servers:

In each directory where the projects are cloned:
1. `npm install` all the dependencies
2. Run `npm start` in two terminal windows so we can have the Express servers run in parallel

The servers will require that you have ports 3000 and 3001 available to bind to by default. Otherwise, you may provide a `PORT` environment variable to each web server project to configure a different local port.

## Exercise 1

Load up the malicious website by browsing to `http://localhost:3000` and you'll be presented with a website asking you to take a survey.

Did you click on it? what happened?

## Exercise 2

You're not sure what was going on, right?
What if you could see the actual element you clicked on?

Visit `http://localhost:3000?reveal=1` and the iframe that has been loaded in the background will be revealed in 50% opacity so you can see how it renders on the screen and perfectly aligns with the Proceed button.

## Exercise 3

Now open `./malicious-website/views/home.handlebars` and update the iframe URL to some other websites, maybe twitter?

1. What happened when you changed it to something else?
2. Can you try and find a website that should be secure but allows rendering in an iframe?

## Exercise 4

Ok, let's fix things.

Now open `./malicious-website/views/home.handlebars` and update the iframe URL to `http://localhost:3001/html/twitter.html` and make sure the other server at `./iframe-website` is running. Try to visit the malicious website again, things should work as usual.

Now, with the innocent website `./iframe-website` let's make sure that we update it to disallow rendering itself as an iframe with the help of Helmet's frameguard middleware:

```js
const helmet = require("helmet");
app.use(helmet.frameguard({ action: "deny" }));
```
