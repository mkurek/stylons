import logging, sys, os

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from pysencha.lib.base import BaseController, render

log = logging.getLogger(__name__)
testpath = 'testy/refapp/'

class HandlerController(BaseController):
    def load(self, url):
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, testpath, url)
        f = open(path, 'r')
        plik  = f.read()
        f.close()
        return plik