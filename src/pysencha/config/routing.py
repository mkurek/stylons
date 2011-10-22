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
    map.connect('/menu/{action}/{id}', controller = 'menu')
    map.connect('/menu/{action}/{group}/{id}', controller = 'menu')
    map.connect('/dishes/{action}/{group}/{id}', controller = 'dishes')
    map.connect('/dishes/{action}/{id}', controller = 'dishes')
    map.connect('/confirm/{action}/{id}', controller = 'confirm')
    #map.connect('/menu/list', controller='menu', action='list', id=1)
    map.connect('/{tab}/tabbar', controller='main', action='tabbar')
    map.connect('/form/{action}', controller='form')
    map.connect('/form/{action}/{id}', controller='form')
    map.connect('/form/{action}/{group}/{id}', controller='form')
    map.connect('/cart/{action}', controller='cart')
    map.connect('/change/{action}/{id}', controller='change')
    map.connect('/change/{action}/{group}/{id}', controller='change')
    map.connect('/*url', controller='handler', action='load')
    return map
