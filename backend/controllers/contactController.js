import Message from "../models/Message.js";
import sendEmail from "../utils/sendEmail.js";

export const sendMessage = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    
    await Message.create({ name, email, message });

    await sendEmail({
      subject: "New Portfolio Message",
      text: `${name} (${email}) says: ${message}`,
    });

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact Error:", error);

    if (error.code === "ECONNECTION") {
      return res.status(500).json({ success: false, message: "Database connection error." });
    }

    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
};
