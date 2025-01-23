# Eden Online  
A project to modernize Eden Bar & Lounge with a web app designed to improve restaurant operations.

## Project Overview  
Eden Online is a local order control system that streamlines operations for Eden Bar & Lounge. The system supports orders containing drinks and dishes, dividing responsibilities between the chef (who prepares the food) and the barman (who prepares the drinks). Here's how it works:  

- **Waiter Functionality:**  
  - Capture orders by table and add products to orders.  
  - Send orders to the chef and barman in real-time using a REST API.  
  - Receive notifications when orders are ready for pickup.  

- **Chef and Barman Responsibilities:**  
  - Chefs only see food items, while barmen only see drinks.  
  - When an order is marked as "finished," waiters receive a notification to pick up the order.  

- **Customer Interaction:**  
  - Customers can register with an email, add products to a virtual cart, modify their orders, and confirm them.  
  - Notifications alert customers when their order is ready to be delivered.  

Additionally, the project includes features such as product inventory management, sales control, and user management.  

---

## Modules and Technologies  
### Server-Side Rendering (SSR):  
Admin modules like **sales control**, **inventory management**, and **user management** were built using server-side rendering for better performance and scalability.  

### Client-Side Modules:  
Modules for waiters, barmen, chefs, and customers were built using pure JavaScript and APIs tailored to specific purposes. These modules use **Socket.io** for real-time communication, ensuring a smooth and enjoyable user experience.  

### Real-Time Functionality:  
To enable real-time notifications, we used **Socket.io**, a Node.js library for WebSocket communication. This allowed us to:  
- Notify users based on their roles (e.g., chefs and barmen see only their respective tasks).  
- Alert customers when their orders are ready for delivery.  

The app's seamless real-time updates were highly appreciated by the staff and management, making the workflow much more efficient.  

---

## Final Comments  
Eden Online was developed as part of a **university project** for a Requirements Engineering class. Despite being given only two weeks to cover all the requirements, we successfully delivered a polished, functional product.  

This ambitious project taught us a lot about teamwork, development under pressure, and the satisfaction of delivering a real-world solution. The end result exceeded expectations and was well-received by everyone involved.  
