import logging

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from time import time, localtime, strftime

from stylons.lib.base import BaseController, render
from stylons.stitems import ShortDescription, Panel, Toolbar, Button, Spacer, \
    Layout, Action
log = logging.getLogger(__name__)

class TimerController(BaseController):

    def index(self):
        if not 'times' in session:
            session['times'] = []
            session.save()
        length = str(len(session['times']))
        panels = [('timer/times/%f' % (k,), []) for k in session['times']]
        return ShortDescription(('main/screen', [
                                        ('timer/panel', [
                                               ('timer/toolbar', [
                                                    'timer/buttonAdd/'+length,
                                                    'timer/spacer',
                                                    'timer/buttonClear'
                                               ]),
                                               ('timer/timepanel', panels)
                                        ]),
                                        'main/tabbar/4',
                                ]))
    
    def timepanel(self):
        return Panel(layout = Layout(composition='auto'), scroll = 'vertical')
    
    def times(self, id):
        cont = strftime("%a, %d %b %Y %H:%M:%S", localtime(float(id)))
        return Panel(html=cont, fullscreen = False, margin = 10)
    
    def panel(self):
        return Panel(layout = Layout(composition = 'fit'))
    
    def toolbar(self):
        return Toolbar(title='Timer')
    
    def add(self, id):
        if not 'times' in session:
            session['times'] = [time()]
        else:
            session['times'].append(time())
        session.save()
        return self.index()
        
    def clear(self):
        if 'times' in session:
            del session['times']
        session.save()
        return self.index()
        
    def buttonAdd(self, id):
        return Button(text='Add', ui='forward',
                      events={"tap" : Action(action="load",
                                             url=str('timer/add/'+id))})
    
    def buttonClear(self):
        return Button(text='Clear', ui='action',
                      events={"tap" : Action(action="load", url='timer/clear')})
    
    def spacer(self):
        return Spacer()