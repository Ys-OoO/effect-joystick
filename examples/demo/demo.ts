import Scroll from "../../src/scroll";

new Scroll("#wrap", {
	stages: [ {
		"id": "color",
		"scrollNumber": 2,
		"transition": 1000,
		"items": [ {
		  "id": "battery",
		  "effects": [ {
				"property": "width",
				"start": "125px",
				"end": "250px"
		  }, {
				"property": "backgroundColor",
				"start": "#fd0",
				"end": "#209b35"
		  } ]
		}, {
		  "id": "text",
		  "effects": [ {
				"property": "color",
				"start": "#fd0",
				"end": "#209b35"
		  } ]
		} ]
	  }
	]
});
