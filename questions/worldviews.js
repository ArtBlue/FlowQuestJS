{
	"containerID": "flowquest_container",
	"usePushState" : false,
	"questions": {
		"1": {
			"question": "Does God exist?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "god",
					"nextQ": 2
				},
				"no": {
					"label": "No",
					"val": "no-god",
					"nextQ": 8
				}
			}
		}
		, "2": {
			"question": "Do many Gods exist?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "many-gods",
					"nextQ": null
				},
				"no": {
					"label": "No",
					"val": "one-god",
					"nextQ": 3
				}
			}
		}
		, "3": {
			"question": "Is God in control of the world now?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "god-in-control",
					"nextQ": 4
				},
				"no": {
					"label": "No",
					"val": "god-not-in-control",
					"nextQ": null
				}
			}
		}
		, "4": {
			"question": "Does God exist independantly of the world?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "god-independant",
					"nextQ": 5
				},
				"no": {
					"label": "No",
					"val": "god-not-independant",
					"nextQ": 6
				}
			}
		}
		, "5": {
			"question": "Is God involved in the world?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "god-involved",
					"nextQ": 6
				}
				, "no": {
					"label": "No",
					"val": "god-uninvolved",
					"nextQ": null
				}
			}
		}
		, "6": {
			"question": "Can God be known personally?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "canbe-known-personally",
					"nextQ": 7
				},
				"no": {
					"label": "No",
					"val": "cantbe-known-personally",
					"nextQ": null
				}
			}
		}
		, "7": {
			"question": "Did God make Himself known through the man, Jesus of Nazareth?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "jesus-god",
					"nextQ": null
				},
				"no": {
					"label": "No",
					"val": "jesus-not-god",
					"nextQ": null
				}
			}
		}
		, "8": {
			"question": "Are the only things in existence material?",
			"options": {
				"yes": {
					"label": "Yes",
					"val": "only-material",
					"nextQ": null
				},
				"no": {
					"label": "No",
					"val": "not-only-material",
					"nextQ": null
				}
			}
		}
	},
	"answers": {
		"patterns": {
			"god|many-gods|": {
				"position": "Polytheist",
				"content": "You are a polytheist."
			}
			, "god|one-god|god-not-in-control|": {
				"position": "Deist",
				"content": "You are a deist."
			}
			, "god|one-god|god-in-control|god-independant|god-uninvolved|": {
				"position": "Deist",
				"content": "You are a deist."
			}
			, "god|one-god|god-in-control|god-independant|god-involved|cantbe-known-personally|" : {
				"position": "Weak Agnostic",
				"content": "You are a weak agnostic."
			}
			, "god|one-god|god-in-control|god-independant|god-involved|canbe-known-personally|jesus-god|" : {
				"position": "Theist, Christian",
				"content": "You are a Theist and a Christian."
			}
			, "no-god|only-material|": {
				"position": "Atheist and Materialist",
				"content": "You are an atheist who is also a materialist."
			}
			, "no-god|not-only-material|": {
				"position": "Atheist and Naturalist",
				"content": "You are an atheist who is a naturalist, but not necessarily a materialist."
			}
		}
	}
}