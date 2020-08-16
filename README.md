# Hexd - hex tile extractor

A little express/browser-based utility to load up a local texture image file, and extract a hex area to a png with a transparent surrounding.

### Usage

```
npm install && npm run
```
Then visit `localhost:3000/hexd.html`.


### Why bother with an express server

When you load an image from an external origin, including your local machine, it is "tainted". You cannot export data from a tainted canvas.
However, if you have an appropriate CORS policy set, and you set the img origin to 'anonymous', the canvas will not be tainted. I'm using express to get that CORS policy.
