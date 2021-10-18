import formidable from "formidable";
import fs from "fs";
import path from "path";
import UpDownloadHelper from "../helpers/UpDownloadHelper";
import IndexController from "./IndexController"

const findAllRows = async (req, res) => {
  try {
    const result = await req.context.models.houses.findAll();
    return res.send(result);
  } catch (error) {
    return res.sendStatus(404).send("no data found");
  }
}

const findHouseById = async (req, res, next) => {
  const { houseId } = req.params;

  const dataImages = await IndexController.HouseImageCtrl.findHouseImagesById(req);

  try {

    const result = await req.context.models.houses.findOne({
      where: {
        house_id: houseId
      }
    })

    return res.status(200).json({
      house: result,
      houseImages: dataImages
    })
  } catch (error) {
    return res.send(error);
  }
}

const createHouse = async (req, res) => {
  //process.cwd return value working directory
  // __dir return value module directory
  const uploadDir = process.cwd() + '/storages/';

  //config option for formidale
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  }
  const form = formidable(options);

  // onpart untuk override stream sebelum di write ke folder
  form.onPart = function (part) {
    if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
      this.handlePart(part);
    }
    else {
      form._error(new Error('File type is not supported'));
    }
  }

  // parsing form yang dikirim dari client
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
        error: error.stack
      })
    }

    if (files.uploadFile.length > 1) {
      return res.status(400).json({
        status: "error",
        message: "only one file allowed",
        error: ""
      })
    }

    const uploadFile = files.uploadFile.path;

    const sep = path.sep;
    const fileName = uploadFile.substr(uploadFile.lastIndexOf(sep), uploadFile.length).replace(sep, "");

    try {
      const resultHouse = await req.context.models.houses.create({
        house_name: fields.house_name,
        house_title: fields.house_title,
        house_rating: parseInt(fields.house_rating),
        house_bedrooms: parseInt(fields.house_bedrooms),
        house_occupied: parseInt(fields.house_occupied),
        house_beds: parseInt(fields.house_beds),
        house_baths: parseInt(fields.house_baths),
        house_address: fields.house_address,
        house_province: fields.house_province,
        house_city: fields.house_city,
        house_country: fields.house_country,
        house_latitude: fields.house_latitude,
        house_longitude: fields.house_longitude,
        house_offer: fields.house_offer,
        house_approval: fields.house_approval,
        house_hosted_account: fields.hosted_account
      });

      const imageSize = files.uploadFile.size;
      const imageType = files.uploadFile.type;
      const houseId = resultHouse.dataValues.house_id;
      const resultImage = await req.context.models.houses_images.create({
        hoim_url_name: `${process.env.URL_IMAGE}/${fileName}`,
        hoim_filesize: imageSize,
        hoim_filetype: imageType,
        hoim_house_id: houseId
      })

      return res.status(200).json({
        Houses: resultHouse,
        HouseImage: resultImage
      }
      );
    } catch (error) {
      return res.status(404).json({
        status: "Failed",
        message: "",
        error: error
      })
    }
  });
}

// const updateHouse = async (req, res) => {
//   const { houseId } = req.params;

//   try {
//     const singlePart = await UpDownloadHelper.uploadSingleFile(req);
//     const { attrb: { file, fields, filename }, status: { status } } = singlePart;

//     if (status === 'succeed') {
//       try {
//         const result = await req.context.models.products.update(
//           {
//             house_name: fields.house_name,
//             house_title: fields.house_title,
//             house_rating: parseInt(fields.house_rating),
//             house_bedrooms: parseInt(fields.house_bedrooms),
//             house_occupied: parseInt(fields.house_occupied),
//             house_beds: parseInt(fields.house_beds),
//             house_baths: parseInt(fields.house_baths),
//             house_address: fields.house_address,
//             house_province: fields.house_province,
//             house_city: fields.house_city,
//             house_country: fields.house_country,
//             house_latitude: fields.house_latitude,
//             house_longitude: fields.house_longitude,
//             house_offer: fields.house_offer,
//             house_approval: fields.house_approval,
//             house_hosted_account: fields.hosted_account
//           },
//           { returning: true, where: { house_id: parseInt(houseId) } }
//         );
//         return res.send(result);
//       } catch (error) {
//         return res.send(404).send(error);
//       }
//     }
//     return res.send(status);
//   } catch (error) {
//     return res.send(error);
//   }
// }

const deleteHouse = async (req, res) => {
  const { houseId } = req.params;

  const dataImages = await IndexController.HouseImageCtrl.findHouseImagesById(req);

  // hapus image pada directory
  const sep = "/";
  dataImages.map((value) => {
    const urlImage = value.hoim_url_name;
    let fileName = urlImage.substr(urlImage.lastIndexOf(sep), urlImage.length).replace(sep, "");
    let filePath = `${process.cwd()}/${process.env.UPLOAD_DIR}/${fileName}`;
    fs.unlink(filePath, error => {
      if (error) console.log(error);
    });
  });

  try {
    const result = await req.context.models.houses.destroy({
      where: { house_id: parseInt(houseId) }
    });
    return res.send("delete " + result + " rows.")
  } catch (error) {
    return res.sendStatus(404).send("Data not found.")
  }
}

const createHouseImage = async (req, res, next) => {
  try {
    const multiPart = await UpDownloadHelper.uploadMultipleFile(req);
    const { files, fields, status: { status } } = multiPart;

    if (status === 'succeed') {
      try {
        const resultHouse = await req.context.models.houses.create({
          house_name: fields.house_name,
          house_title: fields.house_title,
          house_rating: parseInt(fields.house_rating),
          house_bedrooms: parseInt(fields.house_bedrooms),
          house_occupied: parseInt(fields.house_occupied),
          house_beds: parseInt(fields.house_beds),
          house_baths: parseInt(fields.house_baths),
          house_address: fields.house_address,
          house_province: fields.house_province,
          house_city: fields.house_city,
          house_country: fields.house_country,
          house_latitude: fields.house_latitude,
          house_longitude: fields.house_longitude,
          house_offer: fields.house_offer,
          house_approval: fields.house_approval,
          house_hosted_account: fields.hosted_account
        });

        const houseId = resultHouse.dataValues.house_id
        req.houseId = houseId;
        req.files = files;
        next();

      } catch (error) {
        return res.send(404).send(error);
      }
    }

  } catch (error) {
    return res.send(error);
  }
}



export default {
  findAllRows,
  findHouseById,
  createHouse,
  createHouseImage,
  deleteHouse
}