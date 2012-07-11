from stylons.tests import *

class TestStylonsController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='stylons_', action='index'))
        # Test response...
