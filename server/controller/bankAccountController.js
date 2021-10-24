import { sequelize } from "../models/init-models";

const findAccountBySQL = async (req, res) => {
  const result = await sequelize.query(
    `baac_acc_bank, baac_owner, baac_saldo, baac_pin_number, baac_start_date, baac_end_date, 
  baac_type, baac_user_id, baac_bank_id, from bank_account`,
    {
      type: sequelize.QueryTypes.SELECT,
      model: req.context.models.bank_account,
      mapToModel: true,
    }
  );
  return res.send(result);
};
//find all row sequelize/read
const findAllRows = async (req, res) => {
  const result = await req.context.models.bank_account.findAll();
  return res.send(result);
};
//find row by id
const findRowById = async (req, res) => {
  const result = await req.context.models.bank_account.findByPk(req.params.id);
  return res.send(result);
};
//create row
const createRow = async (req, res) => {
  try {
    const {
      baac_owner,
      baac_saldo,
      baac_pin_number,
      baac_start_date,
      baac_end_date,
      baac_type,
      baac_user_id,
      baac_bank_id,
    } = req.body;
    const result = await req.context.models.bank_account.create({
      baac_owner: baac_owner,
      baac_saldo: baac_saldo,
      baac_pin_number: baac_pin_number,
      baac_start_date: baac_start_date,
      baac_end_date: baac_end_date,
      baac_type: baac_type,
      baac_user_id: baac_user_id,
      baac_bank_id: baac_bank_id,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};
//update
const updateRow = async (req, res) => {
  try {
    const {
      baac_owner,
      baac_saldo,
      baac_pin_number,
      baac_start_date,
      baac_end_date,
      baac_type,
      baac_user_id,
      baac_bank_id,
    } = req.body;
    const result = await req.context.models.bank_account.update(
      {
        baac_owner: baac_owner,
        baac_saldo: baac_saldo,
        baac_pin_number: baac_pin_number,
        baac_start_date: baac_start_date,
        baac_end_date: baac_end_date,
        baac_type: baac_type,
        baac_user_id: baac_user_id,
        baac_bank_id: baac_bank_id,
      },
      { returning: true, where: { baac_acc_bank: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

// delete
const deleteRow = async (req, res) => {
  const id = req.params.id;

  await req.context.models.bank_account
    .destroy({
      where: { baac_acc_bank: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows.");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data not found.");
    });
};

export default {
  findAccountBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};
