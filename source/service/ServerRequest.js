
class ServerRequest{
    constructor(pkg){
        this.package = pkg;
        this.onCompleted = null
        this.onError = null;
        this.onProgress = null
    }
    setPackage(pkg)
    {
        this.package = pkg;
    }
    execute()
    {
       this.get()
    }
    get()
    {
        var current = this;
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
            return;
            }

            if (request.status === 200) {
                try{
                 current.onResult(JSON.parse( request.responseText))
                } catch (e)
                {
                    current.onErrorRequest(request.status,request)
                }
            } else {
                current.onErrorRequest(request.status,request)
            }
        };

        if (this.package==null) return ;
        request.open('GET', this.package.query);
        request.send();
    }
    setOnCompleted(method)
    {
        this.onCompleted = method;
    }
    setOnError(method)
    {
      
        this.onError = method;
    }
    setOnProgress(method)
    {
        this.onProgress = method;
    }
    onResult(json)
    {
       
        if (this.onCompleted!=null) this.onCompleted(this.package.cmd,json);

    }
    onErrorRequest(error,body)
    {
        
        console.log("[Request]: Error "+body.responseText)
        if (this.onError!=null) this.onError(this.package.cmd,json);
    }
    uploadImage()
    {
        const data = new FormData();
        data.append( this.package.label, {
        uri: this.package.data ,
        type: this.package.datatype,
        name: this.package.name
        });
        //'image/jpeg'
        console.log(data)
        this.requestEx(this.package.query,{body:data,method:"POST"})
    }
    onProgressRequest(e){
        if (this.onProgress!=null) this.onProgress(e);
    }
    requestEx(url, opts={}) {
        
       
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method, url);
            for (var k in opts.headers||{})
                xhr.setRequestHeader(k, opts.headers[k]);
            xhr.onload = e =>{this.onResult(xhr.responseText)};
            xhr.onerror = e =>{this.onErrorRequest(e,xhr)};
 
            if (xhr.upload )
                xhr.upload.onprogress =  (e)=>{
                 
                    this.onProgressRequest(e)}; // event.loaded / event.total * 100 ; //event.lengthComputable
            xhr.send(opts.body);
            console.log("[Request]: Uploading "+url)
    }
    

}

export default ServerRequest;
