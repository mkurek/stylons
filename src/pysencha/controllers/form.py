import logging, sys, os

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from pysencha.lib.base import BaseController, render

log = logging.getLogger(__name__)

class FormController(BaseController):
    def submit(self):
        # Return a rendered template
        #return render('/handler.mako')
        # or, return a response
        print "Form submit "
        # primitive return without checking POST data
        x = '{"type" : "load","url" : "menu/shortDescription"}'
        
        return x