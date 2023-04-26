import jwt from "jsonwebtoken";

const secret = "test";

const authenticate = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if(token)
        {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData?.id;
        }
        next();
    }
    catch(e)
    {
        console.log(e);
    }
};

export default authenticate;