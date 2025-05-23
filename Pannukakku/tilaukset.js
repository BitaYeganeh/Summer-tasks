


//table

document.addEventListener("DOMContentLoaded", () => {
  // Get orders from localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || [];


const tbody = document.querySelector("tbody");
tbody.innerHTML = ''; // clears existing rows

orders.forEach(order =>{
    const tr = document.createElement("tr");

    // Add class for initial status
      tr.classList.add(order.status.toLowerCase()); // 'waiting', 'ready', 'delivered'

    tr.innerHTML = `
    <td>${order.id}</td>
    <td>${order.customerName}</td>
    <td>${order.selectedPancake}</td>
    <td>${order.toppings.join(', ') || '-'}</td>
    <td>${order.extras.join(', ') || '-'}</td>
    <td>${order.deliveryMethod}</td>
    <td>${order.totalPrice}</td>
    <td class="status">${order.status}</td>
    
    <td>
      <button class="mark-ready">Ready</button>
      <button class="mark-delivered">Delivered</button>
    </td>
  `;
    // Add event listeners for buttons:
  tr.querySelector('.mark-ready').addEventListener('click', () => {
    order.status = 'ready';
    localStorage.setItem('orders', JSON.stringify(orders));
    tr.cells[7].textContent = 'ready'; // update status cell
  });

  tr.querySelector('.mark-delivered').addEventListener('click', () => {
    order.status = 'delivered';
    localStorage.setItem('orders', JSON.stringify(orders));
    tr.cells[7].textContent = 'delivered'; // update status cell
  });

  tbody.appendChild(tr);
});
});
