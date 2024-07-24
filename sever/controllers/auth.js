import User from "../models/User";
import { registerValidate, loginValidate } from "../validations/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Types } from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load biến môi trường từ tệp .env

// Cấu hình Nodemailer với Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const Register = async (req, res, next) => {
  try {
    const { name, username, password, email, confirmPassword, phone } =
      req.body;

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Xác nhận mật khẩu không đúng" });
    }

    // Validate dữ liệu đăng ký
    const { error } = registerValidate.validate(
      { name, username, password, email, confirmPassword, phone },
      { abortEarly: false }
    );
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Kiểm tra email đã tồn tại
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }

    // Kiểm tra username đã tồn tại
    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(400).json({ message: "Username đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Tạo token xác thực
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Tạo người dùng mới
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      confirmPassword: hashedPassword,
      phone,
      isVerified: false,
      verificationToken, // Lưu token xác thực
    });

    newUser.password = undefined;

    // Tạo nội dung email xác thực
    const mailOptions = {
      to: newUser.email,
      from: process.env.EMAIL_USER,
      subject: "Xác thực tài khoản của bạn",
      html: `<p>Xin chào ${newUser.name},</p>
             <p>Cảm ơn bạn đã đăng ký tài khoản với chúng tôi! Để hoàn tất quá trình đăng ký, vui lòng xác thực tài khoản của bạn bằng cách nhấp vào liên kết dưới đây:</p>
             <a href="${process.env.FRONTEND_URL}/confirm-email/${newUser.verificationToken}">Xác thực tài khoản</a>
             <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này và tài khoản của bạn sẽ không bị thay đổi.</p>
             <p>Trân trọng,</p>
             <p>Đội ngũ hỗ trợ</p>`,
    };

    // Gửi email xác thực
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Lỗi khi gửi email:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi gửi email" });
      }
      console.log("Email đã được gửi:", info.response);
    });

    res.status(201).json({
      message:
        "Thêm người dùng thành công. Vui lòng kiểm tra email để xác thực tài khoản.",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate dữ liệu đăng nhập
    const { error } = loginValidate.validate(
      { username, password },
      { abortEarly: false }
    );
    if (error) {
      return res.status(400).json({
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    // Tìm người dùng theo username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Tên người dùng không tồn tại" });
    }

    // Kiểm tra xem tài khoản đã được xác thực chưa
    if (!user.isVerified) {
      return res.status(400).json({ message: "Tài khoản chưa được xác thực" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 3600,
    });

    user.password = undefined;

    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const data = await User.findOne(new Types.ObjectId(req.user.userId));
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Có lỗi xảy ra khi đăng xuất" });
      } else {
        console.log("Session deleted successfully");
        return res.status(200).json({ message: "Đăng xuất thành công" });
      }
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    console.log(resetPasswordToken);
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Thời gian hết hạn là 1 giờ
    await user.save();

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Đặt lại mật khẩu của bạn",
      html: `
        <p>Xin chào ${user.name},</p>
        <p>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Để đặt lại mật khẩu, vui lòng nhấp vào liên kết dưới đây hoặc dán liên kết vào trình duyệt của bạn:</p>
        <a href="${process.env.FRONTEND_URL}/resetPassword/${resetPasswordToken}" style="color: #007bff; text-decoration: none;">Đặt lại mật khẩu</a>
        <p>Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không bị thay đổi.</p>
        <p>Trân trọng,</p>
        <p>Đội ngũ hỗ trợ</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Lỗi khi gửi email:", error);
        return res.status(500).json({ message: "Có lỗi xảy ra khi gửi email" });
      }
      console.log("Email đã được gửi:", info.response);
      res.status(200).json({ message: "Email đã được gửi." });
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
    }

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Mật khẩu đã được đặt lại thành công" });
  } catch (error) {
    next(error);
  }
};

export const confirmEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Xác thực không thành công" });
    }

    // Chỉ cập nhật trạng thái khi không có lỗi
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Tài khoản đã được xác thực thành công" });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};
