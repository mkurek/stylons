from stylons.tests import *

class TestButtonsController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='buttons', action='index'))
        # Test response...
