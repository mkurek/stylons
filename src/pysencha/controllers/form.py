# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect

from pysencha.lib.base import BaseController, render

class FormController(BaseController):
    def submit(self):
        # primitive return without checking POST data
        x = '{"type" : "load","url" : "form/end/shortDescription"}'
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, 'testy/refapp/form/end/data')
        data = json.loads(request.POST['data'], 'utf-8')
        f = open(path, 'w')
        dataStr = '{"id" : "dataEnd'+'", "styleHtmlContent" : "true", \
        "html" : "<h3>Odebrałem:</h3>'+'<br/>'.join(['%s: %s' % (k.encode('utf-8'), 
                            v.encode('utf-8')) for (k, v) in data.items()])+'"}'
        f.write(dataStr)
        f.close()
        return x