import { Button, Paper } from "@material-ui/core";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';

export function Pagination2({prev,next}){
    const location=useLocation()
    const history=useHistory()
    prev=prev && location.pathname+'?'+prev.split('?')[1].replace('&&','').replace('format=json','')    
    next=next && location.pathname+'?'+next.split('?')[1].replace('&&','').replace('format=json','')  
    return(
        <>
        {   (prev || next) &&
            <Paper style={{textAlign:"right"}}>
                {prev && <Link to={prev}><Button onClick={()=>history.push(prev)}   size='small'><NavigateBeforeIcon /></Button></Link>}
                {next && <Link to={next}><Button  size='small'><NavigateNextIcon /></Button></Link>}
            </Paper>
        }
        </>
    )
}

export function Pagination({prev,next,page,setPage}){
    return(
        <>
        {   (prev || next) &&
            <Paper style={{textAlign:"right"}}>
                {prev && <Button onClick={()=>setPage(parseInt(page)-1)}   size='small'><NavigateBeforeIcon /></Button>}
                {next && <Button onClick={()=>page?setPage(parseInt(page)+1):setPage(2)} size='small'><NavigateNextIcon /></Button>}
            </Paper>
        }
        </>
    )
}

