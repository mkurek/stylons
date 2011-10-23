{
  "id" : "screen",
  "url" : "index",
  "slots" : [
    {
    "id" : "form",
    "url" : "static/form/index",
    "slots" : [
      {
      "id" : "formToolbar",
      "url" : "static/form/toolbar",
      "slots" : [
        {
         "id" : "cancelButton",
         "url" : "static/form/cancelButton"
        },
        {
         "id" : "clearButton",
         "url" : "static/form/clearButton"
        },
        {
         "id" : "spacer",
         "url" : "spacer"
        },
        {
         "id" : "sendButton",
         "url" : "static/form/sendButton"
        }
      ]
      },
      {
      "id" : "formPanel",
      "url" : "static/form/panel/index",
      "slots" : [
      	{
      		"id" : "surnameandname",
      		"url" : "form/fieldset/1",
      		"slots" : [
      			{
      				"id" : "name",
      				"url" : "form/field/1"
      			},
      			{
      				"id" : "surname",
      				"url" : "form/field/2"
      			}
      		]
      	},
      	{
      		"id" : "location",
      		"url" : "form/fieldset/2",
      		"slots" : [
      			{
      				"id" : "city",
      				"url" : "form/field/3"
      			},
      			{
      				"id" : "street",
      				"url" : "form/field/4"
      			},
      			{
      				"id" : "houseNumber",
      				"url" : "form/field/5"
      			},
      			{
      				"id" : "apartmentNumber",
      				"url" : "form/field/6"
      			}
      		]
      	},
      	{
      		"id" : "contact",
      		"url" : "form/fieldset/3",
      		"slots" : [
      			{
      				"id" : "email",
      				"url" : "form/field/7"
      			},
      			{
      				"id" : "phonenumber",
      				"url" : "form/field/8"
      			}
      		]
      	}
      	
      ]
      }
    ]
    },
    {
    "id" : "formTabbar",
    "url" : "form/tabbar"
    }
  ]
}
