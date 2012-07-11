from textfield import TextField

class SelectField(TextField):
    """ Sencha Touch Select Field component.
        
        :param options: Key in this dict is HTML select-field value, value is t\
        ext
        :type options: Dictionary
        
        Example::
            
            SelectField(name="mySelect", options={'myValue1' : 'myText1', 'myVa\
lue2' : 'myText2'})
    
    """
    def __init__(self, disabled=None, label=None, name=None, required=None,
                 value=None, maxLength=None, options=None, alwaysReload=None,
                 cssClass=None):
        super(SelectField, self).__init__(disabled=disabled, label=label,
                                          name=name, required=required,
                                          value=value, maxLength=maxLength)
        
        if options is not None:
            assert isinstance(options, dict), "options must be a dictionary"
            self['options'] = []
            for k in options.keys():
                optionsTypes = (basestring, bool, int)
                assert isinstance(k, optionsTypes) and isinstance(options[k], 
                    optionsTypes), "".join(["key and value of options must be i\
                    n ", optionsTypes])
                    
                self['options'].append({'value' : k, 'text': options[k]})

        self['type'] = 'SelectField'
        