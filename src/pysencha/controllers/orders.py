# -*- coding: utf-8 -*-

from pylons import session, tmpl_context as c
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *

class OrdersController(BaseController):
    '''Page with all orders list'''
    def shortDescription(self):
        '''Render shortDescription for orders'''
        c.orders = [ i for (i, ) in meta.Session.query(Orders.id).all() ]
        c.size = len(c.orders)
        return render('/orders/shortDescription.mako')
    
    def toolbar(self):
        '''Render toolbar with number of orders'''
        c.count = meta.Session.query(Orders).count()
        if c.count == 1 :
            c.data = u"Zamówienie"
        else :
            c.data = u"Zamówienia"
        return render('/orders/toolbar.mako') 
    
    def __uniqueCount(self, data):
        '''Uniqe and count values in 'data' list and return list of tuples'''
        # author of these 2 lines: Dave Kirby
        dataSet = set()
        unified = [ x for x in data if x not in dataSet and not dataSet.add(x)]
        
        return [ (data.count(item), item) for item in unified ]

    def __getData(self, id):
        '''Get data from database where id is Orders.id'''
        c.id = id
        client = {}
        "Get client details"
        (client[u"Imię"], client[u"Nazwisko"], client[u"Tel."],
                            client[u"Email"]) = meta.Session.query(Orders.name,
                            Orders.surname, Orders.phone, Orders.email).\
                            filter(Orders.id == id).one()
        
        "Get ordered dishes"
        dishes = meta.Session.query(Dish.name, Sizes.name, Dish_Sizes.price).\
                            join(Dish_Sizes, Sizes, Orders_Dishes).\
                            filter(Orders_Dishes.orderId == id).all()

        "Calculate total cost of order"
        cost = 0
        for (name, size, price) in dishes:
            cost += round(price,2)
        
        "Unique and count dishes"
        dishes = self.__uniqueCount( dishes )
        
        return (client, cost, dishes)
        
    def showPanel(self,id):
        '''Render panels with given Order.id'''
        id = int(id)
        (client, cost, dishes) = self.__getData(id)
        c.client = "<br>".join(['<b>%s</b>: %s' % (key, value) for (key, value) in client.items()])
        c.order = "<br>".join( [ " x ".join((str(amount), ' - '.join((name,
                                        size, str(round(price,2)))))) for (amount, (name,
                                        size, price)) in dishes ])
        c.cost = cost
        return render('/orders/panel.mako')