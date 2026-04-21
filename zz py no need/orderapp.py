from flask import Flask, request, redirect, url_for, session
from saveorder import save_order

app = Flask(__name__)
app.secret_key = "secret_key_for_session"

# -------------------------
# HOME PAGE
# -------------------------
@app.route('/')
def home():
    return """
    <h1>Simple Shop</h1>
    <p><a href="/add/Apple/5.0">Add Apple ($5)</a></p>
    <p><a href="/add/Banana/3.0">Add Banana ($3)</a></p>
    <a href="/cart">Go to Cart</a>
    """

# -------------------------
# ADD TO CART
# -------------------------
@app.route('/add/<name>/<float:price>')
def add_to_cart(name, price):
    if 'cart' not in session:
        session['cart'] = []

    session['cart'].append({
        "name": name,
        "price": price,
        "quantity": 1
    })

    session.modified = True
    return redirect(url_for('home'))

# -------------------------
# VIEW CART
# -------------------------
@app.route('/cart')
def cart():
    cart = session.get('cart', [])

    total = sum(item['price'] * item['quantity'] for item in cart)

    html = "<h1>Your Cart</h1>"

    if not cart:
        html += "<p>Your cart is empty.</p>"
    else:
        for item in cart:
            html += f"<p>{item['name']} - ${item['price']} x {item['quantity']}</p>"

        html += f"<h3>Total: ${total}</h3>"

        html += """
        <form action="/confirm_order" method="POST">
            <button type="submit">Confirm Order</button>
        </form>
        """

    html += '<br><a href="/">Back to Home</a>'
    return html

# -------------------------
# CONFIRM ORDER
# -------------------------
@app.route('/confirm_order', methods=['POST'])
def confirm_order():
    cart = session.get('cart', [])

    if cart:
        save_order(cart)
        session['cart'] = []

    return """
    <h2>Order placed successfully!</h2>
    <a href="/">Return Home</a>
    """

# -------------------------
# RUN APP
# -------------------------
if __name__ == '__main__':
    app.run(debug=True)