import React from 'react'
export function ConditionalDisplay({condition=false,children}){
    return(
        <>
        {
        condition && children
        }
        </>
    )
}