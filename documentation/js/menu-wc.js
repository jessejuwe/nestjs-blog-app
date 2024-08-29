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
                    <a href="index.html" data-type="index-link">intro documentation</a>
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
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' : 'data-bs-target="#xs-controllers-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' :
                                            'id="xs-controllers-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' : 'data-bs-target="#xs-injectables-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' :
                                        'id="xs-injectables-links-module-AppModule-0f8e4da641dccff91342f22264573343f56445f90328ba717c2a023151bfbad3d579f429e2cbbc94e80011ab31d52a20b04c4b3115b187fbd2f8523c457fb50f"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' :
                                            'id="xs-controllers-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' :
                                        'id="xs-injectables-links-module-AuthModule-daddd544c58d3c57d048f090abd8a8f22f94206dbc7098f4c7a4be84032cb5a4990d398e2d90ff9a0468bd6d59631dae4aaf7b1b6e0615e23da25c4b40d6c95f"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-04530745a32736a359e3269e7a74627933479673f51fbf1eb2b4e157530129e0425a03088a8a30dc384d962dd54f8fca3200e807abd158661ae9062e358bdd48"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' :
                                            'id="xs-controllers-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' :
                                        'id="xs-injectables-links-module-PostsModule-e9f025caf7b498e86a6847d7fc7eaea804799feb6c69252d4313d05ee419efb2beedffe590f91268ffc3f102c1d1bdbf1af1ae16c96de636ca9da2c521380a2a"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' :
                                            'id="xs-controllers-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' :
                                        'id="xs-injectables-links-module-TagsModule-9513823e2e7cba9736cdfd4991cdee06fdae975bdb1815b9db7d50e59fcfccfd8cf8fc1053dc85a5871cecbf6e2f4669e8ae9de2ac5777df4ff218379abba878"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' :
                                            'id="xs-controllers-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' :
                                        'id="xs-injectables-links-module-UsersModule-ba3b118a14397b0d83e4d7e4bdb9d87c25f247a50286e33f8b7a01efc58d81eaf59558006b7fb24545e71b601a87644c915a28bdb7b338b3389b509d495dd614"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersQueryDto.html" data-type="entity-link" >GetUsersQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
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
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});