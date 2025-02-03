import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const config = {
    cloud_name: "dgzmoqljy",
    api_key: "763881926851387",
    api_secret: "8AOIvnpRCA4nlsIvepVu30bI_OU",
};
cloudinary.config(config);

const uplodOnCloudinary = async (file) => {
    try {
        if (!file) return null;

        let response = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });

        fs.unlinkSync(file);
        return response;
    } catch (err) {
        console.error("cloudinary Err:", err);

        fs.unlinkSync(file);
        return null;
    }
};

export { uplodOnCloudinary };
