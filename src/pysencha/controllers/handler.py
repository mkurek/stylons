import logging, sys, os
from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model import data_base
from pysencha.model.data_base import *
from pysencha.model.data_base import Dish 

log = logging.getLogger(__name__)
testpath = 'testy/refapp/'

class HandlerController(BaseController):
    """
    Handler
    
    Return static files in response to ajax request (POST).
    """
    def load(self, url):
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, testpath, url)
        f = open(path, 'r')
        plik  = f.read()
        dish = Dish()
        dish.name = "Zupe_pomidorowa"
        Session().add(dish)
        Session().commit()
        all_dishes = meta.Session.query.filter(Dish.name=='Zupe_pomidorowa').all()
        for i in all_dishes:
            print "{0}".format(i)
        
        f.close()
        return plik