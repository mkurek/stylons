from checkbox import Checkbox

class Radio(Checkbox):
    """ Sencha Touch Radio component.
        Default inputType for Radio is Radio.
        
        .. note::
            To use Radio component properly, You have to give each radio field \
            the same name.

    """
    def __init__(self, disabled=None, label=None, name=None,
                required=None, value=None, checked=None, alwaysReload=None,
                cssClass=None):
        super(Radio, self).__init__(disabled=disabled, label=label, name=name, 
                                    required=required, value=value,
                                    checked=checked, alwaysReload=alwaysReload,
                                    cssClass=cssClass)
        
        self['type'] = 'Radio'
        self['inputType'] = 'radio'