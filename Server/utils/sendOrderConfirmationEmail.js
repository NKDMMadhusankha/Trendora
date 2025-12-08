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
    subject: `Order Confirmation - ${order.orderNumber || order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Thank you for your order!</h2>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Order Number:</strong> <span style="color: #007bff; font-size: 18px;">${order.orderNumber || order._id}</span></p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
            <p style="margin: 5px 0;"><strong>Total Amount:</strong> <span style="color: #28a745; font-size: 20px; font-weight: bold;">LKR ${order.totalPrice.toLocaleString('en-LK')}</span></p>
          </div>
          <h3 style="color: #333; margin-top: 30px;">Order Summary:</h3>
          <ul style="list-style: none; padding: 0;">${itemsHtml}</ul>
          <p style="margin-top: 30px; color: #666; font-size: 14px;">If you have any questions about your order, please contact us with your order number.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendOrderConfirmationEmail;
