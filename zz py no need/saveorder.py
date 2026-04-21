import sqlite3

def save_order(cart):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    total = sum(item['price'] * item['quantity'] for item in cart)

    # Insert order
    c.execute(
        "INSERT INTO orders (total_price, status) VALUES (?, ?)",
        (total, "Confirmed")
    )

    order_id = c.lastrowid

    # Insert items
    for item in cart:
        c.execute(
            "INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)",
            (order_id, item['name'], item['quantity'], item['price'])
        )

    conn.commit()
    conn.close()