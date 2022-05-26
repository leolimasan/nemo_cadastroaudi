

var FORM_TYPE = {
    CorporateSales: "01241000001IHZ2",
    Sales: "01241000001IHYn"
};
var _env = "prod"; // values : prod | dev
var ENDPOINTS = {
    prod: {
        url: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
    },
    dev: {
        url: 'https://teste.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'
    }
};

var VEHICLES_AVAILABLE_ON_SELECT = [
    "A6666",
    "A7777",
    "Q8888",
    "RS444",
    "etron"
]

var VEHICLES_MODELS_LIST = [
    {"id":"7","name":"A6","idSalesforce":"A6666","active":"1"},
    {"id":"9","name":"A7","idSalesforce":"A7777","active":"1"},
    {"id":"24","name":"A8","idSalesforce":"A8888","active":"1"},
    {"id":"25","name":"Q8","idSalesforce":"Q8888","active":"1"},
    {"id":"26","name":"RS 4","idSalesforce":"RS444","active":"1"},
    {"id":"27","name":"e-tron","idSalesforce":"etron","active":"1"},
    ]

var VEHICLE_CODES = [{
    from: [
        "8XFBLG",
        "8XFAJG",
        "8XFA",
        "A1111"
    ],
    to: "A1111",
    subOrigin: ""
},{
    from: [
        "8V7B6G",
        "8VMLCX",
        "8VML8X",
        "A3TFSI",
        "8VAABG",
        "8VFABG",
        "8VFA",
        "8VML",
        "8VEB",
        "8VFR",
        "8VMR",
        "A3333"
    ],
    to: "A3333",
    subOrigin: ""
},{
    from: [
        "8W5BDG",
        "8W2BAY",
        "8W2ADG",
        "8W2BDG",
        "8W2A",
        "8W5B",
        "A4444"
    ],
    to: "A4444",
    subOrigin: ""
},{
    from: [
        "8W5B",
        "A5555"
    ],
    to: "A5555",
    subOrigin: ""
},{
    from: [
        "4GJ02Y",
        "4GC08G",
        "4GC02Y",
        "4GC0",
        "A6666"
    ],
    to: "A6666",
    subOrigin: "A6 News"
},{
    from: [
        "4GF08G",
        "4GF02Y",
        "4GF0",
        "4GFR",
        "A7777"
    ],
    to: "A7777",
    subOrigin: "A7 News"
},{
    from: [
        "4HL01A",
        "4HL0GA",
        "4HC0CA",
        "4HCS5A",
        "A8888"
    ],
    to: "A8888",
    subOrigin: "A8 News"
},{
    from: [
        "8UGA8Y",
        "8UGCEY",
        "8UGLKX",
        "8UGLPX",
        "8UGL",
        "Q3333"
    ],
    to: "Q3333",
    subOrigin: ""
},{
    from: [
        "8RB01A",
        "8RB07A",
        "FYBA",
        "Q5555"
    ],
    to: "Q5555",
    subOrigin: ""
},{
    from: [
        "FYBS",
        "SQ555"
    ],
    to: "SQ555",
    subOrigin: ""
},{
    from: [
        "4MB0L1",
        "4MB0A1",
        "4MB0",
        "Q7777"
    ],
    to: "Q7777",
    subOrigin: ""
},{
    from: [
        "8UGR7Y",
        "8UGR",
        "8UGR",
        "RSQ33"
    ],
    to: "RSQ33",
    subOrigin: ""
},{
    from: [
        "4GDRRA",
        "4GDR",
        "RS666"
    ],
    to: "RS666",
    subOrigin: ""
},{
    from: [
        "4GFRRA",
        "RS777"
    ],
    to: "RS777",
    subOrigin: ""
},{
    from: [
        "4S30BE",
        "4S30",
        "R8888"
    ],
    to: "R8888",
    subOrigin: ""
},{
    from: [
        "8RBSCA",
        "Q5555"
    ],
    to: "Q5555",
    subOrigin: ""
},{
    from: [
        "8VSS2L",
        "A3333"
    ],
    to: "A3333",
    subOrigin: ""
},{
    from: [
        "FV3R",
        "TTRSS"
    ],
    to: "TTRSS",
    subOrigin: ""
},{
    from: [
        "FV307X",
        "FV907X",
        "FV3S2L",
        "FV9S2L",
        "FV9S",
        "FV3S",
        "FV90",
        "FV30",
        "1TTTT"
    ],
    to: "1TTTT",
    subOrigin: ""
},{
    from: [
        "RS4",
        "RS444"
    ],
    to: "RS444",
    subOrigin: "RS 4 News"
},{
    from: [
        "Q8",
        "Q8888"
    ],
    to: "Q8888",
    subOrigin: "Q8 News"
},{
    from: [
        "ETRN",
        "etron"
    ],
    to: "etron",
    subOrigin: "Etron News"
}];
