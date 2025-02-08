const jwt = require('jsonwebtoken');
const secretKey = "230238";
const bcrypt = require('bcrypt');
const userDB = require('../databaseHandlers/userDB');

async function retrieveUserFromToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        console.error('Error retrieving user from token:', error);
        return null;
    }
}

async function retrieveUserFromTokenApi(req, res) {
    const {token} = req.body;
    try {
        const decoded = await retrieveUserFromToken(token);
        if (!decoded) {
            return res.status(401).json({message: 'Invalid token'});
        }

        res.json({user: decoded});
    } catch (error) {
        console.error('Error retrieving user from token:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await userDB.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ userID: user._id, username: user.username, userAdmin: user.admin, userPassword: user.password }, secretKey, { expiresIn: '6h' });
        res.json({ token: token });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function registration(req, res)  {
    try {

        const {username, password, makeAdmin} = req.body;
        const creationDate = new Date();
        const updateDate = new Date();
        const deletedDate = null;
        const admin = makeAdmin;
        const balance = 0;

        console.log(username);

        const existingUser = await userDB.findUserByUsername(username);

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userDB.addNewUser(username, hashedPassword, creationDate, updateDate, deletedDate, admin, balance);

        if (!newUser) {
            return res.status(500).json({message: 'Failed to create user'});
        }

        const currentUser = await userDB.findUserByUsername(username);

        const token = jwt.sign({userID: currentUser._id, username: currentUser.username, userAdmin: currentUser.admin, userPassword: currentUser.password}, secretKey, {expiresIn: '6h'});
        res.json({token: token});

        console.log("OK");

    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: error.message});
    }
}

async function getAllUsers(req, res) {
    const users = await userDB.getAllUsers();
    res.json(users);
}

async function checkAdmin(req, res) {
    const { token } = req.body;
    console.log(req.body);
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) {
        res.status(401).json({message: "Invalid token"});
    } else {
        res.json({ userAdmin: decoded.userAdmin, username: decoded.username });
    }
}

async function updateUser(req, res) {
    const { userID, username, admin, password, makeAdmin, updateDate } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!admin) {
        res.status(401).json({message: "You are not an admin"});
    } else {
        const updatedUser = await userDB.updateUser(userID, username, hashedPassword, makeAdmin, updateDate);
        res.json(updatedUser);
    }
}

async function deleteUser(req, res) {
    const { adminStatus, userID } = req.body;
    if (!adminStatus) {
        res.status(401).json({message: "You are not an admin"});
        console.log("You are not an admin");
    } else {
        const deletedUser = await userDB.deleteUser(userID);
        console.log(deletedUser);
        res.json(deletedUser);
    }
}

module.exports = {
    login,
    registration,
    retrieveUserFromToken,
    retrieveUserFromTokenApi,
    getAllUsers,
    checkAdmin,
    updateUser,
    deleteUser
};