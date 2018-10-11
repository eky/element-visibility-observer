# ElementVisibilityObserver
This is a wrapper of [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/) JavaScript API for detecting element visibility.

No dependencies. But currently (2018) Safari (and IE) is not supporting IntersectionObserver, you will need [IntersectionObserver polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill). Please consider the limitations of the polyfill and [check the latest browser support](https://caniuse.com/#search=IntersectionObserver) before use in production.

## Installation
```sh
npm install element-visibility-observer
```
or
```sh
yarn add element-visibility-observer
```

## Usage
### Basic
[Demo on Codepen](https://codepen.io/eky/pen/WapgRr?editors=0010)
#### HTML
```html
<div class="box">1</div>
<div class="box">2</div>
<div class="box">3</div>
```
#### JavaScript
```javascript
const elementVisibilityObserver = new ElementVisibilityObserver()
elementVisibilityObserver.observe(
	'.box',
	target => target.classList.add('visible'), // onVisible
	target => target.classList.remove('visible'), // onHidden
);
```
### Get current visibility ratio
[Demo on Codepen](https://codepen.io/eky/pen/pxeOwR?editors=0010)
### Lazyload
[Demo on Codepen](https://codepen.io/eky/pen/pxeOwR?editors=0010)

## API
### Constructor
#### new ElementVisibilityObserver([visibleRatio [, observerOption]])
- `visibleRatio`
	- **Type**: `Number` from `0` to `1`
	- **Default**: `0.25`
	- Element is defined as "visible" when more then 25% of the element is visible in viewport (or root element).
- `observerOption`
	- Type: `Object`
	- Default:
	```javascript
	{
		root: null,
		rootMargin: '0px',
		threshold: [0, this.visibleRatio, 1]
	}
	```
	- See [MDN - IntersectionObserver#Properties](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver#Properties).

### Method
#### .observe(target [, onVisible [, onHidden]])
Observe all target elements.
- **target**: `String` of CSS selector || `NodeList` || `Element`
- **onVisible(target, entry, observer)**: Callback `function` triggers when the element is visible.
- **onHidden(target, entry, observer)**: Callback `function` triggers when the element is not visible.
	- **target**: [`IntersectionObserverEntry.target`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry/target)
	- **entry**: [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)
	- **observer**: [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)

#### .disconnect()
Destroy all observers

### Properties
#### .observers
`Array` of `IntersectionObserver`

## Polyfills you will need
```sh
npm install intersection-observer @babel/polyfill
```
* [intersection-observer](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) for `IntersectionObserver` support in Safari and IE
* [@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill) for `Array.from` and `Object.assign` if you need IE support
