'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var axios = require('axios');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var WebTorrentGui = /*#__PURE__*/function (_Component) {
  _inherits(WebTorrentGui, _Component);

  var _super = _createSuper(WebTorrentGui);

  function WebTorrentGui() {
    _classCallCheck(this, WebTorrentGui);

    return _super.apply(this, arguments);
  }

  _createClass(WebTorrentGui, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default['default'].createElement("div", null, /*#__PURE__*/React__default['default'].createElement("p", null, "jhakdhbsadbsajk"));
    }
  }]);

  return WebTorrentGui;
}(React.Component);

var WebTorrentHelper = function WebTorrentHelper(config) {
  var _this = this;

  _classCallCheck(this, WebTorrentHelper);

  _defineProperty(this, "config", {
    host: "",
    port: "3000"
  });

  _defineProperty(this, "addTorrent", function (data) {
    return _this.axios({
      method: "post",
      url: "/torrent/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
  });

  _defineProperty(this, "pauseTorrent", function (data) {
    return _this.axios({
      method: "post",
      url: "/torrent/pause",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
  });

  _defineProperty(this, "removeTorrent", function (data) {
    return _this.axios({
      method: "post",
      url: "/torrent/remove",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
  });

  _defineProperty(this, "destroyTorrent", function (data) {
    return _this.axios({
      method: "post",
      url: "/torrent/destroy",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    });
  });

  _defineProperty(this, "checkStatus", function () {
    return _this.axios({
      method: "get",
      url: "/torrent/check-status",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });

  this.config = config;
  this.axios = axios__default['default'].create({
    baseURL: this.config.host + ":" + this.config.port,
    timeout: 1000,
    headers: {
      'X-Custom-Header': 'foobar'
    }
  });
};

exports.WebTorrentGui = WebTorrentGui;
exports.WebTorrentHelper = WebTorrentHelper;
