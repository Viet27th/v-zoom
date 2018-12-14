<p align="center">
  <img src="img/zoom.png" width=72 height=72>
</p>

## V-Zoom
> A simple Javascript library for image zooming.

## Demo

https://vdifoung.github.io/v-zoom/
## Installation
[![NPM LINK][represent-npm-image]][represent-npm-url]

**Installing a V-Zoom module**

V-Zoom is delivered primarily via npm. (<https://www.npmjs.com/package/v-zoom>)
```sh
# using npm install
$ npm i v-zoom
```

**Non-module environments**

If, for any reason, you are constrained to a non-module environment (e.g. no bundlers such as webpack) - don’t fret. Just embed:
```html
<link rel="stylesheet" href="dist/css/v-zoom.min.css">
<script src="dist/js/v-zoom.min.js"></script>
```
## Usage
If you’re using a bundler, e.g. webpack, you’ll need to import v-zoom.
```js
import 'v-zoom/dist/js/v-zoom';
import 'v-zoom/dist/css/v-zoom.css';
```
To create v-zoom instance.
```js
VZoom.init("tagName", {options});
# Or
VZoom.init("#myID", {options});
# Or
VZoom.init(".className", {options});
```
Configuration is optional and passed in an object {}.


## Usage example

```js
VZoom.init("img", {
    zoomEffect: "translate",
    duration: "500",
    backgroundColor: "rgba(0,0,0,.95)"
});
```

## Options

| Config Option | Type | Default | Description |
| --- |:---:|:---:| --- |
| `zoomEffect` | `String` | `translate` | `"translate"` or `"scale"` <br/> Choose the zoom effect style. |
| `duration` | `Number\|String` | `279` | Time to execute (ms) |
| `backgroundColor` | `String` | `rgba(0.0.0.1)` | Background color. <br/> Example: `"#000"` or `"rgba(0.0.0.1)"` |
| `scrollToCancel` | `Boolean` | `true` | Scrolling to cancel the image is being zoomed |
| `zoomPercentage` | `Number` | `50` | `50%`. Percentage of zoomed picture's size is compared with screen's size. To change zoom scale for each picture, use `data-vzoom-scale="Number"` attribute <br/> Example: <br/> `<img src="img/thumbnail.png" data-vzoom-scale="1.95">` |

## License
Licensed under MIT license, see [LICENSE](https://github.com/vDiFoung/v-zoom/blob/master/LICENSE) for the full license.

<!-- Markdown link & img dfn's -->
[represent-npm-image]: img/npm.png
[represent-npm-url]: https://www.npmjs.com/package/v-zoom