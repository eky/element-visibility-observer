(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ElementVisibilityObserver = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var ElementVisibilityObserver = function () {
    function ElementVisibilityObserver() {
      var visibleRatio = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.25;
      var observerOption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, ElementVisibilityObserver);

      this.visibleRatio = visibleRatio;
      this.observerOption = Object.assign({
        // null: default as viewport
        root: null,
        // **no '0'**, rootMargin must be specified in pixels or percent.
        rootMargin: '0px',
        threshold: [0, this.visibleRatio, 1]
      }, observerOption); // Store observers to disconnect or unobserve

      this.observers = [];
    }

    _createClass(ElementVisibilityObserver, [{
      key: "_resolveObserveTargetToArray",
      value: function _resolveObserveTargetToArray(target) {
        if (NodeList.prototype.isPrototypeOf(target)) {
          return Array.from(target);
        } else if (Element.prototype.isPrototypeOf(target)) {
          return [target];
        }

        return Array.from(document.querySelectorAll(target));
      }
    }, {
      key: "observe",
      value: function observe(target, onVisible, onHidden) {
        var _this = this;

        var intersectionCallback = function intersectionCallback(entries, observer) {
          entries.forEach(function (entry) {
            var target = entry.target,
                intersectionRatio = entry.intersectionRatio;

            if (intersectionRatio >= _this.visibleRatio && onVisible) {
              onVisible(target, entry, observer);
            } else if (onHidden) {
              onHidden(target, entry, observer);
            }
          });
        };

        var targets = this._resolveObserveTargetToArray(target);

        targets.forEach(function (target, index) {
          _this.observers[index] = new IntersectionObserver(intersectionCallback, _this.observerOption);

          _this.observers[index].observe(target);
        });
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        this.observers.forEach(function (observer) {
          observer.disconnect();
        });
        this.observers = [];
      }
    }]);

    return ElementVisibilityObserver;
  }();

  return ElementVisibilityObserver;

})));
