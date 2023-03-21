import { createContext, PropsWithChildren, useContext, useState } from "react"
import { VisibilityIcon } from "../../../icon/Visibility"
import { ClickAwayListener } from "../../ClickAwayListener"
import { IconButton } from "../../IconButton"
import { TextField, TextFieldProps } from "../TextField"

const PasswordContext = createContext<{type: "text" | "password", onClick: () => void, onClose: () => void}>({type: "password", onClick: () => {}, onClose: () => {}})
const usePasswordContext = () => useContext(PasswordContext)

export const PasswordGroup = (props:PropsWithChildren) => {
    const [type, setType] = useState<"text" | "password">("password")
    const onClick = () => {
        setType(p => p === "password" ? "text": "password")
    }
    const onClose = () => setType("password")
    return (
      <PasswordContext.Provider value={{ type, onClick, onClose }}>
        <ClickAwayListener onClickAway={onClose}>{props.children}</ClickAwayListener>
      </PasswordContext.Provider>
    );
}

export const Password = (props:TextFieldProps) => {
    const {type, onClick, onClose} = usePasswordContext()
    return (
        <TextField
          {...props}
          type={type}
          icon={
            props.icon || (
              <IconButton onClick={onClick}>
                <VisibilityIcon
                  off={type === "text"}
                  viewBox="0 0 100 100"
                  width={"20"}
                />
              </IconButton>
            )
          }
          iconPosition={props.iconPosition || "right"}
        />
    );
}