from screen import Screen

class Panel(Screen):
    """ Sencha Touch Panel Component
        One of the main Sencha Touch components.
        
        :param html: HTML code to insert into panel
        :type html: String
        :param scroll: Configure the component to be scrollable. Acceptable values are:

            * ``'horizontal'``
            * ``'vertical'``
            * ``'both'``
            * ``False`` to explicitly disable scrolling.
        
    """
    def __init__(self, html = None, fullscreen = None, margin = None,
                 padding = None, scroll = None, layout = None, ui=None, 
                 htmlStyle=None, alwaysReload=None, cssClass=None):
        super(Panel, self).__init__(fullscreen=fullscreen, margin=margin,
                                     padding=padding, layout=layout, ui=ui,
                                     alwaysReload=alwaysReload, 
                                     cssClass=cssClass)
        
        if html is not None:
            assert isinstance(html, basestring), 'html must be string'
            self['html'] = html
        
        if scroll is not None:
            scrollValues = ('vertical', 'horizontal', 'both', False)
            assert scroll in scrollValues , "".join(["scroll must be in ", 
                                                     str(scrollValues)])
            self['scroll'] = scroll
            
        if htmlStyle is not None:
            assert isinstance(htmlStyle, bool), "htmlStyle must be a boolean"
            self['styleHtmlContent']=htmlStyle
        
        self['type'] = 'Panel'