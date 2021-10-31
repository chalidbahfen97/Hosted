import bcrypt from "bcrypt";

const signUpUser = async (req, res) => {
  const { name, email, password, handphone, addrName, addrDetail, pinAccpayt } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await req.context.models.users.create({
      user_name: name,
      user_email: email,
      user_password: hash,
      user_handphone: handphone,
      user_role: "User",
    });

    const { user_id } = user.dataValues;
    const address = await req.context.models.address.create({
      addr_name: addrName,
      addr_detail: addrDetail,
      addr_user_id: user_id
    })

    const payment = await req.context.models.account_payment.create({
      acc_pin_number: pinAccpayt,
      acc_saldo: 0,
      acc_total_point: 0,
      acc_user_id: user_id,
    });

    return res.status(201).json({
      user,
      address,
      payment
    });
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
};

const signUpHosted = async (req, res) => {
  const { name, email, password, handphone, addrName, addrDetail, pinAccpayt, hostedName } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await req.context.models.users.create({
      user_name: name,
      user_email: email,
      user_password: hash,
      user_handphone: handphone,
      user_role: "Hosted",
    });

    const { user_id } = user.dataValues;
    const address = await req.context.models.address.create({
      addr_name: addrName,
      addr_detail: addrDetail,
      addr_user_id: user_id
    })

    const payment = await req.context.models.account_payment.create({
      acc_pin_number: pinAccpayt,
      acc_saldo: 0,
      acc_total_point: 0,
      acc_user_id: user_id,
    });

    const hosted = await req.context.models.hosted.create({
      hosted_fullname: hostedName,
      hosted_level: "Hosted",
      hosted_user_id: user_id
    })

    return res.status(201).json({
      user,
      address,
      payment,
      hosted
    });
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
};

export default {
  signUpUser,
  signUpHosted
};
