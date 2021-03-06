from setuptools import setup, find_packages

setup(
    name='stylons',
    version='0.1',
    description='',
    author='',
    author_email='',
    url='',
    install_requires=[
        "PasteScript>=1.6.3",
        "Pylons>=1.0",
        "SQLAlchemy>=0.5",
        "Sphinx>=1.0"
    ],
    setup_requires=["PasteScript>=1.6.3"],
    packages=find_packages('src'),
    include_package_data=True,
    package_dir={'': 'src'},
    include_package_data=True,
    test_suite='nose.collector',
    package_data={'stylons': ['i18n/*/LC_MESSAGES/*.mo']},
    #message_extractors={'stylons': [
    #        ('**.py', 'python', None),
    #        ('templates/**.mako', 'mako', {'input_encoding': 'utf-8'}),
    #        ('public/**', 'ignore', None)]},
    zip_safe=False,
    paster_plugins=['PasteScript', 'Pylons'],
    entry_points="""
    [paste.app_factory]
    main = stylons.config.middleware:make_app

    [paste.app_install]
    main = pylons.util:PylonsInstaller
    """,
)
