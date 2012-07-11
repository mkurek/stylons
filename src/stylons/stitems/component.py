class Component(dict):
    """Abstract base class of all components, define global params

        :param alwaysReload: True if element can change and must be always\
        reload (e.g. list with order in cart)
        :type alwaysReload: Boolean
        :param cssClass: custom CSS class that component will be tagged
        :type cssClass: String
    
    """
    def __init__(self, alwaysReload=None, cssClass=None):
        if alwaysReload is not None:
            assert isinstance(alwaysReload, bool), "alwaysReload must be "\
                                                    "instance of Boolean"
            self['alwaysReload'] = alwaysReload
            
        if cssClass is not None:
            assert isinstance(cssClass, basestring), "cssClass must be a string"
            self['cls'] = cssClass