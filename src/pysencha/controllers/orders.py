# -*- coding: utf-8 -*-
import logging, sys, os, json

from pylons import request, response, session, tmpl_context as c, url
from pylons.controllers.util import abort, redirect
from handler import HandlerController
from dishes import DishesController
from pysencha.lib.base import BaseController, render
from pysencha.model import meta
from pysencha.model.data_base import *
from sqlalchemy import func
from sqlalchemy.orm import aliased
from cart import CartController 

class OrdersController(BaseController):
    def shortDescription(self):
        '''Render shortDescription for shortDescription'''
        orderVar = meta.Session.query(Orders).all()
        c.size = len(orderVar)
        print "jestem"
        return render('/orders/shortDescription.mako')
    
    def toolbar(self):

        orderVar = meta.Session.query(Orders).all()
        c.count = int(len(orderVar))
        if c.count == 1 :
            c.data = "Zam\u00f3wienie"
        else :
            c.data = "Zam\u00f3wienia"
        
        return render('/orders/toolbar.mako') 
    
    def __getData(self, id):
        '''Get data from database'''
        c.id = id
        orderVar = meta.Session.query(Orders.name,Orders.surname,\
                                      Orders.phone, Orders.email,\
                                      Dish.name,Sizes.name,\
                                      Dish_Sizes.price)\
                                      .join(Orders_Dishes,Dish_Sizes,\
                                      Dish,Sizes).all()
        client = ""
        orderVar = sorted(orderVar, key=lambda x : x[0])
        temp = []
        client_order = []    
        '''Generate list for each order'''   
        for i,order in enumerate(orderVar):
            #print order
            if (not client) :
                client = order[0:4]
                temp = []
            if (order[0:4] != client) :
                temp = (client, temp)
                client_order.append(temp)
                client = order[0:4]
                temp = []
            temp.append(order[4:])
            #temp.append(1)
        temp = (client, temp)
        client_order.append(temp)
        
        '''Calculate total cost of order'''
        total = 0
        if (len(client_order) >= id) :
            for i in client_order[id][-1] :
                total += i[-1]
        
        
        dish_data = sorted(client_order[id][-1], key=lambda x: (x[0], x[1])) 
        same = ""
        index = 0
        list_remover= []
        counter = 1
        
        '''Count the number of similar dishes and remove useless tuple from list'''
        for i, dish in enumerate( dish_data):
            dish = (dish[0], dish[1])
            if not same :
                same = dish
            elif (same != dish):
                same = dish
                dish_data[index]+= (counter,)
                counter = 1
                index = i
            elif (same == dish) :
                counter += 1
                list_remover.append(i)
        dish_data[index]+=(counter,)
        for i in sorted(list_remover, reverse =True) :
            dish_data.pop(i)
        
        return (client_order[id][0], total, dish_data)
        
    def showPanel(self,id):
        '''Render panels'''
        id = int(id)
        print '#########'
        (client_order,total,dish_data) = self.__getData(id)
        
        c.client = "<br>".join([str(i) for i in client_order])
        print dish_data
        
        for i,dish in enumerate(dish_data) :
            dish_data[i]= "<br>".join((dish[0],dish[1],str(round(dish[2],2)),str(dish[3])))
        
        dish_data = "<br>".join([i for i in dish_data])
        print dish_data
        #print dish_data
        c.order = dish_data
        #print c.client
        #print c.order
        c.total = total
        print '##########'
        return render('/orders/panel.mako')