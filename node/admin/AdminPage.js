let hash=window.location.hash.replace("#/",""),
    leftlist=document.getElementsByClassName('leftlist'),
    rightlist=document.getElementsByClassName("rightlist"),
    deletebutton=document.getElementById('delete'),
    checks=document.getElementsByClassName("checks"),
    buffer=[],
    allcheck=document.getElementById('allcheck');
 
//路由切换
leftlist[0].addEventListener("click",()=>{
    switchhash();
    window.location.hash=`#/`;
    switchhash();
});
for(let i=1;i<leftlist.length;i++){
    leftlist[i].addEventListener("click",()=>{
        switchhash();
        window.location.hash=`#/${i}`;
        switchhash();
    });
}
function switchhash(){
    hash=window.location.hash.replace("#/","");
    switch (hash) {
        case "":
            leftlist[0].classList.toggle("on");
            rightlist[0].classList.toggle("on");
            break;
        case "1":
            leftlist[hash].classList.toggle("on");
            rightlist[hash].classList.toggle("on");
            break;
        case "2":
            leftlist[hash].classList.toggle("on");
            rightlist[hash].classList.toggle("on");
            break;
    }
}
switchhash();


async function getlist(){
    await fetch("http://localhost:3005/user/getuploads",
    {
            method:"post",
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({isadmin:1})
        }
    ).then(
        Response=>Response.json()
    ).then(
        data=>{
            buffer=data;
            let local="";
            buffer.map((items,index)=>{
                let info=items.file.split("/"),
                    filename=info.pop(),
                    path=info.join("/");
                local+=`<div class="flex">
                    <div class="filename hiddenword" title="${filename}">${filename}</div>
                    <div class="where hiddenword" title="${path}">${path}</div>
                    <div class="uploader hiddenword" title="${items.userid}">${items.userid}</div>
                    <input type="checkbox" name="checks" class="checks"/>
                </div>`;
            });
            document.getElementById('uplist').innerHTML=buffer.length?local:`<p style="width: 100%;font-size:20px;text-align:center;font-family: 楷体;">空空如也</p>`;
            checkboxclickevent();
        }
    );
}
getlist();
deletebutton.onclick=async function(){
    let needreload=false;
    for(let i=0;i<checks.length;i++){
        if(checks[i].checked){
            let file=buffer[i].file;
            await fetch(`http://localhost:3005/file/delete?url=${file}`).then(
                Response=>Response.text()
            ).then(
                data=>{
                    if(data=="删除成功"){
                        needreload=true;
                    }
                }
            ); 
        }
    }
    if(needreload){
        window.location.reload();
    }
}

//全选功能
allcheck.addEventListener("click",()=>{
    for(let i=0;i<checks.length;i++){
        checks[i].checked=allcheck.checked;
    }
})

function checkboxclickevent(){
    for(let i=0;i<checks.length;i++){
        checks[i].addEventListener("click",()=>{
            if(allcheck.checked){
                if(checks[i].checked==false){
                    allcheck.checked=false;
                }
            }else{
                for(let i=0;i<checks.length;i++){
                    if(checks[i].checked==false){
                        allcheck.checked=false;
                        return;
                    }
                }
                allcheck.checked=true;
            }
        })
    }
}