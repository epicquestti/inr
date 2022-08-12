import {
  SendEmailCommand,
  SendEmailCommandOutput,
  SESClient
} from "@aws-sdk/client-ses"
import { connect } from "@lib/backend"
import ReportDestinatario from "@schema/ReportDestinatarios"
import ReportesLifeCicle from "@schema/ReportesLifeCicle"
import Mailgen from "mailgen"
import { NextApiRequest, NextApiResponse } from "next"
import getConfig from "next/config"
import Reportes from "../../../../schemas/Reportes"

export default async function searchAtualizacoes(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    await connect()

    const ca = new Date()

    const reporteRes = await Reportes.create({
      createdAt: ca,
      type: req.body.reportType,
      status: "CRIADO",
      os: req.body.os,
      version: req.body.version,
      appId: req.body.appConfig.instanceName,
      lastBeReceived: req.body.appConfig.lastBeId,
      lastClassReceived: req.body.appConfig.lastClassId,
      notifyClassificador: req.body.appConfig.notifyClassificador,
      notifyBoletim: req.body.appConfig.notifyBoletim,
      tratamento: req.body.tratamento,
      nome: req.body.nome,
      email: req.body.email,
      ddd: req.body.ddd,
      fone: req.body.fone,
      isWhats: req.body.isWhats,
      contactWhats: req.body.contactWhats,
      contactEmail: req.body.contactEmail,
      contactLigacao: req.body.contactLigacao,
      contactNo: req.body.contactNo,
      descricao: req.body.descricao
    })

    await ReportesLifeCicle.create({
      reporte: reporteRes._id,
      event: "CRIADO",
      createdAt: new Date(),
      observacoes: `Report BUG - Status: CRIADO em: ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`
    })

    const { serverRuntimeConfig } = getConfig()
    const { host, accessKeyId, secretAccessKey, accessRegion } =
      serverRuntimeConfig

    const destinatariosList = await ReportDestinatario.find()

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

    for (let i = 0; i < destinatariosList.length; i++) {
      const html = mailGenerator.generate({
        body: {
          name: destinatariosList[i].nome,
          intro: [
            "Um bug foi reportado atravéz do aplicativo.",
            `Reporte realizado por: ${req.body.tratamento} ${req.body.nome}`,
            `Reporte Criado em: ${ca.toLocaleDateString()} as ${ca.toLocaleTimeString()}`
          ],
          greeting: "Olá",
          signature: "Atenciosamente",
          action: {
            instructions:
              "Clique no botão abaixo para acessar as informações do bug reportado.",
            button: {
              link: `${host}panel/reportes/${reporteRes._id}`,
              text: "Acessar",
              color: "#1136C7"
            }
          },
          outro: [
            "Caso você tenha problemas com o botão ou seu cliente de email o bloqueie copie e cole o endereço abaixo.",
            `${host}panel/reportes/${reporteRes._id}`
          ]
        }
      })

      const text = mailGenerator.generatePlaintext({
        body: {
          name: destinatariosList[i].nome,
          intro: [
            "Um bug foi reportado atravéz do aplicativo.",
            `Reporte realizado por: ${req.body.tratamento} ${req.body.nome}`,
            `Reporte Criado em: ${ca.toLocaleDateString()} as ${ca.toLocaleTimeString()}`
          ],
          greeting: "Olá",
          signature: "Atenciosamente",
          action: {
            instructions:
              "Clique no botão abaixo para acessar as informações do bug reportado.",
            button: {
              link: `${host}panel/reportes/${reporteRes._id}`,
              text: "Acessar.",
              color: "#1136C7"
            }
          },
          outro: [
            "Caso você tenha problemas com o botão ou seu cliente de email o bloqueie copie e cole o endereço abaixo.",
            `${host}panel/reportes/${reporteRes._id}`
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
              ToAddresses: [`${destinatariosList[i].email}`]
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

    if (mailPromissesArray.length > 0) {
      await ReportesLifeCicle.create({
        reporte: reporteRes._id,
        event: "INICIO ENVIO",
        createdAt: new Date(),
        observacoes: `Report BUG - Status: INÍCIO DO ENVIO em: ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`
      })

      Promise.all(mailPromissesArray).then(responseArray => {
        ReportesLifeCicle.create({
          reporte: reporteRes._id,
          event: "FIM ENVIO",
          createdAt: new Date(),
          observacoes: `Report BUG - Status: FIM DO ENVIO em: ${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString()}`
        }).then(async () => {
          await Reportes.updateOne(
            {
              _id: reporteRes._id
            },
            {
              status: "ENVIADO"
            }
          )
        })
      })
    }

    return res.status(200).send({
      success: true
    })
  } catch (error: any) {
    return res.status(200).send({
      success: false,
      message: error.message
    })
  }
}
