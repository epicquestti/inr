export default interface IEmailProvider {
  sendNewUserEmail(
    destinatarios: { nome: string; email: string }[]
  ): Promise<any>
}
