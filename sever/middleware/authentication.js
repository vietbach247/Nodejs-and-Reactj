import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Vui lòng đăng nhập" });
    }

    jwt.verify(token, "secretKey", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ" });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
