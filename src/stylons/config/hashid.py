from hashlib import md5

def hashId(obj):
    return md5(str(obj)).hexdigest()[:10]