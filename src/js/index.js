"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _background = _interopRequireDefault(require("./components/background"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_reactDom["default"].render(_react["default"].createElement(_background["default"], null), document.getElementById('root'));