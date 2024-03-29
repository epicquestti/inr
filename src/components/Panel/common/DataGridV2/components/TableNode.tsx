import { MoreVert } from "@mui/icons-material"
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  Typography
} from "@mui/material"
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state"
import { ChangeEvent } from "react"
import { actionList, headerList } from "../types"
export const TableNode = (
  listNode: any,
  headers: headerList[],
  isSelectable?: boolean,
  hasActions?: boolean,
  actionList?: actionList[],
  actionTrigger?: (id: string, name: string) => void
): JSX.Element[] => {
  const response: JSX.Element[] | undefined = []

  if (isSelectable) {
    response.push(
      <TableCell
        sx={{ border: "none" }}
        key={`grid-node-key-${listNode._id}-checkbox-firts`}
      >
        <Checkbox
          size="small"
          name="checkBox-intendify"
          onChange={(
            event: ChangeEvent<HTMLInputElement>,
            checked: boolean
          ) => {
            event.currentTarget.dataset.checkedState = checked ? "S" : "N"

            const list = Array.from(
              document.getElementsByName("checkBox-intendify")
            )
          }}
          inputProps={
            {
              // @ts-ignore
              "data-identificator": listNode._id,
              "data-checked-state": "N"
            } as any
          }
        />
      </TableCell>
    )
  }

  for (let i = 0; i < headers.length; i++) {
    response.push(
      <TableCell
        sx={{ border: "none" }}
        key={`grid-node-key-${listNode._id}-${i}`}
      >
        {listNode[headers[i].attrName as keyof typeof listNode]}
      </TableCell>
    )
  }

  if (hasActions) {
    response.push(
      <TableCell
        sx={{ border: "none" }}
        key={`grid-node-key-${listNode._id}-checkbox-last`}
      >
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <>
              <IconButton size="small" {...bindTrigger(popupState)}>
                <MoreVert fontSize="small" />
              </IconButton>
              <Menu {...bindMenu(popupState)}>
                {actionList &&
                  actionList.map((actionItem, index) => (
                    <MenuItem
                      key={`menu-item-grid-item-${listNode._id}-${index}`}
                      onClick={() => {
                        actionTrigger &&
                          actionTrigger(listNode._id, actionItem.name)
                        popupState.close()
                      }}
                    >
                      {actionItem.icon && actionItem.icon}
                      {actionItem.icon ? (
                        <Typography sx={{ marginLeft: 2 }} variant="caption">
                          {actionItem.text}
                        </Typography>
                      ) : (
                        <Typography variant="caption">
                          {actionItem.text}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
              </Menu>
            </>
          )}
        </PopupState>
      </TableCell>
    )
  }

  return response
}
