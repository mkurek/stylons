# -*- coding: utf8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from pysencha.lib.base import BaseController, render

log = logging.getLogger(__name__)

class FormController(BaseController):
    def submit(self):
        # Return a rendered template
        #return render('/handler.mako')
        # or, return a response
        #print json.loads(request.params)
        print 'odebrałem:'
        print request.POST['data']
        # primitive return without checking POST data
        x = '{"type" : "load","url" : "form/end/shortDescription"}'
        
        return x