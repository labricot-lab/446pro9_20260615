document.addEventListener("DOMContentLoaded", () => {

  const buttons = document.querySelectorAll('.add-cart');

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {

      fetch('http://192.168.0.53:3000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: index + 1 })
      })
      .then(res => res.json())
      .then(data => {
        alert(`Added to cart! Total items: ${data.cart.length}`);
      })
      .catch(err => console.error("Cart error:", err));

    });
  });

});