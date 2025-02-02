import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
	api_key: process.env.CLOUDINARY_API_KEY, 
	api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uplodOnCloudinary = async (file) => {
	try{
		if(!file) return null;

		let response = await cloudinary.uploader.upload(file, {
			resource_type: 'auto'
		})
		console.log("File has Been uploaded on Cloudinary: ",response.url);
		return response;
	}catch(err){
		fs.unlinkSync(file);
		return null;
	}
}

export {uplodOnCloudinary};