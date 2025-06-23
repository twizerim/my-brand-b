import bcrypt from "bcrypt";
import User, { Role } from "../model/user"; // Assuming you renamed the model to user

export const CreateDefaultAdmin = async () => {
  const defaultFirstName = process.env.FIRST_NAME || "Admin";
  const defaultLastName = process.env.LAST_NAME || "User";
  const defaultEmail = process.env.EMAIL || "admin@example.com";
  const defaultPassword = process.env.ADMIN_PASSWORD || "password123";

  const existingAdmin = await User.findOne({ email: defaultEmail });
  if (existingAdmin) {
    console.log("Default admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const admin = new User({
    firstName: defaultFirstName,
    lastName: defaultLastName,
    email: defaultEmail,
    password: hashedPassword,
    role: Role.ADMIN,
  });

  await admin.save();
  console.log("Default admin created successfully");
};
