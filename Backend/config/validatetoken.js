const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
    console.log("********");

    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({
            status: false,
            msg: "Authorization header missing"
        });
    }

    console.log("Header:", authHeader);

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            status: false,
            msg: "Invalid token format"
        });
    }

    const token = parts[1];

    // ✅ FIX: Change SEC_KEY to sec_key to match your Vercel dashboard
    console.log("SECRET:", process.env.sec_key); 

    try {
        // ✅ FIX: Use the lowercase variable here too
        const decoded = jwt.verify(token, process.env.sec_key);

        console.log("Decoded:", decoded);

        req.user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({
            status: false,
            msg: err.message
        });
    }
}

module.exports = { validateToken };