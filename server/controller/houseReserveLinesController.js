import { sequelize } from "../models/init-models";

const findHritBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      `select hrit_id, hrit_checkin, hrit_checkout, hrit_adult, hrit_children, hrit_infant, hrit_total_nights, hrit_price, 
       hrit_service_fee, hrit_subtotal, hrit_houses_id, hrit_hove_id, hrit_hobed_id, hrid_order_name 
       from houses_reserve_lines`,
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.houses_reserve_lines,
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
    const result = await req.context.models.houses_reserve_lines.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.houses_reserve_lines.findByPk(
      req.params.id
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const {
      hrit_checkin,
      hrit_checkout,
      hrit_adult,
      hrit_children,
      hrit_infant,
      hrit_total_nights,
      hrit_price,
      hrit_service_fee,
      hrit_subtotal,
      hrit_houses_id,
      hrit_hove_id,
      hrit_hobed_id,
      hrid_order_name,
    } = req.body;
    const result = await req.context.models.houses_reserve_lines.create({
      hrit_checkin: hrit_checkin,
      hrit_checkout: hrit_checkout,
      hrit_adult: hrit_adult,
      hrit_children: hrit_children,
      hrit_infant: hrit_infant,
      hrit_total_nights: hrit_total_nights,
      hrit_price: hrit_price,
      hrit_service_fee: hrit_service_fee,
      hrit_subtotal: hrit_subtotal,
      hrit_houses_id: hrit_houses_id,
      hrit_hove_id: hrit_hove_id,
      hrit_hobed_id: hrit_hobed_id,
      hrid_order_name: hrid_order_name,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const {
      hrit_checkin,
      hrit_checkout,
      hrit_adult,
      hrit_children,
      hrit_infant,
      hrit_total_nights,
      hrit_price,
      hrit_service_fee,
      hrit_subtotal,
      hrit_houses_id,
      hrit_hove_id,
      hrit_hobed_id,
      hrid_order_name,
    } = req.body;
    const result = await req.context.models.houses_reserve_lines.update(
      {
        hrit_checkin: hrit_checkin,
        hrit_checkout: hrit_checkout,
        hrit_adult: hrit_adult,
        hrit_children: hrit_children,
        hrit_infant: hrit_infant,
        hrit_total_nights: hrit_total_nights,
        hrit_price: hrit_price,
        hrit_service_fee: hrit_service_fee,
        hrit_subtotal: hrit_subtotal,
        hrit_houses_id: hrit_houses_id,
        hrit_hove_id: hrit_hove_id,
        hrit_hobed_id: hrit_hobed_id,
        hrid_order_name: hrid_order_name,
      },
      { returning: true, where: { hrit_id: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.houses_reserve_lines
    .destroy({
      where: { hrit_id: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findHritBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};
