import Mailgen from "mailgen"
import IEmailProvider from "./IEmailProvider"
import getConfig from "next/config"
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandOutput
} from "@aws-sdk/client-ses"

export default class EmailProvider implements IEmailProvider {
  async sendNewUserEmail(
    destinatarios: { nome: string; email: string }[]
  ): Promise<void> {
    try {
      const { serverRuntimeConfig } = getConfig()
      const { host, accessKeyId, secretAccessKey, accessRegion } =
        serverRuntimeConfig

      const mailGenerator = new Mailgen({
        theme: "default",
        product: {
          logo: "https://object.epicquestti.com.br/inr/assets/inr-logo-mail.png",
          name: "INR Publicações",
          link: host,
          copyright: `Copyright © ${new Date().getFullYear()} INR Publicações. Todos os direitos reservados.`
        }
      })

      const mailPromissesArray: Promise<SendEmailCommandOutput>[] = []

      for (let i = 0; i < destinatarios.length; i++) {
        const html = mailGenerator.generate({
          body: {
            name: destinatarios[i].nome,
            intro: [
              "Um bug foi reportado atravéz do aplicativo.",
              `Reporte realizado por:`,
              `Reporte Criado em:  as`
            ],
            greeting: "Olá",
            signature: "Atenciosamente",
            action: {
              instructions:
                "Clique no botão abaixo para acessar as informações do bug reportado.",
              button: {
                link: `${host}panel/reportes/`,
                text: "Acessar",
                color: "#1136C7"
              }
            },
            outro: [
              "Caso você tenha problemas com o botão ou seu cliente de email o bloqueie copie e cole o endereço abaixo.",
              `${host}panel/reportes/`
            ]
          }
        })

        const text = mailGenerator.generatePlaintext({
          body: {
            name: destinatarios[i].nome,
            intro: [
              "Um bug foi reportado atravéz do aplicativo.",
              `Reporte realizado por:`,
              `Reporte Criado em:  as`
            ],
            greeting: "Olá",
            signature: "Atenciosamente",
            action: {
              instructions:
                "Clique no botão abaixo para acessar as informações do bug reportado.",
              button: {
                link: `${host}panel/reportes/`,
                text: "Acessar",
                color: "#1136C7"
              }
            },
            outro: [
              "Caso você tenha problemas com o botão ou seu cliente de email o bloqueie copie e cole o endereço abaixo.",
              `${host}panel/reportes/`
            ]
          }
        })

        const clientSES = new SESClient({
          region: accessRegion,
          credentials: {
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
          }
        })

        mailPromissesArray.push(
          clientSES.send(
            new SendEmailCommand({
              Destination: {
                ToAddresses: [`${destinatarios[i].email}`]
              },
              Message: {
                Body: {
                  Text: {
                    Charset: "UTF-8",
                    Data: text
                  },
                  Html: {
                    Charset: "UTF-8",
                    Data: html
                  }
                },
                Subject: {
                  Charset: "UTF-8",
                  Data: "Notificação de Bug reportada por usuário"
                }
              },
              Source: "INR <naoresponder@publicacoesinr.com.br>"
            })
          )
        )
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
