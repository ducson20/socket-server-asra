import User from "../../../models/user.model.js";

export const createUser = async (args = {}) => {
  // Validate args
  const validateArgs = (args = {}) => {
    const { username, thumbnail } = args;
    console.log("username create: ", args);
    if (!username) {
      throw new Error(`Property "${username}" empty/null`);
    }

    return args;
  };

  const { username, thumbnail } = await validateArgs(args);

  // Create a User into database
  const user = new User({
    username: username,
    thumbnail: thumbnail,
    numberOfNewNotification: 0,
    status: false,
  });

  // Save User in the database
  await user.save(user);
};

export const checkUserExited = async (username) => {
  // Validate username
  if (!username) {
    throw new Error(`Property "${username}" empty/null`);
  }

  try {
    // Find user on database
    const user = await User.findOne({ username: username });

    if (user?.username === username) return { isExited: true };
    else return { isExited: false };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateNumberOfNewNotification = async (args = {}) => {
  // Validate args
  const validateArgs = (args = {}) => {
    const { receiverName, numberOfNewNotification } = args;

    Object.keys(args).forEach((key) => {
      if (!args[key]) {
        throw new Error(`Property "${key}" empty/null`);
      }
    });

    return args;
  };

  const { receiverName, numberOfNewNotification } = await validateArgs(args);

  try {
    const user = await User.findOne({ username: receiverName });

    // Validate user on database
    if (!user) throw new Error("User does not exist");

    // Set number of new notification into database
    user.numberOfNewNotification += 1;

    // Update number of notification into database
    return await user.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

export const resetNumberOfNewNotification = async (username) => {
  // Validate username
  if (!username) {
    throw new Error(`Property "${username}" empty/null`);
  }

  try {
    const user = await User.findOne({ username: username });

    // Validate user on database
    if (!user) throw new Error("User does not exist");

    // Set number of new notification into database
    user.numberOfNewNotification = 0;

    await user.save();
    // Update number of notification into database
    return { numberOfNewNotification: user.numberOfNewNotification };
  } catch (err) {
    throw new Error(err.message);
  }
};
