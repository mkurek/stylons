class Action(dict):
    """ Action component
        Defines actions performed i.e. after click on the button, click on the
        list and so on
         
        :param action: action to be executed. Proper values are:
            
            * ``"load"``
            * ``"send"``
            * ``"popupShow"``
            * ``"popupHide"``
            * ``"clear"``
            
        :type action: String
        :param url: URL to load/send data
        :type url: String
        :param target: url of component, which this action affect. This
            parameter is useful for load action - set as form url, and for clear
            action - form url also.
        :type target: String         
    """
    def __init__(self, action=None, url=None, target=None):
        if action is not None:
            assert isinstance(action, basestring), 'action must be an instanc'\
                                                    'e of str or unicode'
            self['type'] = action
        else:
            assert action is None, 'action cannot be None!'

        if url is not None:
            assert isinstance(url, basestring), 'url must be an instance of '\
                                                'str or unicode'
            self['url'] = url

        if target is not None:
            assert isinstance(target, basestring), 'target must be an instanc'\
                                                    'e of str or unicode'
            self['target'] = target