"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _numberHole = _interopRequireDefault(require("./numberHole"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Spin =
/*#__PURE__*/
function (_Component) {
  _inherits(Spin, _Component);

  function Spin(props) {
    var _this;

    _classCallCheck(this, Spin);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Spin).call(this, props));
    _this.state = {
      angle: 73,
      startRotate: 73
    };
    return _this;
  }

  _createClass(Spin, [{
    key: "start",
    value: function start(e) {
      e.preventDefault();
      var center = 200,
          startRotate = 180 / Math.PI * Math.atan2(e.clientY - center, e.clientX - center);

      if (!(startRotate > -73 && startRotate < -20)) {
        this.setState(function () {
          return {
            startRotate: startRotate
          };
        });
        console.log(startRotate);
        $(".phone__spin").addClass("active");
      }
    }
  }, {
    key: "rotate",
    value: function rotate(e) {
      if ($(".phone__spin").hasClass("active")) {
        e.preventDefault();
        var center = 200,
            rotation = 180 / Math.PI * Math.atan2(e.clientY - center, e.clientX - center) + this.state.angle - this.state.startRotate;

        if (rotation < 0) {
          rotation += 360;
        }

        return $(".phone__spin").css({
          "transform": "rotate(".concat(rotation, "deg)")
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      if (this.state.startRotate > -20 && this.state.startRotate < 58) {
        $(".phone__spin").removeClass("active").css({
          "transform": "rotate(-60deg)",
          "transition-duration": "0.3s"
        });
        setTimeout(function () {
          $(".phone__spin").removeClass("active").css({
            "transform": "rotate(-140deg)",
            "transition-duration": "0.3s"
          });
        }, 300);
        setTimeout(function () {
          $(".phone__spin").removeClass("active").css({
            "transform": "rotate(-287deg)",
            "transition-duration": "0.3s"
          });
        }, 600);
      } else {
        $(".phone__spin").removeClass("active").css({
          "transform": "rotate(73deg)",
          "transition-duration": "0.8s"
        });
      }

      setTimeout(function () {
        $(".phone__spin").css({
          "transition-duration": "0s"
        });
      }, 700);
      this.setState(function () {
        return {
          startRotate: _this2.state.angle
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var holes = [];

      for (var i = 0; i < 10; i++) {
        holes.push(_react["default"].createElement(_numberHole["default"], {
          key: i
        }));
      }

      return _react["default"].createElement("div", {
        className: "phone__spin",
        onMouseDown: function onMouseDown(e) {
          return _this3.start(e, _this3);
        },
        onMouseMove: function onMouseMove(e) {
          return _this3.rotate(e, _this3);
        },
        onMouseUp: function onMouseUp(e) {
          return _this3.stop(e, _this3);
        }
      }, holes);
    }
  }]);

  return Spin;
}(_react.Component);

var _default = Spin;
exports["default"] = _default;