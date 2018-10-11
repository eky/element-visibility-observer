class ElementVisibilityObserver {
	constructor(
		visibleRatio = 0.25,
		observerOption = {},
	) {
		this.visibleRatio = visibleRatio;
		this.observerOption = Object.assign({
			// null: default as viewport
			root: null,
			// **no '0'**, rootMargin must be specified in pixels or percent.
			rootMargin: '0px',
			threshold: [0, this.visibleRatio, 1]
		}, observerOption);

		// Store observers to disconnect or unobserve
		this.observers = [];
	}

	_resolveObserveTargetToArray(target) {
		if (NodeList.prototype.isPrototypeOf(target)) {
			return Array.from(target);
		} else if (Element.prototype.isPrototypeOf(target)) {
			return [target];
		}

		return Array.from(document.querySelectorAll(target));
	}

	observe(target, onVisible, onHidden) {
		const intersectionCallback = (entries, observer) => {
			entries.forEach(entry => {
				const { target, intersectionRatio } = entry;
				if (intersectionRatio >= this.visibleRatio && onVisible) {
					onVisible(target, entry, observer);
				} else if (onHidden) {
					onHidden(target, entry, observer);
				}
			});
		};

		const targets = this._resolveObserveTargetToArray(target);
		targets.forEach((target, index) => {
			this.observers[index] = new IntersectionObserver(
				intersectionCallback, this.observerOption
			);
			this.observers[index].observe(target);
		});
	}

	disconnect() {
		this.observers.forEach(observer => {
			observer.disconnect();
		});
		this.observers = [];
	}
}

export default ElementVisibilityObserver;
