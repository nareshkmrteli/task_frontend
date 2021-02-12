import { Typography } from '@material-ui/core'
import React from 'react'
export function Loading({show,top=0}){
    return(
        <>
        {show &&
        <Typography variant='body1' style={{marginTop:top+'px'}} align='center'>
             Loading ...
        </Typography>
        }
        </>
    )
}