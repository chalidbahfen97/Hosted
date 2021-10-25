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

    const accPay = await req.context.models.account_payment.findByPk({
      where: { account_number: fromAcc },
    });
    if (parseInt(accPay.dataValues.acc_pin_number) !== parseInt(pinAcc)) {
      return res.send({ message: "Pin anda salah" });
    }
    if (parseInt(accPay.dataValues.acc_saldo) < parseInt(amount)) {
      return res.send({ message: "Saldo Anda Tidak Cukup" });
    }

    const saldoOrder = parseInt(accPay.dataValues.acc_saldo) - amount;
    const updateSaldoOrder = await req.context.models.account_payment.update(
      {
        acc_saldo: saldoOrder,
      },
      {
        where: {
          acc_number: accPay,
        },
      }
    );

    /*
    const bonusPoint = await req.context.models.account_payment.findByPk({
      where: { account_number: fromAcc },
    });
    if (amount >= 100000) {
      bonusPoint = accPay.dataValues.acc_total_point + 100;
    }
    */
    const makeOrder = await req.context.models.payment_transaction.create({
      payt_order_number: orderName,
      acc_number: accPay,
      payt_debet: 0,
      payt_credit: amount,
      payt_type: "Order",
    });

    return res.send({
      message: "Order Berhasil",
      payment: makeOrder,
      // bonusPoint,
    });
  } catch (error) {
    return res.sendStatus(404);
  }
};

export default {
  topUp,
  payOrder,
};
