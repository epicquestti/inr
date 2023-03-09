import SunEditor, { buttonList } from "suneditor-react"

const CustomSunEditor = ({ ...props }) => {
  return (
    <SunEditor
      lang="pt_br"
      setOptions={{
        buttonList: buttonList.formatting
      }}
      {...props}
    />
  )
}

export default CustomSunEditor
