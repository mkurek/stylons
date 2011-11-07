#! -*- coding: utf-8 -*-
try:
    from setuptools import setup, find_packages
except ImportError:
    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages

setup(
    name='pysencha',
    version='0.0.4',
    description='',
    author='Mateusz Dembski, Jakub Kedzierski, Mateusz Kurek',
    author_email='',
    url='',
    install_requires=[
        "nose",
        "markupsafe",
        "PasteScript",
        "Pylons",
        "SQLAlchemy",
	"pysqlite",
        "FormAlchemy"
    ],
    setup_requires=["PasteScript>=1.6.3"],
    packages=find_packages(exclude=['ez_setup']),
    include_package_data=True,
    test_suite='nose.collector',
    package_data={'pysencha': ['i18n/*/LC_MESSAGES/*.mo']},
    #message_extractors={'pysencha': [
    #        ('**.py', 'python', None),
    #        ('templates/**.mako', 'mako', {'input_encoding': 'utf-8'}),
    #        ('public/**', 'ignore', None)]},
    zip_safe=False,
    paster_plugins=['PasteScript', 'Pylons'],
    entry_points="""
    [paste.app_factory]
    main = pysencha.config.middleware:make_app

    [paste.app_install]
    main = pylons.util:PylonsInstaller
    """,
)
