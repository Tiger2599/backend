import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErros.js";
import { Apiresponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uplodOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if ([username, fullname, email, password].some((v) => !v)) {
        throw new ApiError(400, "Please fill all fields");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (existedUser) {
        throw new ApiError(409, "Username or Email already exists");
    }

    const avatarImgPath = req.files?.avatar[0]?.path;
	if (!avatarImgPath) {
        throw new ApiError(400, "Please upload an avatar");
    }

    let coverImgPath = "";
    if (
        req.files &&
        req.files.cover &&
        Array.isArray(req.files.cover) &&
        req.files.cover.length > 0
    ) {
        coverImgPath = req.files.cover[0].path;
    }

    const avatar = await uplodOnCloudinary(avatarImgPath);
    const cover = await uplodOnCloudinary(coverImgPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required.");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        password,
        avatar: avatar.url,
        converImage: cover?.url || "",
    });

    let createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(500, "Server Error");
    }

    return res
        .status(201)
        .json(new Apiresponse(201, createdUser, "User created successfully"));
});

export { registerUser };
