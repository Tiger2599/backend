import multer from "multer";

const storage = multer.diskStorage({
	destination:async(req,file,cd)=>{
		cd(null,"./public/temp");
	},
	filename:async(req,file,cd)=>{
		cd(null,file.originalname);
	}
})

export const upload = multer({storage});