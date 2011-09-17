from pysencha.tests import *

class TestHandlerController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='handler', action='index'))
        # Test response...
