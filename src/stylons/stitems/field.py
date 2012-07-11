from component import Component

class Field(Component):
    """ Sencha Touch Field Component.
        This is only base class. Do not use it throughly.
        
        :param disabled: Inform about accessibility of field
        :type disabled: Boolean
        :param label: Label content (information about field)
        :type label: String
        :param name: Name of field or fields group (e.g. radio)
        :type name: String
        :param required: Define if field is necessary 
        :type required: Boolean
        :param value: Default value of field
        :type value: String
    """
    def __init__(self, disabled=None, inputType=None, label=None, name=None,
                 required=None, value=None, alwaysReload=None, cssClass=None):
        super(Field, self).__init__(alwaysReload=alwaysReload, 
                                    cssClass=cssClass)
        
        if disabled is not None:
            assert isinstance(disabled, bool), 'disabled must be a boolean'
            self['disabled'] = False
        
        if inputType is not None:
            inputTypeValues = ('text', 'password', 'radio', 'file', 'checkbox')
            assert inputType in inputTypeValues, "type "\
                            "must be in "+str(inputTypeValues)
            self['inputType'] = inputType
            
        if label is not None:
            assert isinstance(label, basestring), 'label must be an instance'\
                                                    ' of str or unicode'
            self['label'] = label
            
        if name is not None:
            assert isinstance(name, basestring), 'name must be an instance of'\
                                                    ' str or unicode'
            self['name'] = name
        
        if required is not None:        
            assert isinstance(required, bool), 'required must be a boolean'
            self['required'] = required
         
        if value is not None:   
            assert isinstance(value, basestring), 'value must be an instance'\
                                                    ' of str or unicode'
            self['value'] = value
            
        self['type'] = 'Field'