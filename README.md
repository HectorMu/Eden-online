# Eden online
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
of the waiter, barman, chef, and customer (client), are made with pure Javascript, feeded with diferents API's for diferents purposes, and some socket io data send/receive, we decided to make it this way to increase user experience while working on this app, to give a enjoyable feeling to the app. The app itself is so smooth, the waiter, chef, and barman loved the new workflow provided for this app, as well, the owner loved this app.
# Realtime
To get the realtime working in our proyect, we used Socket.io, a node js library for web sockets communication, we found the way to notify the users by his role, and send notifications to specific users, we used this functionality to notify a customer about his order being deliver soon. 

# Final comentaries
Finishing, this app was maded for a university develop proyect, specif to the Requirements Engineering class, our teacher gave us two weeks to cover all the requeriments we wrote, we made it. Since we read the requirements we know that will be hard, but at the end of time, we did it and the final product is amazing, we learned a lot, the good results of develop an ambicious proyect.
