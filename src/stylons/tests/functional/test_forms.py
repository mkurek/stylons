from stylons.tests import *

class TestFormsController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='forms', action='index'))
        # Test response...
