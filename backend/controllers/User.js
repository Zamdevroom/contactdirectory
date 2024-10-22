import User from '../models/User.js';

export const signUp = async (req, res) => {
    try {
        const { firstname, lastname, username, password } = req.body;

        if (!firstname|| !lastname || !username || !password) {
            return res.status(400).json({ message: 'Missing details' });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists'});
        }

        const newUser = new User({ firstname, lastname, username, password});
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const getUser = async (req, res) => {
    try{
       const id = req.headers.authorization;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        console.error('Error getting user:', err);
        console.log(req.headers)
        res.status(500).send('Server Error');
    }
};




export const signIn = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Missing details' });
        }

        const existingUser = await User.findOne({ username, password });
        if (existingUser) {
            return res.status(201).json({ message: 'Logged In' , userID: existingUser._id});
        }

        res.status(400).json({ message: 'Invalid credentials' });

    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

        