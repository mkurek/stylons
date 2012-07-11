class Layout(dict):
    """Sencha Touch Layout.
        Describe composition, align and pack of content.
        Layout is used for screen instances.
        Params align and pack are available only for "vbox" and "hbox".
        
        :param composition: define composition of elements, you can use:
        
            * ``"auto"`` - Sencha Touch will choose automatically
            * ``"fit"`` - for one element, fit to all screen
            * ``"vbox"`` - arrange elements vertically down container
            * ``"hbox"`` -arranges items horizontally across container
        :type composition: String
        :param align: dpecifies the alignment of elements, available aligns:
        
            * ``"center"`` - aligned to the center of container
            * ``"end"`` - aligned to the end of container (right or bottom)
            * ``"start"`` - aligned to the start of container (left or top)
            * ``"stretch"`` - elements are stretched through container
        :type align: String
        :param pack: also specifies the alignment of elements, available:
        
            * ``"center"`` - aligned to the center of the container.
            * ``"end"`` - aligned to the right of the container.
            * ``"justify"`` - justified with left and right of the container.
            * ``"start"`` - aligned to the left of the container.
        :type pack: String
        
        Example::
        
            Layout(composition = "vbox", align = "start", pack = "justify")
    """
    def __init__(self, composition = None, align = None, pack = None):
        if composition is not None:
            assert composition in ('auto', 'fit', 'hbox', 'vbox'),\
                            "composition must be in ('auto', 'fit', "\
                            "'hbox', 'vbox')"
            self['type'] = composition
        if align is not None:
            assert align in ('center', 'end', 'start', 'stretched'), "align m"\
                                "ust be in ('center', 'end', 'start', 'stretc"\
                                "hed)"
            self['align'] = align
        if pack is not None:
            assert pack in ('center', 'end', 'justify', 'start'), "pack must "\
                                "be in ('center', 'end', 'justify', 'start')"
            self['pack'] = pack
