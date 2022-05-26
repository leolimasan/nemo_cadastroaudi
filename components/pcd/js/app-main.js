(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function( $ ){

  var radio = require('./radioCustom.js');
  require('./base.js');
  require('./formInteressado.js');
  require('./pt-br.js');
  
  function clearForm() {
    $('#receber-sim').prop('checked', 'checked');
    $('.salutation-sr, #salutation-sr').prop('checked', 'checked');
    $('.form-horizontal-pf input[type=text]').val('');
    $('.form-horizontal-pj input[type=text]').val('');

    $('.form-horizontal-pf select').val($('.form-horizontal-pf select option:first').val());
    $('.form-horizontal-pj select').val($('.form-horizontal-pj select option:first').val());
    $('#input-cidade').val($('#input-cidade option:first').val());

    $('.form-horizontal-pf').parsley().reset();
    $('.form-horizontal-pj').parsley().reset();

    $('.form-horizontal-pf').show();
    $('.form-horizontal-pj').show();
    $('.form-success').hide();

    $(".form-horizontal-pf").attr("data-id-site", "");
    $(".form-horizontal-pj").attr("data-id-site", "");
  }

  $('.btn-limpar').on('click', function() {
    clearForm();
  });

  function accordeon(e) {
    e.stopPropagation(); 
    e.preventDefault();

    var accordeon = $(this).parent().parent();

    accordeon.siblings().addClass('is-closed')
    accordeon.toggleClass('is-closed');

  }
  function animateScroll(e) {
    e.preventDefault();

    $("html, body").animate({ scrollTop: 0 }, 600);
  }

  function modalAccordion() {

    var modal = $('.Modal');
    var close = $('.Modal-close');


    $('.Accordion-button').on('touchstart click', function() {
      var thisModal = $(this).parent().parent();
      var pessoa = thisModal.data('accordion');
      var modalPessoa = $(".Modal[data-accordion='" + pessoa +"']");
      modalPessoa.addClass('is-open');
      var _idSite = $(this).data("id-site");
      console.info(_idSite);

      var $title = $('.AudiForm-title');
      if (pessoa == 'juridica') {
        var dataVenda = thisModal.data('venda');
        console.log(dataVenda);
        $('#input-tipo-venda').val(dataVenda).trigger('change');
        $(".form-horizontal-pj").attr("data-id-site", _idSite);

        if(dataVenda == "fleet" || dataVenda != "rural"){
          $title.text('Formulário de Vendas Corporativas');
          $('.form-horizontal-pj [name="campo[razao_social]"]').focus();
        } else {
          $title.text('Formulário para Produtores Rurais');
          $('.form-horizontal-pj [name="campo[rural_denomination]"]').focus();
        }
      } else if (pessoa == 'fisica') {
        $(".form-horizontal-pf").attr("data-id-site", _idSite);
        $title.text('Formulário de Vendas Corporativas');
        $('.form-horizontal-pf [name="campo[nome]"]').focus();
      }

    });

    $('.Modal-close').on('touchstart click', function() {
      modal.removeClass('is-open');
      clearForm();
    });

  }

  modalAccordion();

  $('.Accordion-trigger').on('touchstart click', accordeon);

  $('.Footer-backToTop').on('touchstart click', animateScroll);

})( jQuery )
},{"./base.js":2,"./formInteressado.js":4,"./pt-br.js":5,"./radioCustom.js":6}],2:[function(require,module,exports){
(function(){

	/* BASE URLS */

})();

},{}],3:[function(require,module,exports){
(function(){
    $(document).ready(function(){
        var $formContainer      	            = $('.form-horizontal-pj'),
            $formSuccess        	            = $('.form-success'),
            $formBtnSend        	            = $('.form-horizontal-pj #enviar'),
            $formStateSelect    	            = $('.form-horizontal-pj [name="campo[estado]"]'),
            $formCitySelect     	            = $('.form-horizontal-pj [name="campo[cidade]"]'),
            $formTypeSelect     	            = $('.form-horizontal-pj [name="campo[tipo_venda]"]'),
            $selectVehicleModel 	            = $('.form-vehicle-interest .vehicle-container'),
            $selectVehicleModelRural            = $('.vehicle-model-wrapper .vehiclemodel'),
            $selectVehicleModelRuralOptional    = $('.vehicleAditional-wrapper .vehiclemodel'),
            $checkedVehicles    	            = $('.form-vehicle-interest .vehicle-container input:checked'),
            $dealerContainer		            = $('.dealer-wrapper'),
            $salutationContainer	            = $('.salutation'),
            $sendFlag           	            = true,
            typeValue				            = null,
            dealerList 				            = [],
            vehicleList 			            = [],
            vehicleListMod			            = [],
            vehicleChoosed			            = [],
            self 					            = this;

        $formContainer.parsley();


        var radioSalutation = [];
        radioSalutation.push(new RadioCustom({
        	"text": 'Sr.',
			"value": 'Sr.',
			"name": 'salutation',
			"id": 'salutation-sr',
			"container": $salutationContainer,
			"class": 'radio-custom',
			"checked": true
        }));

        radioSalutation.push(new RadioCustom({
        	"text": 'Sra.',
			"value": 'Sra.',
			"name": 'salutation',
			"id": 'salutation-sra',
			"container": $salutationContainer,
			"class": 'radio-custom',
			"checked": false
        }));

        clearForm = function() {
            $('#input-razao-social').val('');
            $('#cnpj').val('');
            $('#input-nome').val('');
            $('#input-nome-completo').val('');
            $('#input-data-nascimento').val('');
            $('#input-ddd').val('');
            $('#input-cel').val('');
            $('#input-email').val('');
            $('#input-cidade').val('');
            $('#input-estado').val('');
            $('#input-concessionaria-principal').val('');
            $('#input-concessionaria-opcional').val('');
            $('#receber-sim').prop('checked', 'checked');
            $('#salutation-sr').prop('checked', 'checked');
            $('.form-horizontal-pj').parsley().reset();
            $('.vehicleModels-list__table tbody').empty();
            this.vehicleChoosed = [];
        }

        /* attatch events */
        $('input').blur(function(e){

        	var el = $(e.target);
        	if(el.hasClass('parsley-success') && el.val() != ''){
        		el.closest('.form-group').removeClass('has-error')
        	}
        	//$formContainer.parsley().validate();
        });

        $('.btn-limpar').click(function(){ clearForm(); });

        $('select').change(function(e){
        	var el = $(e.target);
        	if(el.val() != undefined && el.val() != ''){
        		el.closest('.form-group').removeClass('has-error')
        	}
            //$formContainer.parsley().validate();
        })

        $formContainer.parsley().on('form:error', function(){
        	$.each(this.fields, function(key,field){
        		if (field.validationResult == true){
        			field.$element.closest('.form-group').removeClass('has-error');
        		}
        		else{
        			field.$element.closest('.form-group').addClass('has-error');
        		}
        	});
		});


        $formStateSelect.on('change', (function(e){populateCities(e, $formCitySelect)}));
        $formTypeSelect.on('change', function() {
            $('.has-error').removeClass('has-error');
			
			var TypeSale = $(this).val();			
			
            switch(TypeSale) {
                case "selecione":
                    typeCompany();
                    break;
                case "fleet":
                    typeFleet();
                    break;
                case "company":
                    typeCompany();
                    break;
                case "rural":
                    typeRural();
                    break;
                default:
                    typeRural();
                    typeCompany();
                    return;
            }
            //$formContainer.parsley().validate();
        });

        typeDef();

        /* populate fields */
        populateStates($formStateSelect);
        populateVehicles($selectVehicleModel);
        pupulateVehiclesModels($selectVehicleModelRural, $selectVehicleModelRuralOptional);
        populateDealers($dealerContainer);

        $formBtnSend.click(function(e) {
            e.preventDefault();

            var typeValue       = $formTypeSelect.val();
            var urlService      = null;
            var dataForm        = null;
            var valid           = true;
            // var vehicleContainer = $('.vehicle-container');
            var vehicleContainer = $('.vehicleModels-manager__quantity');

            $formContainer.parsley().validate();

            if(!$formContainer.parsley().isValid()){
                var firstElement = $('.has-error').eq(0).find('select, input');
                firstElement.focus();
                valid = false;
            }

            if ($formContainer.parsley().isValid() && !validCNPJ(typeValue, $('.form-horizontal-pj [name="campo[cnpj]"]'))){
                var firstElement = $('.has-error').eq(0).find('select, input');
                firstElement.focus();
                valid = false;
            }

            if($('.form-horizontal-pj [name="campo[tipo_venda]"]').val() !== "rural")
            {
                if( qtyVehiclesChoosed() < 1 ){
                    vehicleContainer.closest('.form-group').addClass('has-error');
                    vehicleContainer.find('label').text('*Você precisa adicionar no minímo 1 modelo.')
                    var firstElement = $('.has-error').eq(0).find('select, input');
                    firstElement.focus();

                    valid = false;
                }

                if (typeValue == "fleet" && qtyVehiclesChoosed() < 8){
                    vehicleContainer.closest('.form-group').addClass('has-error');
                    vehicleContainer.find('label').text('*Você precisa adicionar no minímo 8 modelos.')
                    var firstElement = $('.has-error').eq(0).find('select, input');
                    firstElement.focus();

                    valid = false;
                }
            }

            if($sendFlag && valid){
                var convertionIdentifier = 'sucesso_'+ generateUUID();

				if(typeof dataLayer !== 'undefined') {
					dataLayer.push({'event':'sucesso_corporativo', 'conversion_id': convertionIdentifier});
				}

				if(typeof ga !== 'undefined') {
					ga('send', 'event', 'audicorporate', 'sucesso_corporativo', convertionIdentifier);
				}

                if(typeValue && typeValue != ''){
                    switch(typeValue){
                        case "fleet":
                            urlService = window.URL_LEAD_CORPORATE_FLEET;
                            dataForm = getDataFleet();
                            break;
                        case "company":
                            urlService = window.URL_LEAD_CORPORATE_COMPANY;
                            dataForm = getDataCompany();
                            break;
                        case "rural":
                            urlService = window.URL_LEAD_CORPORATE_RURAL;
                            dataForm = getDataRural();
                            break;
                    }

                    dataForm.convertionIdentifier = convertionIdentifier;
                }
				
                if( validCNPJ(typeValue, $('.form-horizontal-pj [name="campo[cnpj]"]')) && $formContainer.parsley()		.isValid() ){
                	$formContainer.hide();
                	$sendFlag = false;
                	$.ajax({
	                    url:    urlService,
	                    data:   dataForm,
	                    type:   'post',
	                    success: function(output) {
	                        $('.form-success').show();
                            clearForm();
	                    },
	                    error: function(output) {
	                        $formBtnSend.text('Enviar');
	                    },
                        complete: function(output){
                            $sendFlag = true;
                        }
	                });
                }
    		}
		});
});


function pupulateVehiclesModels($select, $selectOptional) {
    $select.empty();
    var $loader = $select.parent().find('.loader');
    $loader.show();

    $.ajax({
        url: window.URL_VEHICLE_LIST,
        type: 'get',
		async: true,
        success: function(output) {
            
            var defOption = $('<option/>')
                .text('Por favor selecione')
                .attr('value','');

            $select.append(defOption);

            for(var i = 0; i < output.length; i++){
                var vehicle = output[i];
                var option = $('<option/>')
                    .attr({
                        'value': vehicle.id
                    })
                    .text(vehicle.name);

                $select.append(option);
            }

            $select.change((function(_this, _selectOptional, _vehicleModelList){
                return function(event){
                    $('.vehicleAditional-wrapper').show();
                    _selectOptional.empty();

                    var selectedValue = $(this).val();
                    var defOption = $('<option/>')
                        .text('Por favor selecione')
                        .attr('value','');

                    _selectOptional.append(defOption);

                    for(var i = 0; i < _vehicleModelList.length; i++){
                        var vehicle = _vehicleModelList[i];
                        var option = $('<option/>')
                            .attr({
                                'value': vehicle.id
                            })
                            .text(vehicle.name);
                        
                        if(selectedValue != vehicle.id)
                            _selectOptional.append(option);
                    }
                };
            })(this, $selectOptional, output));

            $loader.hide();
        },
        error: function(output) {
            console.log("---> [ERROR] Populate States");
        }
    });
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function repopulateDealers(id, selectSibling){
	selectSibling.children().detach();
	selectSibling.append($('<option/>').attr({'value': ''}).text('Por favor selecione'));
	for(var i=0; i < dealerList.length; i++){
		if (dealerList[i].id != id){
			var option = $('<option/>').attr({
				'value': dealerList[i].id
			}).text(dealerList[i].initial +" - "+ dealerList[i].name);
			selectSibling.append(option);
		}
	}
}

function populateDealers($containerNode){
	var $loader = $containerNode.parent().find('.loader');
	var $select = $containerNode.find('select');
    $loader.show();
    $.ajax({
        url: window.URL_DEALER_LIST,
        type: 'get',
		async: true,
        success: function(output) {
        	dealerList = output;
        	for(var i=0; i < dealerList.length; i++){
        		var option = $('<option/>').attr({
        			'value': dealerList[i].id
        		}).text(dealerList[i].initial +" - "+ dealerList[i].name);
        		$select.append(option);
        	}
            $loader.hide();
        },
        error: function(output) {
            console.log("---> [ERROR] Populate States");
        }
    });

    $select.on('change', function(e){
        $('.dealerAditional-wrapper').show();
    	var el = $(e.target);
    	var id = el.val();
    	el.data('id', id);
    	repopulateDealers(id, $('.dealerAditional-wrapper select'));
    });
}


function populateVehicles($containerNode){
    var $loader = $containerNode.parent().find('.loader');
    $loader.show();
    $.ajax({
        url: window.URL_VEHICLE_LIST,
        type: 'get',
		async: true,
        success: function(output) {
        	vehicleList = output;
        	vehicleListMod = vehicleList;
        	self.vehicleChoosed = [];

        	$('.form-vehicle-interest .addBtn').on('click', function(){
        		var value = $('.vehicleModels-manager__select select').val();
        		var qty = $('.vehicleModels-manager__quantity input').val();

                var qtyParsed = parseInt(qty);
                if(!isNaN(qtyParsed) && qtyParsed > 0)
        		  addModelToList(value, qty);
        	});

        	updateVehiclesModel();

            $loader.hide();
        },
        error: function(output) {
            console.log("---> [ERROR] Populate States");
        }
    });
}

function addModelToList(id, qty){
	var data = undefined;
	var qty = Number(qty);
	var containerSelect = $('.vehicleModels-manager__select');
	var selectModel = containerSelect.find('select');
	var quantityContainer = $('.vehicleModels-manager__quantity');
	var quantityModel = quantityContainer.find('input');
	var $table = $('.vehicleModels-list__table tbody');
	var $row = $('<tr/>');

	if (qty && qty > 0){
		quantityContainer.closest('.form-group').removeClass('has-error');
	} else{
		quantityContainer.closest('.form-group').addClass('has-error');
	}

	if (selectModel.val() && selectModel.val() != ''){
		containerSelect.removeClass('has-error');
	}else {
		containerSelect.addClass('has-error');
	}

	if (!$('.vehicleModels-manager').children().hasClass('has-error')){
		quantityModel.val('');
		for(var i = 0; i < vehicleList.length; i++){
			if (id == vehicleList[i].id){
				data = vehicleList[i];
				data.quantity = qty;
				self.vehicleChoosed.push(data);
			}
		}
		var svgTrash = '<svg enable-background="new 0 0 32 32" height="20px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="20px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="trash"><path clip-rule="evenodd" d="M29.98,6.819c-0.096-1.57-1.387-2.816-2.98-2.816h-3v-1V3.001   c0-1.657-1.344-3-3-3H11c-1.657,0-3,1.343-3,3v0.001v1H5c-1.595,0-2.885,1.246-2.981,2.816H2v1.183v1c0,1.104,0.896,2,2,2l0,0v17   c0,2.209,1.791,4,4,4h16c2.209,0,4-1.791,4-4v-17l0,0c1.104,0,2-0.896,2-2v-1V6.819H29.98z M10,3.002c0-0.553,0.447-1,1-1h10   c0.553,0,1,0.447,1,1v1H10V3.002z M26,28.002c0,1.102-0.898,2-2,2H8c-1.103,0-2-0.898-2-2v-17h20V28.002z M28,8.001v1H4v-1V7.002   c0-0.553,0.447-1,1-1h22c0.553,0,1,0.447,1,1V8.001z" fill="#D71735" fill-rule="evenodd"/><path clip-rule="evenodd" d="M9,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1H9   c-0.553,0-1,0.447-1,1v13C8,27.559,8.447,28.006,9,28.006z M9,14.005h2v13H9V14.005z" fill="#D71735" fill-rule="evenodd"/><path clip-rule="evenodd" d="M15,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1h-2   c-0.553,0-1,0.447-1,1v13C14,27.559,14.447,28.006,15,28.006z M15,14.005h2v13h-2V14.005z" fill="#D71735" fill-rule="evenodd"/><path clip-rule="evenodd" d="M21,28.006h2c0.553,0,1-0.447,1-1v-13c0-0.553-0.447-1-1-1h-2   c-0.553,0-1,0.447-1,1v13C20,27.559,20.447,28.006,21,28.006z M21,14.005h2v13h-2V14.005z" fill="#D71735" fill-rule="evenodd"/></g></svg>';
		var $btnRemove = $('<a/>').addClass('btnRemove').data('id', id).html(svgTrash).attr('href', 'javascript:void(0);');
		var $contentModel = $('<td/>').text(data.name);
		var $contentQuantity= $('<td/>').addClass('text-center').text(data.quantity);
		var $contentActionBtn = $('<td/>').addClass('text-right').append($btnRemove);

		$row.append($contentModel, $contentQuantity, $contentActionBtn);
		$table.append($row);

		updateVehiclesModel();

		$('.vehicleModels-list__table').find('.btnRemove').on('click', function(e){
			var el = $(e.currentTarget);
			var id = el.data('id');
			var row = el.closest('tr');
			for(var i=0; i < self.vehicleChoosed.length; i++){
				if(self.vehicleChoosed[i].id == id){
					self.vehicleChoosed.splice(i, 1);
				}
			}
			row.detach();
			updateVehiclesModel();
		});

	}
	else{
		quantityContainer.addClass('has-error');
	}

}

function qtyVehiclesChoosed(){
	var sum = 0;
	for (var i=0; i < self.vehicleChoosed.length; i++){
		sum += self.vehicleChoosed[i].quantity;
	}
	return sum;
}

function updateVehiclesModel() {
	var selectModel = $('.vehicleModels-manager__select').find('select'),
		quantityModel = $('.vehicleModels-manager__quantity').find('input');

	selectModel.children().detach();

	defOption = $('<option/>').text('Por favor selecione').attr('value','');
	selectModel.append(defOption);

	for(var i = 0; i < vehicleList.length; i++){
		var choosed = false;
		for(var j = 0; j < self.vehicleChoosed.length; j++){
			if(vehicleList[i].id == self.vehicleChoosed[j].id){
				choosed = true;
			}
		}

		if (!choosed){
			var vehicle = vehicleList[i];
			var option = $('<option/>').attr({
				'value': vehicle.id
			}).text(vehicle.name);
			selectModel.append(option);
		}
	}
}

function getSelectedVehicles(){
    var vehicles = [];
    for (var i = 0; i < self.vehicleChoosed.length; i++){
        vehicles.push(self.vehicleChoosed[i].id + "," +self.vehicleChoosed[i].quantity);
    }
    console.log(vehicles)
    return vehicles;
}

function getSelectedDealers(){
    var dealers = [];
    
    $('.dealer select').each(function(){
    	if ($(this).val() != ''){
    		dealers.push(removeSpecialChars($(this).val()));
    	}
    });
    return dealers;
}

function getDataFleet(){
    var vehicleModel = getSelectedVehicles();
    var obj = {
        "socialName":       removeSpecialChars($('.form-horizontal-pj [name="campo[razao_social]"]').val()),
        "cnpj":             removeSpecialChars($('.form-horizontal-pj [name="campo[cnpj]"]').val()),
        "name":             removeSpecialChars($('.form-horizontal-pj [name="campo[nome_completo]"]').val()),
        "title":            removeSpecialChars($('input[name=salutation]:checked').data('id')),
        "email":            $('.form-horizontal-pj [name="campo[email]"]').val(),
        "ddd":              removeSpecialChars($('.form-horizontal-pj [name="campo[ddd]"]').val()),
        "phone":            removeSpecialChars($('.form-horizontal-pj [name="campo[celular]"]').val()),
        "idState":          removeSpecialChars($('.form-horizontal-pj [name="campo[estado]"]').val()),
        "idCity":           removeSpecialChars($('.form-horizontal-pj [name="campo[cidade]"]').val()),
        "vehicleModel[]": 	vehicleModel,
        "optIn":            1,
        "idSite":           "25" /* id bd site */
    }
    return obj;
}

function getDataCompany(){
    var vehicleModel = getSelectedVehicles();
    var dealers = getSelectedDealers();
    var obj = {
        "socialName":       removeSpecialChars($('.form-horizontal-pj [name="campo[razao_social]"]').val()),
        "cnpj":             removeSpecialChars($('.form-horizontal-pj [name="campo[cnpj]"]').val()),
        "name":             removeSpecialChars($('.form-horizontal-pj [name="campo[nome_completo]"]').val()),
        "title":            removeSpecialChars($('input[name=salutation]:checked').data('id')),
        "email":            $('.form-horizontal-pj [name="campo[email]"]').val(),
        "ddd":              removeSpecialChars($('.form-horizontal-pj [name="campo[ddd]"]').val()),
        "phone":            removeSpecialChars($('.form-horizontal-pj [name="campo[celular]"]').val()),
        "idState":          removeSpecialChars($('.form-horizontal-pj [name="campo[estado]"]').val()),
        "idCity":           removeSpecialChars($('.form-horizontal-pj [name="campo[cidade]"]').val()),
        "vehicleModel[]": 	vehicleModel,
        "idDealer[]": 		dealers,
        "optIn":            1,
        "idSite":           "25" /* id bd site */
    }
    return obj;
}
function getDataRural(){
    var vehicles = [];
    $('.vehicle select').each(function() { 
        var selected = $(this).val();
        
        if(selected && selected != "")
            vehicles.push(selected.toString());
    });

    var dealers = getSelectedDealers();
    var obj = {
        "ruralDenomination":    removeSpecialChars($('.form-horizontal-pj [name="campo[rural_denomination]"]').val()),
        "ccir":                 removeSpecialChars($('.form-horizontal-pj [name="campo[ccir]"]').val()),
        "name":                 removeSpecialChars($('.form-horizontal-pj [name="campo[nome_completo]"]').val()),
        "title":            	removeSpecialChars($('input[name=salutation]:checked').data('id')),
        "email":                $('.form-horizontal-pj [name="campo[email]"]').val(),
        "ddd":                  removeSpecialChars($('.form-horizontal-pj [name="campo[ddd]"]').val()),
        "phone":                removeSpecialChars($('.form-horizontal-pj [name="campo[celular]"]').val()),
        "idState":              removeSpecialChars($('.form-horizontal-pj [name="campo[estado]"]').val()),
        "idCity":               removeSpecialChars($('.form-horizontal-pj [name="campo[cidade]"]').val()),
        "vehicleModel[]":       vehicles,
        "idDealer[]": 		    dealers,
        "optIn":                1,
        "idSite":               "25" /* id bd site */
    }
    return obj;
}

function typeDef(){
    $('.rural').hide();
    $('.company').hide();
    $('.form-vehicle-interest').hide();
    $('.dealerAditional-wrapper').hide();
    $('.vehicleAditional-wrapper').hide();
	
    $('.form-horizontal-pj [name="campo[ccir]"]').attr({
    	"data-parsley-required": "false",
		"data-parsley-length": "[]"
    }).removeClass('parsley-error')
    .removeAttr('data-parsley-pattern')
    .val('');
    
    $('.form-horizontal-pj [name="campo[rural_denomination]"]').attr({
    	"data-parsley-required": "false",
		"data-parsley-length": "[]",
		"data-parsley-pattern":""
    }).removeClass('parsley-error')
    .removeAttr('data-parsley-pattern')
    .val('');
    
    $('.form-horizontal-pj [name="campo[razao_social]"]').attr({
    	"data-parsley-required": "false",
		"data-parsley-length": "[]",
		"data-parsley-pattern":""
    }).removeClass('parsley-error')
    .removeAttr('data-parsley-pattern')
    .val('');
    
    $('.form-horizontal-pj [name="campo[cnpj]"]').attr({
    	"data-parsley-required": "false",
    	"data-parsley-pattern": ""
    }).removeClass('parsley-error')
    .removeAttr('data-parsley-pattern')
    .val('');
    
    $('.dealer-wrapper select').attr({
    	"data-parsley-required": "false"
    }).removeClass('parsley-error');

    $('.vehicle-wrapper select').attr({
    	"data-parsley-required": "false"
    }).removeClass('parsley-error');

    $('.vehicle-model-wrapper select').attr({
    	"data-parsley-required": "false"
    }).removeClass('parsley-error');
}

function typeRural(){
    typeDef();
    $('.rural').fadeTo("slow", 1);
    $("#ccir").mask('99999999999');
    $('.form-vehicle-interest').hide();
    /* validation */
    $('.form-horizontal-pj [name="campo[ccir]"]').attr({
    	"data-parsley-required": "true",
    	"data-parsley-length": "[11,11]"
    });
    $('.form-horizontal-pj [name="campo[rural_denomination]"]').attr({
    	"data-parsley-required": "true",
		"data-parsley-length": "[5, 65]",
		"data-parsley-pattern":"[A-Z-a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9\\s]{5,65}"
    });
    $('.dealer-wrapper select').attr({
    	"data-parsley-required": "true"
    });

    $('.vehicle-model-wrapper select').attr({
    	"data-parsley-required": "true"
    });
}
function typeCompany(){ 
    typeDef();
    
    $('.form-vehicle-interest').show();
    $('.company').fadeTo("slow", 1);
    $('.form-horizontal-pj [name="campo[razao_social]"]').attr({
    	"data-parsley-required": "true",
		"data-parsley-length": "[5, 65]",
		"data-parsley-pattern":"[A-Z-a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9\\s]{5,65}"
    });

    $('.form-horizontal-pj [name="campo[cnpj]"]').attr({
    	"data-parsley-required": "true",
    	"data-parsley-pattern": "[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}"
    });
    $('.dealer-wrapper select').attr({
    	"data-parsley-required": "true"
    });
}

function typeFleet(){
	typeDef();
    
    $('.form-vehicle-interest').show();
	$('.fleet').fadeTo("slow", 1);
    $('.form-horizontal-pj [name="campo[razao_social]"]').attr({
    	"data-parsley-required": "true",
		"data-parsley-length": "[5, 65]",
		"data-parsley-pattern":"[A-Z-a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9\\s]{5,65}"
    });
    $('.form-horizontal-pj [name="campo[cnpj]"]').attr({
    	"data-parsley-required": "true",
    	"data-parsley-pattern": "[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}"
    });
}

function populateStates($selectNode){
    var $loader = $selectNode.parent().siblings('.loader');
    $loader.show();
    $.ajax({
        url: window.URL_STATE_LIST,
        type: 'get',
		async: true,
        success: function(output) {
            for(var i = 0; i < output.length; i++){
                var node = $('<option/>').attr('value', output[i].id).text(output[i].initial);
                $selectNode.append(node);
            }
            $loader.hide();
        },
        error: function(output) {
            console.log("---> [ERROR] Populate States");
        }
    });
}

function populateCities(e, $selectNode){
    var $stateId    = $(e.target).val();
    var $loader     = $selectNode.parent().siblings('.loader');
    var defaultNode = $('<option/>').text('Por favor selecione').attr({
        'disabled': true,
        'selected': true
    });

    /* clear childrens */
    $selectNode.children().remove();
    $selectNode.append(defaultNode);

    $loader.show();

    $.ajax({
        url: window.URL_CITY_LIST_BY_STATE + '/' + $stateId +'.json',
        type: 'get',
		async: true,
        success: function(output) {
            for(var i = 0; i < output.length; i++){
                var node = $('<option/>').attr('value', output[i].id).text(output[i].name);
                $selectNode.append(node);
            }
            $loader.hide();
        },
        error: function(output) {
            console.log("---> [ERROR] Populate Cities");
        },
        complete: function(output){
            $selectNode.prop('disabled', false);
        }
    });
}

function removeSpecialChars(p_string) {
    return p_string.replace(/[^a-zA-Z 0-9]+/g, '');
};

function validCNPJ(type, input){
	var cnpj = $(input).val();
	var ret = true;
	if((type == "company" || type == "fleet") && (!isCNPJ(cnpj))){
		$(input).removeClass('parsley-success');
		$(input).closest('.form-group').addClass('has-error');
    	ret = false;

    } else {
    	$(input).removeClass('parsley-error');
		$(input).closest('.form-group').removeClass('has-error');
    	ret = true;
    }
    return ret;
}

function isCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
}

})();

},{}],4:[function(require,module,exports){
var FormInteressado;

FormInteressado = (function() {
	function FormInteressado() {
		this.idState = 0;
		this.idCity = 0;
		this.dealersList = [];

		this.dropDownSelectors = [
			'.form-horizontal-pf [name="campo[cidade]"]',
			'.form-horizontal-pf [name="campo[estado]"]'
		];

		this.initialize();
	}

	FormInteressado.prototype.initialize = function() {
		
		for (var i = 0; i < this.dropDownSelectors.length; i++) {
			this.initializeDropdown(this.dropDownSelectors[i]);
		};

		this.addExtensionMethods();
		this.createCustomValidations(window);

		this.addMask();

		this.attachEvents();

		this.loadStates();
	};

	FormInteressado.prototype.clearForm = function(){
		$('#input-nome').val('');
		$('#input-data-nascimento').val('');
		$('#cpf').val('');
		$('#cnpj').val('');
		$('#input-cel-pf').val('');
		$('#input-email-pf').val('');
		$('#input-cidade').val('');
		$('#input-estado').val('');
		$('#input-ddd').val('');
		$('#receber-sim').prop('checked', 'checked');
		$('#salutation-sr').prop('checked', 'checked');
		$('#input-razao-social').val('');
		$('.form-horizontal-pf').parsley().reset();
		$(".form-horizontal-pf").attr("data-id-site", "");
		
		this.initializeDropdown('#input-cidade');
		
		$('.form-horizontal-pf #input-cidade')
			.prop('disabled', true);
	};

	FormInteressado.prototype.generateUUID = function() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	};

	FormInteressado.prototype.getParameterByName = function(param){
		if (!url) 
			url = window.location.href;

		name = name.replace(/[\[\]]/g, "\\$&");

		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);

		if (!results) 
			return null;

		if (!results[2]) 
			return '';

		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	FormInteressado.prototype.addExtensionMethods = function(){
		String.prototype.replaceAll = function(search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
	};	

	FormInteressado.prototype.createCustomValidations = function(scope){
		var parsleyScope = scope.Parsley;
		
		parsleyScope.options.triggerAfterFailure = "input focusout";
		
		parsleyScope.addValidator(
			'cpf', 
			(function (_this){
				return function (value, requirement) { 
					return _this.cpfValidation(value); 
				}
			})(this), 
			200
			)
		.addMessage('pt-br', 'cpf', 'Este CPF é inválido');

		parsleyScope.addValidator(
			'birthday', 
			(function (_this){
				return function (value, requirement) {
					var now = new Date();
					var result = false;

					if(value && value.length === 8){
						var parsedDate = getDateFromFormat(value, "ddMMyyyy");

						if(parsedDate !== 0) {
							var date = new Date(parsedDate);

							result = date.getFullYear() > 1900 
							&& date < now;
						}
					}

					return result;
				}
			})(this), 
			200
			)
		.addMessage('pt-br', 'birthday', 'Esta data é inválida');
	};

	FormInteressado.prototype.cpfValidation = function(cpf) {
		var cpf = cpf.replace(/[^\d]+/g,'');    

		if(cpf == '')
			return false; 

		if (cpf.length != 11 || 
			cpf == "00000000000" || 
			cpf == "11111111111" || 
			cpf == "22222222222" || 
			cpf == "33333333333" || 
			cpf == "44444444444" || 
			cpf == "55555555555" || 
			cpf == "66666666666" || 
			cpf == "77777777777" || 
			cpf == "88888888888" || 
			cpf == "99999999999")
			return false;       

		add = 0;    

		for (i=0; i < 9; i ++)       
			add += parseInt(cpf.charAt(i)) * (10 - i); 

		rev = 11 - (add % 11);  

		if (rev == 10 || rev == 11)     
			rev = 0;    

		if (rev != parseInt(cpf.charAt(9)))     
			return false;       

		add = 0;    

		for (i = 0; i < 10; i ++)        
			add += parseInt(cpf.charAt(i)) * (11 - i);  

		rev = 11 - (add % 11);  

		if (rev == 10 || rev == 11) 
			rev = 0;    

		if (rev != parseInt(cpf.charAt(10)))
			return false;  

		return true;   
	};

	FormInteressado.prototype.removeChars = function(str){
		var numbers = "";
		for(var i=0; i<str.length; ++i) {
			if(this.isNumber(str[i]))
				numbers += str[i];
		}
		return numbers;
	};

	FormInteressado.prototype.isNumber = function(text) {
		var reg = new RegExp('[0-9]+$');
		if(text) {
			return reg.test(text);
		}
		return false;
	}

	FormInteressado.prototype.initializeDropdown = function(selector) {
		var select = $(selector).empty();
		var newElement = $('<option></option>')
		.text('Por favor selecione')
		.attr({ 'value': '' });

		select.prop('disabled', true);
		return select.append(newElement);
	}

	FormInteressado.prototype.loadCities = function(id) {
		var citySelect = $('.form-horizontal-pf [name="campo[cidade]"]');
		var select = this.initializeDropdown('.form-horizontal-pf [name="campo[cidade]"]');
		var loader = select.parents('.form-group').find('.loader');
		loader.show();

		if (id !== '') {
			$.get(window.URL_CITY_LIST_BY_STATE + '/' + id + ".json", function(data){
				if (data && data.length > 0) {			
					for (var i = 0; i < data.length; i++) {
						var city = data[i];
						var newElement = $('<option></option>')
						.text(city.name)
						.attr({ 'value': city.id });

						select.append(newElement);
					};
				}
				loader.hide();
				citySelect.prop("disabled", false);
			}).fail(function() {
				select.val('');
				loader.hide();
			});	
		} else {
			select.val('');
			loader.hide();
		}
	};

	FormInteressado.prototype.loadStates = function() {
		var citySelect = $('.form-horizontal-pf [name="campo[cidade]"]');
		var select = this.initializeDropdown('.form-horizontal-pf [name="campo[estado]"]');
		var loader = select.parents('.form-group').find('.loader');
		loader.show();

		citySelect.prop("disabled", true);

		$.get(window.URL_STATE_LIST, function(data){
			if (data && data.length > 0) {			
				for (var i = 0; i < data.length; i++) {
					var state = data[i];
					var newElement = $('<option></option>')
					.text(state.initial + ' - ' + state.name)
					.attr({
						'value': state.id,
						'data-latitude': state.latitude,
						'data-longitude': state.longitude
					});

					select.append(newElement);
				};
			}
			loader.hide();
			select.prop("disabled", false);
		}).fail(function() {
			select.val('');
			loader.hide();
		});
	};

	FormInteressado.prototype.removeMask = function() {
		$("#cpf").unmask();
		$("#input-cel").unmask();
	};

	FormInteressado.prototype.addMask = function() {
		var options = {autoclear: false};

		$("#cpf").mask("999.999.999-99");
		$("#input-cel").mask("9999-9999?9");
		$("#input-cel-pf").mask("(99) 9999-9999?9");
		$("#input-ddd").mask("99");
		$("#cnpj").mask("99.999.999/9999-99");
		$("#input-data-nascimento").mask("99/99/9999");

		$('#input-cel').focusout(function(){
			var phone, element;
			element = $(this);
			element.unmask();
			phone = element.val().replace(/\D/g, '');
			
			if(phone.length > 10) {
				element.mask("99999-999?9");
			} else {
				element.mask("9999-9999?9");	
			}	
			
		});
	};

	FormInteressado.prototype.getParameterByName = function(name, url) {
		if (!url) 
			url = window.location.href;
		
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		
		if (!results) 
			return null;
		
		if (!results[2]) 
			return '';
		
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	FormInteressado.prototype.attachEvents = function() {
		$('.form-horizontal-pf [name="campo[estado]"]').change((function(_this){
			return function(event){
				_this.idState = $(this).val();
				_this.loadCities(_this.idState);
			}
		})(this));

		$('.form-horizontal-pf [name="campo[cidade]"]').change((function(_this) {
			return function(event){
				_this.idCity = $(this).val();
			}
		})(this));

		$('.form-horizontal-pf [name="campo[cpf]"]')
		.parsley()
		.on('field:validate', (function(_this){
			return function(data){
				data.value = data.value
				.replaceAll('\\.', '')
				.replaceAll('-', '')
				.replaceAll('_', '');
			}
		})(this));

		$('.form-horizontal-pf [name="campo[celular]"]')
		.parsley()
		.on('field:validate', (function(_this){
			return function(data){
				data.value = data.value
				.replaceAll('\\.', '')
				.replaceAll('-', '')
				.replaceAll('\\(', '')
				.replaceAll('\\)', '')
				.replaceAll(' ', '')
				.replaceAll('_', '');
			}
		})(this));

		$('.form-horizontal-pf [name="campo[data-nascimento]"]')
		.parsley()
		.on('field:validate', (function(_this){
			return function(data){
				data.value = data.value
				.replaceAll('/', '')
				.replaceAll('_', '');
			}
		})(this));

		$('.btn-limpar').click((function(_this){
			return function() { 
				_this.clearForm(); 
			}
		})(this));

		$('.form-horizontal-pf .btn-enviar').click((function(_this){
			return function(event){
				var convertionIdentifier = 'sucesso_'+ _this.generateUUID();

				event.preventDefault();
				event.stopImmediatePropagation();

				var $this = $(this).parents(".form-horizontal-pf");
				if (!$this.parsley().validate()) {
					return false;
				};
				
				if(typeof dataLayer !== 'undefined') {
					dataLayer.push({'event':'sucesso_interessado', 'conversion_id': convertionIdentifier});
				}

				if(typeof ga !== 'undefined') {
					ga('send', 'event', 'audicorporate', 'sucesso_interessado', convertionIdentifier);
				}

				var $formSuccess = $('.form-success');
				var $formBtnSend = $('.form-horizontal-pf .btn-enviar');
				var $formBtnClean = $('.form-horizontal-pf .btn-limpar');
				var $cellphone = $('.form-horizontal-pf [name="campo[celular]"]');

				var phonefull = _this.removeChars($cellphone.val());
				var ddd = phonefull.substring(0,2);
				var phone = phonefull.substring(2);
				var dealers = [ 50 ]; // id audi brasil

				$formBtnSend.prop("disabled", true);
				$formBtnClean.prop("disabled", true);

				$.ajax({ 
					url: window.URL_LEAD_SAVE,
					data: {
						"title": $('.form-horizontal-pf [name="salutation"]:checked').val(),
						"name": $('.form-horizontal-pf [name="campo[nome]"]').val(),
						"cpf": _this.removeChars($('.form-horizontal-pf [name="campo[cpf]"]').val()),
						"ddd": ddd,
						"phone": phone,
						"email": $('.form-horizontal-pf [name="campo[email]"]').val(),
						"optIn": $('.form-horizontal-pf [name="campo[receber]"]:checked').val() === "Sim" ? 1 : 0,
						"idState": _this.idState,
						"idCity": _this.idCity,
						"idSite": 25,
						"idDealer[]" : dealers,
						"birthday": _this.removeChars($('#input-data-nascimento').val()),
						"vehicleModel": _this.getParameterByName("modelo"),
						"convertionIdentifier": convertionIdentifier
					},
					type: 'POST',
					success: function(output) {
						$('.form-horizontal-pf').hide();
						$formSuccess.show();
						_this.clearForm();
					},
					error: function(output) {
						$formBtnSend.text('Enviar');
					},
					complete: function(data){
						$formBtnSend.prop("disabled", false);
						$formBtnClean.prop("disabled", false);
					}
				});
			}
		})(this));
	};
	return FormInteressado;

})();

$(function(){
	(new  FormInteressado());
});
},{}],5:[function(require,module,exports){
Parsley.addMessages('pt-br', {
  defaultMessage: "Este valor parece ser inválido.",
  type: {
    email:        "Este campo deve ser um email válido.",
    url:          "Este campo deve ser um URL válida.",
    number:       "Este campo deve ser um número válido.",
    integer:      "Este campo deve ser um inteiro válido.",
    digits:       "Este campo deve conter apenas dígitos.",
    alphanum:     "Este campo deve ser alfa numérico."
  },
  notblank:       "Este campo não pode ficar vazio.",
  required:       "Este campo é obrigatório.",
  pattern:        "Este campo parece estar inválido.",
  min:            "Este campo deve ser maior ou igual a %s.",
  max:            "Este campo deve ser menor ou igual a %s.",
  range:          "Este campo deve estar entre %s e %s.",
  minlength:      "Este campo é pequeno demais. Ele deveria ter %s caracteres ou mais.",
  maxlength:      "Este campo é grande demais. Ele deveria ter %s caracteres ou menos.",
  length:         "O tamanho deste campo é inválido. Ele deveria ter entre %s e %s caracteres.",
  mincheck:       "Você deve escolher pelo menos %s opções.",
  maxcheck:       "Você deve escolher %s opções ou mais",
  check:          "Você deve escolher entre %s e %s opções.",
  equalto:        "Este valor deveria ser igual."
});

Parsley.setLocale('pt-br');
},{}],6:[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

RadioCustom = (function() {
	function RadioCustom(config) {
		this._handlerCheckbox = bind(this._handlerCheckbox, this);
		this._options = {
			text: config.text,
			container: config.container,
			"class": config["class"],
			checked: config.checked,
			name: config.name,
			id: config.id,
			value: config.value,
			callback: config.callback
		};
		this._externalContainer = this._options.container;
		this._checkBoxContainer = void 0;
		this._input = void 0;
		this._create();
	}

	RadioCustom.prototype._create = function() {
		this._radioContainer = $('<div/>').addClass(this._options["class"]);
		this._externalContainer.append(this._radioContainer);
		this._input = $('<input/>').attr('type', 'radio');
		this._input.attr('name', this._options.name);
		this._input.attr('id', this._options.id);
		this._input.attr('data-id', this._options.value);
		this._circle = $('<span/>');
		this._innerCircle = $('<span/>');
		this._innerCircle.addClass('inner-circle');
		this._circle.append(this._innerCircle);
		this._circle.addClass('circle');
		this._label = $('<label/>');
		this._label.append(this._circle);
		this._label.append(this._options.text);
		this._label.attr('for', this._options.id);
		this._input.on('click', this._handlerCheckbox);
		this._input.on('change', this._handlerCheckbox);
		if (this._options.checked === true) {
			this._input.prop("checked", "checked");
		}
		this._radioContainer.append(this._input);
		return this._radioContainer.append(this._label);
	};

	RadioCustom.prototype.check = function() {
		this._input.prop("checked", "checked");
		this._handlerCheckbox();
	};

	RadioCustom.prototype._handlerCheckbox = function(e) {
		if (this._options.callback) {
			return this._options.callback();
		}
	};

	return RadioCustom;

})();

},{}]},{},[1])
