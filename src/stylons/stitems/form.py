from panel import Panel

class Form(Panel):
    """ Sencha Touch Panel component. Form do not have any behavior apart from \
        containing all fields and fieldsets and returning theirs values.
    
        :param itemsList: List of items (fields and fieldsets).
        :type itemsList: List
        
        .. warning::
            Never use itemsList and Form hierarchy in short description at the \
            same time - if You do this, only itemsList will have affect.
        
    """
    def __init__(self, html=None, fullscreen=None, margin=None, padding=None, 
                 scroll=None, layout=None, ui=None, htmlStyle=None, 
                 cssClass=None, alwaysReload=None,  itemsList=None):
        super(Form, self).__init__(html=html, fullscreen=fullscreen, 
                                   margin=margin, padding=padding,  ui=ui,
                                   scroll=scroll, layout=layout, 
                                   htmlStyle=htmlStyle, 
                                   alwaysReload=alwaysReload, 
                                   cssClass=cssClass)
        
        if itemsList is not None:
            assert isinstance(itemsList, list), "itemsList must be a list"
            self['list'] = itemsList

        self['type'] = 'Form'