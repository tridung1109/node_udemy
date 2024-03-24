
const path = require('path');

const uploadSingleFile = async(fileObject) => {

    let resultArr = null;
    let countSuccess = 0;
    let uploadPath = path.resolve(__dirname, '../public/image');

    let extName = path.extname(fileObject.name);
    let baseName = path.basename(fileObject.name, extName);

    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

   try {
        await fileObject.mv(finalPath);

        resultArr ={
            status: 'success',
            path: finalName,
            fileName: fileObject.name,
            error: null
        }

        countSuccess ++;

   } catch (err) {
            
        resultArr = {
            status: 'failed',
            path: null,
            fileName: fileObject.name,
            error: JSON.stringify(err)
        }
   }

   return {
    countSuccess: countSuccess,
    detail: resultArr
}

}

const uploadMultipleFile = async(fileObject) => {

    let resultArr = [];
    let countSuccess = 0;
    let uploadPath = path.resolve(__dirname, '../public/image');

    const numberImage = fileObject.length;
    
    for(let i = 0; i < numberImage; ++i){

        let extName = path.extname(fileObject[i].name);
        let baseName = path.basename(fileObject[i].name, extName);

        let finalName = `${baseName}-${Date.now()}${extName}`;
        let finalPath = `${uploadPath}/${finalName}`;

        try {
            await fileObject[i].mv(finalPath);
            resultArr.push({
                status: 'success',
                path: finalName,
                fileName: fileObject[i].name,
                error: null
            })

            countSuccess ++;

        } catch (err) {

            resultArr.push({
                status: 'failed',
                path: null,
                fileName: fileObject[i].name,
                error: JSON.stringify(err)
            })
        }

    }

    return {
        countSuccess: countSuccess,
        detail: resultArr
    }
    

}

module.exports = {
    uploadSingleFile,
    uploadMultipleFile
}