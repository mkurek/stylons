def evaluate(description):
    """Make short description from description and check correctness"""
    assert isinstance(description, (basestring, tuple)), "parameter must be a "\
                                                        "tuple or string"

    if isinstance(description, tuple):
            assert len(description) == 2 and isinstance(description[0],
                                        basestring) and\
                                        isinstance(description[1], list),\
                                        "parameter must be (String, List)"
            url, slots = description # unpack
    else:
        url, slots = description, []
    result = {'url': url, 'slots': []} # make dict
    for item in slots:
        result['slots'].append(evaluate(item)) # reqursive evaluate its children
    return result

class ShortDescription(dict):
    """Short description define pages elements composition.
        The main component is always screen and it contains each other element
        directly or not. In short description user define hierarchy of elements
        in page. First level of short description is pair (url, slots), where
        url is address of screen component and slots is a list of children's
        descriptions. Children's descriptions has the same structure as first
        description, so short description is a tree representation.
        
        Examples::
            
            ShortDescription( 
                                ( "menu/index",
                                    [
                                     ( "menu/toolbar" , []),
                                     ( "menu/bottom" , 
                                             [
                                              ( "menu/firstpanel" , []),
                                              ( "menu/secondpanel" , [])
                                             ]
                                     )
                                    ]
                                )
                            )
    
    """
    def __init__(self, description):
        assert isinstance(description, (basestring, tuple)), "description mus"\
                            "t be tuple: (url, slots) or string: url, e.g.: ("\
                            "'demo/index', [desc2, desc3])"
        super(ShortDescription, self).__init__(evaluate(description))
