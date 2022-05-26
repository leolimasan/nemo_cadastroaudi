

var FORM_TYPE = {
    CorporateSales: "01241000001IHZ2",
    Sales: "01241000001IHYn"
};
var _env = "prod"; // values : prod | dev
var ENDPOINTS = {
    prod: {
        url: 'https://audi-cors-new.herokuapp.com/https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
    },
    dev: {
        url: 'https://audi-cors-new.herokuapp.com/webto.salesforce.com:443/servlet/servlet.WebToLead?encoding=UTF-8'
    }
};

var VEHICLE_CODES = [{
    from: [
        "8XFBLG",
        "8XFAJG",
        "8XFA"
    ],
    to: "A1111"
},{
    from: [
        "8V7B6G",
        "8VMLCX",
        "8VML8X",
        "A3TFSI",
        "8VAABG",
        "8VFABG",
        "8VEB",
        "8VFR",
        "8VMR"
    ],
    to: "A3333"
},{
    from: [
        "8W5BDG",
        "8W2BAY",
        "8W2ADG",
        "8W2BDG"
    ],
    to: "A4444"
},/*{
    from: [
        "8W5B"
    ],
    to: "A5555"
},*/{
    from: [
        "4GJ02Y",
        "4GC08G",
        "4GC02Y",
        "4GC0"
    ],
    to: "A6666"
},{
    from: [
        "4GF08G",
        "4GF02Y",
        "4GF0",
        "4GFR"
    ],
    to: "A7777"
},{
    from: [
        "4HL01A",
        "4HL0GA",
        "4HC0CA"
    ],
    to: "A8888"
},{
    from: [
        "8UGA8Y",
        "8UGCEY",
        "8UGLKX",
        "8UGLPX",
        "8UGL"
    ],
    to: "Q3333"
},{
    from: [
        "8RB01A",
        "8RB07A",
        "FYBA"
    ],
    to: "Q5555"
},{
    from: [
        "FYBS"
    ],
    to: "SQ555"
},{
    from: [
        "4MB0L1",
        "4MB0A1",
        "4MB0"
    ],
    to: "Q7777"
},{
    from: [
        "8UGR7Y",
        "8UGR",
        "8UGR"
    ],
    to: "RSQ33"
},{
    from: [
        "4GDRRA",
        "4GDR"
    ],
    to: "RS666"
},{
    from: [
        "4GFRRA"
    ],
    to: "RS777"
},{
    from: [
        "4S30BE",
        "4S30"
    ],
    to: "R8888"
},{
    from: [
        "8RBSCA"
    ],
    to: "Q5555"
},{
    from: [
        "8VSS2L"
    ],
    to: "A3333"
},{
    from: [
        "4HCS5A"
    ],
    to: "A8888"
},{
    from: [
        "FV3R"
    ],
    to: "TTRSS"
},{
    from: [
        "FV307X",
        "FV907X",
        "FV3S2L",
        "FV9S2L",
        "FV9S",
        "FV3S",
        "FV90",
        "FV30"
    ],
    to: "1TTTT"
}];
