import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET_KEY || 'kaaanbannn', (err, user) => {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        req.user = user;
        return next();
    });
    return;
};