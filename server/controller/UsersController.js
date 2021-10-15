import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const { name, email, password, handphone, role } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    const result = await req.context.models.users.create({
      user_name: name,
      user_email: email,
      user_password: hash,
      user_handphone: handphone,
      user_role: role
    });

    return res.send(result);
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
    const { user_name, user_email, user_password } = result.dataValues;
    const compare = await bcrypt.compare(password, user_password);
    if (compare) {
      return res.send({ user_name, user_email });
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
