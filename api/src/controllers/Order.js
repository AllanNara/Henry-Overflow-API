const { Order, User } = require("../db");
const nodemailer = require("nodemailer");

const postOrder = async (req, res, next) => {
  const { idUser } = req.params;
  const {
    id,
    first_name,
    last_name,
    payer_Id,
    amount,
    cycles_completed,
    cycles_remaining,
    sequence,
    ternure_type,
    total_cycles,
    failed_payments_count,
    last_payment_time,
    next_billing_time,
    create_time,
    plan_Id,
    plan_overridden,
    quantity,
    start_time,
    status,
    status_update_time,
    email_address,
    user_email,
  } = req.body;
  try {
    const createdBy = await User.findByPk(idUser);
    const newOrder = await Order.create({
      id,
      first_name,
      last_name,
      payer_Id,
      amount,
      cycles_completed,
      cycles_remaining,
      sequence,
      ternure_type,
      total_cycles,
      failed_payments_count,
      last_payment_time,
      next_billing_time,
      create_time,
      plan_Id,
      plan_overridden,
      quantity,
      start_time,
      status,
      status_update_time,
      email_address,
    });
    
    await User.update({
        isSubscribed: true
      },
      {
        where:{ id: idUser},
        raw: true
      })

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ffbe121384@gmail.com",
        pass: "oiltgjvprsnapsrb",
      },
    });

    let mailOptions = {
      from: "ffbe121384@gmail.com",
      to: user_email,
      subject: "Subscripcion realizada!",
      text: "Gracias por su donación!",
      html: `<h1>Hola ${first_name} ${last_name}</h1><br>
          <h4>Gracias por su donación, su total fue $${amount} USD</h4>`,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Paso un Error", err);
      } else {
        console.log("Correo enviado");
      }
    });

    createdBy.addOrder(newOrder);
    res.send(newOrder);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  const idOrder = req.params.id;

  Order.findAll({
    include: [
      {
        model: User,
      },
    ],
  })
    .then((orders) => {
      if (idOrder) {
        let orderId = orders.filter((el) => el.id == idOrder);
        return orderId.length
          ? res.send(orderId)
          : res.status(404).send("Order not found");
      } else {
        return res.send(orders);
      }
    })
    .catch((error) => next(error));
};

// const userIsSubscribed = async(req, res, next) => {
//   const { idUser } = req.params;
//   console.log(idUser)
//   try {
//      Order.findOne({where: {userId: idUser}}).then(r => console.log(r.dataValue) )
    
//     let next_billing_time = new Date().getDate();
//       console.log(Order.next_billing_time)
//     let today = Date.now();
     
// console.log(today < next_billing_time)
//     await User.update({
//       isSubscribed: today < next_billing_time
//     },
//     {
//       where:{ id: idUser},
//       raw: true
//     })
    
//     res.send("Estado de suscripción actualizdo en la base de datos")
//   } catch (error) {
//     next(error)
//   }
// }
  

module.exports = {
  postOrder,
  getOrder,
 // userIsSubscribed
};
