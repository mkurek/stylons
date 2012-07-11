from panel import Panel

class ErrorField(Panel):
    """ Predefined panel to be shown as a error message in form.
        Default custom CSS class is invalid-field.
    """
    def __init__(self, html=None, fullscreen=None, margin=None, padding=None, 
                 scroll=None, layout=None, ui=None, htmlStyle=None, 
                 alwaysReload=None, cssClass=None):
        super(ErrorField, self).__init__(fullscreen=fullscreen, margin=margin,
                                     padding=padding, layout=layout, html=html,
                                     scroll=scroll, ui=ui, htmlStyle=htmlStyle,
                                     alwaysReload=alwaysReload, 
                                     cssClass=cssClass)

        self['type'] = 'ErrorField'
