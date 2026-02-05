import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Kết nối đến cơ sở dữ liệu thành công");
  } catch (error) {
    console.error("Kết nối đến cơ sở dữ liệu thất bại:", error);
    process.exit(1); // thoát ứng dụng nếu không kết nối được DB
  }
};

export default connectDB;
