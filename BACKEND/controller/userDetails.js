const User = require("../model/User");
const nodemailer = require("nodemailer");
const phoneRegex = /^(?!0)\d{10}$/;
const nameRegex = /^[a-zA-Z]+$/;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: "entertainment0814@gmail.com",
        pass: "phyn wjju kgjv myos"
    }
});

exports.userDetails = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, userMessage } = req.body;
        if (!firstName || !lastName || !email || !phone || !userMessage) {
            return res.status(400).json({
                success: false,
                message: "Please enter all the necessary details",
            })
        }

        // Validate phone number pattern
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: "Invalid phone number"
            });
        }

        if (!nameRegex.test(firstName)) {
            return res.status(400).json({
                message: "Invalid First Name"
            })
        }

        if (!nameRegex.test(lastName)) {
            return res.status(400).json({
                message: "Invalid Last Name"
            })
        }

        const user = await User.create({
            firstName, lastName, email, phone, userMessage
        });

        res.status(200).json({
            success: true,
            user,
            message: "User Created Successfully"
        })

        let info = await transporter.sendMail({
            from: `${user.firstName} ${user.lastName} ${user.email}`,
            to: "nevil04@gmail.com",
            subject: "Mail From Client",
            html:`Hi, I am ${user.firstName}, ${user.userMessage}, My Phone Mobile:${user.phone}, My Email Address: ${user.email}`,
        })

        // console.log(doc.email)
        console.log("info",info);


    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "User can not be created"
        })
    }
}
