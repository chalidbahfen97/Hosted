const checkReserveLineExist = async (req, res, next) => {
  const { hove_id } = req.reserve;
  const { hobedId } = req.body;
  try {
    const reserveLine = await req.context.models.houses_reserve_lines.findOne({
      where: {
        hrit_hove_id: hove_id,
        hrit_hobed_id: hobedId
      }
    })

    if (reserveLine) return res.status(400).json({
      message: "Item already exist in cart"
    });

    next();
  } catch (error) {
    return res.status(400).json(error)
  }
}

const addReserveLine = async (req, res) => {
  const { checkIn, checkOut, adult, children, infant, totalNight, hobedId } = req.body;

  const bedroom = await req.context.models.houses_bedroom.findAll({
    where: {
      hobed_id: hobedId
    }
  })

  const { hobed_price, hobed_service_fee, hobed_house_id } = bedroom[0];
  const { hove_id } = req.reserve;
  const subTotal = (parseInt(hobed_price) + parseInt(hobed_service_fee)) * totalNight;

  await req.context.models.houses_reserve_lines.create({
    hrit_checkin: checkIn,
    hrit_checkout: checkOut,
    hrit_adult: adult,
    hrit_children: children,
    hrit_infant: infant,
    hrit_total_nights: totalNight,
    hrit_price: hobed_price,
    hrit_service_fee: hobed_service_fee,
    hrit_subtotal: subTotal,
    hrit_houses_id: hobed_house_id,
    hrit_hove_id: hove_id,
    hrit_hobed_id: hobedId,
  })
    .then(reserve => res.status(200).json({ message: "Add to Cart Success", reserve }))
    .catch(error => res.status(400).json({ errors: error.errors }));
}

export default {
  checkReserveLineExist,
  addReserveLine
};