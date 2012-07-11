from field import Field

class Checkbox(Field):
    """Sencha Touch Checkbox component.
        Simple Checkbox class. Default inputType for Checkbox is checkbox.
    
        :param checked: True set checkbox marked at default
        :type checked: Boolean
    """
    def __init__(self, disabled=None, label=None, name=None,
                required=None, value=None, checked=None, alwaysReload=None,
                cssClass=None):
        super(Checkbox, self).__init__(disabled=disabled, inputType=None, 
                                       label=label, name=name, value=value,
                                       required=required, cssClass=cssClass,
                                       alwaysReload=alwaysReload)
        if checked is not None :
            assert isinstance(checked, bool), 'checked must be an instance of'\
                                                ' bool'
            self['checked'] = checked
        
        self['type'] = 'Checkbox'
        self['inputType'] = 'checkbox'