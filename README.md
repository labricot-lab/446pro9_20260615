# Project Documentation

## Project Overview

### Purpose
This application provides a centralized platform for bird-watching enthusiasts to discover and purchase bird-themed products, offering a curated selection of merchandise such as mugs, ties, wine bottles, and other unique items designed for bird lovers and collectors.

### Technology Stack
- Frontend: productList.html, 
            orders.html, 
            checkout.html
- Backend:  jsfile.js
            server.js
- Database: SQLite
- Hosting: Local Development Environment

---

## Product Features

### Feature 1: productList.html as the main page

**Description**

Provides an overview of user activity.

**Capabilities**
- View items
- add the items to cart

### Feature 2: Data Management

**Description**

Supports CRUD operations and transactional data handling for user purchases.

**Capabilities**
- Create records (e.g., add items to cart / create cart entries)
- Read records (e.g., view cart contents, order summary)
- Update records (e.g., change item quantity in cart)
- Manage transactional workflows (add to cart ==> checkout ==> order creation)

### Feature 3: Backend Server and Deployment Setup

**Description**

Implements a local server environment to run the ecommerce application and handle communication between the frontend and backend.

**Capabilities**

- Runs application using Node.js and Express
- Serves frontend and backend through a local server
- Handles API requests (e.g., cart operations)
- Connects application to SQLite database
- Enables proper deployment workflow (localhost testing)

---

## Challenges

### Challenge 1: CODIO Issues

**Problem**

The application failed to add stuff to cart during deployment in module six in CODIO, but worked quite fine on local host.

 I tried to click the add-to-cart with everything uploaded to Codio. However, it says on the popped-up webpage that Cart data is missing or invalid. In the meantime, in fact, I have uploaded everything to Codio without a public folder.

**Solution**

The instructor helped debug CODIO. Since the next module, I started to also run the application on local host.

**Outcome**

Successfully deployed the application on local host.

### Challenge 2: CurrentUser is perfect for the execution policy.

Even though it's my personal laptop, Windows installs Node.js with
system-level scripts that require administrator-level PowerShell to modify
the LocalMachine policy. This is a Windows security design. It protects
system-wide settings even from the laptop's own user account unless I choose to
explicitly "Run as Administrator." The CurrentUser scope only changes the
policy for my own user session, so it doesn't need that elevated
permission. I need to think of it this way: LocalMachine affects everyone who uses
that computer, so Windows requires a higher level of trust to change it.
CurrentUser only affects myself, so no admin elevation is needed. For my
coursework, CurrentUser is perfectly fine.

**Problem**

I received a red error saying that I need admin rights.

**Solution**

I finally used the alternative (no admin rights needed).

**Outcome**

For my coursework, CurrentUser is perfectly fine.

---

## Configuration

### Development Environment

| Component | 
|------------|
| Node.js |
| Express |
| SQLite |
| HTML/CSS/JavaScript |

### Installation

1. Clone the repository

This application repo is divided into several separated git repositories. 

frontend:

```bash
git clone https://github.com/labricot-lab/m5_lab5_20260310.git
```

```bash
git clone https://github.com/labricot-lab/446_m5_coursepro_20260312.git
```

backend:

```bash
git clone https://github.com/labricot-lab/446_pro_08_20260421.git
```

```bash
git clone https://github.com/labricot-lab/446_pro_07_20260419.git
```

```bash
git clone https://github.com/labricot-lab/446_pro8_updated_20260506.git
```

Documentation:

The GitHub documentation link will be generated during the process of uploading this final
application documentation to GitHub.

https://github.com/labricot-lab/446final_20260611

live link:
https://labricot-lab.github.io/446final_20260611/

2. Install dependencies

```bash
npm install
```

4. Start the application

```bash
node server.js
```

---

## Testing

|      Test Case             |   Status   |
|----------------------------|------------|
| View Product List          | Passed     |
| Add Item to Cart           | Passed     |
| Update Cart Quantity       | Passed     |
| Checkout Process           | Passed     |
| Order Creation             | Passed     |
| SQLite Database Operations | Passed     |

### Cross-Platform Testing

✓ Edge
✓ Chrome
✓ Firefox
✓ iPhone Safari
✓ Parents' iPhone Safari

## Debugging

### Debugging issue one:
Buttons on iPhone are not reacting. 

#### Solution:
Change all the localhost address in the application to the laptop local IPv4 address, which is 192.168.0.53:3000.

### Debugging issue two:
The dates show invalid date.

#### Solution:
removed " UTC"
changed the date to,
<p>Date: ${new Date(order.created_at).toLocaleString()}</p>

---

## Future Improvements

- Improve mobile responsiveness for product listing, cart, and checkout pages
- Optimize performance by reducing unnecessary database queries and improving load times
- Add analytics features to track user activity such as most viewed products and cart conversions

---

## GitHub link and live link

Repository Links:

frontend:

https://github.com/labricot-lab/m5_lab5_20260310.git

https://github.com/labricot-lab/446_m5_coursepro_20260312.git

backend:

https://github.com/labricot-lab/446_pro_08_20260421.git

https://github.com/labricot-lab/446_pro_07_20260419.git

https://github.com/labricot-lab/446_pro8_updated_20260506.git

Repository live links:

The application was tested locally using:
http://localhost:3000

frontend:

https://labricot-lab.github.io/m5_lab5_20260310/

https://labricot-lab.github.io/446_m5_coursepro_20260312/

backend:

https://labricot-lab.github.io/446_pro_08_20260421/

https://labricot-lab.github.io/446_pro_07_20260419/

https://labricot-lab.github.io/446_pro8_updated_20260506/