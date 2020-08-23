# Hexd - hex tile extractor

A little browser-based utility to load up a local texture image file, and extract a hex area to a png with a transparent surrounding.

Visit https://galactic-src.github.io/hex to try it out.


## Features

Load a file either by clicking the `Choose file` button, or dragging and dropping an image file onto the webpage.

Click where you would like the hex centred, and adjust by amending the number input fields or clicking on a new centre. Resize the hex with mouse wheel.

If you know the hex size you need, you can set it and tick the lock checkbox.


## CORS

When you load an image into a canvas from an external origin (including your local machine) the canvas is "tainted". You cannot export data from a tainted canvas. However, if you have an appropriate CORS policy set, and you set the img origin to 'anonymous', the canvas will not be tainted. Content served by github.io includes a CORS header in the response `access-control-allow-origin: *` which takes care of this.


## Running locally

To run locally, it is not enough to simply open the html page in a browser - it will work apart from export (due to the CORS issue). You will need npm and node installed.

```
cd local-runner
npm i && npm start
```
This starts an express server and opens `localhost:3000/index.html` in your default browser. The `cors` package takes care of the CORS issue.
