const createHouseImage = async (req, res) => {
  const files = req.files;
  const houseId = req.houseId;

  const rowImages = files.map(el => {
    return { ...el, hoim_house_id: houseId }
  })

  try {
    const result = await req.context.models.houses_images.bulkCreate(
      rowImages
    );
    return res.status(200).json(result)
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