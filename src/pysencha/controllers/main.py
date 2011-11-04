# -*- coding: utf-8 -*-

from pylons import session, tmpl_context as c
from pysencha.lib.base import BaseController, render

class MainController(BaseController):
    '''The only method of this controller render tabbar'''
    def tabbar(self, tab):
        '''Make tabbar with highlighted @tab icon'''
        c.tab = tab        
        if 'cart' in session and session['cart']:
            c.badge = len(session['cart'])
        else:
            c.badge = 0
        return render('/tabbar.mako')