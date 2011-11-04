#! -*- coding: utf-8 -*-
import os
from pysencha.lib.base import BaseController

testpath = 'testy/static/'

class HandlerController(BaseController):
    """
    Handler
    
    Return static files in response to ajax request (POST).
    """
    def load(self, url):
        '''Open, read and return file %SERVERPATH%/{testpath}/{url}'''
        serverpath = os.path.dirname(os.path.dirname(__file__))
        path = os.path.join(serverpath, testpath, url)
        try:
            f = open(path, 'r')
            plik  = f.read()
            f.close()
        except:
            plik = ''
        return plik