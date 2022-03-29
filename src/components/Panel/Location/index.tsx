import { Breadcrumbs, Icon, Link } from "@mui/material"
import React, { FC } from "react"
import { locationtProps } from "./props"

const Location: FC<locationtProps> = ({ ...props }) => {
  return (
    <Breadcrumbs>
      {props.location &&
        props.location.map((local, index) => (
          <Link
            key={`breadcrumbs-ident-${`${index.toString()}-${
              Math.random() * (999999 - 1) + 1
            }`}`}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href={local.href}
          >
            <Icon sx={{ mr: 0.5 }} fontSize="inherit">
              {local.iconName}
            </Icon>
            {local.text}
          </Link>
        ))}
    </Breadcrumbs>
  )
}

export default Location
