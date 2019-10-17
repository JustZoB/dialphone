"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _phone = _interopRequireDefault(require("./components/phone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_reactDom["default"].render(_react["default"].createElement(_phone["default"], null), document.getElementById('phone'));