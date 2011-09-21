import logging, sys, os

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from pysencha.lib.base import BaseController, render

log = logging.getLogger(__name__)

class HandlerController(BaseController):
    def load(self, url):
        # Return a rendered template
        #return render('/handler.mako')
        # or, return a response
        print "Tutaj : " + url
        pathname = os.path.dirname(os.path.dirname(sys.argv[0]))
        f = open(str(pathname+'/src/pysencha/'+url))
        plik  = f.read()
        f.close()
        return plik
