# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render

class MainController(BaseController):
    def tabbar(self, tab):
        c.tab = tab
        # do usunięcia:
        session['cart'] = [1,4,6,2,9,13,12]
        session.save()
        
        if 'cart' in session and session['cart']:
            c.badge = len(session['cart'])
        return render('/tabbar.mako')