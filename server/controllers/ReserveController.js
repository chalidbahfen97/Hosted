const findAllReserve = async (req, res) => {
  try {
    const result = await req.context.models.houses_reserve.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const findReserveByUserIdAndStatus = async (req, res) => {
  const { userId } = req.user;

  const result = await req.context.models.houses_reserve.findAll({
    where: {
      hove_user_id: userId,
      hove_status: "OPEN"
    }
  });
  return res.status(200).json(result);
};

const checkReserveExist = async (req, res, next) => {
  const { userId } = req.user;

  try {
    // Check if cart is exist and status open by user id
    const reserveExistAndOpen = await req.context.models.houses_reserve.findAll({
      where: {
        hove_user_id: userId,
        hove_status: "OPEN"
      }
    })

    // If no cart with status open then create cart
    if (reserveExistAndOpen.length === 0) {
      await req.context.models.houses_reserve.create({
        hove_created: new Date(),
        hove_status: "OPEN",
        hove_user_id: userId
      })
        .then(result => {
          req.reserve = {
            message: "New Reserve ID",
            hove_id: result.hove_id
          }

          // Next to middleware function
          next();
        })
        .catch(error => res.status(400).json({ error }));
    } else {
      // update date created in existing cart
      await req.context.models.houses_reserve.update(
        { hove_created: new Date() },
        { where: { hove_id: reserveExistAndOpen[0].dataValues.hove_id } }
      )
      req.reserve = {
        message: "Existing Reserve ID",
        hove_id: reserveExistAndOpen[0].dataValues.hove_id
      };

      // Next to middleware function
      next();
    }
  } catch (error) {
    return res.status(400).json(error);
  }
}

export default { findAllReserve, findReserveByUserIdAndStatus, checkReserveExist };