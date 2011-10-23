import sqlalchemy as sa
from sqlalchemy import orm

from pysencha.model import meta

t_dish = sa.Table("dish", meta.metadata,
                   sa.Column("id", sa.types.Integer, primary_key=True),
                   sa.Column("name", sa.types.String, nullable=False),
                   sa.Column("picture", sa.types.String, nullable=False),
                   sa.Column("description", sa.types.Text, nullable=False)
    )

t_ingredients = sa.Table("ingredients", meta.metadata,
                   sa.Column("id", sa.types.Integer, primary_key=True),
                   sa.Column("name", sa.types.String, nullable=False)
    )

t_dish_ingredients = sa.Table("dish_ingredients", meta.metadata,
                   sa.Column("id", sa.types.Integer, primary_key=True),
                   sa.Column("idDish", sa.types.Integer, sa.ForeignKey('dish.id')),
                   sa.Column("idIngredients", sa.types.String, sa.ForeignKey('ingredients.id'))
    )

t_sizes = sa.Table("sizes", meta.metadata,
                   sa.Column("id", sa.types.Integer, primary_key =True),
                   sa.Column("name", sa.types.String, nullable=False)
    )

t_groups = sa.Table("groups", meta.metadata,
                   sa.Column("id", sa.types.Integer, primary_key =True),
                   sa.Column("name", sa.types.String, nullable=False)
    )

t_dish_sizes = sa.Table("dish_sizes", meta.metadata,
                    sa.Column("id", sa.types.Integer, primary_key=True),
                    sa.Column("sizeId", sa.types.Integer, sa.ForeignKey('sizes.id')),
                    sa.Column("dishId", sa.types.Integer, sa.ForeignKey('dish.id')),
                    sa.Column("price", sa.types.Integer, nullable=False)
    )

t_menu = sa.Table("menu", meta.metadata,
                  sa.Column("id", sa.types.Integer, primary_key = True),
                  sa.Column("parentGroup", sa.types.Integer, sa.ForeignKey('groups.id')),
                  sa.Column("childGroup", sa.types.Integer, sa.ForeignKey('groups.id'))
    )

t_menu_leaves = sa.Table("menu_leaves", meta.metadata,
                  sa.Column("id", sa.types.Integer, primary_key = True),
                  sa.Column("groupId",sa.types.Integer, sa.ForeignKey('groups.id')),
                  sa.Column("dishId", sa.types.Integer, sa.ForeignKey('dish.id'))
    )

t_orders = sa.Table("orders", meta.metadata,
                    sa.Column("id", sa.types.Integer, primary_key = True),
                    sa.Column("name", sa.types.String, nullable = False),
                    sa.Column("surname", sa.types.String, nullable = False),
                    sa.Column("city", sa.types.String, nullable = False),
                    sa.Column("street", sa.types.String, nullable = False),
                    sa.Column("homeNumber", sa.types.String, nullable = False),
                    sa.Column("apartmentNumber", sa.types.String, nullable = True),
                    sa.Column("email", sa.types.String, nullable = False),
                    sa.Column("phone", sa.types.Integer, nullable = False)
    )

t_orders_dishes = sa.Table("orders_dishes", meta.metadata,
                    sa.Column("id", sa.types.Integer, primary_key = True),
                    sa.Column("orderId", sa.types.Integer, sa.ForeignKey('orders.id')),
                    sa.Column("dishId", sa.types.Integer, sa.ForeignKey('dish_sizes.id'))
    )

t_fields = sa.Table("fields", meta.metadata,
                    sa.Column("id", sa.types.Integer, primary_key = True),
                    sa.Column("type", sa.types.String, nullable = False),
                    sa.Column("label", sa.types.String, nullable = False),
                    sa.Column("required", sa.types.Integer, nullable = False),
                    sa.Column("name", sa.types.String, nullable = False)
    )

t_fieldsets = sa.Table("fieldsets", meta.metadata,
                    sa.Column("id", sa.types.Integer, primary_key = True),
                    sa.Column("groupName", sa.types.String, nullable = False),
                    sa.Column("title", sa.types.String, nullable = False)
    )

t_fields_fieldsets = sa.Table("fields_fieldsets", meta.metadata,
                    sa.Column("id", sa.types.Integer, primary_key = True),
                    sa.Column("fieldId", sa.types.Integer, sa.ForeignKey('fields.id')),
                    sa.Column("fieldsetId", sa.types.Integer, sa.ForeignKey('fieldsets.id'))
    )

class Dish(object):
    pass

class Ingredients(object):
    pass

class Dish_Ingredients(object):
    pass

class Sizes(object):
    pass

class Group(object):
    pass

class Dish_Sizes(object):
    pass

class Menu(object):
    pass

class Menu_Leaves(object):
    pass

class Orders(object):
    pass

class Orders_Dishes(object):
    pass

class Fields(object):
    pass

class Fieldsets(object):
    pass

class Fields_Fieldsets(object):
    pass

orm.mapper(Dish_Sizes, t_dish_sizes)
orm.mapper(Menu_Leaves, t_menu_leaves)
orm.mapper(Menu, t_menu)
orm.mapper(Group, t_groups)
orm.mapper(Dish, t_dish)
orm.mapper(Ingredients, t_ingredients)
orm.mapper(Dish_Ingredients, t_dish_ingredients)
orm.mapper(Sizes, t_sizes)
orm.mapper(Orders, t_orders)
orm.mapper(Orders_Dishes, t_orders_dishes)
orm.mapper(Fields, t_fields)
orm.mapper(Fieldsets, t_fieldsets)
orm.mapper(Fields_Fieldsets, t_fields_fieldsets)

"""orm.mapper(Dish_Sizes, t_dish_sizes)
orm.mapper(Menu_Leafs, t_menu_leafs)
orm.mapper(Menu, t_menu)
orm.mapper(Group, t_groups, properties = {
'menu' : orm.relation(Menu, secondary = t_menu),
'menu_Leafs' : orm.relation(Menu_Leafs, secondary = t_menu_leafs),                                          
})
orm.mapper(Dish, t_dish, properties = {
'dish_ingredients' : orm.relation(Dish_Ingredients, secondary = t_dish_ingredients),
'dish_sizes' : orm.relation(Dish_Sizes, secondary = t_dish_sizes),
'menu_leafs' : orm.relation(Menu_Leafs, secondary = t_menu_leafs),
})
orm.mapper(Ingredients, t_ingredients, properties = {
'dish_ingredients' : orm.relation(Dish_Ingredients, secondary = t_dish_ingredients)                                                     
})
orm.mapper(Dish_Ingredients, t_dish_ingredients)
orm.mapper(Sizes, t_sizes, properties = {
'dish_sizes' : orm.relation(Dish_Sizes, secondary = t_dish_sizes)                                         
})"""