import { Accordion, AccordionDetails, AccordionSummary, Button, Container, Grid, Snackbar, TextField, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { TaskApi } from '../../api/task';
import { ConditionalDisplay } from '../component/conditionalDisplay';
import { Loading } from '../component/loading';
import { Pagination } from '../component/pagination';
import setting from './../../setting';
import { Url } from './../../utility';
import { TaskList } from './tasklist';

export function Task(){
    const url=new Url(document.location.href)
    const [queryParameter, setQueryParameter] = useState(url.search)
    const [search, setSearch] = useState(queryParameter.search)
    const [fromTime, setFromTime] = useState(queryParameter.fromTime)
    const [toTime, setToTime] = useState(queryParameter.toTime)
    const [loading, setLoading] = useState(true)
    const [listData, setListData] = useState(null)
    const [apply, setApply] = useState(false)
    const location=useLocation()
    const history =useHistory()
    
    //handle SnackBar start
    const [snackMessage, setSnackMessage] = useState('')
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    
      const { vertical, horizontal, open } = state;
      const handleClose = () => {
        setState({ ...state, open: false });
      };    
    // handle snackbar end
    
    useEffect(() => {
        delete queryParameter.format
                
        //update queryParameter
        if(!search)
            (delete queryParameter.search)
        else
            queryParameter['search']=search
        if(!fromTime)
            (delete queryParameter.fromTime)
        else
            queryParameter['fromTime']=fromTime
        if(!toTime)
            (delete queryParameter.toTime)
        else
        queryParameter['toTime']=toTime
        // update url of browser [only view]
        url.search=queryParameter
        history.push(location.pathname+url.getQueryParams()) 

        //change app view state as loading
        setLoading(true)
        setListData(null)
        //send request to server
        console.log(url.search,'queryParameter',queryParameter)
        TaskApi({
            action:'list',
            params:queryParameter,
            callback:(data,status)=>{
                if(status==200){
                    setListData(data)
                    setLoading(false)
                }else{
                    setSnackMessage('fail to fetch the data')
                    setState({...state,open:true})
                }
            }   
        })
    }, [queryParameter,apply])

    // handle all event that happened as status change
    // this all event are related with a single Task 
    function selectedItemCallback({selectedItem,actionType,index,target}){
        switch(actionType){
            case 'itemClick':
                history.push(setting.reactRouterRoot+'/updatetask/'+selectedItem.id+'/')
                break
            case 'statusChange':
                listData.results[index].status=!listData.results[index].status
                setListData({count: listData.count,next: listData.next,previous: listData.previous,results:[...listData.results]})
                TaskApi({
                    action:'updateStatus',
                    params:queryParameter,
                    id:selectedItem.id,
                    data:{
                        id:selectedItem.id,
                        status:selectedItem.status
                    },
                    callback:(data,status)=>{
                        if(status==200){
                            setSnackMessage('Task Status Updated')
                            setState({...state,open:true})
                            
                        }
                        else if(status==404){
                            setSnackMessage('Task does not exist')
                            setState({...state,open:true})
                            
                        }
                        else{
                            setSnackMessage('unknown error')
                            setState({...state,open:true})
                        }
                    }   
                })
                break
            case 'deleteItem':
                listData.results.splice(index,1)
                setListData({count: listData.count,next: listData.next,previous: listData.previous,results:[...listData.results]})
                TaskApi({
                    action:'delete',
                    id:selectedItem.id,
                    data:{
                        id:selectedItem.id,
                    },
                    callback:(data,status)=>{
                        if(status==200 || status==204 ){
                            setSnackMessage('Task is deleted')
                            setState({...state,open:true})
                            
                        }
                        else if(status==404){
                            setSnackMessage('Task does not exist')
                            setState({...state,open:true})
                            
                        }
                        else{
                            setSnackMessage('unknown error')
                            setState({...state,open:true})
                        }
                    }   
                })
                break
        }   
    }
    return(
        <Container maxWidth='sm'>  
            <Filter search={search} setSearch={setSearch} fromTime={fromTime} setFromTime={setFromTime} toTime={toTime} setToTime={setToTime} setApply={setApply} apply={apply} />
            <Loading show={loading} top={20}/>
            <ConditionalDisplay condition={listData}>
                <TaskList dataList={listData && listData.results} selectedItemCallback={selectedItemCallback} />
                <Pagination prev={listData && listData.previous} next={listData && listData.next} page={queryParameter.page} setPage={(newpage)=>{console.log(newpage);setQueryParameter({...queryParameter,page:newpage})}} />
            </ConditionalDisplay>
            <ConditionalDisplay condition={listData && listData.results.length==0}>
                <Typography variant='subtitle1' align='center'>
                    You have no task
                </Typography>
            </ConditionalDisplay>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={snackMessage}
                key={vertical + horizontal}
            />
        </Container>
    );
}
function Filter({search,setSearch,fromTime,setFromTime,toTime,setToTime,setApply,apply}){
    const [expanded, setExpanded] = useState(false)
    return(
        <>
        <Accordion expanded={expanded} onChange={()=>setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
        <Typography >Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Container>
                <Grid sm={12}>
                    <Grid>
                        <Grid>
                            <Typography variant='caption' > Search </Typography>
                        </Grid>
                        <Grid>
                            <TextField fullWidth={true} value={search} type='search' onChange={(e)=>setSearch(e.target.value)} />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid>
                        <Grid>
                            <Typography variant='caption'>From Time</Typography>
                        </Grid>
                        <Grid>
                            <TextField fullWidth={true} value={fromTime && (new Date(parseInt(fromTime)*1000)).toISOString().slice(0, 16)} type='datetime-local' onChange={(e)=>setFromTime(((new Date(e.target.value)).getTime()/1000))} />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid>
                        <Grid>
                            <Typography variant='caption'>To Time</Typography>
                        </Grid>
                        <Grid>
                            <TextField fullWidth={true} value={toTime && (new Date(parseInt(toTime)*1000)).toISOString().slice(0, 16)}  type='datetime-local' onChange={(e)=>setToTime(((new Date(e.target.value)).getTime()/1000))} />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid>
                        <Button color='primary' variant='contained' onClick={()=>setApply(!apply)}>
                            Apply Filter
                        </Button>
                        <span> </span>
                        <Button color='secondary' onClick={()=>{setToTime('') ; setFromTime('') ; setSearch('');setApply(!apply)}}> Clear Filter</Button>
                    </Grid>
                </Grid>
            </Container>
        </AccordionDetails>
      </Accordion>

        </>
    )
}