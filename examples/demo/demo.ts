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
	  },
	  {
		"id": "transform",
		"scrollNumber": 8,
		"transition": 500,
		"items": [ {
		  "id": "showcase",
		  "effects": [ {
				"property": "transform",
				"start": "rotateX(0deg)",
				"end": "rotateX(320deg)"
		  } ]
		} ]
	  }
	]
});
