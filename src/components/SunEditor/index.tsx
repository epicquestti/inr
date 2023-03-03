import SunEditor, { buttonList } from "suneditor-react"

const CustomSunEditor = ({ ...props }) => {
  return (
    <SunEditor
      lang="pt_br"
      setOptions={{ buttonList: buttonList.complex }}
      {...props}
    />
  )
}

export default CustomSunEditor
