class Spacer(dict):
    """Sencha Touch Spacer component.
        Useful in components containing buttons to separate them.
        Will take up a flex of 1 unless a width is set.
    """
    def __init__(self):
        self['type'] = 'Spacer'