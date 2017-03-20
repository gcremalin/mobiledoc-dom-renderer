(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderType = require('../utils/render-type');

var _renderType2 = _interopRequireDefault(_renderType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'image',
  type: _renderType2.default,
  render: function render(_ref) {
    var payload = _ref.payload,
        dom = _ref.env.dom;

    var img = dom.createElement('img');
    img.src = payload.src;
    return img;
  }
};

},{"../utils/render-type":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RENDER_TYPE = undefined;
exports.registerGlobal = registerGlobal;

var _rendererFactory = require('./renderer-factory');

var _rendererFactory2 = _interopRequireDefault(_rendererFactory);

var _renderType = require('./utils/render-type');

var _renderType2 = _interopRequireDefault(_renderType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.RENDER_TYPE = _renderType2.default;
function registerGlobal(window) {
  window.MobiledocDOMRenderer = _rendererFactory2.default;
}

window.registerGlobal = registerGlobal;

exports.default = _rendererFactory2.default;

},{"./renderer-factory":3,"./utils/render-type":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./renderers/0-2');

var _2 = _interopRequireDefault(_);

var _3 = require('./renderers/0-3');

var _4 = _interopRequireDefault(_3);

var _renderType = require('./utils/render-type');

var _renderType2 = _interopRequireDefault(_renderType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * runtime DOM renderer
 * renders a mobiledoc to DOM
 *
 * input: mobiledoc
 * output: DOM
 */

function validateCards(cards) {
  if (!Array.isArray(cards)) {
    throw new Error('`cards` must be passed as an array');
  }
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    if (card.type !== _renderType2.default) {
      throw new Error('Card "' + card.name + '" must be of type "' + _renderType2.default + '", was "' + card.type + '"');
    }
    if (!card.render) {
      throw new Error('Card "' + card.name + '" must define `render`');
    }
  }
}

function validateAtoms(atoms) {
  if (!Array.isArray(atoms)) {
    throw new Error('`atoms` must be passed as an array');
  }
  for (var i = 0; i < atoms.length; i++) {
    var atom = atoms[i];
    if (atom.type !== _renderType2.default) {
      throw new Error('Atom "' + atom.name + '" must be type "' + _renderType2.default + '", was "' + atom.type + '"');
    }
    if (!atom.render) {
      throw new Error('Atom "' + atom.name + '" must define `render`');
    }
  }
}

var RendererFactory = function () {
  function RendererFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$cards = _ref.cards,
        cards = _ref$cards === undefined ? [] : _ref$cards,
        _ref$atoms = _ref.atoms,
        atoms = _ref$atoms === undefined ? [] : _ref$atoms,
        _ref$cardOptions = _ref.cardOptions,
        cardOptions = _ref$cardOptions === undefined ? {} : _ref$cardOptions,
        unknownCardHandler = _ref.unknownCardHandler,
        unknownAtomHandler = _ref.unknownAtomHandler,
        _ref$markupElementRen = _ref.markupElementRenderer,
        markupElementRenderer = _ref$markupElementRen === undefined ? {} : _ref$markupElementRen,
        _ref$sectionElementRe = _ref.sectionElementRenderer,
        sectionElementRenderer = _ref$sectionElementRe === undefined ? {} : _ref$sectionElementRe,
        dom = _ref.dom,
        _ref$markupSanitizer = _ref.markupSanitizer,
        markupSanitizer = _ref$markupSanitizer === undefined ? null : _ref$markupSanitizer;

    _classCallCheck(this, RendererFactory);

    validateCards(cards);
    validateAtoms(atoms);

    if (!dom) {
      if (typeof window === 'undefined') {
        throw new Error('A `dom` option must be provided to the renderer when running without window.document');
      }
      dom = window.document;
    }

    this.options = {
      cards: cards,
      atoms: atoms,
      cardOptions: cardOptions,
      unknownCardHandler: unknownCardHandler,
      unknownAtomHandler: unknownAtomHandler,
      markupElementRenderer: markupElementRenderer,
      sectionElementRenderer: sectionElementRenderer,
      dom: dom,
      markupSanitizer: markupSanitizer
    };
  }

  _createClass(RendererFactory, [{
    key: 'render',
    value: function render(mobiledoc) {
      var version = mobiledoc.version;

      switch (version) {
        case _.MOBILEDOC_VERSION:
        case undefined:
        case null:
          return new _2.default(mobiledoc, this.options).render();
        case _3.MOBILEDOC_VERSION_0_3_0:
        case _3.MOBILEDOC_VERSION_0_3_1:
          return new _4.default(mobiledoc, this.options).render();
        default:
          throw new Error('Unexpected Mobiledoc version "' + version + '"');
      }
    }
  }]);

  return RendererFactory;
}();

exports.default = RendererFactory;

},{"./renderers/0-2":4,"./renderers/0-3":5,"./utils/render-type":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOBILEDOC_VERSION = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('../utils/dom');

var _image = require('../cards/image');

var _image2 = _interopRequireDefault(_image);

var _renderType = require('../utils/render-type');

var _renderType2 = _interopRequireDefault(_renderType);

var _sectionTypes = require('../utils/section-types');

var _tagNames = require('../utils/tag-names');

var _sanitizationUtils = require('../utils/sanitization-utils');

var _renderUtils = require('../utils/render-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOBILEDOC_VERSION = exports.MOBILEDOC_VERSION = '0.2.0';

var IMAGE_SECTION_TAG_NAME = 'img';

function validateVersion(version) {
  if (version !== MOBILEDOC_VERSION) {
    throw new Error('Unexpected Mobiledoc version "' + version + '"');
  }
}

var Renderer = function () {
  function Renderer(mobiledoc, options) {
    var _this = this;

    _classCallCheck(this, Renderer);

    var cards = options.cards,
        cardOptions = options.cardOptions,
        unknownCardHandler = options.unknownCardHandler,
        markupElementRenderer = options.markupElementRenderer,
        sectionElementRenderer = options.sectionElementRenderer,
        dom = options.dom;
    var version = mobiledoc.version,
        sectionData = mobiledoc.sections;

    validateVersion(version);

    var _sectionData = _slicedToArray(sectionData, 2),
        markerTypes = _sectionData[0],
        sections = _sectionData[1];

    this.dom = dom;
    this.root = dom.createDocumentFragment();
    this.markerTypes = markerTypes;
    this.sections = sections;
    this.cards = cards;
    this.cardOptions = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;

    this.sectionElementRenderer = {
      '__default__': _renderUtils.defaultSectionElementRenderer
    };
    Object.keys(sectionElementRenderer).forEach(function (key) {
      _this.sectionElementRenderer[key.toLowerCase()] = sectionElementRenderer[key];
    });

    this.markupElementRenderer = {
      '__default__': _renderUtils.defaultMarkupElementRenderer
    };
    Object.keys(markupElementRenderer).forEach(function (key) {
      _this.markupElementRenderer[key.toLowerCase()] = markupElementRenderer[key];
    });

    this._renderCallbacks = [];
    this._teardownCallbacks = [];
    this._renderedChildNodes = [];
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.sections.forEach(function (section) {
        var rendered = _this2.renderSection(section);
        if (rendered) {
          _this2.root.appendChild(rendered);
        }
      });
      for (var i = 0; i < this._renderCallbacks.length; i++) {
        this._renderCallbacks[i]();
      }
      // maintain a reference to child nodes so they can be cleaned up later by teardown
      this._renderedChildNodes = [];
      var node = this.root.firstChild;
      while (node) {
        this._renderedChildNodes.push(node);
        node = node.nextSibling;
      }
      return { result: this.root, teardown: function teardown() {
          return _this2.teardown();
        } };
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      for (var i = 0; i < this._teardownCallbacks.length; i++) {
        this._teardownCallbacks[i]();
      }
      for (var _i = 0; _i < this._renderedChildNodes.length; _i++) {
        var node = this._renderedChildNodes[_i];
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section) {
      var _section = _slicedToArray(section, 1),
          type = _section[0];

      switch (type) {
        case _sectionTypes.MARKUP_SECTION_TYPE:
          return this.renderMarkupSection(section);
        case _sectionTypes.IMAGE_SECTION_TYPE:
          return this.renderImageSection(section);
        case _sectionTypes.LIST_SECTION_TYPE:
          return this.renderListSection(section);
        case _sectionTypes.CARD_SECTION_TYPE:
          return this.renderCardSection(section);
        default:
          throw new Error('Cannot render mobiledoc section of type "' + type + '"');
      }
    }
  }, {
    key: 'renderMarkersOnElement',
    value: function renderMarkersOnElement(element, markers) {
      var elements = [element];
      var currentElement = element;

      var pushElement = function pushElement(openedElement) {
        currentElement.appendChild(openedElement);
        elements.push(openedElement);
        currentElement = openedElement;
      };

      for (var i = 0, l = markers.length; i < l; i++) {
        var marker = markers[i];

        var _marker = _slicedToArray(marker, 3),
            openTypes = _marker[0],
            closeCount = _marker[1],
            text = _marker[2];

        for (var j = 0, m = openTypes.length; j < m; j++) {
          var markerType = this.markerTypes[openTypes[j]];

          var _markerType = _slicedToArray(markerType, 2),
              tagName = _markerType[0],
              _markerType$ = _markerType[1],
              attrs = _markerType$ === undefined ? [] : _markerType$;

          if ((0, _tagNames.isValidMarkerType)(tagName)) {
            pushElement(this.renderMarkupElement(tagName, attrs));
          } else {
            closeCount--;
          }
        }

        currentElement.appendChild((0, _dom.createTextNode)(this.dom, text));

        for (var _j = 0, _m = closeCount; _j < _m; _j++) {
          elements.pop();
          currentElement = elements[elements.length - 1];
        }
      }
    }

    /**
     * @param attrs Array
     */

  }, {
    key: 'renderMarkupElement',
    value: function renderMarkupElement(tagName, attrs) {
      tagName = tagName.toLowerCase();
      attrs = (0, _sanitizationUtils.reduceAttributes)(attrs);

      var renderer = this.markupElementRendererFor(tagName);
      return renderer(tagName, this.dom, attrs);
    }
  }, {
    key: 'markupElementRendererFor',
    value: function markupElementRendererFor(tagName) {
      return this.markupElementRenderer[tagName] || this.markupElementRenderer.__default__;
    }
  }, {
    key: 'renderListItem',
    value: function renderListItem(markers) {
      var element = this.dom.createElement('li');
      this.renderMarkersOnElement(element, markers);
      return element;
    }
  }, {
    key: 'renderListSection',
    value: function renderListSection(_ref) {
      var _this3 = this;

      var _ref2 = _slicedToArray(_ref, 3),
          type = _ref2[0],
          tagName = _ref2[1],
          listItems = _ref2[2];

      if (!(0, _tagNames.isValidSectionTagName)(tagName, _sectionTypes.LIST_SECTION_TYPE)) {
        return;
      }
      var element = this.dom.createElement(tagName);
      listItems.forEach(function (li) {
        element.appendChild(_this3.renderListItem(li));
      });
      return element;
    }
  }, {
    key: 'renderImageSection',
    value: function renderImageSection(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          type = _ref4[0],
          src = _ref4[1];

      var element = this.dom.createElement(IMAGE_SECTION_TAG_NAME);
      element.src = src;
      return element;
    }
  }, {
    key: 'findCard',
    value: function findCard(name) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].name === name) {
          return this.cards[i];
        }
      }
      if (name === _image2.default.name) {
        return _image2.default;
      }
      return this._createUnknownCard(name);
    }
  }, {
    key: '_createUnknownCard',
    value: function _createUnknownCard(name) {
      return {
        name: name,
        type: _renderType2.default,
        render: this.unknownCardHandler
      };
    }
  }, {
    key: '_createCardArgument',
    value: function _createCardArgument(card) {
      var _this4 = this;

      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var env = {
        name: card.name,
        isInEditor: false,
        dom: this.dom,
        didRender: function didRender(callback) {
          return _this4._registerRenderCallback(callback);
        },
        onTeardown: function onTeardown(callback) {
          return _this4._registerTeardownCallback(callback);
        }
      };

      var options = this.cardOptions;

      return { env: env, options: options, payload: payload };
    }
  }, {
    key: '_registerRenderCallback',
    value: function _registerRenderCallback(callback) {
      this._renderCallbacks.push(callback);
    }
  }, {
    key: '_registerTeardownCallback',
    value: function _registerTeardownCallback(callback) {
      this._teardownCallbacks.push(callback);
    }
  }, {
    key: 'renderCardSection',
    value: function renderCardSection(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 3),
          type = _ref6[0],
          name = _ref6[1],
          payload = _ref6[2];

      var card = this.findCard(name);

      var cardArg = this._createCardArgument(card, payload);
      var rendered = card.render(cardArg);

      this._validateCardRender(rendered, card.name);

      return rendered;
    }
  }, {
    key: '_validateCardRender',
    value: function _validateCardRender(rendered, cardName) {
      if (!rendered) {
        return;
      }

      if ((typeof rendered === 'undefined' ? 'undefined' : _typeof(rendered)) !== 'object') {
        throw new Error('Card "' + cardName + '" must render ' + _renderType2.default + ', but result was "' + rendered + '"');
      }
    }
  }, {
    key: 'renderMarkupSection',
    value: function renderMarkupSection(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 3),
          type = _ref8[0],
          tagName = _ref8[1],
          markers = _ref8[2];

      tagName = tagName.toLowerCase();
      if (!(0, _tagNames.isValidSectionTagName)(tagName, _sectionTypes.MARKUP_SECTION_TYPE)) {
        return;
      }

      var renderer = this.sectionElementRendererFor(tagName);
      var element = renderer(tagName, this.dom);

      this.renderMarkersOnElement(element, markers);
      return element;
    }
  }, {
    key: 'sectionElementRendererFor',
    value: function sectionElementRendererFor(tagName) {
      return this.sectionElementRenderer[tagName] || this.sectionElementRenderer.__default__;
    }
  }, {
    key: '_defaultUnknownCardHandler',
    get: function get() {
      return function (_ref9) {
        var name = _ref9.env.name;

        throw new Error('Card "' + name + '" not found but no unknownCardHandler was registered');
      };
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

},{"../cards/image":1,"../utils/dom":7,"../utils/render-type":9,"../utils/render-utils":10,"../utils/sanitization-utils":11,"../utils/section-types":12,"../utils/tag-names":13}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOBILEDOC_VERSION = exports.MOBILEDOC_VERSION_0_3_1 = exports.MOBILEDOC_VERSION_0_3_0 = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('../utils/dom');

var _image = require('../cards/image');

var _image2 = _interopRequireDefault(_image);

var _renderType = require('../utils/render-type');

var _renderType2 = _interopRequireDefault(_renderType);

var _sectionTypes = require('../utils/section-types');

var _tagNames = require('../utils/tag-names');

var _sanitizationUtils = require('../utils/sanitization-utils');

var _renderUtils = require('../utils/render-utils');

var _markerTypes = require('../utils/marker-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MOBILEDOC_VERSION_0_3_0 = exports.MOBILEDOC_VERSION_0_3_0 = '0.3.0';
var MOBILEDOC_VERSION_0_3_1 = exports.MOBILEDOC_VERSION_0_3_1 = '0.3.1';
var MOBILEDOC_VERSION = exports.MOBILEDOC_VERSION = MOBILEDOC_VERSION_0_3_0;

var IMAGE_SECTION_TAG_NAME = 'img';

function validateVersion(version) {
  switch (version) {
    case MOBILEDOC_VERSION_0_3_0:
    case MOBILEDOC_VERSION_0_3_1:
      return;
    default:
      throw new Error('Unexpected Mobiledoc version "' + version + '"');
  }
}

var Renderer = function () {
  function Renderer(mobiledoc, state) {
    var _this = this;

    _classCallCheck(this, Renderer);

    var cards = state.cards,
        cardOptions = state.cardOptions,
        atoms = state.atoms,
        unknownCardHandler = state.unknownCardHandler,
        unknownAtomHandler = state.unknownAtomHandler,
        markupElementRenderer = state.markupElementRenderer,
        sectionElementRenderer = state.sectionElementRenderer,
        dom = state.dom;
    var version = mobiledoc.version,
        sections = mobiledoc.sections,
        atomTypes = mobiledoc.atoms,
        cardTypes = mobiledoc.cards,
        markerTypes = mobiledoc.markups;

    validateVersion(version);

    this.dom = dom;
    this.root = this.dom.createDocumentFragment();
    this.sections = sections;
    this.atomTypes = atomTypes;
    this.cardTypes = cardTypes;
    this.markerTypes = markerTypes;
    this.cards = cards;
    this.atoms = atoms;
    this.cardOptions = cardOptions;
    this.unknownCardHandler = unknownCardHandler || this._defaultUnknownCardHandler;
    this.unknownAtomHandler = unknownAtomHandler || this._defaultUnknownAtomHandler;

    this.sectionElementRenderer = {
      '__default__': _renderUtils.defaultSectionElementRenderer
    };
    Object.keys(sectionElementRenderer).forEach(function (key) {
      _this.sectionElementRenderer[key.toLowerCase()] = sectionElementRenderer[key];
    });

    this.markupElementRenderer = {
      '__default__': _renderUtils.defaultMarkupElementRenderer
    };
    Object.keys(markupElementRenderer).forEach(function (key) {
      _this.markupElementRenderer[key.toLowerCase()] = markupElementRenderer[key];
    });

    this._renderCallbacks = [];
    this._teardownCallbacks = [];
  }

  _createClass(Renderer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.sections.forEach(function (section) {
        var rendered = _this2.renderSection(section);
        if (rendered) {
          _this2.root.appendChild(rendered);
        }
      });
      for (var i = 0; i < this._renderCallbacks.length; i++) {
        this._renderCallbacks[i]();
      }
      // maintain a reference to child nodes so they can be cleaned up later by teardown
      this._renderedChildNodes = Array.prototype.slice.call(this.root.childNodes);
      return { result: this.root, teardown: function teardown() {
          return _this2.teardown();
        } };
    }
  }, {
    key: 'teardown',
    value: function teardown() {
      for (var i = 0; i < this._teardownCallbacks.length; i++) {
        this._teardownCallbacks[i]();
      }
      for (var _i = 0; _i < this._renderedChildNodes.length; _i++) {
        var node = this._renderedChildNodes[_i];
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section) {
      var _section = _slicedToArray(section, 1),
          type = _section[0];

      switch (type) {
        case _sectionTypes.MARKUP_SECTION_TYPE:
          return this.renderMarkupSection(section);
        case _sectionTypes.IMAGE_SECTION_TYPE:
          return this.renderImageSection(section);
        case _sectionTypes.LIST_SECTION_TYPE:
          return this.renderListSection(section);
        case _sectionTypes.CARD_SECTION_TYPE:
          return this.renderCardSection(section);
        default:
          throw new Error('Cannot render mobiledoc section of type "' + type + '"');
      }
    }
  }, {
    key: 'renderMarkersOnElement',
    value: function renderMarkersOnElement(element, markers) {
      var elements = [element];
      var currentElement = element;

      var pushElement = function pushElement(openedElement) {
        currentElement.appendChild(openedElement);
        elements.push(openedElement);
        currentElement = openedElement;
      };

      for (var i = 0, l = markers.length; i < l; i++) {
        var marker = markers[i];

        var _marker = _slicedToArray(marker, 4),
            type = _marker[0],
            openTypes = _marker[1],
            closeCount = _marker[2],
            value = _marker[3];

        for (var j = 0, m = openTypes.length; j < m; j++) {
          var markerType = this.markerTypes[openTypes[j]];

          var _markerType = _slicedToArray(markerType, 2),
              tagName = _markerType[0],
              _markerType$ = _markerType[1],
              attrs = _markerType$ === undefined ? [] : _markerType$;

          if ((0, _tagNames.isValidMarkerType)(tagName)) {
            pushElement(this.renderMarkupElement(tagName, attrs));
          } else {
            closeCount--;
          }
        }

        switch (type) {
          case _markerTypes.MARKUP_MARKER_TYPE:
            currentElement.appendChild((0, _dom.createTextNode)(this.dom, value));
            break;
          case _markerTypes.ATOM_MARKER_TYPE:
            currentElement.appendChild(this._renderAtom(value));
            break;
          default:
            throw new Error('Unknown markup type (' + type + ')');
        }

        for (var _j = 0, _m = closeCount; _j < _m; _j++) {
          elements.pop();
          currentElement = elements[elements.length - 1];
        }
      }
    }

    /**
     * @param attrs Array
     */

  }, {
    key: 'renderMarkupElement',
    value: function renderMarkupElement(tagName, attrs) {
      tagName = tagName.toLowerCase();
      attrs = (0, _sanitizationUtils.reduceAttributes)(attrs);

      var renderer = this.markupElementRendererFor(tagName);
      return renderer(tagName, this.dom, attrs);
    }
  }, {
    key: 'markupElementRendererFor',
    value: function markupElementRendererFor(tagName) {
      return this.markupElementRenderer[tagName] || this.markupElementRenderer.__default__;
    }
  }, {
    key: 'renderListItem',
    value: function renderListItem(markers) {
      var element = this.dom.createElement('li');
      this.renderMarkersOnElement(element, markers);
      return element;
    }
  }, {
    key: 'renderListSection',
    value: function renderListSection(_ref) {
      var _this3 = this;

      var _ref2 = _slicedToArray(_ref, 3),
          type = _ref2[0],
          tagName = _ref2[1],
          listItems = _ref2[2];

      if (!(0, _tagNames.isValidSectionTagName)(tagName, _sectionTypes.LIST_SECTION_TYPE)) {
        return;
      }
      var element = this.dom.createElement(tagName);
      listItems.forEach(function (li) {
        element.appendChild(_this3.renderListItem(li));
      });
      return element;
    }
  }, {
    key: 'renderImageSection',
    value: function renderImageSection(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          type = _ref4[0],
          src = _ref4[1];

      var element = this.dom.createElement(IMAGE_SECTION_TAG_NAME);
      element.src = src;
      return element;
    }
  }, {
    key: 'findCard',
    value: function findCard(name) {
      for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].name === name) {
          return this.cards[i];
        }
      }
      if (name === _image2.default.name) {
        return _image2.default;
      }
      return this._createUnknownCard(name);
    }
  }, {
    key: '_findCardByIndex',
    value: function _findCardByIndex(index) {
      var cardType = this.cardTypes[index];
      if (!cardType) {
        throw new Error('No card definition found at index ' + index);
      }

      var _cardType = _slicedToArray(cardType, 2),
          name = _cardType[0],
          payload = _cardType[1];

      var card = this.findCard(name);

      return {
        card: card,
        payload: payload
      };
    }
  }, {
    key: '_createUnknownCard',
    value: function _createUnknownCard(name) {
      return {
        name: name,
        type: _renderType2.default,
        render: this.unknownCardHandler
      };
    }
  }, {
    key: '_createCardArgument',
    value: function _createCardArgument(card) {
      var _this4 = this;

      var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var env = {
        name: card.name,
        isInEditor: false,
        dom: this.dom,
        didRender: function didRender(callback) {
          return _this4._registerRenderCallback(callback);
        },
        onTeardown: function onTeardown(callback) {
          return _this4._registerTeardownCallback(callback);
        }
      };

      var options = this.cardOptions;

      return { env: env, options: options, payload: payload };
    }
  }, {
    key: '_registerTeardownCallback',
    value: function _registerTeardownCallback(callback) {
      this._teardownCallbacks.push(callback);
    }
  }, {
    key: '_registerRenderCallback',
    value: function _registerRenderCallback(callback) {
      this._renderCallbacks.push(callback);
    }
  }, {
    key: 'renderCardSection',
    value: function renderCardSection(_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          type = _ref6[0],
          index = _ref6[1];

      var _findCardByIndex2 = this._findCardByIndex(index),
          card = _findCardByIndex2.card,
          payload = _findCardByIndex2.payload;

      var cardArg = this._createCardArgument(card, payload);
      var rendered = card.render(cardArg);

      this._validateCardRender(rendered, card.name);

      return rendered;
    }
  }, {
    key: '_validateCardRender',
    value: function _validateCardRender(rendered, cardName) {
      if (!rendered) {
        return;
      }

      if ((typeof rendered === 'undefined' ? 'undefined' : _typeof(rendered)) !== 'object') {
        throw new Error('Card "' + cardName + '" must render ' + _renderType2.default + ', but result was "' + rendered + '"');
      }
    }
  }, {
    key: 'findAtom',
    value: function findAtom(name) {
      for (var i = 0; i < this.atoms.length; i++) {
        if (this.atoms[i].name === name) {
          return this.atoms[i];
        }
      }
      return this._createUnknownAtom(name);
    }
  }, {
    key: '_createUnknownAtom',
    value: function _createUnknownAtom(name) {
      return {
        name: name,
        type: _renderType2.default,
        render: this.unknownAtomHandler
      };
    }
  }, {
    key: '_createAtomArgument',
    value: function _createAtomArgument(atom, value, payload) {
      var _this5 = this;

      var env = {
        name: atom.name,
        isInEditor: false,
        dom: this.dom,
        onTeardown: function onTeardown(callback) {
          return _this5._registerTeardownCallback(callback);
        }
      };

      var options = this.cardOptions;

      return { env: env, options: options, value: value, payload: payload };
    }
  }, {
    key: '_validateAtomRender',
    value: function _validateAtomRender(rendered, atomName) {
      if (!rendered) {
        return;
      }

      if ((typeof rendered === 'undefined' ? 'undefined' : _typeof(rendered)) !== 'object') {
        throw new Error('Atom "' + atomName + '" must render ' + _renderType2.default + ', but result was "' + rendered + '"');
      }
    }
  }, {
    key: '_findAtomByIndex',
    value: function _findAtomByIndex(index) {
      var atomType = this.atomTypes[index];
      if (!atomType) {
        throw new Error('No atom definition found at index ' + index);
      }

      var _atomType = _slicedToArray(atomType, 3),
          name = _atomType[0],
          value = _atomType[1],
          payload = _atomType[2];

      var atom = this.findAtom(name);

      return {
        atom: atom,
        value: value,
        payload: payload
      };
    }
  }, {
    key: '_renderAtom',
    value: function _renderAtom(index) {
      var _findAtomByIndex2 = this._findAtomByIndex(index),
          atom = _findAtomByIndex2.atom,
          value = _findAtomByIndex2.value,
          payload = _findAtomByIndex2.payload;

      var atomArg = this._createAtomArgument(atom, value, payload);
      var rendered = atom.render(atomArg);

      this._validateAtomRender(rendered, atom.name);

      return rendered || (0, _dom.createTextNode)(this.dom, '');
    }
  }, {
    key: 'renderMarkupSection',
    value: function renderMarkupSection(_ref7) {
      var _ref8 = _slicedToArray(_ref7, 3),
          type = _ref8[0],
          tagName = _ref8[1],
          markers = _ref8[2];

      tagName = tagName.toLowerCase();
      if (!(0, _tagNames.isValidSectionTagName)(tagName, _sectionTypes.MARKUP_SECTION_TYPE)) {
        return;
      }

      var renderer = this.sectionElementRendererFor(tagName);
      var element = renderer(tagName, this.dom);

      this.renderMarkersOnElement(element, markers);
      return element;
    }
  }, {
    key: 'sectionElementRendererFor',
    value: function sectionElementRendererFor(tagName) {
      return this.sectionElementRenderer[tagName] || this.sectionElementRenderer.__default__;
    }
  }, {
    key: '_defaultUnknownCardHandler',
    get: function get() {
      return function (_ref9) {
        var name = _ref9.env.name;

        throw new Error('Card "' + name + '" not found but no unknownCardHandler was registered');
      };
    }
  }, {
    key: '_defaultUnknownAtomHandler',
    get: function get() {
      return function (_ref10) {
        var name = _ref10.env.name;

        throw new Error('Atom "' + name + '" not found but no unknownAtomHandler was registered');
      };
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

},{"../cards/image":1,"../utils/dom":7,"../utils/marker-types":8,"../utils/render-type":9,"../utils/render-utils":10,"../utils/sanitization-utils":11,"../utils/section-types":12,"../utils/tag-names":13}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.includes = includes;
function includes(array, detectValue) {
  for (var i = 0; i < array.length; i++) {
    var value = array[i];
    if (value === detectValue) {
      return true;
    }
  }
  return false;
}

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextNode = createTextNode;
exports.normalizeTagName = normalizeTagName;
function addHTMLSpaces(text) {
  var nbsp = '\xA0';
  return text.replace(/  /g, ' ' + nbsp);
}

function createTextNode(dom, text) {
  return dom.createTextNode(addHTMLSpaces(text));
}

function normalizeTagName(tagName) {
  return tagName.toLowerCase();
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MARKUP_MARKER_TYPE = exports.MARKUP_MARKER_TYPE = 0;
var ATOM_MARKER_TYPE = exports.ATOM_MARKER_TYPE = 1;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = 'dom';

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSectionElementRenderer = defaultSectionElementRenderer;
exports.defaultMarkupElementRenderer = defaultMarkupElementRenderer;

var _tagNames = require('../utils/tag-names');

var _sanitizationUtils = require('./sanitization-utils');

function defaultSectionElementRenderer(tagName, dom) {
  var element = void 0;
  if ((0, _tagNames.isMarkupSectionElementName)(tagName)) {
    element = dom.createElement(tagName);
  } else {
    element = dom.createElement('div');
    element.setAttribute('class', tagName);
  }

  return element;
}

function sanitizeAttribute(tagName, attrName, attrValue) {
  if (tagName === 'a' && attrName === 'href') {
    return (0, _sanitizationUtils.sanitizeHref)(attrValue);
  } else {
    return attrValue;
  }
}

function defaultMarkupElementRenderer(tagName, dom, attrsObj) {
  var element = dom.createElement(tagName);
  Object.keys(attrsObj).forEach(function (attrName) {
    var attrValue = attrsObj[attrName];
    attrValue = sanitizeAttribute(tagName, attrName, attrValue);
    element.setAttribute(attrName, attrValue);
  });
  return element;
}

},{"../utils/tag-names":13,"./sanitization-utils":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitizeHref = sanitizeHref;
exports.reduceAttributes = reduceAttributes;

var _arrayUtils = require('./array-utils');

var PROTOCOL_REGEXP = /^([a-z0-9.+-]+:)/i;

var badProtocols = ['javascript:', // jshint ignore:line
'vbscript:' // jshint ignore:line
];

function getProtocol(url) {
  var matches = url && url.match(PROTOCOL_REGEXP);
  var protocol = matches && matches[0] || ':';
  return protocol;
}

function sanitizeHref(url) {
  var protocol = getProtocol(url);
  if ((0, _arrayUtils.includes)(badProtocols, protocol)) {
    return 'unsafe:' + url;
  }
  return url;
}

/**
 * @param attributes array
 * @return obj with normalized attribute names (lowercased)
 */
function reduceAttributes(attributes) {
  var obj = {};
  for (var i = 0; i < attributes.length; i += 2) {
    var key = attributes[i];
    var val = attributes[i + 1];
    obj[key.toLowerCase()] = val;
  }
  return obj;
}

},{"./array-utils":6}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MARKUP_SECTION_TYPE = exports.MARKUP_SECTION_TYPE = 1;
var IMAGE_SECTION_TYPE = exports.IMAGE_SECTION_TYPE = 2;
var LIST_SECTION_TYPE = exports.LIST_SECTION_TYPE = 3;
var CARD_SECTION_TYPE = exports.CARD_SECTION_TYPE = 10;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidSectionTagName = isValidSectionTagName;
exports.isMarkupSectionElementName = isMarkupSectionElementName;
exports.isValidMarkerType = isValidMarkerType;

var _sectionTypes = require('./section-types');

var _dom = require('./dom');

var MARKUP_SECTION_TAG_NAMES = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pull-quote', 'aside'].map(_dom.normalizeTagName);

var MARKUP_SECTION_ELEMENT_NAMES = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'aside'].map(_dom.normalizeTagName);

var LIST_SECTION_TAG_NAMES = ['ul', 'ol'].map(_dom.normalizeTagName);

var MARKUP_TYPES = ['b', 'i', 'strong', 'em', 'a', 'u', 'sub', 'sup', 's', 'code'].map(_dom.normalizeTagName);

function contains(array, item) {
  return array.indexOf(item) !== -1;
}

function isValidSectionTagName(tagName, sectionType) {
  tagName = (0, _dom.normalizeTagName)(tagName);

  switch (sectionType) {
    case _sectionTypes.MARKUP_SECTION_TYPE:
      return contains(MARKUP_SECTION_TAG_NAMES, tagName);
    case _sectionTypes.LIST_SECTION_TYPE:
      return contains(LIST_SECTION_TAG_NAMES, tagName);
    default:
      throw new Error('Cannot validate tagName for unknown section type "' + sectionType + '"');
  }
}

function isMarkupSectionElementName(tagName) {
  tagName = (0, _dom.normalizeTagName)(tagName);
  return contains(MARKUP_SECTION_ELEMENT_NAMES, tagName);
}

function isValidMarkerType(type) {
  type = (0, _dom.normalizeTagName)(type);
  return contains(MARKUP_TYPES, type);
}

},{"./dom":7,"./section-types":12}]},{},[2])
