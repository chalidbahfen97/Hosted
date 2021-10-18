const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.houses_bedroom.findAll();

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const findBedroomById = async (req, res) => {
  const { hobedId } = req.params;
  try {
    const result = await req.context.models.houses_bedroom.findOne({
      where: {
        hobed_id: hobedId
      }
    });

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const addBedroom = async (req, res) => {
  const { houseId } = req.query;
  const { name, price, serviceFee } = req.body;

  try {
    const result = await req.context.models.houses_bedroom.create({
      hobed_name: name,
      hobed_price: price,
      hobed_service_fee: serviceFee,
      hobed_house_id: houseId
    })

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const updateBedroom = async (req, res) => {
  const { hobedId } = req.params;
  const { name, price, serviceFee } = req.body;
  try {
    const result = await req.context.models.houses_bedroom.update(
      {
        hobed_name: name,
        hobed_price: price,
        hobed_service_fee: serviceFee,
      },
      {
        where: {
          hobed_id: hobedId
        }
      })

    return res.send(result);
  } catch (error) {
    return res.send(error);
  }
}

const deleteBedroom = async (req, res) => {
  const { hobedId } = req.params;
  try {
    const result = await req.context.models.houses_bedroom.destroy({
      where: {
        hobed_id: hobedId
      }
    })
  } catch (error) {

  }
}

export default {
  findAllRows,
  findBedroomById,
  addBedroom,
  updateBedroom,
  deleteBedroom
}