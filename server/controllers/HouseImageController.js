const createHouseImage = async (req, res) => {
  const files = req.files;
  const houseId = req.house.house_id;

  const rowImages = files.map(el => {
    return { ...el, hoim_house_id: houseId }
  })

  try {
    const images = await req.context.models.houses_images.bulkCreate(
      rowImages
    );
    return res.status(200).json({
      house: req.house,
      images
    })
  } catch (error) {
    return res.status(404).json(error);
  }

}

const findHouseImagesById = async (req, res) => {
  const { houseId } = req.params;
  try {
    const result = await req.context.models.houses_images.findAll(
      { where: { hoim_house_id: parseInt(houseId) } }
    );
    return result;
  } catch (error) {
    return res.sendStatus(404).send(error);
  }
}

export default {
  createHouseImage,
  findHouseImagesById
}