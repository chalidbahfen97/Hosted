import { sequelize } from "../models/init-models";

const findHostedBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      "select hosted_acc, hosted_fullname, hosted_level, hosted_user_id from hosted",
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.hosted,
        mapToModel: true,
      }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.hosted.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.hosted.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const { hosted_acc, hosted_fullname, hosted_level, hosted_user_id } = req.body;
    const result = await req.context.models.address.create({
      hosted_acc: hosted_acc,
      hosted_fullname: hosted_fullname,
      hosted_level: hosted_level,
      hosted_user_id: hosted_user_id,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const { hosted_fullname, hosted_level, hosted_user_id } = req.body;
    const result = await req.context.models.address.update(
      {
        hosted_fullname: hosted_fullname,
        hosted_level: hosted_level,
        hosted_user_id: hosted_user_id,
      },
      { returning: true, where: { hosted_acc: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.address
    .destroy({
      where: { hosted_acc: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findHostedBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};