import { ReactNode } from "react"

export type headerList = {
  text?: string
  attrName?: string
}

export type actionList = {
  text: string
  name: string
  icon: JSX.Element
}

export type groupActionList = {
  text: string
  name: string
  icon: string
}

export type qhGridProps = {
  children?: ReactNode
  loading?: boolean
  selectable?: boolean
  hasActions?: boolean
  headers?: headerList[]
  data?: any[]
  actions?: actionList[]
  actionTrigger?: (id: string, actionName: string) => void
  groupActions?: groupActionList[]
  groupActionTrigger?: (list: string[], actionName: string) => void
  pagination?: {
    count: number
    page: number
    rowsPerPage: number
    rowsPerPageOptions?: (
      | number
      | {
        value: number
        label: string
      }
    )[]
    onRowsPerPageChange?: (rowsPerPAge: number) => void
    onPageChange?: (page: number) => void
  }
}
