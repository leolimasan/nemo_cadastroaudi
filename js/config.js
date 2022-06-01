window.CONFIG = [
    {
        id: 1,
        type: 'newsletter',
        template: 'components/newsletter/',
        idSite: 35
    }, {
        id: 2,
        type: 'cadastro',
        template: 'components/cadastro/',
        idSite: 36
    },
    {
        id: 99,
        type: 'cadastro2',
        template: 'components/cadastro2/',
        idSite: 36
    },
    {
        id: 109,
        type: 'cadastro3',
        template: 'components/cadastro3/',
        idSite: 36
    },
    {
        id: 3,
        type: 'car-configurator',
        template: 'components/configurator/',
        idSite: 37
    }, {
        id: 4,
        type: 'contato',
        template: 'components/contato/',
        idSite: 38
    }, {
        id: 5,
        type: 'e-tron',
        template: 'components/etron/',
        idSite: 40
    }, {
        id: 6,
        type: 'pcd',
        template: 'components/pcd/',
        idSite: 25
    }, {
        id: 7,
        type: 'rurais',
        template: 'components/rurais/',
        idSite: 20
    }, {
        id: 8,
        type: 'diplomatas',
        template: 'components/diplomatas/',
        idSite: 23
    }, {
        id: 9,
        type: 'frotistas',
        template: 'components/frotistas/',
        idSite: 19
    }, {
        id: 10,
        type: 'aftersales',
        template: 'components/aftersales/',
        idSite: 50
    }, {
        id: 11,
        type: 'audiforyou',
        template: 'components/audiforyou/',
        idSite: 50
    },
    {
        id: 12,
        type: 'vendas_especiais',
        template: 'components/vendas_especiais/',
        idSite: 51
    },
    {
        id: 13,
        type: 'salao_do_automovel',
        template: 'components/salao_do_automovel/',
        idSite: 53
    },
    {
        id: 14,
        type: 'salao_do_automovel_simplificado',
        template: 'components/salao_do_automovel_simplificado/',
        idSite: 54
    },
    {
        id: 15,
        type: 'cadastro_etron',
        template: 'components/cadastro_etron/',
        idSite: 36
    },
    {
        id: 24,
        type: 'cadastro_evento',
        template: 'components/cadastro_evento/',
        idSite: 36
    },
    {
        id: 888,
        type: 'cadastro_vtp',
        template: 'components/cadastro_vtp/',
        idSite: 36
    },
    {
        id: 999,
        type: 'cadastro_uat',
        template: 'components/cadastro_uat/',
        idSite: 36
    },
];

window.URL_CONTENT_BASE 			= "https://audileads-new.herokuapp.com";
//window.URL_CONTENT_BASE 			= "https://apileads.audi.local:8080";
window.URL_PROJECT 					= window.URL_CONTENT_BASE + "";
window.URL_LEAD_TMP_SAVE 			= window.URL_PROJECT + "/Leadtmp/save";
window.URL_LEAD_SAVE 				= window.URL_PROJECT + "/Lead/save";
window.URL_LEAD_SETEMAIL 				= window.URL_PROJECT + "/Lead/setemail";
window.URL_LEAD_CORPORATE_COMPANY 	= window.URL_PROJECT + "/LeadCorporateCompany/save";
window.URL_LEAD_CORPORATE_FLEET 	= window.URL_PROJECT + "/LeadCorporateFleet/save";
window.URL_LEAD_CORPORATE_RURAL 	= window.URL_PROJECT + "/LeadCorporateRural/save";

window.URL_STATE_LIST 				= window.URL_PROJECT + "/state/list";
window.URL_STATE_LIST_JSON          = window.URL_PROJECT + "/state/list";

window.URL_VEHICLEMODELS_LIST_JSON  = window.URL_PROJECT + "/vehiclemodel/list";
window.URL_VEHICLE_LIST 			= window.URL_PROJECT + "/Vehiclemodel/list";
window.URL_VEHICLE_LIST2 			= window.URL_PROJECT + "/Vehiclemodel/list2";
window.URL_VEHICLE_LISTLUX 			= window.URL_PROJECT + "/Vehiclemodel/list3";

window.URL_DEALER_LIST_JSON         = window.URL_PROJECT + "/dealer/listWithStates";
window.URL_DEALER_LIST_JSON2        = window.URL_PROJECT + "/dealer/listWithStates2";
window.URL_DEALER_LIST_JSON3        = window.URL_PROJECT + "/dealer/listWithStates3";
window.URL_DEALER_LIST_JSON_ETRON   = window.URL_PROJECT + "/dealer/listWithStatesEtron";
window.URL_DEALER_LIST 				= window.URL_PROJECT + "/dealer/listWithStates";
window.URL_DEALER_LIST_VTP 		    = window.URL_PROJECT + "/dealer/listWithVTP";

window.URL_CITY_BY_STATE_JSON       = window.URL_PROJECT + "/city/getByStateId";
window.URL_CITY_LIST_BY_STATE	 	= window.URL_PROJECT + "/city/getByStateId";

window.URL_DEALER_BY_STATE_JSON     = window.URL_PROJECT + "/dealer/getByStateId/";

window.URL_NEWSLETTER_SAVE          = window.URL_PROJECT + "/newsletter/save";

window.URL_SITE_LIST_JSON           = window.URL_PROJECT + "/site/list";
