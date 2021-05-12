import React from "react"

function Button ({ onClickFn, name }) {

    return (
        <button onClick={onClickFn}>{name}</button>
    )
}

export default Button;