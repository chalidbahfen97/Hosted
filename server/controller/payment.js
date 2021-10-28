const topUp = async (req, res) => {
  try {
    const { fromAcc, toAcc, amount, pinBank } = req.body;

    const accBank = await req.context.models.bank_account.findByPk(fromAcc);
    const accPayment = await req.context.models.account_payment.findByPk(toAcc);
    if (!accBank) {
      return res.send({ message: "Nomor Rekening Tidak Ada" });
    }
    if (!accPayment) {
      return res.send({ message: "Nomor Payment Tidak Ada" });
    }
    if (parseInt(accBank.dataValues.baac_pin_number) !== parseInt(pinBank)) {
      return res.send({ message: "Pin anda salah" });
    }
    if (parseInt(accBank.dataValues.baac_saldo) < parseInt(amount)) {
      return res.send({ message: "Saldo Anda Tidak Cukup" });
    }

    const saldoAccPayment = amount + parseInt(accPayment.dataValues.acc_saldo);
    const updateAccPayment = await req.context.models.account_payment.update(
      {
        acc_saldo: saldoAccPayment,
      },
      {
        where: {
          acc_number: toAcc,
        },
      }
    );

    const saldoAccBank = parseInt(accBank.dataValues.baac_saldo) - amount;
    const updateAccBank = await req.context.models.bank_account.update(
      {
        baac_saldo: saldoAccBank,
      },
      {
        where: {
          baac_acc_bank: fromAcc,
        },
      }
    );

    const paymentTrans = await req.context.models.payment_transaction.create({
      payt_baac_acc_bank: fromAcc,
      acc_number: toAcc,
      payt_debet: amount,
      payt_credit: 0,
      payt_type: "TopUp",
      payt_acc_number: toAcc,
    });

    return res.json({ message: "Top Up Berhasil", payment: paymentTrans });
  } catch (error) {
    return res.sendStatus(404);
  }
};

const payOrder = async (req, res) => {
  try {
    const { fromAcc, orderName, pinAcc, amount } = req.body;
    const accPay = await req.context.models.account_payment.findByPk(fromAcc);
    let bonusPoint = accPay.dataValues.acc_total_point;
    if (!accPay) {
      return res.send({ message: "Nomor Payment Anda Salah" });
    }
    if (parseInt(accPay.dataValues.acc_pin_number) !== parseInt(pinAcc)) {
      return res.send({ message: "Pin anda salah" });
    }
    if (parseInt(accPay.dataValues.acc_saldo) < parseInt(amount)) {
      return res.send({ message: "Saldo Anda Tidak Cukup" });
    }
    if (amount >= 100000) {
      bonusPoint = bonusPoint + 100;
    }

    const updateSaldoAfterOrder =
      await req.context.models.account_payment.update(
        {
          acc_saldo: parseInt(accPay.dataValues.acc_saldo) - amount,
          acc_total_point: bonusPoint,
        },
        {
          where: {
            acc_number: fromAcc,
          },
        }
      );

    const makeOrder = await req.context.models.payment_transaction.create({
      payt_order_number: orderName,
      payt_acc_number: fromAcc,
      payt_debet: 0,
      payt_credit: amount,
      payt_type: "Order",
    });

    return res.json({
      message: "Order Berhasil",
      payment: makeOrder.dataValues.payt_trx_number,
      saldo: accPay.dataValues.acc_saldo,
      Point: accPay.dataValues.acc_total_point,
    });
  } catch (error) {
    console.log(error);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { toAcc, orderName, order_payment_trx, amount } = req.body;
    const accPay = await req.context.models.account_payment.findByPk(toAcc);
    if (!accPay) {
      return res.send({ message: "Nomor Payment Anda Salah" });
    }

    const updateSaldoAfterRefund =
      await req.context.models.account_payment.update(
        {
          acc_saldo: parseInt(accPay.dataValues.acc_saldo) + amount,
        },
        {
          where: {
            acc_number: toAcc,
          },
        }
      );

    const refundOrder = await req.context.models.payment_transaction.create({
      payt_order_number: orderName,
      payt_acc_number: toAcc,
      payt_debet: amount,
      payt_credit: 0,
      payt_type: "Refund",
      payt_trx_number_ref: order_payment_trx,
    });

    return res.json({
      message: "Refund Berhasil",
      payment: refundOrder,
      saldo: accPay.dataValues.acc_saldo + amount,
    });
  } catch (error) {
    console.log(error);
  }
};

const tarikUang = async (req, res) => {
  try {
    const { fromAcc, toAcc, order_payment_trx, amount } = req.body;
    const accBank = await req.context.models.bank_account.findByPk(fromAcc);
    const accPayment = await req.context.models.account_payment.findByPk(toAcc);
    if (!accBank) {
      return res.send({ message: "Nomor Rekening Tidak Ada" });
    }
    if (!accPayment) {
      return res.send({ message: "Nomor Payment Tidak Ada" });
    }
    if (parseInt(accPayment.dataValues.acc_saldo) < parseInt(amount)) {
      return res.send({ message: "Saldo Anda Tidak Cukup" });
    }

    const saldoAccPayment = parseInt(accPayment.dataValues.acc_saldo) - amount;
    const updateAccPayment = await req.context.models.account_payment.update(
      {
        acc_saldo: saldoAccPayment,
      },
      {
        where: {
          acc_number: fromAcc,
        },
      }
    );

    const saldoAccBank = parseInt(accBank.dataValues.baac_saldo) + amount;
    const updateAccBank = await req.context.models.bank_account.update(
      {
        baac_saldo: saldoAccBank,
      },
      {
        where: {
          baac_acc_bank: toAcc,
        },
      }
    );
    const paymentTrans = await req.context.models.payment_transaction.create({
      payt_acc_number: fromAcc,
      payt_baac_acc_bank: toAcc,
      payt_debet: 0,
      payt_credit: amount,
      payt_type: "Transfer",
    });

    return res.json({ message: "Top Up Berhasil", payment: paymentTrans });
  } catch (error) {
    console.log(error);
  }
};

export default {
  topUp,
  payOrder,
  cancelOrder,
  tarikUang,
};
