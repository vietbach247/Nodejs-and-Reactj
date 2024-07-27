import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded; // Lưu thông tin user vào req
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token không hợp lệ" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      });
    }
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
