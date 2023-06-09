import * as dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

import cors from 'cors'
dotenv.config()

const port = 4000
const app = express()

app.use(cors())
app.use(express.json())

app.post('/send', (request, response) => {
  const { name, email, phone, service, menssage } = request.body
  console.log(name, email, phone, service, menssage)

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  })

  console.log(service)

  const sendEmail = {
    from: `${name} <${email}>`,
    to: process.env.EMAIL,
    subject: `${service}`,
    text: `${menssage} ${phone}`,
  }

  // console.log(process.env.EMAIL, process.env.PASSWORD)

  async function run() {
    transporter.sendMail(sendEmail, (err) => {
      if (err) {
        console.log(err)
      }

      console.log('email enviado com sucesso!')
    })

    return response.json()
  }

  run()
})

app.listen(port)
