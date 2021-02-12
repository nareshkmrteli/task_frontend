import axios from "axios";
import qs from "qs";
import setting from 'setting';

export async function TaskApi(props){
    
    const source=axios.CancelToken.source();
    
    const config={
        baseURL:setting.root+'/task/task/',
        CancelToken:source.token,
    }

    config['params']={}

    if(props.params)
        config['params']=props.params
    config['params']['format']='json'
    
    switch(props.action){
        case 'get':
            config.url=''+props.id+'/';
            config.method='GET';
            break;
        case 'list':
            config.url='';
            config.method='GET';
            break;
        case "create":
            config.url='';
            config.method='POST';
            config.data=qs.stringify(props.data)
            break;
        case 'delete':
            config.url=''+props.id+'/';
            config.method='DELETE'
            config.data=qs.stringify(props.data)
            break;
        case 'update':
            config.url=''+props.id+'/';
            config.method='PUT'
            config.data=qs.stringify(props.data)
            break;
        case 'updateStatus':
            config.url=''+props.id+'/updateStatus/';
            config.method='POST';
            config.data=qs.stringify(props.data)
            break;
    }
    try{
        const res=await axios(config)
        props.callback(res.data,res.status)
    }catch(e){
        console.log(e)
        props.callback(e.request,e.request.status)
    }
}