import jwt from "jsonwebtoken";

class JwtService {
  constructor() {
    this.secretKey = "mySecretKey";
    this.expirationTime = "1h";
  }

  generateToken(user) {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expirationTime,
    });
  }

  verifyToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
          status: 403,
          message: "access denied: no bearer token provided",
        });
      }

      const token = authHeader.split(" ")[1];

      jwt.verify(token, this.secretKey, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 401,
            message: "invalid or expired token",
          });
        }

        req.user = decoded;
        next();
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "ERROR",
      });
    }
  }
}

export default new JwtService();
