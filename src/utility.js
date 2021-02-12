export function Url(url){
    this.url=url;
    this.path=''
    this.search={}
    this.hash=null
    {
        const h=this.url.split('#')
            if(h.length>1){
                this.hash=h[1]
                this.url=h[0]
            }
        const a=this.url.split('?')
        this.path=a[0]
        if(a.length >1){
            let b=a[1].split('&')
            b.forEach(e => {
                if(e!=''){
                    const [c,d]=e.split('=')
                    this.search[c]=d
                }
            });
        }
    }
    this.add=(key,value)=>{

        this.search[key]=value
        return this
    }
    this.addMultiple=(dict)=>{
        for(let  i in dict)
            this.search[i]=dict[i]
        return this
    }
    this.remove=(key)=>{
        delete this.search[key]
        return this
    }
    this.addHash=(hash)=>{
        this.hash=hash
    }
    this.removeHash=()=>{
        this.hash=null
    }
    this.url=()=>{
        var s=''
        for(let i in this.search){
            s+=i+'='+this.search[i]+'&'
        }
        s=s.slice(0,-1)
        if(this.hash)
            s+=this.hash
        return this.path+'?'+s
        
    }
    this.getQueryParams=()=>{
        var s=''
        for(let i in this.search){
            s+=i+'='+this.search[i]+'&'
        }
        s=s.slice(0,-1)
        if(this.hash)
            s+=this.hash
        return '?'+s
        
    }
}