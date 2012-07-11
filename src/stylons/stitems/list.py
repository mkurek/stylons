from action import Action
from component import Component

class List(Component):
    """Sencha Touch List component.
        Component displaying data items as list and enabling events.
        
        :param itemTpl: define how to format data (look at examples)
        :type itemTpl: String
        :param items: list of all items
        :type items: List of Dictionaries
        :param emptyText: html with message if items is empty
        :type emptyText: String
        :param fullscreen: set component to fullscreen (even over its container)
        :type fullscreen: Boolean
        :param events: define actions for lists events. Available:
        
            * ``"itemtap"`` - called when item was tapped
            * ``"itemdoubletap"`` - called when item was double tapped
            * ``"itemswap"`` - called when item was swapped
            
            For each event you can use '{index}' in Action declaration.
            It will be replaced by dispatcher with index, which was source
            of event.
        :type events: Dictionary
        
        Examples::
        
            List(itemTpl = "{name} {surname}",
                 items = [{ "name" : "John",
                            "surname" : "Smith" },
                          { "name" : "Jimmy",
                            "surname" : "Wallet" },
                          { "name" : "Jack",
                            "surname" : "Willis" }])
                           
            
            date1 = dict()
            date1['day'] = 5
            date1['month'] = 08
            date1['year'] = 1955
            
            date2 = dict(day=12, month=5, year=1820)
            
            List(itemTpl = "{day}-{month}-{year}",
                 items = [ date1, date2 ])
    """
    def __init__(self, itemTpl = None, items = None, emptyText = None,
                 fullscreen = None, events=None):
        
        if itemTpl is not None:
            assert isinstance(itemTpl, basestring),"itemTpl must be an instanc"\
                                                   "e of str or unicode,e.g. "\
                                                   "'{name}, {surname}'"
            self['itemtpl'] = itemTpl
        if items is not None:
            assert isinstance(items, list), "items must be list type"
            for i in items:
                assert isinstance(i, dict), "each element in items must be dict"
            self['list'] = items
        if emptyText is not None:
            assert isinstance(emptyText, basestring), "emptyText must be an i"\
                                                        "nstance of str or un"\
                                                        "icode"
            self['emptyText'] = emptyText
        if fullscreen is not None:
            assert isinstance(fullscreen, bool), "fullscreen must be boolean"
            self['fullscreen'] = fullscreen
           
        if events is not None:
            assert isinstance(events, dict), "event must be a dict"
            for k in events.keys():
                if not isinstance(events[k], list):
                    events[k] = [events[k]]
            for l in events.values():
                for v in l: 
                    assert isinstance(v, Action), "event description must be"\
                                                    " an instance of an Action"
            self['action'] = events 
            
        self['type'] = 'List'