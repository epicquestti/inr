import { ReactNode } from "react"

export type IAccessItem = {
  icon: string
  text: string
  opened: boolean
  path: string
  childrens?: IAccessItem[]
}

export type ListMenuProps = {
  children?: ReactNode
  userAccess?: IAccessItem[]
  toggleThis?: (index: number) => void
  startBackDrop?: () => void
  closeBackDrop?: () => void
  drawerOpened: boolean
}
