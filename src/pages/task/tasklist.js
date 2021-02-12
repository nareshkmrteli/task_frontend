import { Checkbox, ListItemIcon, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { DeleteForeverOutlined } from "@material-ui/icons";
import React from "react";

export  function TaskList({dataList,selectedItemCallback=false}){
    
    function onclick(e){
        e.stopPropagation()
        const target=e.currentTarget
        const index= e.currentTarget.getAttribute("index")
        const actionType = e.currentTarget.getAttribute("actionType") 
        selectedItemCallback && selectedItemCallback({selectedItem:dataList[index],actionType:actionType,target:target,index:index})
    }

    return(
        <List>
        {
        dataList &&
        dataList.map((item,i)=>(
            <React.Fragment key={item.id}>
            <ListItem alignItems="flex-start" id={item.id} index={i} actionType='itemClick' button onClick={onclick}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.status}
                        tabIndex={-1}
                        disableRipple
                        index={i}
                        actionType='statusChange'
                        onClick={onclick}
                    />
                </ListItemIcon>
                <ListItemText
                primary={item.name}
                secondary={
                    <>
                    detail: {item.detail}
                    <br/>
                    from: {(new Date(item.fromTime.slice(0,-1))).toLocaleString()}
                    <br/>
                    to: {new Date(item.toTime.slice(0,-1)).toLocaleString()}
                    </>
                }
                />
                <ListItemSecondaryAction id={item.id} index={i} actionType='deleteItem' onClick={onclick}>
                    <DeleteForeverOutlined/>
                </ListItemSecondaryAction>
            </ListItem>
            
            <Divider/>
            </React.Fragment>
        ))
        }
        </List> 
    );
}