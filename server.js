// =====================
// iterating_20260418 - FIXED SERVER (CLEAN VERSION)
// =====================

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();

// =====================
// DEBUG LOGGER
// =====================
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// =====================
// MIDDLEWARE
// =====================
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// =====================
// DATABASE
// =====================
const db = new sqlite3.Database('./cart.db', (err) => {
  if (err) {
    console.error("DB error:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// =====================
// PRODUCT LIST (FIXED STRUCTURE)
// =====================
const products = {
  1: { name: "Eagle bottle", price: 10 },
  2: { name: "Eagle Dart", price: 15 },
  3: { name: "Eagle T-shirt", price: 20 },
  4: { name: "Eagle Tie", price: 25 },
  5: { name: "Eagle Ring", price: 30 },
  6: { name: "Eagle Mug", price: 14 }
};

// =====================
// TABLES
// =====================
db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    item_id INTEGER
  )
`);

// =====================
// ADD TO CART
// =====================
app.post('/cart', (req, res) => {
  const itemId = parseInt(req.body.id);

  console.log("🛒 Add to cart:", itemId);

  if (!itemId || !products[itemId]) {
    return res.status(400).json({ error: "Invalid item id" });
  }

  db.run(
    "INSERT INTO cart(item_id) VALUES(?)",
    [itemId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.all("SELECT * FROM cart", [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ cart: rows });
      });
    }
  );
});

// =====================
// GET CART
// =====================
app.get('/cart', (req, res) => {
  db.all("SELECT * FROM cart", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const formatted = rows.map(r => ({
      id: r.id,
      item_id: r.item_id,
      name: products[r.item_id]?.name || "Unknown",
      price: products[r.item_id]?.price || 0
    }));

    res.json({ cart: formatted });
  });
});

// =====================
// CHECKOUT
// =====================
app.post('/checkout', (req, res) => {

  console.log("🛒 Checkout started");

  db.serialize(() => {

    db.run("INSERT INTO orders DEFAULT VALUES", function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const orderId = this.lastID;

      db.all("SELECT * FROM cart", [], (err, items) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (items.length === 0) {
          return res.json({ message: "Cart is empty", orderId });
        }

        const stmt = db.prepare(
          "INSERT INTO order_items (order_id, item_id) VALUES (?, ?)"
        );

        items.forEach(item => {
          stmt.run(orderId, item.item_id);
        });

        stmt.finalize(() => {
          db.run("DELETE FROM cart", () => {
            res.json({
              message: "Order placed successfully",
              orderId
            });
          });
        });

      });
    });

  });

});

// =====================
// ORDERS LIST
// =====================
app.get('/orders', (req, res) => {
  db.all("SELECT * FROM orders ORDER BY id DESC", [], (err, orders) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ orders });
  });
});

// =====================
// ORDER DETAILS (FIXED - MAIN BUG FIX)
// =====================
app.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;

  db.all(
    "SELECT * FROM order_items WHERE order_id = ?",
    [orderId],
    (err, items) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const formatted = items.map(item => {
        const product = products[Number(item.item_id)];

        return {
          name: product?.name || "Unknown Item",
          price: product?.price || 0,
          quantity: 1
        };
      });

      res.json({
        orderId,
        items: formatted
      });
    }
  );
});

// =====================
// HOME
// =====================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'productList.html'));
});

// =====================
// START SERVER
// =====================
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
});