var Form;

// function autocompletarForm(){
//     [{"name":"salutation","value":"on"},
//     // {"name":"event","value":"42"},
//     {"name":"name","value":"Teste Wunderman"},{"name":"company","value":""},{"name":"phone","value":"(44)3452-24534"},
//     // {"name":"email","value":"teste"+(Math.floor(Math.random() * 1000))+"@teste.com"},
//     {"name":"email","value":"matias.gonzalez@wunderman.com"},
//     {"name":"state","value":"18"},{"name":"city","value":"2798"},{"name":"interest","value":"on"},
//     {"name":"cpf","value":"31871081483"},{"name":"cnpj","value":""},{"name":"birthday","value":"01/01/2000"},{"name":"seller","value":"4601"},{"name":"seller","value":"4580"},{"name":"vehiclemodel","value":"RSQ33"}].map((attr)=>{
//         $("form [name='"+attr.name+"']").val(attr.value)
//     });
//     $("form [name='state']").trigger("change");
//     $("form [name='city']").val("2798");
// }
// setTimeout(function(){
//     autocompletarForm(); // off on
// }, 2000);

Form = (function(_window) {
    'use strict';

    var bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    };

    function Form() {
         this.onSubmit = bind(this.onSubmit, this);
         this.onChangeVehicle = bind(this.onChangeVehicle, this);
         this.campaignName = "";
    };

    Form.prototype.defaultParseQueryString = function () {
        var vars = [], hash;
        var hashes = window.location
            .href
            .slice(
                window.location
                    .href
                    .indexOf('?') + 1
            )
            .split('&');

        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }

        return vars;
    };

    Form.prototype.parseQuerystring = function() {
        var args = this.defaultParseQueryString();
        var webFormArguments = {
            car: args.car ? args.car : "",
            origin: args.origin ? args.origin : "",
            subOrigin: args.subOrigin ? args.subOrigin : "",
            campaign: args.campaign ? args.campaign : "",
            leadSource: args.leadSource ? args.leadSource : "",
            leadType: args.leadType ? args.leadType : "",
            recordType: args.recordType ? args.recordType : ""
        };
        return webFormArguments;
    };

    Form.prototype.translateSpecificVehicle = function(carId){
        var translatedId = null;
        if(VEHICLE_CODES){
            for (var i = 0; i < VEHICLE_CODES.length; i++) {
                var vehicle = VEHICLE_CODES[i];

                var index = vehicle.from.indexOf(carId);

                if(index >= 0) {
                    translatedId = vehicle.to;
                    break;
                }
            }
        }

        return translatedId;
    };

    Form.prototype.changeCar = function() {
        var vehicle = $("select[name=vehiclemodel]");

        if(vehicle){
            var itemFound = null;
            var translatedId = this.translateSpecificVehicle(this.args.car);

            var carId = translatedId
                ? translatedId
                : this.args.car;

            if(carId)
                vehicle.children().each(function(index, item){
                    if(item.value === carId){
                        itemFound = item;
                        return;
                    }
                });

            if(itemFound){
                vehicle.val(carId);
                /*vehicle.attr({
                    "disabled": "disabled"
                });*/
            } else {
                this.args.car = "";
            }
        }
    };

    Form.prototype.onChangeVehicle = function (e) {
        this.args.car = $(e.target).val();
    };

    Form.prototype.disableCompanyFields = function(){
        this.company.attr({
            'data-parsley-required': false
        })
        .parent()
        .hide();

        //dentro do app.js existe um evento que sobrepõe o .hide deste parent
        //com o remove, não será necessário criar nenhuma gambiarra dentro do compilado
        //para controlar o estado de apresentação deste componente.

    };

    Form.prototype.findDocument = function() {
        var documentType = $("input[name=documentType]:checked").data("id");
        var document = "";

        if(documentType)
            document = documentType === 0
                ? this.removeSpecialChars(this.cpf.val())
                : this.removeSpecialChars(this.cnpj.val());
        else
            document = this.removeSpecialChars(this.cpf.val());

        return document;
    };

    Form.prototype.getCampaignName = function(campaign) {
        return $.ajax({
            type: 'get',
            url: "https://audileads-new.herokuapp.com/campaign/getByIdSalesforce?id=" + campaign,
            dataType: 'json'
        });
    };

    Form.prototype.load = function () {
        this.args = this.parseQuerystring();
        this.flagGo = true;
        this.form = $('form');
        this.element = $('.formLead');
        $.urlParam = function(name){
          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
          if(results != null){
            return results[1] || 0;
          }else{
            return false;
          }
        }
        this.audicode = $.urlParam('audicode');
        this.audicars = $.urlParam('car');
        this.content = $('.formLeadContent');
        this.success = $('.formLeadSuccess');
        this.successMessageTitle = $('.formLeadSuccessTitle');
        this.company = $('input[name=company]');
        this.documentType = $('.formGroup.documentType div');
        this.cpf = $("input[name=cpf]");
        this.cnpj = $("input[name=cnpj]");

        var sendFormButton = $('.send');
        var vehicleSelect =  $('.vehiclemodel select');

        vehicleSelect.on('change', this.onChangeVehicle);
        sendFormButton.on('click', this.onSubmit);

        if(this.args.recordType !== FORM_TYPE.CorporateSales)
            this.disableCompanyFields();

        if(this.args.campaign) {
            var campaignPromise = this.getCampaignName(this.args.campaign);

            $.when(campaignPromise).done(
                bind(function(data){
                    this.campaignName = data.campaign;
                },this)
            ).fail(function(error) {
                console.log(error);
            })
        }

        //preselect car model
        $('select[name="vehiclemodel"] option[value="' + this.translateSpecificVehicle( this.args.car ) + '"]' ).prop('selected','selected');
    };

    Form.prototype.removeSpecialChars = function(str){
        return str.replace(/[^a-zA-Z 0-9]+/g,'');
    };

    Form.prototype.onSubmit = function(e) {
        e.preventDefault();
        //For checkbox validation.
        $(".newsletter").removeClass("hasError");
        if($(".newsletterCheckbox").find(".term-policy-error").hasClass("term-policy-error"))
        {
            $(".term-policy-error").remove();
        }
        if(!$(".newsletterCheckbox").hasClass("checked")){
            $(".newsletter").addClass("hasError");
            $(".newsletterCheckbox").append('<div class="custom-checkbox-error"><label class="term-policy-error"><span class="labelTitle" style="width: 100%; margin-top: 40px; background-color: transparent; display: block; text-align: right; font-family: AudiTypeV03-Normal; font-size: 13px;">*É necessário concordar com Declaração de Privacidade.</span></label></div>');
            return false;
        }else{
            $(".term-policy-error").remove();
        }
        
        var cpfvalid = cpfValid();

        if (!this.form.parsley().validate()) {
            this.element.find('.hasError').eq(0).find('select, input').focus();
        }

      if (!cpfvalid) {
          $('input[name=cpf]').focus();
          return false;
      }

        if (this.form.parsley().isValid() && this.flagGo) {
            this.flagGo = false;
            this.element.find('.send').val('Enviando...');
            var dealers = [];
            var dealersIds = [];
            var vehicles = [];

            this.element.find('.seller select').each(function() {
                if ($(this).val() !== '') {
                dealersIds.push($("option[value='"+$(this).val()+"']").attr('data-id'));
                return dealers.push($(this).val());
                }
            });

            this.element.find('.vehiclemodel select').each(function() {
                if ($(this).val() !== '') {
                return vehicles.push($(this).val());
                }
            });

            var name = this.element.find('.name input').val();
            var firstName = '';
            var lastName = '';

            if(name && name.indexOf !== ' ' >= 0) {
                var names = name.split(' ');
                firstName = names[0];
                names.splice(0, 1);
                lastName = names.join(' ');
            } else {
                firstName = name;
            }

            var interestType = $('input[name=interest]:checked').data('id') == 1
                ? "Information"
                : "Buy";

            var postData = {
                "salutation": $('input[name=salutation]:checked').data('id'),
                "first_name": firstName,
                "00N4100000VtFGj": interestType === "Information"
                    ? ""
                    : this.findDocument(),
                "phone": $('.phone input').val(),
                "email": $('.email input').val(),
                "optIn": $('.newsletterCheckbox').hasClass('checked') ? 1 : 0,
                "00N4100000VtFBj": dealers[0],
                "oid": "00D41000002ElAp",
                "retURL": "http://www.audi.com.br/",
                "recordType": this.args.recordType,
                "00N4100000VtGX2": this.args.leadType,
                "lead_source": this.args.leadSource,
                "00N4100000VtGXR": interestType,
                "00N4100000VtFDa": $(".vehiclemodel option:selected").val(),
                "00N4100000VtFDz": $("select[name=vehiclemodel] option:selected").text(),
                "00N4100000VtGde": this.campaignName,
                "00N4100000VtFE9": "",
                "city": $('select[name=city] option:selected').text(),
                "state": $('select[name=state] option:selected').text(),
                "Campaign_ID": unescape(this.args.campaign),
                "last_name": lastName,
                "00N4100000bOzjS": sessionStorage.utm_campaign,
                "00N4100000bOzjN": sessionStorage.utm_content,
                "00N4100000bOzjD": sessionStorage.utm_medium,
                "00N4100000bOziZ": sessionStorage.utm_source,
                "00N4100000bOzjX": sessionStorage.utm_term
            };

            if(dealers.length > 1) {
                postData["00N4100000VtFCm"] = dealers[1];
            }

            if(_env == "prod"){
                postData["00N4100000enLcG"]= this.audicode;
                postData["00N4100000VtFDa"]= this.audicars;
            }else{
                postData["00N1k000000eeeG"]= this.audicode;
                postData["00N4100000VtFDa"]= this.audicars;
            }
            if($('.newsletterCheckbox').hasClass('checked')) {
                postData["00N4100000VtGWs"] = "1";
                postData["00N4100000XA0He"] = "1";
                postData["00N4100000VtGWn"] = "1";
            }

            if(this.args.recordType === FORM_TYPE.CorporateSales)
                postData["company"] = this.company.val();

                function _ajax_success_message(_this){
                    TweenMax.to(_this.success, 3, {
                        autoAlpha: 1,
                        ease: Quart.easeIn,
                        onComplete: function() {
                            _this.flagGo = true;

                            $('body').scrollTop(0);

                            _this.content.css({
                                'display': 'none'
                            });

                            _this.success.css({
                                'display': 'table-cell'
                            });
                        }
                    });
                }

                function _ajax_error(_this){
                    _this.successMessageTitle.html('<strong>Dados enviados com sucesso.</strong><br/>.');
                    _ajax_success_message(_this);
                }
                function _ajax_success(_this, jqXHR){
                    var primary_dealer_html = '<div style="line-height:18px;max-width:400px; width: 60%;margin: auto;margin-top: 20px;color: #000;"><b style="font-weight:700">'+jqXHR.dealers.primary.name+'</b><br/>Telefone: '+jqXHR.dealers.primary.phone+'<br/>Endereço: '+jqXHR.dealers.primary.address + '</div>';
                    var optional_dealer_html = "";
                    if (jqXHR.dealers.optional.name) {
                        optional_dealer_html = '<div style="line-height:18px;max-width:400px; width: 60%;margin: auto;margin-bottom: 20px;color: #000;"><b style="font-weight:700">'+jqXHR.dealers.optional.name+' (opcional)</b><br/>Telefone: '+jqXHR.dealers.optional.phone+'<br/>Endereço: '+jqXHR.dealers.optional.address + '</div>';
                    }
                    _this.successMessageTitle.html('<strong>Dados enviados com sucesso.</strong><br/><br/> Agradecemos seu interesse.<br/> Em breve entraremos em contato.');
                    _ajax_success_message(_this);
                }

            $.ajax({
                url: ENDPOINTS[_env].url,
                method: 'post',
                data: postData,
                complete: (function(_this) {
                    $.ajax({
                        url: window.URL_LEAD_SETEMAIL + '/' + dealersIds.join(','),
                            method: 'get',
                            complete: (function(_this) {
                                return function(jqXHR, textStatus, errorThrown) {
                                    _ajax_success(_this, jqXHR.responseJSON);
                                };
                            })(_this)
                        });
                })(this)
            });
        }
    };

    return Form;
})();
