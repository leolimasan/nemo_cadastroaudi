function getHashes() {
    return window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = getHashes();
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
//[WUNBRAAUDIMANUT-1]
(function() {
    var utmParams = {}, hashes = getHashes(), params = {};
    for (k in hashes) { // Obtenha parâmetros e valores
        var hash = hashes[k].split("=");
        params[hash[0]] = hash[1];
    }
    switch (params.id) { // Salve os valores na sessão UTM
        case "2":
        case "10":
        case "99":
        case "11":
        case "15":
        ["utm_campaign", "utm_medium", "utm_source", "utm_term", "utm_content"].map(function (utm) {
            if (!(utm in sessionStorage) || sessionStorage[utm] === "null") { // Mantém o primeiro valor UTM
                sessionStorage.setItem(utm, (params[utm] === undefined) ? null : (decodeURI(params[utm]) || null));
            }
        });
    }
})();
//[WUNBRAAUDIMANUT-1]

function loadComponent(template, componentUrl) {
    var index = componentUrl + "/index.html";
    var css = componentUrl + "css/application.css";
    $('#dynamic-style').attr('href', css).appendTo('head');
    $.get({
        url: index,
        dataType: 'html',
        async: false,
        cache: false
    }).done(function(data) {
        template.append(data);
    });
}

function includeGtm(){
    var head = "<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NF2QKJ3');</script><!-- End Google Tag Manager -->";
    var body = '<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NF2QKJ3"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->';
    // $("head").prepend(head);
    // $("body").prepend(body);

    // var head = "<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K96VX7T');</script><!-- End Google Tag Manager -->";
    // var body = '<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K96VX7T"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->';
    $("head").prepend(head);
    $("body").prepend(body);
}

function main(){
    var $section = $('#main-container');
    var params = getUrlVars();

    resizeHeight();

    if(params && params.length > 0) {
        var id = parseInt(params["id"]);
        if (id === 2 || id === 10 || id === 99 || id === 15){
            includeGtm();
        }
        var itemFound = _.find(
            window.CONFIG,
            function(value) {
                return value.id == id;
            }
        );

        if(itemFound && itemFound.template) {
            loadComponent($section, itemFound.template);
        }
    }
}

function resizeHeight() {
    var $wrapper = $('.wrapper');

    setInterval(function() {
        window.parent.postMessage('{"type":"resize","height":"' + $wrapper.outerHeight() + '","url":"'+ document.location.href +'","currentPageNumber":1,"numberOfPages":2,"destinationUrl":null,"embeddedId":null,"id":"nemo.cadastroaudi","idWithoutLocale":"nemo.cadastroaudi"}', "*");
    }, 500);
}

$(document).ready(function(){
    main();
    window.Parsley.addValidator('cpfVal', {
        validateString: function(value) {
            value = value.replace(/[^\d]+/g,'');
            if(value == '') return false;
            // Elimina values invalidos conhecidos
            if (value.length != 11 ||
                value == "00000000000" ||
                value == "11111111111" ||
                value == "22222222222" ||
                value == "33333333333" ||
                value == "44444444444" ||
                value == "55555555555" ||
                value == "66666666666" ||
                value == "77777777777" ||
                value == "88888888888" ||
                value == "99999999999")
                    return false;
            // Valida 1o digito
            add = 0;
            for (i=0; i < 9; i ++)
                add += parseInt(value.charAt(i)) * (10 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(value.charAt(9)))
                    return false;
            // Valida 2o digito
            add = 0;
            for (i = 0; i < 10; i ++)
                add += parseInt(value.charAt(i)) * (11 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(value.charAt(10)))
                return false;
            return true;
        }
      });
});
