'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">halofinland-bot documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"license.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>LICENSE\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"' : 'data-target="#xs-controllers-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"' : 'id="xs-controllers-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/AppController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"' : 'data-target="#xs-injectables-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"' : 'id="xs-injectables-links-module-AppModule-ae30dba2b394640121f6493f0d975cfaa460e4868d9fb72bc438356cd67215bed89cc831ad119a703051d268002ac251efa0fe65977c36fca4b506aeacd2658e"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/DiscordApiService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DiscordApiService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/Oauth2DiscordModule.html\" data-type=\"entity-link\" >Oauth2DiscordModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#controllers-links-module-Oauth2DiscordModule-d547c4331d2c02889332152de67639a5863fc831c4c9f13edac426e4b14f50c1b083fb0cb5d4fb2b3f8b27366f5914a4d20773e937e55fe515c773c58fefe0da"' : 'data-target="#xs-controllers-links-module-Oauth2DiscordModule-d547c4331d2c02889332152de67639a5863fc831c4c9f13edac426e4b14f50c1b083fb0cb5d4fb2b3f8b27366f5914a4d20773e937e55fe515c773c58fefe0da"', ">\n                                            <span class=\"icon ion-md-swap\"></span>\n                                            <span>Controllers</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="controllers-links-module-Oauth2DiscordModule-d547c4331d2c02889332152de67639a5863fc831c4c9f13edac426e4b14f50c1b083fb0cb5d4fb2b3f8b27366f5914a4d20773e937e55fe515c773c58fefe0da"' : 'id="xs-controllers-links-module-Oauth2DiscordModule-d547c4331d2c02889332152de67639a5863fc831c4c9f13edac426e4b14f50c1b083fb0cb5d4fb2b3f8b27366f5914a4d20773e937e55fe515c773c58fefe0da"', ">\n                                            <li class=\"link\">\n                                                <a href=\"controllers/Oauth2DiscordController.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >Oauth2DiscordController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/SharedModule.html\" data-type=\"entity-link\" >SharedModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links-module-SharedModule-cba77e24aad8586762bca64f82b637eb99790da7d88a24f134645906279eec86d5d4fc29945c78f77c9e5b07a1204191085987381b0917fff5c4934e50dbb738"' : 'data-target="#xs-injectables-links-module-SharedModule-cba77e24aad8586762bca64f82b637eb99790da7d88a24f134645906279eec86d5d4fc29945c78f77c9e5b07a1204191085987381b0917fff5c4934e50dbb738"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-SharedModule-cba77e24aad8586762bca64f82b637eb99790da7d88a24f134645906279eec86d5d4fc29945c78f77c9e5b07a1204191085987381b0917fff5c4934e50dbb738"' : 'id="xs-injectables-links-module-SharedModule-cba77e24aad8586762bca64f82b637eb99790da7d88a24f134645906279eec86d5d4fc29945c78f77c9e5b07a1204191085987381b0917fff5c4934e50dbb738"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/HaloDotApiService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >HaloDotApiService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/PrismaService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PrismaService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/TwitterService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TwitterService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/UserService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >UserService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/AllExceptionsFilter.html\" data-type=\"entity-link\" >AllExceptionsFilter</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/CommandValidationFilter.html\" data-type=\"entity-link\" >CommandValidationFilter</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/GetDto.html\" data-type=\"entity-link\" >GetDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/MessageFromUserGuard.html\" data-type=\"entity-link\" >MessageFromUserGuard</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/MessageToUpperPipe.html\" data-type=\"entity-link\" >MessageToUpperPipe</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/RegisterDto.html\" data-type=\"entity-link\" >RegisterDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsBaseCommand.html\" data-type=\"entity-link\" >StatsBaseCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsDto.html\" data-type=\"entity-link\" >StatsDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsGetSubCommand.html\" data-type=\"entity-link\" >StatsGetSubCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsHelpDto.html\" data-type=\"entity-link\" >StatsHelpDto</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsHelpSubCommand.html\" data-type=\"entity-link\" >StatsHelpSubCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsRegSubCommand.html\" data-type=\"entity-link\" >StatsRegSubCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/StatsUpdateSubCommand.html\" data-type=\"entity-link\" >StatsUpdateSubCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/UpdateDto.html\" data-type=\"entity-link\" >UpdateDto</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/ExampleMiddleWare.html\" data-type=\"entity-link\" >ExampleMiddleWare</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/HaloDotApiService.html\" data-type=\"entity-link\" >HaloDotApiService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/PrismaService.html\" data-type=\"entity-link\" >PrismaService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TwitterService.html\" data-type=\"entity-link\" >TwitterService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UserService.html\" data-type=\"entity-link\" >UserService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Additional.html\" data-type=\"entity-link\" >Additional</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Additional-1.html\" data-type=\"entity-link\" >Additional</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AllTime.html\" data-type=\"entity-link\" >AllTime</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Assists.html\" data-type=\"entity-link\" >Assists</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Breakdowns.html\" data-type=\"entity-link\" >Breakdowns</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Choice.html\" data-type=\"entity-link\" >Choice</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CsrsRootObject.html\" data-type=\"entity-link\" >CsrsRootObject</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Current.html\" data-type=\"entity-link\" >Current</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Damage.html\" data-type=\"entity-link\" >Damage</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Data.html\" data-type=\"entity-link\" >Data</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DefineDiscordCommand.html\" data-type=\"entity-link\" >DefineDiscordCommand</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Kills.html\" data-type=\"entity-link\" >Kills</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Matches.html\" data-type=\"entity-link\" >Matches</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/QueueGroups.html\" data-type=\"entity-link\" >QueueGroups</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Response.html\" data-type=\"entity-link\" >Response</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Season.html\" data-type=\"entity-link\" >Season</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ServiceRecord.html\" data-type=\"entity-link\" >ServiceRecord</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Shots.html\" data-type=\"entity-link\" >Shots</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Summary.html\" data-type=\"entity-link\" >Summary</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/TimePlayed.html\" data-type=\"entity-link\" >TimePlayed</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/ToJsonResponse.html\" data-type=\"entity-link\" >ToJsonResponse</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Vehicles.html\" data-type=\"entity-link\" >Vehicles</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/functions.html\" data-type=\"entity-link\">Functions</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));