import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config();
connectDB()
.then(() => {
	app.listen(process.env.PORT || 8000, () => {
		console.log(`Server is running on port http://localhost:${process.env.PORT || 8000}`);
	});
})
.catch(err=>console.error(err.message));