import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res , next) => {
  const { user_name, user_email, user_password, user_handphone, user_role, pin } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user_password, salt);
  try {
    const result = await req.context.models.users.create({
      user_name: user_name,
      user_email: user_email,
      user_password: hash,
      user_handphone: user_handphone,
      user_role: user_role,
    });
    req.user_id = result.dataValues.user_id;
    next();
  } catch (error) {
    return res.sendStatus(400);
  }
};

const createAccPayment = async (req, res) => {
  try {
    const payment = await req.context.models.account_payment.create({
      acc_saldo: 0,
      acc_total_point: 0,
      acc_user_id: req.user_id,
    });
    return res.json({ message : "Sign Up Success"});
  } catch (error) {
    return res.sendStatus(400)
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
  createAccPayment,
};
