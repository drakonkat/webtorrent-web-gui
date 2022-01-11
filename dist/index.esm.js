import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var sortableOptions$1 = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
};
function Container(_ref) {
  var disabledDnD = _ref.disabledDnD,
      block = _ref.block,
      blockIndex = _ref.blockIndex,
      setBlocks = _ref.setBlocks,
      renderBlockWrapperStyle = _ref.renderBlockWrapperStyle,
      renderBlockWrapperStyle2 = _ref.renderBlockWrapperStyle2,
      onBlockWrapper = _ref.onBlockWrapper;

  var handleBlockEnd = function handleBlockEnd() {
    onBlockWrapper();
  };

  return /*#__PURE__*/React.createElement(ReactSortable, _extends({
    group: {
      name: 's',
      pull: !disabledDnD,
      put: !disabledDnD
    },
    key: block.id,
    list: block.children,
    onEnd: handleBlockEnd,
    setList: function setList(currentList) {
      setBlocks(function (sourceList) {
        var tempList = _toConsumableArray(sourceList);

        var _blockIndex = [blockIndex];

        var lastIndex = _blockIndex.pop();

        var lastArr = _blockIndex.reduce(function (arr, i) {
          return arr[i]['children'];
        }, tempList);

        lastArr[lastIndex]['children'] = currentList;
        return tempList;
      });
    }
  }, sortableOptions$1), block.children && block.children.map(function (childBlock, index) {
    return /*#__PURE__*/React.createElement(BlockWrapper, {
      renderBlockWrapperStyle: renderBlockWrapperStyle,
      renderBlockWrapperStyle2: renderBlockWrapperStyle2,
      key: index,
      block: childBlock,
      blockIndex: [index],
      setBlocks: setBlocks
    });
  }));
}

function BlockWrapper(_ref) {
  var disabledDnD = _ref.disabledDnD,
      block = _ref.block,
      blockIndex = _ref.blockIndex,
      setBlocks = _ref.setBlocks,
      renderBlockWrapperStyle = _ref.renderBlockWrapperStyle,
      renderBlockWrapperStyle2 = _ref.renderBlockWrapperStyle2,
      onBlockEnd = _ref.onBlockEnd;

  var handleBlockWrapper = function handleBlockWrapper() {
    onBlockEnd();
  };

  if (!block) return null;

  if (block.type === 'container') {
    return /*#__PURE__*/React.createElement("div", {
      style: renderBlockWrapperStyle
    }, block.content, /*#__PURE__*/React.createElement(Container, {
      disabledDnD: disabledDnD,
      renderBlockWrapperStyle2: renderBlockWrapperStyle2,
      block: block,
      onBlockWrapper: handleBlockWrapper,
      setBlocks: setBlocks,
      blockIndex: blockIndex
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      style: renderBlockWrapperStyle2
    }, block.content);
  }
}

var sortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost'
};
function DragDrop(_ref) {
  var disabledDnD = _ref.disabledDnD,
      containersArray = _ref.containersArray,
      itemsArray = _ref.itemsArray,
      renderCardStyle1 = _ref.renderCardStyle1,
      renderCardStyle2 = _ref.renderCardStyle2,
      renderMainContainerStyle = _ref.renderMainContainerStyle,
      renderContainerStyle = _ref.renderContainerStyle,
      renderBlockWrapperStyle = _ref.renderBlockWrapperStyle,
      renderBlockWrapperStyle2 = _ref.renderBlockWrapperStyle2,
      onChange = _ref.onChange,
      watchProps = _ref.watchProps;

  var _useState = useState(containersArray),
      _useState2 = _slicedToArray(_useState, 2),
      blocks = _useState2[0],
      setBlocks = _useState2[1];

  var _useState3 = useState(itemsArray),
      _useState4 = _slicedToArray(_useState3, 2),
      items = _useState4[0],
      setItems = _useState4[1];

  var handleListEnd = function handleListEnd() {
    onChange(blocks, items);
  };

  if (disabledDnD) {
    handleListEnd = function handleListEnd() {};
  }

  if (watchProps) {
    useEffect(function () {
      setItems(itemsArray);
    }, [itemsArray]);
    useEffect(function () {
      setBlocks(containersArray);
    }, [containersArray]);
  }

  return /*#__PURE__*/React.createElement("div", {
    style: renderMainContainerStyle
  }, /*#__PURE__*/React.createElement("div", {
    style: renderCardStyle1
  }, /*#__PURE__*/React.createElement(ReactSortable, _extends({
    style: renderContainerStyle,
    list: blocks,
    delay: 2,
    sort: !disabledDnD,
    onEnd: handleListEnd,
    setList: setBlocks,
    group: {
      name: 's',
      pull: false,
      put: false
    }
  }, sortableOptions), blocks.map(function (block, index) {
    return /*#__PURE__*/React.createElement(BlockWrapper, {
      renderBlockWrapperStyle: renderBlockWrapperStyle,
      renderBlockWrapperStyle2: renderBlockWrapperStyle2,
      key: block.id,
      disabledDnD: disabledDnD,
      block: block,
      onBlockEnd: handleListEnd,
      blockIndex: [index],
      setBlocks: setBlocks
    });
  }))), /*#__PURE__*/React.createElement("div", {
    style: renderCardStyle2
  }, /*#__PURE__*/React.createElement(ReactSortable, _extends({
    key: "sortable-0",
    style: renderContainerStyle,
    group: {
      name: 's',
      pull: !disabledDnD,
      put: !disabledDnD
    },
    sort: !disabledDnD,
    onEnd: handleListEnd,
    list: items,
    setList: function setList(currentList) {
      setItems(function () {
        return currentList;
      });
    }
  }, sortableOptions), items && items.length > 0 && items.map(function (childBlock, index) {
    return /*#__PURE__*/React.createElement(BlockWrapper, {
      renderBlockWrapperStyle: renderBlockWrapperStyle,
      renderBlockWrapperStyle2: renderBlockWrapperStyle2,
      key: index,
      block: childBlock,
      blockIndex: [index],
      setBlocks: setItems
    });
  }))));
}

export { DragDrop as DragNDropContainer };
