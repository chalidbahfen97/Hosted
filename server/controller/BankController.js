import { sequelize } from "../models/indexModels";

const findBankBySQL = async (req, res) => {
  const result = await sequelize.query("select bank_id, bank_name from bank", {
    type: sequelize.QueryTypes.SELECT,
    model: req.context.models.Bank,
    mapToModel: true,
  });
  return res.send(result);
};
//find all row sequelize/read
const findAllRows = async (req, res) => {
  const result = await req.context.models.bank.findAll();
  return res.send(result);
};
//find row by id
const findRowById = async (req, res) => {
  const result = await req.context.models.bank.findByPk(req.params.id);
  return res.send(result);
};
//create row
const createRow = async (req, res) => {
  try {
    const { bank_name } = req.body;
    const result = await req.context.models.bank.create({
      bank_name: bank_name,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};
//update
const updateRow = async (req, res) => {
  try {
    const { bank_name } = req.body;
    const result = await req.context.models.bank.update(
      { bank_name: bank_name },
      { returning: true, where: { bank_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

// delete
const deleteRow = async (req, res) => {
  const id = req.params.id;

  await req.context.models.bank
    .destroy({
      where: { bank_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows.");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data not found.");
    });
};

export default {
  findBankBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};
