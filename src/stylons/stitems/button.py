from component import Component
from action import Action


class Button(Component):
    """ Sencha Touch Button component.
        Defines primary button appearance and events.
            
        :param ui: user interface description. Should be a combination of:
            
            * ``"normal"``
            * ``"back"``
            * ``"round"``
            * ``"forward"``
            * ``"action"``
            * ``"confirm"``
            * ``"decline"``
                
            and 
                
            * ``""``
            * ``"small"``
            * ``"round"``
        
        :type ui: String
        :param text: text displayed on the button
        :type text: String
        :param icon: icon of the button
        :type icon: String
        :param badge: badge (little icon on top) of the button
        :type badge: String
        :param flex: TO DO
        :type flex: Integer
        :param disabled: True to make button disabled 
        :type disabled: Boolean
        :param events: dictionary (of lists) of Action instances. 
        :type events: Dictionary
        
        
        Examples:: 
        
            Button( ui = "normal-round", 
                    text = "SomeButton", 
                    events = {
                        "tap":[
                            Action(action = "popupHide"), 
                            Action(action = "load", url = "con/act")
                        ]
                    }
            )
            
            Button( ui = "confirm", 
                    text = "SomeOtherButton", 
                    badge = "5",
                    events = {
                        "tap" : Action(action = "send", dataId = "form", url = "u/r/l"
                    }
            )
        """

    def __init__(self, ui=None, text=None, icon=None, badge=None, flex=None,
                 events=None, disabled=None, alwaysReload=None, cssClass=None):

        super(Button, self).__init__(alwaysReload=alwaysReload,
                                     cssClass=cssClass)

        if ui is not None:
            pre = post = ''
            prefixes = ('normal', 'back', 'round', 'forward', 'action',
                        'confirm', 'decline')
            postfixes = ('', 'round', 'small')
            position = ui.find('-')
            if position != -1:
                pre = ui[:position]
                post = ui[position + 1:]
            else:
                pre = ui
                post = ''
            assert pre in prefixes and post in postfixes, "".join(["ui have to"\
                "be string and combination of ", prefixes, " and ", postfixes,
                " separeted by -"])

            self['ui'] = ui

        if text is not None:
            assert isinstance(text, basestring), 'text have to be a string'
            self['text'] = text

        if icon is not None:
            assert isinstance(icon, basestring), 'icon have to be a string'
            self['icon'] = icon

        if badge is not None:
            assert isinstance(badge, basestring), 'badge have to be a string'
            self['badge'] = badge

        if flex is not None:
            assert isinstance(flex, int) or flex is '', 'flex must be an integ'\
                                                        'er'
            self['flex'] = flex

        if disabled is not None:
            assert isinstance(disabled, bool), 'disabled must be a Boolean'
            self['disabled'] = disabled

        if events is not None:
            assert isinstance(events, dict), "event must be a dict"
            for k in events.keys():
                if not isinstance(events[k], list):
                    events[k] = [events[k]]
            for l in events.values():
                for v in l:
                    assert isinstance(v, Action), "event description must be "\
                                                    "instance of an Action"
            self['action'] = events

        self['type'] = 'Button'
