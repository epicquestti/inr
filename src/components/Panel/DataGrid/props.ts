import { ReactNode } from "react"

export type headerDef = {
  field: string
  headerName: string
  align?: "center" | "left" | "right" | "justify"
  relation?: string
}

export type dataGridoptions = {
  children?: ReactNode
  count?: number
  page?: number
  rowsPerPage?: number
  dense?: boolean
  gridHeaders?: headerDef[]
  gridData?: any[]
  hideHeaders?: boolean
  hidePagination?: boolean
  rowsPerPageOptions?: number[]
  onPageChange?: (page: number) => void
  onRowsPerPageChange?: (rowsPerPage: number) => void
  onSelectedRow?: (id: number | string) => void
  loading?: boolean
  maxHeigthBody?: number
}
