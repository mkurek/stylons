from stylons.tests import *

class TestTimerController(TestController):

    def test_index(self):
        response = self.app.get(url(controller='timer', action='index'))
        # Test response...
