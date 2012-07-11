from types import *
from stylons.stitems import *

class Tab(Button):
    """ Tab Component.
        Defines elements in TabBar Component
        
        :param active: True to make tab active 
        :type active: Boolean=
        
        
        Examples:: 
        
            Tab(ui="confirm", text="SomeOtherButton", badge="5", active=true,
                events={"tap" : Action(action="send", dataId="form",
                url="form/send"})
        """
    
    def __init__(self, ui=None, text=None, icon=None, badge=None, flex=None,
                    active = None, events=None, alwaysReload=None, cssClass=None):
        super(Tab, self).__init__(ui, text, icon, badge, flex, events=events, alwaysReload=alwaysReload, cssClass=cssClass)
        self['type'] = 'Tab'
        if active is not None:
            assert isinstance(active, bool), 'active must be boolean type'
            self['active'] = active
