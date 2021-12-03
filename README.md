# edenonline
A proyect about an Web App to help Eden Bar &amp; Lounge to modernize it's restaurant


The proyect itself consists in a local order control, the order could contain a drink or a saucer, so, in Eden Bar & Lounge
has a chef and a barman, the chef prepare the food and the barman the drinks, so they have to watch their respective product
to make it. The waiter can capture local orders by table of the establishment and add products to all orders, all of this handled by a
integrated in rest API. When the order is ready, the waiter can send the order to the chef and barman, the chef will only see the food
to prepare, while the barman can only see the drinks. All of this stuff is in realtime, when the waiter send the order. Pop up's to the barman and 
chef a notificacion, and the order render in the view automaticaly. As well, when the chef o barman mark an order has finished, a notification
advise all the waiters to pick up that element of the order. Finally, when the customers require his accont, the waiter can send the order
to check to the cashier.

And, the proyect itself counts with a product inventory management, a sales control, a users control, and the customers of the place can register
with an email and add orders to his car, the user can delete products of his car, add more products, and finaly, confirm the order and wait for a notification when their order is about to deliver.
# Modules made with API and pure Javascript
Some of the modules like, the admin sales control, inventory managemente, sales control, and users control are made with server side rendering, meanwhile, the modules
of the waiter, barman, chef, and customer (client), are made with pure Javascript, feeded with diferents API's for diferents purposes, and for increase user experience while working on this app.
# Realtime
To get the realtime working in our, we used Socket.io, a node js library for web sockets communication. 
