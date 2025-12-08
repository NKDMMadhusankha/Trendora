const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOrderConfirmationEmail({ to, order }) {
  const itemsHtml = order.items.map(item =>
    `<li>${item.product.name} (Size: ${item.size}, Qty: ${item.quantity})</li>`
  ).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: <strong>${order._id}</strong></p>
      <p>Order Date: ${new Date(order.orderDate).toLocaleString()}</p>
      <p>Total: <strong>LKR ${order.totalPrice}</strong></p>
      <h3>Order Summary:</h3>
      <ul>${itemsHtml}</ul>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOrderConfirmationEmail;
