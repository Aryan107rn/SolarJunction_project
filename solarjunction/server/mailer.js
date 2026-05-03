import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
})

export const sendMail = ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"SolarJunction" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  })
}