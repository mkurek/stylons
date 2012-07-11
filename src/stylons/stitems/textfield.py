from field import Field

class TextField(Field):
    """ Sencha Touch Text Field Component.
        Simple text input field.
        
        :param maxLength: Maximum number of character permit by the input.
        :type maxLength: Integer
    """
    def __init__(self, disabled=None, label=None, name=None, required=None,
                 value=None, inputType=None, maxLength=None, alwaysReload=None,
                 cssClass=None):
        super(TextField, self).__init__(disabled=disabled, label=label,
                                        name=name, required=required,
                                        value=value, inputType=inputType,
                                        alwaysReload=alwaysReload, 
                                        cssClass=cssClass)
        
        if maxLength is not None:
            assert isinstance(maxLength, int), 'maxLength must be an integer'
            self['maxLength'] = maxLength
        
        self['type'] = 'TextField'
