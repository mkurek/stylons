from types import *
from stylons.stitems import *

class Tabbar(dict):
    """ Sencha Touch Tabbar component.
        One of the main Sencha Touch Component, which
        makes the website more easy and user friendly.
            
        :param dock: Configure the component location. Acteptables value:
        
            * ``"top"``
            * ``"bottom"``
            * ``"left"``
            * ``"right"``
            
        :type text: String
        :param ui: user interface description. Must be on of:
            
            * ``"dark"``
            * ``"light"``
        
        :type ui: String
        :param tabsList: Tabs list that defines the elements of Tabbar
        :type tabsList: List
        
        
        Examples:: 
        
            Tabbar(dock="bottom", ui="dark", tabsList = (firstTabObject,
            secondTabObject));
        """
    
    def __init__(self, dock=None, ui=None, tabsList=None):
        
        if dock is not None:
            assert dock in ('top', 'bottom', 'left', 'right'), "dock must be "\
                            "in ('top, 'bottom', 'left', 'right')"
            self['dock'] = dock
        if ui is not None:
            assert ui in ('dark', 'ligth'), "ui must be in ('dark', 'light')"
            self['ui'] = ui
        if tabsList is not None:
            assert isinstance(tabsList, list), 'tabsList must be list type'
        for i in tabsList:
            assert isinstance(i, Tab), "all elements of tabsList must be Tab "\
                            "type"
            self['list'] = tabsList

        self['type'] = 'TabBar'
