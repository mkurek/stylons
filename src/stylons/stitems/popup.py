from screen import Screen
from ui import Ui

class Popup(Screen):
    """ Popup component. Provides a possibility to create whole structure of po\
        pup, like normal page.
        
        :param width: The width of this component in pixels.
        :type width: Integer
        :param height: The height of this component in pixels.
        :type height: Integer
        :param centered: Center the component on the page. Defaults to true
        :type centered: Boolean
        :param modal: True to make the Component modal and mask everything behi\
        nd it when displayed, false to display it without restricting access to\
         other UI elements (defaults to false).
        :type modal: Boolean
        
        Examples::
        
            Popup(width=200, height=100, modal=False, ui="light")
    
    """
    def __init__(self, fullscreen=None, layout=None, margin=None,padding=None, 
                 width=None, height=None, centered=None, modal=None, ui=None, 
                 alwaysReload=None, cssClass=None):
       super(Popup, self).__init__(fullscreen=fullscreen, margin=margin,
                                    padding=padding, layout=layout, ui=ui,
                                    alwaysReload=alwaysReload,
                                    cssClass=cssClass)

       if width is not None :
           assert isinstance(width, int), 'width must be an int'
           self['width'] = width

       if height is not None :
           assert isinstance(height, int), 'height must be an int'
           self['height'] = height

       if centered is not None :
           assert isinstance(centered, bool), 'centered must be boolean'
           self['centered'] = centered

       if modal is not None :
           assert isinstance(modal, bool), 'modal must be boolean'
           self['modal'] = modal

       self['type'] = 'SpecialPanel'
