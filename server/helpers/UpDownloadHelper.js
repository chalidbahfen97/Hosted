import "dotenv/config"
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';

const uploadDir = process.cwd() + '/storages/';

const uploadSingleFile = async (req) => {
  const options = {
    multiples: false,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  }
  const form = formidable(options);

  const result = new Promise((resolve, reject) => {
    //config option for formidale

    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {

      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      }
      else {
        form._error(new Error('File type is not supported'));
      }
    }


    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`

        });
      }

      if (files.uploadFile.length > 1) {

        return reject({
          status: "error",
          message: "only one file allowed"
        });
      }

      const uploadFile = files.uploadFile.path;

      const sep = path.sep;
      const fileName = uploadFile.substr(uploadFile.lastIndexOf(sep), uploadFile.length).replace(sep, "");

      return resolve({
        attrb: {
          file: files.uploadFile,
          fields: fields,
          filename: fileName
        },
        status: {
          status: "succeed",
          message: ""
        }
      })
    })
  });
  return result;
}

const uploadMultipleFile = async (req) => {
  //config option for formidale
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024, // 5MB
  }
  const form = formidable(options);

  const result = new Promise((resolve, reject) => {

    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {

      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      }
      else {
        form._error(new Error('File type is not supported'));
      }
    }

    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`

        });
      }

      let listOfFiles = []

      if (files) {
        let fileAttr = {
          hoim_id: 0,
          hoim_url_name: "",
          prim_filesize: 0,
          prim_filetype: "",
        }


        const sep = path.sep;
        let uploadFile = ""
        let fileName = "";

        files.uploadFile.forEach((v) => {
          uploadFile = v.path;
          fileName = uploadFile.substring(uploadFile.lastIndexOf(sep), uploadFile.length).replace(sep, "");

          fileAttr = {
            hoim_id: 0,
            hoim_url_name: `${process.env.URL_IMAGE}/${fileName}`,
            hoim_filesize: v.size,
            hoim_filetype: v.type,
          }

          listOfFiles = [...listOfFiles, fileAttr]

        })
      }


      return resolve({
        files: listOfFiles,
        fields: fields
        ,
        status: {
          status: "succeed",
          message: ""
        }
      })


    })
  });
  return result;
}

const showHouseImage = async (req, res) => {
  const filename = req.params.filename;
  const url = `${process.cwd()}/${process.env.UPLOAD_DIR}/${filename}`;
  fs.createReadStream(url)
    .on("error", () => responseNotFound(req, res))
    .pipe(res);
}


function responseNotFound(req, res) {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found")
}


export default {
  uploadSingleFile,
  uploadMultipleFile,
  showHouseImage
}