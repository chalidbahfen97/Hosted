import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PinoHttp from "pino-http";

const signup = async (req, res) => {
  const { name, email, password, handphone, role, pin } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    const result = await req.context.models.users.create({
      user_name: name,
      user_email: email,
      user_password: hash,
      user_handphone: handphone,
      user_role: role,
    });

    const payment = await req.context.models.account_payment.create({
      acc_pin_number: pin,
      acc_saldo: 0,
      acc_total_point: 0,
      acc_user_id: result.dataValues.user_id,
    });
    return res.json({ result, payment });
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await req.context.models.users.findOne({
      where: { user_email: email },
    });
    const { user_handphone, user_email, user_password } = result.dataValues;
    const compare = await bcrypt.compare(password, user_password);
    if (compare) {
      const token = await jwt.sign({ user_email, user_handphone }, "mysecret", {
        expiresIn: "30d",
      });
      res.cookie("jwt", token, { httpOnly: true });
      return res.json({ success: true, token: token });
    } else {
      return res.status(400).json({ message: "Password salah" });
    }
  } catch (error) {
    return res.sendStatus(404);
  }
};

export default {
  signup,
  signin,
};
