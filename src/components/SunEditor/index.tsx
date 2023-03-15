import SunEditor, { buttonList } from "suneditor-react"

const CustomSunEditor = ({ ...props }) => {
  return (
    <SunEditor
      lang="pt_br"
      setOptions={{
        buttonList: buttonList.complex,
        height: "300"
      }}
      setContents={props.content}
      {...props}
    />
  )
}

export default CustomSunEditor
