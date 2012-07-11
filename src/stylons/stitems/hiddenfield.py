from field import Field

class HiddenField(Field):
    """ Sencha Touch Hidden Field. Act's just like normal field, except it's \
        hidden.
    
    """
    def __init__(self, disabled=None, label=None, name=None, required=None,
                 value=None, alwaysReload=None, cssClass=None):
        super(HiddenField, self).__init__(disabled=disabled, label=label,
                                          name=name, required=required, 
                                          value=value, cssClass=cssClass,
                                          alwaysReload=alwaysReload)
        self['type'] = 'HiddenField'
