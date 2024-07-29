import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dwqlf3rch",
  api_key: "955881962664859", // Đặt trong dấu ngoặc kép
  api_secret: "QpsIHkgTlevMRJqjNVUJswch1IY", // Đặt trong dấu ngoặc kép
});

export default cloudinary;
