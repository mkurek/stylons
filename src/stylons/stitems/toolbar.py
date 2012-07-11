from types import *
from stylons.stitems import *

class Toolbar(dict):
    def __init__(self, title = None, ui = None, margin = None, padding = None,
                 dock = None):
        self['type'] = 'Toolbar'
        if title is not None:
            assert type(title) is StringType, 'title must be string'
            self['title'] = title
        if ui is not None:
            assert ui in ('dark', 'light'), "ui must be in ('dark', 'light')"
            self['ui'] = ui
        if margin is not None:
            assert type(margin) is IntType, 'margin must be an integer'
            self['margin'] = margin
        if padding is not None:
            assert type(padding) is IntType, 'padding must be integer'
            self['padding'] = padding
        if dock is not None:
            assert dock in ('top', 'bottom', 'left', 'right'), "dock must be "\
                            "in ('top, 'bottom', 'left', 'right')"
            self['dock'] = dock
