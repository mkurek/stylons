{
  "id" : "screen",
  "url" : "static/index",
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
         "url" : "static/spacer"
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
      	% for fieldset in c.fieldsets:
      		{
      		"id" : "${fieldset['groupName']}",
      		"url" : "form/fieldset/${fieldset['id']}",
      		"slots" : [
      			% for field in c.fields[fieldset['id']]:
      				{
      					"id" : "${field['name']}",
      					"url" : "form/field/${field['id']}"
      				% if field != c.fields[fieldset['id']][-1]:
      				},
      				% else:
      				}
      				% endif
      			% endfor
      			]
      		% if fieldset != c.fieldsets[-1]:
      		},
      		% else:
      		}
      		% endif
      	% endfor
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
