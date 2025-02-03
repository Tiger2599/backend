import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hashSalt } from "../constants.js";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true
		},
		fullname: {
			type: String,
			required: true,
			trim: true,
			index: true
		},
		avatar: {
			type: String,
			required: true
		},
		converImage:{
			type: String
		},
		watchHistory: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Video'
			}
		],
		password: {
			type: String,
			required: [true,'password is required']
		},
		refreshToken:{
			type: String
		}
	},
	{
		timestamps: true
	}
);

userSchema.pre('save',async function(next){
	if(!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, hashSalt);
	next();
})

userSchema.methods.isPasswordMatch = async function(password){
	return bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
			fullname: this.fullname
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TKOEN_EXPIRES_IN
		}
	);
}

userSchema.methods.generateRefereshToken = function(){
	return jwt.sign(
		{
			_id: this._id
		},
		process.env.REFERESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFERESH_TOKEN_EXPIRES_IN
		}
	);
}

export const User = mongoose.model('User',userSchema);