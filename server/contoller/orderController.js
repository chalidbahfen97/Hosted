import { sequelize } from "../models/init-models";

const findOrderBySQL = async (req, res) => {
  try {
    const result = await sequelize.query(
      `select order_name, order_created, order_subtotal, order_qty, order_tax, order_discount, order_promo, order_total_price, 
       order_status, order_payment_type, order_user_id from order`,
      {
        type: sequelize.QueryTypes.SELECT,
        model: req.context.models.order,
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
    const result = await req.context.models.order.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const findRowById = async (req, res) => {
  try {
    const result = await req.context.models.order.findByPk(req.params.id);
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const createRow = async (req, res) => {
  try {
    const {
      order_name,
      order_created,
      order_subtotal,
      order_qty,
      order_tax,
      order_discount,
      order_promo,
      order_total_price,
      order_status,
      order_payment_type,
      order_user_id,
    } = req.body;
    const result = await req.context.models.order.create({
      order_name: order_name,
      order_created: order_created,
      order_subtotal: order_subtotal,
      order_qty: order_qty,
      order_tax: order_tax,
      order_discount: order_discount,
      order_promo: order_promo,
      order_total_price: order_total_price,
      order_status: order_status,
      order_payment_type: order_payment_type,
      order_user_id: order_user_id,
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const updateRow = async (req, res) => {
  try {
    const {
      order_created,
      order_subtotal,
      order_qty,
      order_tax,
      order_discount,
      order_promo,
      order_total_price,
      order_status,
      order_payment_type,
      order_user_id,
    } = req.body;
    const result = await req.context.models.order.update(
      {
        order_created: order_created,
        order_subtotal: order_subtotal,
        order_qty: order_qty,
        order_tax: order_tax,
        order_discount: order_discount,
        order_promo: order_promo,
        order_total_price: order_total_price,
        order_status: order_status,
        order_payment_type: order_payment_type,
        order_user_id: order_user_id,
      },
      { returning: true, where: { order_name: req.params.id } }
    );
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.order
    .destroy({
      where: { order_name: id },
    })
    .then((result) => {
      return res.send("delete " + result + " rows");
    })
    .catch((error) => {
      return res.sendStatus(404).send("Data Not Found");
    });
};

export default {
  findOrderBySQL,
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
};
