
class Ui:
    uiPrefixes = ('normal', 'back', 'round', 'forward', 'action', 'confirm', 
              'decline')
    uiSuffixes = ('', 'round', 'small')

    @classmethod
    def isUi(cls, ui):
        pre = post = ''
        position = ui.find('-')
        if position != -1:
            pre = ui[:position]
            post = ui[position + 1:]
        else:
            pre = ui
            post = ''
        return pre in cls.uiPrefixes and post in cls.uiSuffixes
    