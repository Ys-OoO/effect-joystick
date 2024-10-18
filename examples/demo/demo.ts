import Scroll from "../../src/scroll";

new Scroll("#wrap", {
	stages: [
		{
			"id": "color",
			"transition": 200,
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
			}, 
			{
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
