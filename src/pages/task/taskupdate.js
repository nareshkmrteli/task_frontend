import { Button, Card, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TextField } from 'final-form-material-ui';
import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory, useParams } from 'react-router-dom';
import { TaskApi } from '../../api/task';
import setting from '../../setting';


export function TaskUpdate(){
    const [message, setMessage] = useState(null)
    const history=useHistory()
    const params=useParams()
    const [intialFormState, setIntialFormState] = useState({})
    useEffect(() => {
        if(params.id){
            // fetch the task data
            TaskApi({
                action:'get',
                id:params.id,
                callback:(data,status)=>{
                    if(status==200){
                        data.fromTime=new Date(data.fromTime).toISOString().slice(0, 16)
                        data.toTime=new Date(data.toTime).toISOString().slice(0, 16)
                        setIntialFormState(data)
                    }
                    else if(status==404){
                        setMessage('Task Not Found')
                        setTimeout(()=>history.push(setting.reactRouterRoot+'/' ),2000)
                    }
                    else{
                        setMessage(':( Fail to retrive the the task')
                    }
                }   
            })
        }
    }, [])
    // update the task data with form handle
    function onSubmit(formdata){
        TaskApi({
            action:'update',
            id:formdata.id,
            data:formdata,
            callback:(data,status)=>{
                if(status==200){
                    setMessage('Task is Updated')
                    setTimeout(()=>history.push(setting.reactRouterRoot+'/' ),2000)

                }
                else if(status==404){
                    setMessage('Task Not Found')
                }
                else{
                    setMessage(':( Fail to add the task')
                }
            }   
        })
    }
    return(
        <Container maxWidth='sm'>
        <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Update the task
          </Typography>
            {
                message &&
                <Alert severity='info' onClick={()=>setMessage('')}>
                    <AlertTitle>
                        {message}    
                    </AlertTitle>
                    
                </Alert>
            }
            <Form
                initialValues={intialFormState}
                onSubmit={onSubmit}
                render={({handleSubmit,form,submitting,values})=>(
                    <form onSubmit={handleSubmit}>
                        <br/>
                        <Grid container alignContent='space-between' spacing={2}>
                            <Grid item sm={12}>
                                <Field name='name' value={values.name} fullWidth={true}  label='Name Of Task' required component={TextField}/>
                            </Grid>
                            <Grid sm={12}>
                                <Field name='fromTime'  placeholder='' style={{width:'48%'}} type='datetime-local' label=' ' required component={TextField} />
                                <span> </span>
                                <Field name='toTime'  style={{width:'48%'}} type='datetime-local' label=' ' required component={TextField}/>
                            </Grid>
                            <Grid item sm={12}>
                                <Field name='detail'   fullWidth={true} label='Details' required multiple={true} component={TextField}/>
                            </Grid>
                            <Grid item sm={12}>
                                <Button type='submit' disabled={submitting} variant='contained' color='primary' name='submit'>Update Task</Button>
                            </Grid>
                        </Grid>
                        <br/>
                    </form>
                )}
            />
        </CardContent>
        </Card>
        </Container>
       )
}