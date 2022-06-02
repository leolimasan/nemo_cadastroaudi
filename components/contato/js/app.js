(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  var FormData, FormLead, Main;

  FormData = require('./data/form');
  FormLead = require('./modules/FormLead');

  Main = (function() {
    function Main() {
      this.setUrlServices();
      window.CONFIG = [
        {
          id: 1,
          type: 'newsletter',
          idSite: 35
        }, {
          id: 2,
          type: 'cadastro',
          idSite: 36
        }, {
          id: 3,
          type: 'car-configurator',
          idSite: 37
        }, {
          id: 4,
          type: 'contato',
          idSite: 38
        }, {
          id: 15,
          type: 'cadastro_etron',
          idSite: 38
        }
      ];
      this._form = new FormLead();
      this._form.create(FormData.get());
    }

    Main.prototype.setUrlServices = function() {
    };

    return Main;

  })();

  $(window).on('load', (function(_this) {
    return function() {
      return new Main();
    };
  })(this));


  },{"./data/form":5,"./modules/FormLead":6}],2:[function(require,module,exports){
  var CheckBoxCustom,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  CheckBoxCustom = (function() {
    function CheckBoxCustom(config) {
      this._handlerCheckbox = bind(this._handlerCheckbox, this);
      this._options = {
        text: config.text,
        container: config.container,
        "class": config["class"],
        checked: config.checked
      };
      this._externalContainer = this._options.container;
      this._checkBoxContainer = void 0;
      this._create();
    }

    CheckBoxCustom.prototype._create = function() {
      this._checkBoxContainer = $('<div/>').addClass(this._options["class"]);
      this._externalContainer.append(this._checkBoxContainer);
      this._span = $('<span/>');
      this._i = $('<i/>');
      this._checkBox = $('<a/>').text(this._options.text).attr({
      });
      this._span.append(this._i);
      this._checkBox.append(this._span);
      this._checkBoxContainer.append(this._checkBox);
      this._checkBox.on('click', this._handlerCheckbox);
      if (this._options.checked === true) {
        return this._checkBoxContainer.addClass('checked');
           var cb1 = document.getElementById("lgpd-consent"),
    button = document.getElementById("sendbtn");
    button.disabled = true;    
    cb1.onclick = function(){
    if(cb1.checked){
        button.disabled = false;
    }
    else{
        button.disabled = true;
    } 
      }
    };
    
};

    CheckBoxCustom.prototype._handlerCheckbox = function(e) {
      return this._checkBoxContainer.toggleClass('checked');
    };

    return CheckBoxCustom;

  })();

  module.exports = CheckBoxCustom;


  },{}],3:[function(require,module,exports){
  var RadioCustom,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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

  module.exports = RadioCustom;


  },{}],4:[function(require,module,exports){
  var Maps,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Maps = (function() {
    function Maps(config) {
      this.onPlaceChanged = bind(this.onPlaceChanged, this);
      this.mapeiaLojas = bind(this.mapeiaLojas, this);
      this.mapaOpcoes = {
        zoom: config.zoom,
        center: new google.maps.LatLng(config.center.lat, config.center.lon),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: config.controleTipoMapa,
        streetViewControl: config.controleStreetView,
        zoomControl: config.controleZoom,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.TOP_LEFT
        }
      };
      this.mapa = new google.maps.Map($(config.mapaSeletor)[0], this.mapaOpcoes);
      this.marcador = new google.maps.Marker({
        map: this.mapa,
        draggable: false
      });
      this.geocoder = new google.maps.Geocoder();
    }

    Maps.prototype.mapeiaLojas = function(data) {
      var bgSrc, d, detalhesMarcador, i, janelaDetalhes, len, marcador, results;
      bgSrc = '../images/general/google_pin.png';
      results = [];
      for (i = 0, len = data.length; i < len; i++) {
        d = data[i];
        marcador = new google.maps.Marker({
          map: this.mapa,
          position: new google.maps.LatLng(d.latitude, d.longitude),
          icon: bgSrc,
          anchor: new google.maps.Point(30, 0)
        });
        marcador.setMap(this.mapa);
        detalhesMarcador = "<div style='color:black; height:110px;'>";
        detalhesMarcador += "<p>" + d.name + "</p>";
        detalhesMarcador += "</div>";
        janelaDetalhes = new google.maps.InfoWindow({
          content: detalhesMarcador
        });
        results.push((function(_this) {
          return function(marcador, janelaDetalhes) {
            return google.maps.event.addListener(marcador, 'click', function() {
              return janelaDetalhes.open(_this.mapa, marcador);
            });
          };
        })(this)(marcador, janelaDetalhes));
      }
      return results;
    };

    Maps.prototype.onPlaceChanged = function() {
      var location, place;
      place = this.searchBox.getPlace();
      location = place.geometry.location;
      this.marcador.setPosition(location);
      this.mapa.setCenter(location);
      return this.mapa.setZoom(20);
    };

    Maps.prototype.posiciona = function(latitude, longitude, zoom, callback) {
      this.mapa.setCenter(new google.maps.LatLng(latitude, longitude));
      this.mapa.setZoom(zoom);
      if (callback != null) {
        return callback();
      }
    };

    Maps.prototype.mapa = null;

    Maps.prototype.mapaOpcoes = null;

    Maps.prototype.marcador = null;

    Maps.prototype.searchBox = null;

    Maps.prototype.geocoder = null;

    return Maps;

  })();

  module.exports = Maps;


  },{}],5:[function(require,module,exports){
  var Form;

  Form = (function() {
    function Form() {}

    Form.get = function() {
      return this.data = [
        {
          "formLead": {
            "title": "Preencha os campos teste que a gente entra em contato com você.",
            "pin": "",
            "fields": [
              {
                "title": "NOME*",
                "incorrectText": "*preencha o campo nome corretamente",
                "attr": {
                  "type": "text",
                  "name": "name",
                  "data-parsley-required": "true",
                  "data-parsley-length": "[5, 65]",
                  "data-parsley-pattern": "[A-Z-a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\s]{5,65}"
                }
              },{
                "title": "EMPRESA*",
                "incorrectText": "*preencha o campo empresa corretamente",
                "attr": {
                  "type": "text",
                  "name": "company",
                  "data-parsley-required": "true",
                  "data-parsley-length": "[5, 65]",
                  "data-parsley-pattern": "[A-Z-a-zzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\\s]{5,65}"
                }
              },{
                "title": "TELEFONE*",
                "incorrectText": "*preencha o campo telefone corretamente",
                "mask": "(00)#0000-0000",
                "attr": {
                  "type": "text",
                  "name": "phone",
                  "data-parsley-required": "true",
                  "data-parsley-pattern": "^(?:(?:\\+|00)?(55)\\s?)?(?:\\(?([1-9][0-9])\\)?\\s?)?(?:((?:9\\d|[2-9])\\d{4})\\-?(\\d{3,4}))$"
                }
              }, {
                "title": "E-MAIL*",
                "incorrectText": "*preencha o campo e-mail corretamente",
                "attr": {
                  "type": "email",
                  "name": "email",
                  "data-parsley-required": "true",
                  "data-parsley-pattern":"^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+(?!@).[a-zA-Z]{0,1}(?!@).[a-zA-Z-.]{1,4}$"
                }
              }, {
                "title": "ESTADO*",
                "incorrectText": "*preencha o campo estado corretamente",
                "placeholderTag": "",
                "tag": "select",
                "attr": {
                  "name": "state",
                  "data-parsley-required": "true"
                }
              }, {
                "title": "CIDADE*",
                "incorrectText": "*preencha o campo cidade corretamente",
                "placeholderTag": "",
                "tag": "select",
                "attr": {
                  "name": "city",
                  "data-parsley-required": "true"
                }
              }, {
                "title": "INTERESSE EM*",
                "incorrectText": "*preencha o campo cidade corretamente",
                "tag": "div",
                "background": "none",
                "attr": {
                  "name": "interest"
                }
              }, {
                "title": "TIPO DE DOCUMENTO*",
                "incorrectText": "*",
                "tag": "div",
                "background": "none",
                "attr": {
                  "name": "documentType"
                }
              }, {
                "title": "CPF*",
                "incorrectText": "*preencha o campo cpf corretamente",
                "mask": "000.000.000-00",
                "attr": {
                  "type": "text",
                  "name": "cpf",
                  "data-parsley-required": "false",
                  "data-parsley-cpf-val":""
                }
              }, {
                "title": "CNPJ*",
                "incorrectText": "*preencha o campo cnpj corretamente",
                "mask": "00.000.000/0000-00",
                "attr": {
                  "type": "text",
                  "name": "cnpj",
                  "data-parsley-required": "false",
                  "data-parsley-pattern": "[0-9]{2}.[0-9]{3}.[0-9]{3}/[0-9]{4}-[0-9]{2}",
                  "data-parsley-group": "cnpjGroup"
                }
              }, {
                "title": "DATA DE NASCIMENTO*",
                "incorrectText": "*preencha o campo nascimento corretamente",
                "mask": "00/00/0000",
                "attr": {
                  "type": "text",
                  "name": "birthday",
                  "value": "01/01/2000",
                  "data-parsley-required": "false"
                }
              }, {
                "title": "ESCOLHA UMA CONCESSIONÁRIA DE PREFERÊNCIA*",
                "incorrectText": "*preencha o campo concessionária corretamente",
                "placeholderTag": "",
                "tag": "select",
                "attr": {
                  "name": "seller",
                  "data-parsley-required": "true"
                }
              }, {
                "title": "ESCOLHA MAIS UMA CONCESSIONÁRIA (OPCIONAL)",
                "placeholderTag": "",
                "tag": "select",
                "attr": {
                  "name": "seller"
                }
              }, {
                "title": "ESCOLHA UM MODELO (OPCIONAL)",
                "incorrectText": "*preencha o campo concessionária corretamente",
                "placeholderTag": "",
                "tag": "select",
                "attr": {
                  "name": "vehiclemodel",
                  "data-parsley-required": "false",
                  "class": "vehiclemodel-default"
                }
              }
            ]
          }
        }
      ];
    };

    return Form;

  })();

  module.exports = Form;


  },{}],6:[function(require,module,exports){
  var CheckBoxCustom, FormLead, Maps, RadioCustom, StringUtils, ValidationUtils,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ValidationUtils = require('../utils/ValidationUtils');

  StringUtils = require('../utils/StringUtils');

  Maps = require('../components/maps');

  CheckBoxCustom = require('../components/CheckboxCustom');

  RadioCustom = require('../components/RadioCustom');

  FormLead = (function() {
    function FormLead() {
      this._onSubmit = bind(this._onSubmit, this);
      this._onSendBackClick = bind(this._onSendBackClick, this);
      this._onChangeDealer = bind(this._onChangeDealer, this);
      this._populateDealers = bind(this._populateDealers, this);
      this._populateMaps = bind(this._populateMaps, this);
      this._onStateChange = bind(this._onStateChange, this);
      this.config = {};
    }

    FormLead.prototype.create = function(p_data, region_data) {
      this._identifyOrigin();
      this.svgLoader = '<svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring-alt"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#e1e1e1" fill="none" stroke-width="10" stroke-linecap="round"></circle><circle cx="50" cy="50" r="40" stroke="#777777" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="85.34 165.66;1 250;85.34 165.66"></animate></circle></svg>';
      this._flagGo = true;
      this._data = p_data[0].formLead;
      this._dataRegion = region_data;
      this._maps = void 0;
      this._dealers = void 0;
      this._vehicles = void 0;
      this._radioInterest = [];
      this._validPersonalFields = false;
      this.element = $('.formLead');
      this._content = $('<div/>').addClass('formLeadContent');
      this.element.append(this._content);
      this._success = $('<div/>').addClass('formLeadSuccess');
      this._successMessageContainer = $('<div/>').addClass('formLeadSuccessContainer');
      this._successMessageTitle = $('<em/>').addClass('formLeadSuccessTitle');
      this._successBtnBack = $('<a/>').addClass('formLeadSuccessBtnBack').text('Voltar');
      this._successMessageContainer.append(this._successMessageTitle, this._successMessageSubTitle, this._successBtnBack);
      this._success.append(this._successMessageContainer);
      this.element.append(this._success);
      this._formContainer = $('<div/>').addClass('formLeadContainer');
      this._content.append(this._formContainer);
      this._title = $('<p/>').addClass('formLeadTitle').html('Preencha os campos abaixo que <br/> a gente entra em contato com você.');
      this._formContainer.append(this._title);
      this._form = $('<form/>').addClass('formLeadFormMobile').attr({
        'data-parsley-validate': '',
        'data-parsley-focus': 'none'
      });

      //start up component
      this.formComponent = new Form();

      this._formContainer.append(this._form);
      this._buildFields();
      this.formComponent.load();

      this._populateStates();
      this._populateEvents();
      this._populateVehicleModels();
      this._populateDealers();
    };

    FormLead.prototype._identifyOrigin = function() {
      var config, i, id, len, ref, results1;
      id = parseInt(this.getParameterByName('id'));
      ref = window.CONFIG;
      results1 = [];
      for (i = 0, len = ref.length; i < len; i++) {
        config = ref[i];
        if (config.id === id) {
          this.config = config;
          break;
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };

    FormLead.prototype._initMaps = function() {
      return this._maps = new Maps({
        mapaSeletor: '#mapa',
        zoom: 9,
        center: {
          lat: -23.550520,
          lon: -46.633309
        },
        controleTipoMapa: false,
        controleStreetView: false,
        controleZoom: false
      });
    };

    FormLead.prototype._buildFields = function() {
      var field, i, len, ref, sellerSelect1, sellerSelect2, vehicleModel1, vehicleModel2;

      this._formGroupNews2 = $('<div/>').addClass("formGroup newsletter");
      this._consentText = $('<label/>').addClass('consent-title');
      this._consentText.text('');
      this._formGroupNews2.append(this._consentText);
      this._form.append(this._formGroupNews2);
      
      this._formGroupSalutation = $('<div/>').addClass("formGroup salutation");
      this._form.append(this._formGroupSalutation);
      this._salutationTitle = $('<label/>').addClass('salutation-title');
      this._salutationTitle.text('Forma de tratamento');
      this._formGroupSalutation.append(this._salutationTitle);
      this._radio = new RadioCustom({
        text: 'Sr.',
        value: 'Sr.',
        name: 'salutation',
        id: 'salutation-sr',
        container: this._formGroupSalutation,
        "class": 'radio-custom',
        checked: true
      });
      this._radio = new RadioCustom({
        text: 'Sra.',
        value: 'Sra.',
        name: 'salutation',
        id: 'salutation-srs',
        container: this._formGroupSalutation,
        "class": 'radio-custom',
        checked: false
      });
      ref = this._data['fields'];
      for (i = 0, len = ref.length; i < len; i++) {
        field = ref[i];
        this._background = field.background === "none" ? {} : {
          "backgroundImage": "url('./images/form/form_group_bg.png')"
        };
        this._formGroup = $('<div/>').addClass("formGroup " + field.attr.name).css(this._background);
        this._form.append(this._formGroup);
        this._formLabelTitle = $('<span/>').addClass('labelTitle').html(field.title);
        this._formLabelIncorrect = $('<span/>').addClass('labelIncorrect').html(field.incorrectText);
        this._formLabel = $('<label/>').attr({
          'for': field.attr.name
        });
        this._formLabel.append(this._formLabelTitle, this._formLabelIncorrect);
        this._formElementTag = field.tag != null ? "<" + field.tag + "/>" : '<input/>';
        this._formElement = $("" + this._formElementTag).attr(field.attr);
        if ((field.tag != null) && field.tag === "select" && (field.placeholderTag != null)) {
          if (field.placeholderTag === '') {
            this._formElement.append($('<option/>'));
          } else {
            this._formElement.append($('<option/>').text(field.placeholderTag).attr({
              'selected': 'selected'
            }));
          }
        }
        if ((field.mask != null) && (field.maskPattern == null)) {
          this._formElement.mask(field.mask);
        }
        this._formGroup.append(this._formLabel, this._formElement);
      }

      this._formGroupInterest = this.element.find('.formGroup.interest div');
      this._formGroupDocumentType = this.element.find('.formGroup.documentType div');

      var cpf = $('input[name=cpf]');
      var cnpj = $('input[name=cnpj]');

      var cpfRadio = (new RadioCustom({
        text: 'CPF',
        value: '0',
        name: 'documentType',
        id: 'documentType-CPF',
        container: this._formGroupDocumentType,
        "class": 'radio-custom',
        checked: true,
        callback: (function(_this){
          return function(){
            cpf.parent().show();
            cnpj.parent().hide();

            cpf.attr({
              "data-parsley-required": true
            });

            cnpj.attr({
              "data-parsley-required": false
            });
          };
        })(this)
      }));

      (new RadioCustom({
        text: 'CNPJ',
        value: '1',
        name: 'documentType',
        id: 'documentType-CNPJ',
        container: this._formGroupDocumentType,
        "class": 'radio-custom',
        checked: false,
        callback: (function(_this){
          return function(){
            cpf.parent().hide();
            cnpj.parent().show();

            cpf.attr({
              "data-parsley-required": false
            });

            cnpj.attr({
              "data-parsley-required": true
            });
          };
        })(this)
      }));

      this._radioInterest.push(new RadioCustom({
        text: 'Compra',
        value: '2',
        name: 'interest',
        id: 'interest-buy',
        container: this._formGroupInterest,
        "class": 'radio-custom',
        checked: true,
        callback: (function(_this) {
          return function() {
            var sellerOptional, vehicleOptional;
            _this._validPersonalFields = true;
            sellerOptional = $('.seller').eq(1);
            vehicleOptional = $('.vehiclemodel').eq(1);
            $('.seller').eq(0).find('select').attr({
              "data-parsley-required": "true"
            });
            $('.vehiclemodel').eq(0).find('select').attr({
              "data-parsley-required": "true"
            });

            //$('.seller, .vehiclemodel, .cpf, .birthday').show();
            $('.seller, .vehiclemodel, .cpf').show();
            _this._formGroupDocumentType.parent().show();

            if (sellerOptional.find('select').val() === "") {
              sellerOptional.hide();
            } else {
              sellerOptional.show();
            }
            if (vehicleOptional.find('select').val() === "") {
              vehicleOptional.hide();
            } else {
              vehicleOptional.show();
            }

            $('.cpf').eq(0).find('input').attr({
              "data-parsley-required": "true"
            });

            $('.birthday').eq(0).find('input').attr({
              //"data-parsley-required": "true"
            });

            $('.vehiclemodel-default').parent().css('display', 'block');
            // changed 01-02-2019
            $('.vehiclemodel-default').parent().find('.labelTitle').text('MODELO*');
            // end changed 01-02-2019
            return $('.vehiclemodel-optional').parent().find('.labelTitle').text('ESCOLHA UM MODELO ADICIONAL (OPCIONAL)');
          };
        })(this)
      }));
      this._radioInterest.push(new RadioCustom({
        text: 'Informações',
        value: '1',
        name: 'interest',
        id: 'interest-info',
        container: this._formGroupInterest,
        "class": 'radio-custom',
        checked: false,
        callback: (function(_this) {
          return function() {
            var sellerOptional, vehicleOptional;
            _this._validPersonalFields = false;
            sellerOptional = $('.seller').eq(1);
            vehicleOptional = $('.vehiclemodel').eq(1);
            $('.seller').eq(0).find('select').attr({
              "data-parsley-required": "false"
            });
            $('.vehiclemodel').eq(0).find('select').attr({
              "data-parsley-required": "false"
            });

            $('.seller, .vehiclemodel, .cpf, .birthday, .cnpj').hide();
            _this._formGroupDocumentType.parent().hide();

            $('.seller').find('select').val('');
            //$('.vehiclemodel').find('select').val('');
            $('.cpf').find('input').attr({
              "data-parsley-required": false
            }).val('');

            $('.cnpj').find('input').attr({
              "data-parsley-required": false
            }).val('');

            $('.birthday').find('input').attr({
              "data-parsley-required": false
            }).val('');

            $('.vehiclemodel-default').parent().css('display', 'block');
            $('.vehiclemodel-default').parent().find('.labelTitle').text('ESCOLHA UM MODELO DE INTERESSE (OPCIONAL)');
            return $('.vehiclemodel-optional').parent().find('.labelTitle').text('ESCOLHA OUTRO MODELO DE INTERESSE (OPCIONAL)');
          };
        })(this)
      }));




      this._radioInterest[0].check();

      this._formGroupNews = $('<div/>').addClass("formGroup newsletter");
      this._checkBox = new CheckBoxCustom({
        name: 'termos',
        text: 'Li e concordo com o tratamento dos meus dados pessoais conforme previsto na Declaração de Privacidade para Website Audi.',
        container: this._formGroupNews,
        "class": 'newsletterCheckbox',
        'type': 'checkbox',
        'id': 'lgpd-consent',
        "data-parsley-required": "true",
        checked: false,
        message: 'Custom error message here',
        required: function(elem)
            {
                return $("input.select:checked").length > 0;
            }
      });
      
      this._formSubmit = $('<input/>').addClass('send').attr({
        'type': 'submit',
        'value': 'Enviar'
      });
      this._form.append(this._formGroupNews, this._formSubmit);
      this._form.parsley({
        'trigger': 'change',
        'classHandler': function(el) {
          return el.$element.closest('.formGroup');
        },
        'errorClass': 'hasError'
      });
      // this._formSubmit.on('click', this._onSubmit);
      this._successBtnBack.on('click', this._onSendBackClick);
      sellerSelect1 = $('.seller select')[0];
      sellerSelect2 = $('.seller select')[1];
      $(sellerSelect2).attr('disabled', true).parent().hide();
      /*
      warning: remove callback to not open adicional dealer on
      $(sellerSelect1).on('change', (function(_this) {
        return function() {
          var excludeDealerId;
          excludeDealerId = $(sellerSelect1).val();
          return _this._repopulateDealers(excludeDealerId, sellerSelect2);
        };
      })(this));
      */
      $(vehicleModel2).attr('disabled', true).parent().hide();
      return this.disableFields();
    };

    FormLead.prototype.disableFields = function() {
      var containerElement, fieldElement, fields, i, len, selector;
      fields = [
        {
          container: ".formGroup.phone",
          field: ".formGroup input[name='phone']"
        }, {
          container: ".formGroup.state",
          field: ".formGroup select[name='state']"
        }, {
          container: ".formGroup.city",
          field: ".formGroup select[name='city']"
        }, {
          container: ".formGroup.interest",
          field: ".formGroup input[name='interest']"
        }, {
          container: ".formGroup.cpf",
          field: ".formGroup input[name='cpf']"
        }, {
          container: ".formGroup.birthday",
          field: ".formGroup input[name='birthday']"
        }, {
          container: ".formGroup.seller",
          field: ".formGroup select[name='seller']"
        }, {
          container: ".formGroup.vehiclemodel",
          field: ".formGroup select[name='vehiclemodel']"
        }, {
          container: ".formGroup.newsletter",
          field: ".formGroup input[name='newsletter']"
        }
      ];
      if ((this.config != null) && this.config.type === 'newsletter') {
        for (i = 0, len = fields.length; i < len; i++) {
          selector = fields[i];
          fieldElement = $(selector.field);
          containerElement = $(selector.container);
          if ((fieldElement != null) && fieldElement.length > 0) {
            fieldElement.attr('data-parsley-required', false);
          }
          if ((containerElement != null) && containerElement.length > 0) {
            containerElement.hide();
          }
        }
      }
    };

    FormLead.prototype.getParameterByName = function(name) {
      var regex, results, url;
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, '\\$&');
      regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      results = regex.exec(url);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

   // FormLead.prototype._repopulateDealers = function(excludeDealerId, selectSibling) {
    //  var $selectSibling, dealer, i, len, ref;
    //  $selectSibling = $(selectSibling);
    //  $selectSibling.attr('disabled', true).empty().append($('<option/>'));
    //  ref = this._dealers;
    //  for (i = 0, len = ref.length; i < len; i++) {
    //    dealer = ref[i];
    //    if (dealer.idSalesforce !== excludeDealerId) {
    //      $selectSibling.append($('<option />').attr('value', dealer.idSalesforce).text(dealer.initial + " - " + dealer.name));
    //    }
    //  }
    //  return $selectSibling.removeAttr('disabled').parent().show();
    //};
FormLead.prototype._repopulateDealers = function(excludeDealerId, selectSibling) {
     console.log("_repopulateDealers");
     var $selectSibling, dealer, i, len, ref;
     $selectSibling = $(selectSibling);
     $selectSibling.attr('disabled', true).empty().append($('<option/>'));
     ref = this._dealers;
     for (i = 0, len = ref.length; i < len; i++) {
       dealer = ref[i];
       if (dealer.idSalesforce !== excludeDealerId) {
         // warning: workaround
         if (dealer.idSalesforce == "9999") {
           $selectSibling.append($('<option />').attr('value', dealer.idSalesforce).attr('data-id', dealer.id).text(dealer.name));
         } else {
           $selectSibling.append($('<option />').attr('value', dealer.idSalesforce).attr('data-id', dealer.id).text(dealer.initial + " - " + dealer.name));
         }
       }
     }
     return $selectSibling.removeAttr('disabled').parent().show();
   };
    FormLead.prototype._repopulateVehicles = function(excludeVehicleId, selectSibling) {
      var $selectSibling, i, len, ref, vehicle;
      $selectSibling = $(selectSibling);
      $selectSibling.attr('disabled', true).empty().append($('<option/>'));
      ref = this._vehicles;
      for (i = 0, len = ref.length; i < len; i++) {
        vehicle = ref[i];
        if (vehicle.id !== excludeVehicleId) {
          $selectSibling.append($('<option />').attr('value', vehicle.id).text("" + vehicle.name));
        }
      }
      return $selectSibling.removeAttr('disabled').parent().show();
    };

    FormLead.prototype._populateStates = function() {
      var _formSelect, _loading;
      _formSelect = this.element.find('.state select');
      _loading = $('<div/>').addClass('loading');
      _loading.append(this.svgLoader);
      _formSelect.parent().append(_loading);
      return $.ajax({
        url: window.URL_STATE_LIST_JSON,
        dataType: 'json',
        error: (function(_this) {
          return function(jqXHR, textStatus, errorThrown) {
            return console.log("AJAX Error: " + textStatus);
          };
        })(this),
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            var i, len, state;
            _loading.remove();
            for (i = 0, len = data.length; i < len; i++) {
              state = data[i];
              _formSelect.append($('<option/>').text(state.name + " / " + state.initial).attr({
                'value': state.id
              }));
            }
            return _this.element.find('.state select').on('change', _this._onStateChange);
          };
        })(this)
      });
    };

    FormLead.prototype._populateVehicleModels = function() {
      var _formSelect, _loading;
      _formSelect = this.element.find('.vehiclemodel select').eq(0);
      _loading = $('<div/>').addClass('loading');
      _loading.append(this.svgLoader);
      _formSelect.parent().append(_loading);
      return $.ajax({
        url: window.URL_VEHICLEMODELS_LIST_JSON,
        dataType: 'json',
        error: function(jqXHR, textStatus, errorThrown) {},
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            var i, len, results1, vehicleModel;
            _loading.remove();
            _this._vehicles = data;
            results1 = [];
            for (i = 0, len = data.length; i < len; i++) {
              vehicleModel = data[i];
              results1.push(_formSelect.append($('<option/>').text(vehicleModel.name).attr('value', vehicleModel.idSalesforce)));
            }

            _this.formComponent.changeCar();
            return results1;
          };
        })(this)
      });
    };

    FormLead.prototype._onStateChange = function(e) {
      var _formStateElement, _formStateSelected, _stateId;
      _formStateElement = this.element.find('.state select');
      _stateId = this.element.find('.state select').val();
      _formStateSelected = $(".state select option[value=" + _stateId + "]");
      return this._populateCities(_stateId);
    };

    FormLead.prototype._populateCities = function(_stateId, _stateLatitude, _stateLongitude) {
      var _formSelect, _loading;
      _formSelect = this.element.find('.city select');
      _loading = $('<div/>').addClass('loading');
      _loading.append(this.svgLoader);
      _formSelect.parent().append(_loading);
      _formSelect.children().remove();
      return $.ajax({
        url: window.URL_CITY_BY_STATE_JSON + "/" + _stateId + ".json",
        dataType: 'json',
        error: (function(_this) {
          return function(jqXHR, textStatus, errorThrown) {
            return console.log("AJAX Error: " + textStatus);
          };
        })(this),
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            var city, i, len, results1;
            _loading.remove();
            _formSelect.append($('<option/>'));
            results1 = [];
            for (i = 0, len = data.length; i < len; i++) {
              city = data[i];
              results1.push(_formSelect.append($('<option/>').text(city.name).attr({
                'value': city.id
              })));
            }
            return results1;
          };
        })(this)
      });
    };

    FormLead.prototype._populateMaps = function() {
      return $.ajax({
        url: window.URL_DEALER_LIST_JSON_ETRON,
        dataType: 'json',
        error: (function(_this) {
          return function(jqXHR, textStatus, errorThrown) {
            return console.log("AJAX Error: " + textStatus);
          };
        })(this),
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            return _this._dealers = data;
          };
        })(this)
      });
    };

    FormLead.prototype._populateDealers = function() {
      var _formSelect, _loading;
      _formSelect = this.element.find('.seller select').eq(0);
      _loading = $('<div/>').addClass('loading');
      _loading.append(this.svgLoader);
      _formSelect.parent().append(_loading);
      _formSelect.children().remove();
      _formSelect.append($('<option/>'));
      $.ajax({
        url: window.URL_DEALER_LIST_JSON_ETRON,
        dataType: 'json',
        error: (function(_this) {
          return function(jqXHR, textStatus, errorThrown) {
            return console.log("AJAX Error: " + textStatus);
          };
        })(this),
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            var dealer, i, len, results1;
            _loading.remove();
            _this._dealers = data;
            results1 = [];
            for (i = 0, len = data.length; i < len; i++) {
              dealer = data[i];
              // warning: big workaround
              if (dealer.idSalesforce == "9999") {
                results1.push(_formSelect.append($('<option/>').text(dealer.name).attr({
                  'value': dealer.idSalesforce,
                  'data-id': dealer.id
                })));
              } else {
                results1.push(_formSelect.append($('<option/>').text(dealer.initial + " - " + dealer.name).attr({
                  'value': dealer.idSalesforce,
                  'data-id': dealer.id
                })));
              }
            }
            return results1;
          };
        })(this)
      });
      return this.element.find('.seller select').on('change', this._onChangeDealer);
    };

    FormLead.prototype._populateEvents = function() {
      var _formSelect, _loading;
      _formSelect = this.element.find('.event-lead select');
      _loading = $('<div/>').addClass('loading');
      _loading.append(this.svgLoader);
      _formSelect.parent().append(_loading);
      _formSelect.children().remove();
      _formSelect.append($('<option/>'));
      return $.ajax({
        url: window.URL_SITE_LIST_JSON,
        dataType: 'json',
        error: (function(_this) {
          return function(jqXHR, textStatus, errorThrown) {
            return console.log("AJAX Error: " + textStatus);
          };
        })(this),
        success: (function(_this) {
          return function(data, textStatus, jqXHR) {
            var event, i, len, results1;
            _loading.remove();
            _this._events = data;
            results1 = [];
            for (i = 0, len = data.length; i < len; i++) {
              event = data[i];
              results1.push(_formSelect.append($('<option/>').text(event.name).attr({
                'value': event.id
              })));
            }
            return results1;
          };
        })(this)
      });
    };

    FormLead.prototype._onChangeDealer = function(e) {
      var _formSellerElement, _sellerId, dealer, i, len, ref, results1;
      _formSellerElement = this.element.find('.seller select');
      _sellerId = this.element.find('.seller select').val();
      ref = this._dealers;
      results1 = [];
      for (i = 0, len = ref.length; i < len; i++) {
        dealer = ref[i];
        if (dealer.id === _sellerId) {
          this._address = dealer.address;
          results1.push(this._name = dealer.name);
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };

    FormLead.prototype._onSendBackClick = function(e) {
      this.element.find('.send').val('Enviar');
      return TweenMax.to(this._content, .5, {
        autoAlpha: 1,
        ease: Quart.easeIn,
        onComplete: (function(_this) {
          return function() {
            _this._content.css({
              'display': 'block'
            });
            return _this._success.css({
              'display': 'none',
              'autoAlpha': 0
            });
          };
        })(this)
      });
    };

    FormLead.prototype._onSubmit = function(e) {
      var dealers, vehicles;
      if (!this._form.parsley().validate() || !this._isValidPersonalFields()) {
        this._toggleClassError();
        this.element.find('.hasError').eq(0).find('select, input').focus();
      }
      if (this._form.parsley().isValid() && this._flagGo && this._isValidPersonalFields()) {
        this._flagGo = false;
        this.element.find('.send').val('Enviando...');
        dealers = [];
        vehicles = [];
        this.element.find('.seller select').each(function() {
          if ($(this).val() !== '') {
            return dealers.push(StringUtils.removeSpecialChars($(this).val()));
          }
        });
        this.element.find('.vehiclemodel select').each(function() {
          if ($(this).val() !== '') {
            return vehicles.push(StringUtils.removeSpecialChars($(this).val()));
          }
        });
        $.ajax({
          url: this.config.type === 'newsletter' ? window.URL_NEWSLETTER_SAVE : window.URL_LEAD_SAVE,
          method: 'post',
          data: this._prepareData(dealers, vehicles),
          error: function(jqXHR, textStatus, errorThrown) {},
          success: (function(_this) {
            return function(data, textStatus, jqXHR) {
              if (data.status === "success") {
                _this._successMessageTitle.html('<strong>Dados enviados com sucesso.</strong><br/>.');
              } else {
                _this._successMessageTitle.html('<strong>Erro no envio.</strong><br/>Favor tentar novamente.');
              }
              return TweenMax.to(_this._success, 3, {
                autoAlpha: 1,
                ease: Quart.easeIn,
                onComplete: function() {
                  _this._flagGo = true;
                  _this._form.find('select, input').val('');
                  _this._radioInterest[1].check();
                  $('body').scrollTop(0);
                  _this._content.css({
                    'display': 'none'
                  });
                  return _this._success.css({
                    'display': 'table-cell'
                  });
                }
              });
            };
          })(this)
        });
      }
      return e.preventDefault();
    };

    FormLead.prototype._prepareData = function(dealers, vehicles) {
      var _data;
      this._cpfVal = StringUtils.removeSpecialChars(this.element.find('.cpf input').val());
      this._birthdayVal = StringUtils.removeSpecialChars(this.element.find('.birthday input').val());
      _data = {};
      if (this.config.type === 'newsletter') {
        _data = {
          "name": this.element.find('.name input').val(),
          "email": this.element.find('.email input').val(),
          "idSite": 35
        };
      } else {
        _data = {
          "title": $('input[name=salutation]:checked').data('id'),
          "name": this.element.find('.name input').val(),
          "ddd": StringUtils.removeSpecialChars(this.element.find('.phone input').val().substr(0, 4)),
          "phone": StringUtils.removeSpecialChars(this.element.find('.phone input').val().substr(4, 10)),
          "email": this.element.find('.email input').val(),
          "optIn": this.element.find('.newsletterCheckbox').hasClass('checked') ? 1 : 0,
          "idState": StringUtils.removeSpecialChars(this.element.find('.state select').val()),
          "idCity": StringUtils.removeSpecialChars(this.element.find('.city select').val()),
          "idDealer[]": dealers,
          "idSite": 36,
          "vehicleModel[]": vehicles,
          "idInterestType": $('input[name=interest]:checked').data('id') != null ? $('input[name=interest]:checked').data('id') : 1
        };
        if (this._cpfVal !== "") {
          _data.cpf = this._cpfVal;
        }
        if (this._birthdayVal !== "") {
          _data.birthday = this._birthdayVal;
        }
        if (this.config.type === 'car-configurator') {
          _data.audiCode = this.getParameterByName('audiCode');
        }
      }
      return _data;
    };

    FormLead.prototype._isValidPersonalFields = function() {
      var _boolBirthday, _boolCpf;
      if (this._validPersonalFields) {
        _boolBirthday = ValidationUtils.isBirthdayValid($('.formGroup.birthday').find('input').val());
        _boolCpf = ValidationUtils.isCPFValid($('.formGroup.cpf').find('input').val());
        return _boolBirthday && _boolCpf;
      } else {
        return true;
      }
    };

    FormLead.prototype._toggleClassError = function() {
      var _boolBirthday, _boolCpf;
      if (this._validPersonalFields) {
        _boolBirthday = ValidationUtils.isBirthdayValid($('.formGroup.birthday').find('input').val());
        _boolCpf = ValidationUtils.isCPFValid($('.formGroup.cpf').find('input').val());
        if (!_boolBirthday) {
          $('.formGroup.birthday').addClass('hasError').removeClass('parsley-success');
        }
        if (!_boolCpf) {
          $('.formGroup.cpf').addClass('hasError').removeClass('parsley-success');
        }
      } else {

      }
    };

    return FormLead;

  })();

  module.exports = FormLead;


  },{"../components/CheckboxCustom":2,"../components/RadioCustom":3,"../components/maps":4,"../utils/StringUtils":7,"../utils/ValidationUtils":8}],7:[function(require,module,exports){
  var StringUtils,
    slice = [].slice;

  StringUtils = (function() {
    function StringUtils() {}

    StringUtils.hasString = function(p_string, p_search) {
      if (p_string.split(p_search).length !== 1) {
        return true;
      } else {
        return false;
      }
    };

    StringUtils.replace = function(p_string, p_from, p_to) {
      return p_string.split(p_from).join(p_to);
    };

    StringUtils.reverse = function(p_string) {
      if (!p_string) {
        return "";
      }
      return p_string.split("").reverse().join("");
    };

    StringUtils.toCamelCase = function(p_string) {
      var re;
      re = p_string.replace(/([\+\-_ ][a-z])/g, function($1) {
        return $1.toUpperCase().replace(/[\+\-_ ]/, "");
      });
      return re.charAt(0).toUpperCase() + re.slice(1);
    };

    StringUtils.removeWhiteSpace = function(p_string) {
      if (!p_string) {
        return "";
      }
      return this.trim(p_string).replace(/\s+/g, "");
    };

    StringUtils.removeHTMLTag = function(p_string) {
      return p_string.replace(/<.*?>/g, "");
    };

    StringUtils.removeSpecialChars = function(p_string) {
      return p_string.replace(/[^a-zA-Z 0-9]+/g, '');
    };

    StringUtils.convertToCPF = function(p_string) {
      p_string = this.removeSpecialChars(p_string);
      if (p_string.length > 9) {
        p_string = p_string.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1' + "." + "$2" + "." + "$3" + "-" + "$4");
      } else if (p_string.length > 6) {
        p_string = p_string.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1' + "." + "$2" + "." + "$3");
      } else if (p_string.length > 3) {
        p_string = p_string.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1' + "." + "$2");
      } else {
        p_string = p_string.replace(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/, '$1');
      }
      return p_string;
    };

    StringUtils.convertToCEP = function(p_string) {
      p_string = this.removeSpecialChars(p_string);
      if (p_string.length > 5) {
        p_string = p_string.replace(/(\d{0,5})(\d{0,3})/, '$1' + "-" + "$2");
      } else {
        p_string = p_string.replace(/(\d{0,5})(\d{0,3})/, '$1');
      }
      return p_string;
    };

    StringUtils.convertToDate = function(p_string) {
      p_string = this.removeSpecialChars(p_string);
      if (p_string.length > 4) {
        p_string = p_string.replace(/(\d{0,2})(\d{0,2})(\d{0,4})/, '$1' + "/" + "$2" + "/" + "$3");
      } else if (p_string.length > 2) {
        p_string = p_string.replace(/(\d{0,2})(\d{0,2})(\d{0,4})/, '$1' + "/" + "$2");
      } else {
        p_string = p_string.replace(/(\d{0,2})(\d{0,2})(\d{0,4})/, '$1');
      }
      return p_string;
    };

    StringUtils.isEmpty = function(p_string) {
      if (!p_string || p_string === "") {
        return true;
      }
      return !p_string.length;
    };

    StringUtils.toCapitalizeCase = function(p_string) {
      var str;
      str = this.trimLeft(p_string);
      return str.replace(/(^\w)/, this._upperCase);
    };

    StringUtils.toTimeFormat = function(p_miliseconds, p_decimal) {
      var minutes, seconds;
      if (p_decimal == null) {
        p_decimal = true;
      }
      minutes = Math.floor(p_miliseconds / 60);
      seconds = Math.floor(p_miliseconds % 60);
      return String(p_decimal ? this.addDecimalZero(minutes) + ":" + this.addDecimalZero(seconds) : minutes + ":" + seconds);
    };

    StringUtils.addDecimalZero = function(p_value) {
      if (p_value < 10) {
        return "0" + p_value;
      }
      return String(p_value);
    };

    StringUtils.abbreviate = function(p_string, p_max_length, p_indicator, p_split) {
      var badChars, charCount, n, pieces, result;
      if (p_max_length == null) {
        p_max_length = 50;
      }
      if (p_indicator == null) {
        p_indicator = '...';
      }
      if (p_split == null) {
        p_split = ' ';
      }
      if (!p_string) {
        return "";
      }
      if (p_string.length < p_max_length) {
        return p_string;
      }
      result = '';
      n = 0;
      pieces = p_string.split(p_split);
      charCount = pieces[n].length;
      while (charCount < p_max_length && n < pieces.length) {
        result += pieces[n] + p_split;
        charCount += pieces[++n].length + p_split.length;
      }
      if (n < pieces.length) {
        badChars = ['-', '—', ',', '.', ' ', ':', '?', '!', '', "\n", ' ', String.fromCharCode(10), String.fromCharCode(13)];
        while (badChars.indexOf(result.charAt(result.length - 1)) !== -1) {
          result = result.slice(0, -1);
        }
        result = this.trim(result) + p_indicator;
      }
      if (n === 0) {
        result = p_string.slice(0, p_max_length) + p_indicator;
      }
      return result;
    };

    StringUtils.toBoolean = function(p_string) {
      var f, t;
      t = ['yes', 'true', ' 1', 1, true];
      f = ['no', 'false', '0', 0, false];
      if (ArrayUtils.hasItem(p_string, t)) {
        return true;
      } else if (ArrayUtils.hasItem(p_string, f)) {
        return false;
      } else {
        throw new Error("StringUtils::toBoolean '" + p_string + "' is a wrong format");
      }
    };

    StringUtils.random = function(p_length) {
      var i, j, ref, s;
      if (p_length == null) {
        p_length = 10;
      }
      s = "";
      for (i = j = ref = p_length; ref <= 1 ? j <= 1 : j >= 1; i = ref <= 1 ? ++j : --j) {
        s += String.fromCharCode(65 + Math.floor(Math.random() * 25));
      }
      return s;
    };

    StringUtils.trim = function(p_str, p_char) {
      if (p_str === null) {
        return "";
      }
      return this.trimRight(this.trimLeft(p_str, p_char), p_char);
    };

    StringUtils.trimRight = function(p_str, p_char) {
      var re;
      if (!p_str) {
        return "";
      }
      re = new RegExp(p_char + '*$');
      re.global = true;
      re.multiline = true;
      return p_str.replace(re, '');
    };

    StringUtils.trimLeft = function(p_str, p_char) {
      var re;
      if (!p_str) {
        return "";
      }
      re = new RegExp('^' + p_char + '*');
      re.global = true;
      re.multiline = true;
      return p_str.replace(re, '');
    };

    StringUtils.replaceSpecialCharacters = function(p_string) {
      var char, pattern;
      if (!this.substitionDict) {
        this._initDict();
      }
      for (char in this.substitionDict) {
        console.log(char);
        pattern = new RegExp(char, "g");
        p_string = p_string.replace(pattern, this.substitionDict[char]);
      }
      return p_string;
    };

    StringUtils._upperCase = function() {
      var args, p_char;
      p_char = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return p_char.toUpperCase();
    };

    StringUtils.substitionDict = null;

    StringUtils._initDict = function() {
      var char, results;
      this.substitionDict = [];
      this.substitionDict["ã"] = "a";
      this.substitionDict["á"] = "a";
      this.substitionDict["â"] = "a";
      this.substitionDict["ä"] = "a";
      this.substitionDict["à"] = "a";
      this.substitionDict["é"] = "e";
      this.substitionDict["ê"] = "e";
      this.substitionDict["ë"] = "e";
      this.substitionDict["è"] = "e";
      this.substitionDict["í"] = "i";
      this.substitionDict["î"] = "i";
      this.substitionDict["ï"] = "i";
      this.substitionDict["ì"] = "i";
      this.substitionDict["õ"] = "o";
      this.substitionDict["ó"] = "o";
      this.substitionDict["ô"] = "o";
      this.substitionDict["ö"] = "o";
      this.substitionDict["ò"] = "o";
      this.substitionDict["ú"] = "u";
      this.substitionDict["û"] = "u";
      this.substitionDict["ü"] = "u";
      this.substitionDict["ù"] = "u";
      this.substitionDict["ç"] = "c";
      this.substitionDict["ñ"] = "n";
      results = [];
      for (char in this.substitionDict) {
        results.push(this.substitionDict[char.toUpperCase()] = String(this.substitionDict[char]).toUpperCase());
      }
      return results;
    };

    return StringUtils;

  })();

  module.exports = StringUtils;


  },{}],8:[function(require,module,exports){
  var ValidationUtils;

  ValidationUtils = (function() {
    function ValidationUtils() {}

    ValidationUtils.isBirthdayValid = function(birthday) {
      var _birthday, _dateYear, _day, _maxDay, _maxYear, _minYear, _month, _year;
      _birthday = $.trim(birthday).replace(/\//g, '').split('');
      _day = _birthday.slice(0, 2).join('');
      _month = _birthday.slice(2, 4).join('');
      _year = _birthday.slice(4, 8).join('');
      _dateYear = new Date().getFullYear();
      _maxYear = _dateYear - 10;
      _minYear = _dateYear - 120;
      _maxDay = 31;
      switch (_month) {
        case "02":
          if ((_year % 4 === 0 && _year % 100 !== 0) || _year % 400 === 0) {
            _maxDay = 29;
          } else {
            _maxDay = 28;
          }
          break;
        case "01":
        case "03":
        case "05":
        case "07":
        case "08":
        case "10":
        case "12":
          _maxDay = 31;
          break;
        case "04":
        case "06":
        case "09":
        case "11":
          _maxDay = 30;
      }
      if ((_year >= _minYear) && (_year <= _maxYear) && (_month <= 12) && (_day <= _maxDay)) {
        return true;
      } else {
        return false;
      }
    };

    ValidationUtils.isCPFValid = function(cpfMask) {
      var _cpf, cpf, dv, dvv, i, sum;
      cpf = $.trim(cpfMask).replace(/\.|\-/g, '').split('');
      _cpf = cpf.slice(0, 9);
      sum = 0;
      dv = 0;
      i = 10;
      $.each(_cpf.slice(0, 9), function() {
        sum += parseInt(this) * i;
        return i -= 1;
      });
      if (parseInt(sum % 11) < 2) {
        dv = 0;
      } else {
        dv = 11 - (parseInt(sum % 11));
      }
      dvv = _cpf;
      dvv.push(dv);
      i = 11;
      sum = 0;
      $.each(dvv.slice(0, 11), function() {
        sum += parseInt(this) * i;
        return i -= 1;
      });
      if (parseInt(sum % 11) < 2) {
        dvv = 0;
      } else {
        dvv = 11 - (parseInt(sum % 11));
      }
      _cpf.push(dvv);
      _cpf = _cpf.join('');
      cpf = cpf.join('');
      if (_cpf === cpf) {
        if (cpf === "00000000000" || cpf === "11111111111" || cpf === "22222222222" || cpf === "33333333333" || cpf === "44444444444" || cpf === "55555555555" || cpf === "66666666666" || cpf === "77777777777" || cpf === "88888888888" || cpf === "99999999999") {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    };

    return ValidationUtils;

  })();

  module.exports = ValidationUtils;


  },{}]},{},[1]);
  function cpfValid(){

  var isFalse = true;
  var strCPF = $('input[name=cpf]').val();
  var cpfCnpj = strCPF;
  //console.log(strCPF);

  if (strCPF == "00000000000" || strCPF === "11111111111" || strCPF === "22222222222" || strCPF === "33333333333" || strCPF === "44444444444" || strCPF === "55555555555" || strCPF === "66666666666" || strCPF === "77777777777" || strCPF === "88888888888" || strCPF === "99999999999"){ isFalse = false };

  cpf = strCPF.replace(/[^\d]+/g,'');
  if(cpf == '') { isFalse = false };
  // Elimina CPFs invalidos conhecidos
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
      { isFalse = false };
  // Valida 1o digito
  add = 0;
  for (i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
      rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
          rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
      { isFalse = false };
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpf.charAt(10)))
  { isFalse = false };



  if (!isFalse) {
    //console.log("flase");
      $('label[for=cpf] .labelIncorrect').css(
        "display","inline-block"
      ).css(
        "font-size", "13px"
      ).css(
        "position", "absolute"
      ).css(
        "top", "77px"
      ).css(
        "right", "10px"
      ).css(
        "color", "#bc2037"
      );
      return false;
  } else {
      //console.log("true");
      $('.labelIncorrect').css(
        "display","none"
      )
      return true;
  }

}
