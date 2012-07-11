from stylons.tests import *

class TestGetcomponentsController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='getComponents', action='index'))
        # Test response...
