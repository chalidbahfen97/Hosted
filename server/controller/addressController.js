import { sequelize } from "../models/init-models";

const findAddressBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      "select addr_id, addr_name, addr_detail, addr_latitude, addr_longitude, addr_user_id from address",
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.address,
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
    const result = await req.context.models.address.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.address.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const {
      addr_name,
      addr_detail,
      addr_latitude,
      addr_longitude,
      addr_user_id,
    } = req.body;
    const result = await req.context.models.address.create({
      addr_name: addr_name,
      addr_detail: addr_detail,
      addr_latitude: addr_latitude,
      addr_longitude: addr_longitude,
      addr_user_id: addr_user_id,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const {
      addr_name,
      addr_detail,
      addr_latitude,
      addr_longitude,
      addr_user_id,
    } = req.body;
    const result = await req.context.models.address.update(
      {
        addr_name: addr_name,
        addr_detail: addr_detail,
        addr_latitude: addr_latitude,
        addr_longitude: addr_longitude,
        addr_user_id: addr_user_id,
      },
      { returning: true, where: { addr_id: req.params.id } }
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
      where: { addr_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findAddressBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};
