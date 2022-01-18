'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var axios = require('axios');
var iconsMaterial = require('@mui/icons-material');
var material = require('@mui/material');

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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
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
  Object.defineProperty(subClass, "prototype", {
    writable: false
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
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
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

var WebTorrentHelper = /*#__PURE__*/_createClass(function WebTorrentHelper(config) {
  var _this = this;

  _classCallCheck(this, WebTorrentHelper);

  _defineProperty(this, "config", {
    host: "",
    port: "3000"
  });

  _defineProperty(this, "addTorrent", function (data) {
    console.log("Acbjkakcjas", {
      method: "post",
      url: "/torrent/add",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }, {
      baseURL: _this.config.host + ":" + _this.config.port,
      timeout: 1000,
      headers: {
        'X-Custom-Header': 'foobar'
      }
    });
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
  this.axios = axios__default["default"].create({
    baseURL: this.config.host + ":" + this.config.port,
    timeout: 1000,
    headers: {
      'X-Custom-Header': 'foobar'
    }
  });
});

function Button(props) {
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(material.IconButton, null, /*#__PURE__*/React__default["default"].createElement(iconsMaterial.Add, null)), "dasilkhdlkdlas");
}

var WebTorrentGui = /*#__PURE__*/function (_Component) {
  _inherits(WebTorrentGui, _Component);

  var _super = _createSuper(WebTorrentGui);

  function WebTorrentGui() {
    var _this;

    _classCallCheck(this, WebTorrentGui);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      magnet: "magnet:?xt=urn:btih:6B73A48F50FB29269CD442244269EBAB4E688E27&dn=Ghostbusters%3A%20Afterlife%20(2021)%20720p%20h264%20Ac3%205.1%20Ita%20Eng%20Sub%20Ita%20Eng-MIRCrew&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Finferno.demonoid.is%3A3391%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.pirateparty.gr%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2860&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce"
    });

    _defineProperty(_assertThisInitialized(_this), "submit", function () {
      var _this$state = _this.state,
          client = _this$state.client,
          magnet = _this$state.magnet;
      client.addTorrent({
        magnet: magnet
      }).then(console.log).catch(console.error);
    });

    return _this;
  }

  _createClass(WebTorrentGui, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        client: new WebTorrentHelper({
          host: "http://185.149.22.163",
          port: 3000
        })
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state;
          _this$state2.client;
          var magnet = _this$state2.magnet;
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("input", {
        type: "text",
        value: magnet,
        onChange: function onChange(e) {
          return _this2.setState({
            magnet: e.target.value
          });
        }
      }), /*#__PURE__*/React__default["default"].createElement(Button, {
        onClick: this.submit
      }, "Add"));
    }
  }]);

  return WebTorrentGui;
}(React.Component);

exports.WebTorrentGui = WebTorrentGui;
exports.WebTorrentHelper = WebTorrentHelper;
//# sourceMappingURL=index.cjs.js.map
