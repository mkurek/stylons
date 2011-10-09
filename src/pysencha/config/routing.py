"""Routes configuration

The more specific and detailed routes should be defined first so they
may take precedent over the more generic routes. For more information
refer to the routes manual at http://routes.groovie.org/docs/
"""
from routes import Mapper

def make_map(config):
    """Create, configure and return the routes Mapper"""
    map = Mapper(directory=config['pylons.paths']['controllers'],
                 always_scan=config['debug'])
    map.minimization = False
    map.explicit = False

    # The ErrorController route (handles 404/500 error pages); it should
    # likely stay at the top, ensuring it can always be resolved
    map.connect('/error/{action}', controller='error')
    map.connect('/error/{action}/{id}', controller='error')

    # CUSTOM ROUTES HERE
    #map.connect('/{controller}/{action}')
    #map.connect('/{controller}/{action}/{id}')
    map.connect('/menu/dishes/special/*url/shortDescription', controller='menu', action='special')
    map.connect('/menu/dishes/special/0/{id}/{size}/add', controller='menu', action='add', pizza=True)
    map.connect('/menu/dishes/special/{id}/{size}/add', controller='menu', action='add', pizza=False)
    map.connect('/menu/dishes/special/0/{id}/{size}/order', controller='menu', action='order', pizza=True)
    map.connect('/menu/dishes/special/{id}/{size}/order', controller='menu', action='order', pizza=False)
    map.connect('/menu/dishes/special/*url/buttonAdd', controller='menu', action='buttonAdd')
    map.connect('/menu/dishes/special/*url/buttonOrder', controller='menu', action='buttonOrder')
    map.connect('/form/submit', controller='form', action='submit')
    map.connect('/*url', controller='handler', action='load')
    return map
