import HttpRequest from "@lib/frontend/HttpRequest"
import { useRouter } from "next/router"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { securityContextTypes, securityContextUser } from "./types"
const contextDefault: securityContextTypes = {
  usuario: undefined,
  setUsuarioContext: () => {}
}
const SecurityContext = createContext<securityContextTypes>(contextDefault)
export function useSecurityContext(): securityContextTypes {
  return useContext(SecurityContext)
}

const SecurityContextControll: FC<{ children?: React.ReactNode }> = ({
  ...props
}) => {
  const router = useRouter()
  const [cookie, setCookie] = useCookies(["inrpanel"])
  const [usuario, setUsuario] = useState<securityContextUser | undefined>(
    undefined
  )

  const verifyLocal = (): securityContextUser | undefined => {
    try {
      const l = window.localStorage.getItem("inrpanel")
      if (!l) return undefined
      return JSON.parse(l) as securityContextUser
    } catch (error) {
      return undefined
    }
  }

  const verifyCookie = (): string | undefined => {
    try {
      return cookie.inrpanel ? cookie.inrpanel : undefined
    } catch (error) {
      return undefined
    }
  }

  const initContext = async () => {
    try {
      const hasLocal = verifyLocal()

      if (hasLocal) {
        setUsuario(hasLocal)

        setCookie("inrpanel", hasLocal.credential, {
          path: "/"
        })
      } else {
        const hasCookie = verifyCookie()

        if (hasCookie) {
          const newLogin = await HttpRequest.Post(
            "/api/auth/panellogincontingency",
            {
              credential: hasCookie
            }
          )

          if (newLogin.success) {
            setUsuario(newLogin.data)
          } else throw new Error(newLogin.message)
        } else throw new Error("Credenciais ausentes. Faça login.")
      }
    } catch (error: any) {
      console.log(error.message)
      router.push("/panel/autenticacao")
    }
  }

  const setUsuarioContext = async (usuario: securityContextUser) => {
    try {
      setUsuario(usuario)
    } catch (error: any) {
      console.log(error.message)
      router.push("/panel/autenticacao")
    }
  }

  useEffect(() => {
    initContext()
  }, [])

  useEffect(() => {
    if (usuario) {
      window.localStorage.setItem("inrpanel", JSON.stringify(usuario))

      setCookie("inrpanel", usuario.credential, {
        path: "/"
      })
    }
  }, [usuario])

  const providerValue: securityContextTypes = {
    usuario,
    setUsuarioContext: setUsuarioContext
  }

  return (
    <SecurityContext.Provider value={providerValue}>
      {props.children}
    </SecurityContext.Provider>
  )
}

export default SecurityContextControll
