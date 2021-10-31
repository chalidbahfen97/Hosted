const findHostedAcc = async (req, res, next) => {
  const { userId } = req.user
  try {
    const hosted = await req.context.models.hosted.findOne({
      where: {
        hosted_user_id: userId
      }
    })
    req.hosted = hosted.dataValues;
    next();
  } catch (error) {
    return res.status(400).json(error)
  }
}

export default {
  findHostedAcc
}