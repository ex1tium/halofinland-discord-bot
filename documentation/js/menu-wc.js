'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">halofinland-bot documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' : 'data-target="#xs-controllers-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' :
                                            'id="xs-controllers-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' : 'data-target="#xs-injectables-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' :
                                        'id="xs-injectables-links-module-AppModule-7694ad265f963d28ca8603d03cfcba3de7d4ae56b01eac0218906c2c6495954b5f48a3c3c2824d124ed40335c5c50008fca877569a0a7bd463fc661163611599"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiscordApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscordApiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HaloDotApiModule.html" data-type="entity-link" >HaloDotApiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' : 'data-target="#xs-controllers-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' :
                                            'id="xs-controllers-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' }>
                                            <li class="link">
                                                <a href="controllers/HaloDotApiController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HaloDotApiController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' : 'data-target="#xs-injectables-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' :
                                        'id="xs-injectables-links-module-HaloDotApiModule-15745971ab9d594e41db94d798d13847e7efb10a08aa3c5b4bb1740d053bbd14d7b95ad2b70126d90963a29b64d87dda8a1b038fad39b3d66a3717f704314a69"' }>
                                        <li class="link">
                                            <a href="injectables/HaloDotApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HaloDotApiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/Oauth2DiscordModule.html" data-type="entity-link" >Oauth2DiscordModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-Oauth2DiscordModule-209b9a6aa62151a6ef1bc90b052e5fd5271b6396b2df4cc8aaf182b6de6c88423f37485b02a3bf4ee84b659edca5584a819f86886f86ecd25a5cfafc35deab8d"' : 'data-target="#xs-controllers-links-module-Oauth2DiscordModule-209b9a6aa62151a6ef1bc90b052e5fd5271b6396b2df4cc8aaf182b6de6c88423f37485b02a3bf4ee84b659edca5584a819f86886f86ecd25a5cfafc35deab8d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-Oauth2DiscordModule-209b9a6aa62151a6ef1bc90b052e5fd5271b6396b2df4cc8aaf182b6de6c88423f37485b02a3bf4ee84b659edca5584a819f86886f86ecd25a5cfafc35deab8d"' :
                                            'id="xs-controllers-links-module-Oauth2DiscordModule-209b9a6aa62151a6ef1bc90b052e5fd5271b6396b2df4cc8aaf182b6de6c88423f37485b02a3bf4ee84b659edca5584a819f86886f86ecd25a5cfafc35deab8d"' }>
                                            <li class="link">
                                                <a href="controllers/Oauth2DiscordController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Oauth2DiscordController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-be693e6a7f8711c0b4f3304f42eb456b3b4df0c4fb0178fe4d81113e332c452bf5748ac4359eb2b42b6bffa6b54fead4842bc1c2f6b8cb9caf49936a918b728c"' : 'data-target="#xs-injectables-links-module-SharedModule-be693e6a7f8711c0b4f3304f42eb456b3b4df0c4fb0178fe4d81113e332c452bf5748ac4359eb2b42b6bffa6b54fead4842bc1c2f6b8cb9caf49936a918b728c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-be693e6a7f8711c0b4f3304f42eb456b3b4df0c4fb0178fe4d81113e332c452bf5748ac4359eb2b42b6bffa6b54fead4842bc1c2f6b8cb9caf49936a918b728c"' :
                                        'id="xs-injectables-links-module-SharedModule-be693e6a7f8711c0b4f3304f42eb456b3b4df0c4fb0178fe4d81113e332c452bf5748ac4359eb2b42b6bffa6b54fead4842bc1c2f6b8cb9caf49936a918b728c"' }>
                                        <li class="link">
                                            <a href="injectables/HaloDotApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HaloDotApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TwitterService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TwitterService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommandValidationFilter.html" data-type="entity-link" >CommandValidationFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetDto.html" data-type="entity-link" >GetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageFromUserGuard.html" data-type="entity-link" >MessageFromUserGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/MessageToUpperPipe.html" data-type="entity-link" >MessageToUpperPipe</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsBaseCommand.html" data-type="entity-link" >StatsBaseCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsDto.html" data-type="entity-link" >StatsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsGetSubCommand.html" data-type="entity-link" >StatsGetSubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsHelpDto.html" data-type="entity-link" >StatsHelpDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsHelpSubCommand.html" data-type="entity-link" >StatsHelpSubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsRegSubCommand.html" data-type="entity-link" >StatsRegSubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatsUpdateSubCommand.html" data-type="entity-link" >StatsUpdateSubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/TestCommand.html" data-type="entity-link" >TestCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDto.html" data-type="entity-link" >UpdateDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/HaloDotApiMiddleware.html" data-type="entity-link" >HaloDotApiMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HaloDotApiService.html" data-type="entity-link" >HaloDotApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TwitterService.html" data-type="entity-link" >TwitterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Additional.html" data-type="entity-link" >Additional</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Additional-1.html" data-type="entity-link" >Additional</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AllTime.html" data-type="entity-link" >AllTime</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Assists.html" data-type="entity-link" >Assists</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Breakdowns.html" data-type="entity-link" >Breakdowns</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Choice.html" data-type="entity-link" >Choice</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CsrsRootObject.html" data-type="entity-link" >CsrsRootObject</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Current.html" data-type="entity-link" >Current</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Damage.html" data-type="entity-link" >Damage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Data.html" data-type="entity-link" >Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DefineDiscordCommand.html" data-type="entity-link" >DefineDiscordCommand</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Kills.html" data-type="entity-link" >Kills</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Matches.html" data-type="entity-link" >Matches</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QueueGroups.html" data-type="entity-link" >QueueGroups</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Season.html" data-type="entity-link" >Season</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceRecord.html" data-type="entity-link" >ServiceRecord</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Shots.html" data-type="entity-link" >Shots</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Summary.html" data-type="entity-link" >Summary</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TimePlayed.html" data-type="entity-link" >TimePlayed</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ToJsonResponse.html" data-type="entity-link" >ToJsonResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Vehicles.html" data-type="entity-link" >Vehicles</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});