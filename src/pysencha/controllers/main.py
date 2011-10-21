# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from pysencha.lib.base import BaseController, render

class MainController(BaseController):
    def tabbar(self, tab):
        c.tab = tab        
        if 'cart' in session and session['cart']:
            c.badge = len(session['cart'])
        else:
            c.badge = 0
        return render('/tabbar.mako')