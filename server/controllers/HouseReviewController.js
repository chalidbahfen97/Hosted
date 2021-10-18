const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.houses_reviews.findAll();
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const findReviewsByHouseId = async (req, res) => {
  const { houseId } = req.params;
  try {
    const result = await req.context.models.houses_reviews.findAll({
      where: {
        hore_house_id: houseId
      }
    });

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const createHouseReview = async (req, res) => {
  const { houseId, userId } = req.query;
  const { hore_comments, hore_rating, hore_user_id } = req.body;

  try {
    const isReviewExist = await req.context.models.houses_reviews.findOne({
      where: {
        hore_user_id: userId,
        hore_house_id: houseId
      }
    })
    if (isReviewExist != null) return res.status(400).json({ message: "Review Exist" })
    console.log(isReviewExist)

    const result = await req.context.models.houses_reviews.create({
      hore_comments,
      hore_rating,
      hore_user_id: userId,
      hore_house_id: houseId
    });
    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const updateHouseReview = async (req, res) => {
  const { houseId, userId } = req.query;
  const { hore_comments, hore_rating, hore_user_id } = req.body;

  try {
    const result = await req.context.models.houses_reviews.update(
      {
        hore_comments,
        hore_rating,
      },
      {
        where: {
          hore_user_id: userId,
          hore_house_id: houseId
        }
      }
    );
    return res.send(`Updated success ${result} row`);
  } catch (error) {
    return res.send(error);
  }
}

const deleteHouseReview = async (req, res) => {
  const { houseId, userId } = req.query;

  try {
    const result = await req.context.models.houses_reviews.destroy({
      where: {
        hore_user_id: userId,
        hore_house_id: houseId
      }
    })

    return res.send(`Deleted success ${result} row`);
  } catch (error) {
    return res.send(error);
  }
}

export default {
  findAllRows,
  findReviewsByHouseId,
  createHouseReview,
  updateHouseReview,
  deleteHouseReview
}