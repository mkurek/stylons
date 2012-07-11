from textfield import TextField

class TextareaField(TextField):
    """ Sencha Touch TextArea Component. Wraps a textarea.
    
        :param maxRows: The maximum number of lines made visible by the input.
        :type maxRows: Integer
    
    """
    def __init__(self, disabled=None, label=None, name=None, required=None,
                 value=None, maxLength=None, maxRows=None, alwaysReload=None,
                 cssClass=None):
        super(TextareaField, self).__init__(disabled=disabled, label=label,
                                            name=name, required=required,
                                            value=value, maxLength=maxLength,
                                            alwaysReload=alwaysReload, 
                                            cssClass=cssClass)
        
        if maxRows is not None:
            assert isinstance(maxRows, int), "maxRows must be an integer"
            self['maxRows'] = maxRows
           
        self['type'] = 'TextareaField'