import bcrypt from "bcrypt";
const SALT_ROUND = 10;

const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;

  let hashPassword = await bcrypt.hash(password, SALT_ROUND);
  /*try {
    const result = await req.context.models.users.create({
      user_name: username,
      user_email: email,
      user_password: hashPassword,
      user_phone: phone,
    });
    const { user_name, user_email } = result.dataValues;
    res.send({ user_name, user_email });
  } catch (error) {
    res.sendStatus(404).send(error);
  } */

  /*  test dulu   */

  let userPassword = password;
  userPassword = await bcrypt.hash(userPassword, SALT_ROUND);
  console.log(userPassword);

  console.log(await bcrypt.compare("rahasia", userPassword));
  console.log(await bcrypt.compare("rahasiax", userPassword));
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
      return res.sendStatus(404);
    }
  } catch (error) {
    return res.sendStatus(404);
  }
};

export default {
  signup,
  signin,
};
