import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core'
import { useState } from 'react'


export const SingleMenu = ({ buttons, menuName, offer, history }) => {

    const [anchor, setAnchor] = useState(null)

    const handleClick = (event) => {
        setAnchor(event.currentTarget)
    } 

    const handleClose = () => {
        setAnchor(null)
    }

    return (
        <div>
            <Button onClick={handleClick} variant="outlined" color="primary">{ menuName }</Button>
    
            <Menu
                anchorEl={anchor}
                keepMounted
                open={!!anchor}
                onClose={handleClose}
            >
                {buttons.map(button => (<MenuItem key={button.text}>
                            <Button variant="outlined" onClick={() => button.action(offer, history)} {...button.style}>
                                <Typography>
                                    {button.text}
                                </Typography>
                            </Button>
                            </MenuItem>))}
            </Menu>

        </div>
    )

}