from component import Component

class Fieldset(Component):
    """ Sencha Touch Fieldset component. Can contain fields as items. FieldSets\
     do not add any behavior, other than an optional title, and are just used t\
     o group similar fields together.
     
     :param title: Fieldset title, rendered above grouped fields
     :type title: String
     :param instructions: Fieldset instructions, rendered below grouped fields
     :type instructions: String
    
    """
    def __init__(self, title=None, instructions=None, alwaysReload=None, 
                 cssClass=None):
        super(Fieldset, self).__init__(alwaysReload=alwaysReload, 
                                       cssClass=cssClass)
        
        if title is not None:
            assert isinstance(title, basestring), 'title must be a string'
            self['title'] = title
        
        if instructions is not None:
            assert isinstance(instructions, basestring), 'instructions must be'\
                                                        ' a string'
            self['instructions'] = instructions
            
        self['type'] = 'Fieldset'