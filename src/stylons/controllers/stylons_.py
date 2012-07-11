import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from stylons.lib.base import BaseController, render

log = logging.getLogger(__name__)

class StylonsController(BaseController):

    def index(self):
        # Return a rendered template
        #return render('/stylons_.mako')
        # or, return a string
        return 'Hello World'

    def config(self):
        configuration = {
                        'configURL' : "stylons_/config",
                        'defaultURL' : "/list/index/-1",
                        'defaultScreenID' : "Screen"
                     }
        return configuration