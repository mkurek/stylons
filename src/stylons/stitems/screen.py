from component import Component
from layout import Layout

def isInt(x):
    try:
        int(x)
        return True
    except ValueError:
        return False
    return False

def correctDistance(distance):
    if isinstance(distance, int):
        return True
    if isinstance(distance, basestring):
        l = distance.split(" ")
        for i in l:
            if not isInt(i):
                return False
        return True
    return False

class Screen(Component):
    """ Component defining basic panel properties. Designed to be used as a 
        container for all other components.
        
        :param fullscreen: Force the component to take up 100% width and height\
         available.
        :type fullscreen: Boolean
        :param margin: Specifies the margin for this component. Can be a single\
         integer (applied to all sides) or string with 1-4 numbers (css-style)
        :type margin: Integer or String
        :param padding: Specifies the padding for this component. Can be a single\
         integer (applied to all sides) or string with 1-4 numbers (css-style)
        :type padding: Integer or String
        :param layout: Specifies the layout for this component. For more read \
            `Layout Class`_ specification
        :param ui: Predefined ui styles for component. Acceptable values are \
        ``'dark'`` and ``'light'``
        :type up: String
            
        Examples::
            
            Screen(fullscreen=True, margin=4, layout=Layout(composition=fit))
            
            Screen(fullscreen=False, padding="1 2 3")
    """
    def __init__(self, fullscreen=None, margin=None, padding=None, layout=None,
                 ui=None, alwaysReload=None, cssClass=None):
        super(Screen, self).__init__(alwaysReload=alwaysReload, 
                                     cssClass=cssClass)
        
        if fullscreen is not None :
            assert isinstance(fullscreen, bool), "fullscreen must be boolea"\
                "n type"
            self['fullscreen'] = fullscreen
        
        distanceMsg = " must be int or string with 1-4 numbers"
   
        if margin is not None :
            assert correctDistance(margin), "".join(["margin", distanceMsg])
            self['margin'] = margin

        if padding is not None :
            assert correctDistance(padding), "".join(["padding", distanceMsg])
            self['padding'] = padding
            
        if layout is not None :
            assert layout is 'auto' or isinstance(layout, Layout), "layout mus"\
                "t be 'auto' or Layout object"
            self['layout'] = layout
        
        if ui is not None:
            uiValues = ('dark', 'light')
            assert ui in uiValues, "".join(["ui must be in ", str(uiValues)])
            self['ui'] = ui
        
        self['type'] = 'Screen'