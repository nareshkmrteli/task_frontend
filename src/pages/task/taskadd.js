import { Button, Card, CardContent, Container, Grid, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { TextField } from 'final-form-material-ui';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { TaskApi } from '../../api/task';


export function TaskAdd(){
    const history=useHistory()
    const [message, setMessage] = useState(null)
    function onSubmit(formdata){
        TaskApi({
            action:'create',
            data:formdata,
            callback:(data,status)=>{
                if(status==200 || status==201){
                    setMessage('Task is Added')

                }
                else if(status==400){
                    setMessage('Please, Validate the form')
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
            Add a task
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
                onSubmit={onSubmit}
                render={({handleSubmit,form,submitting,values})=>(
                    <form onSubmit={handleSubmit}>
                        <br/>
                        <Grid container alignContent='space-between' spacing={2}>
                            <Grid item sm={12}>
                                <Field name='name' fullWidth={true}  label='Name Of Task' required component={TextField}/>
                            </Grid>
                            <Grid sm={12}>
                                <Field name='fromTime' placeholder='' style={{width:'48%'}} type='datetime-local' label=' ' required component={TextField} />
                                <span> </span>
                                <Field name='toTime' style={{width:'48%'}} type='datetime-local' label=' ' required component={TextField}/>
                            </Grid>
                            <Grid item sm={12}>
                                <Field name='detail'  fullWidth={true} label='Details' required multiple={true} component={TextField}/>
                            </Grid>
                            <Grid item sm={12}>
                                <Button type='submit' disabled={submitting} variant='contained' color='primary' name='submit'>Add Task</Button>
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