export type securityContextTypes = {
  usuario?: securityContextUser
}

export type securityContextUser = {
  nome: string
  tipo: { _id: string; tipo: string }
  credential: string
  permissoes: {
    _id: string
    nome: string
    icone: string
    tipo: string
    root: string
    acoes: string[]
  }[]
}
