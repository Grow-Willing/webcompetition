const Koa=require("koa");
const Router=require("koa-router");
const cors=require("@koa/cors");
const mongoose=require("mongoose");
const koabody=require("koa-body");
const send=require("koa-send");
const logger=require("koa-logger");
const session=require("koa-session");

const fs=require("fs");
const {join}=require("path");

const koa=new Koa;
const router=new Router;
let db=mongoose.createConnection("mongodb://localhost:27017/competition",{ useNewUrlParser: true });
mongoose.Promise=global.Promise;
let Schema=mongoose.Schema;
let Users=new Schema({userid:Number,password:String},{versionKey:false});
let users=db.model("user",Users);
let Files=new Schema({userid:Number,file:String},{versionKey:false});
let files=db.model("file",Files);
let Admins=new Schema({adminid:Number,password:String},{versionKey:false});
let admins=db.model("admin",Admins);
router.get("/usericon/*",async (ctx) => {
    if ('/usericon' == ctx.path) return ctx.body = 'Try GET /package.json';
    await send(ctx, ctx.path);
  }
)
router.post("/backgroundlist",async (ctx)=>{
    let userid=join(__dirname,"usericon",ctx.request.body.userid);
    if(/image/.test(ctx.request.files.file.type)){
        if(fs.existsSync(userid)){
            const file = ctx.request.files.file;	// 获取上传文件
            const reader = fs.createReadStream(file.path);	// 创建可读流
            const upStream = fs.createWriteStream(`${userid}/background.jpg`);		// 创建可写流
            reader.pipe(upStream);	// 可读流通过管道写入可写流
            return ctx.body = '上传成功';
        }else{
            fs.mkdirSync(userid);
            const file = ctx.request.files.file;	// 获取上传文件
            const reader = fs.createReadStream(file.path);	// 创建可读流
            const upStream = fs.createWriteStream(`${userid}/background.jpg`);		// 创建可写流
            reader.pipe(upStream);	// 可读流通过管道写入可写流
            return ctx.body = '上传成功';
        }
    }
})
router.post("/iconlist",async (ctx)=>{
    let userid=join(__dirname,"usericon",ctx.request.body.userid);
    if(/image/.test(ctx.request.files.file.type)){
        if(fs.existsSync(userid)){
            const file = ctx.request.files.file;	// 获取上传文件
            const reader = fs.createReadStream(file.path);	// 创建可读流
            const upStream = fs.createWriteStream(`${userid}/icon.jpg`);		// 创建可写流
            reader.pipe(upStream);	// 可读流通过管道写入可写流
            return ctx.body = '上传成功';
        }else{
            fs.mkdirSync(userid);
            const file = ctx.request.files.file;	// 获取上传文件
            const reader = fs.createReadStream(file.path);	// 创建可读流
            const upStream = fs.createWriteStream(`${userid}/icon.jpg`);		// 创建可写流
            reader.pipe(upStream);	// 可读流通过管道写入可写流
            return ctx.body = '上传成功';
        }
    }
})

router.post("/file/upload",async (ctx)=>{
    let path=__dirname+ctx.request.body.path;
    if(/\/\.\./.test(path)){
        return ctx.body = '您确定没修改我们的目录吗？';
    }
    if(fs.existsSync(path)){
        const file = ctx.request.files.file;	// 获取上传文件
        let fullpath=join(path,file.name);
        if(fs.existsSync(fullpath)){
            return ctx.body ="此文件已存在，上传者请删除再更新上传"
        }
        if(/\/\.\./.test(file.name)){
            return ctx.body = '文件名称不合法哦';
        }
        const reader = fs.createReadStream(file.path);	// 创建可读流
        const upStream = fs.createWriteStream(fullpath);		// 创建可写流
        reader.pipe(upStream);	// 可读流通过管道写入可写流
        let data=new files({userid:ctx.request.body.userid,file:ctx.request.body.path+"/"+file.name});
        // 保存文档
        data.save();
        return ctx.body = '上传成功';
    }else{
        return ctx.body="目录不存在";
    }
})
router.post("/user/getuploads",async (ctx)=>{
    let result=ctx.request.body;
    //获取信息
    
    if(result.isadmin!=1){
        let userid=Number(result.userid);
        if(isNaN(userid)||userid<=0){//参数合法性校验
            ctx.body=[];
            return;
        }
        //查询是否存在
        await files.find(
            {userid:result.userid}
        ).then(res=>funq(res));     //存在用户
        function funq (res){
            if(res){
                ctx.body=res;
            }else{
                ctx.body=[];
                return ;
            }
        }
    }else{
        await files.find(
            {}
        ).then(res=>funq(res));     //存在用户
        function funq (res){
            if(res){
                ctx.body=res;
            }else{
                ctx.body=[];
                return ;
            }
        }
    }
})
router.get("/file/delete",async (ctx)=>{
    let path=join(__dirname,ctx.query.url);
    if(/\/\.\./.test(ctx.query.url)){
        return ctx.body = '您确定没修改我们的目录吗？';
    }
    let libs=ctx.query.url.split("/");
    if(libs.length>3&&libs[1]=="全部文件"&&libs[2]=="文科"||libs[2]=="理科"){
        if(fs.existsSync(path)){
            fs.unlinkSync(path);
            await files.deleteOne({file:ctx.query.url});
            return ctx.body = '删除成功';
        }else{
            return ctx.body="目录不存在";
        }
    }
    return ctx.body = '删除失败，目录不存在或不能删除';
})
router.get("/file/deletes",async (ctx)=>{
    let path=join(__dirname,ctx.query.url);
    if(/\/\.\./.test(ctx.query.url)){
        return ctx.body = '您确定没修改我们的目录吗？';
    }
    let libs=ctx.query.url.split("/");
    if(libs.length>3&&libs[1]=="全部文件"&&libs[2]=="文科"||libs[2]=="理科"){
        if(fs.existsSync(path)){
            fs.rmdirSync(path);
            return ctx.body = '删除成功';
        }else{
            return ctx.body="目录不存在";
        }
    }
    return ctx.body = '删除失败，目录不存在或不能删除';
})
router.post("/user/reg",async (ctx)=>{
    let result=ctx.request.body;
    //获取信息
    let userid=Number(result.userid);
    let password=result.password;
    if(isNaN(userid)||typeof(password)!="string"||userid<=100||password.length<=6){//参数合法性校验
        ctx.body={};
        return;
    }
    //查询是否存在
    await users.findOne(
        {userid},
        async (error,result)=>{
                if(result){
                    ctx.body={};      //存在用户
                }else{       //不存在，创建文档
                    ctx.body={userid};
                    //创建文档
                    let data=new users({userid,password});
                    // 保存文档
                    data.save();
                }
            }
        )
})
router.post("/user/change",async (ctx)=>{
    let result=ctx.request.body;
    //获取信息
    let {userid,password,newpwd}=result;
    if(isNaN(Number(userid))||typeof(password)!="string"||Number(userid)<=0||password.length<=6){//参数合法性校验
        ctx.body={};
        return;
    }
    //查询是否存在
    await users.findOneAndUpdate(
        {userid,password},
        {password:newpwd},
        async (error,result)=>{
                if(result)
                    ctx.body={userid:result.userid};      //存在用户
                else{       //不存在用户
                    ctx.body={};
                }
            }
        )
})
router.get("/user/judge",async (ctx)=>{
    let userid=ctx.query.userid;
    let password=ctx.query.password;
    if(isNaN(Number(userid))||typeof(password)!="string"||Number(userid)<=100||password.length<=6){
        ctx.body=false;
        return;
    }
    await users.findOne(
        {userid,password},
        (error,result)=>{
            if(result)
                ctx.body=true;      //通过验证
            else 
                ctx.body=false;     //不通过验证
        }
    )
})
router.get("/file/get",async (ctx)=>{
    if(/\/\.\./.test(ctx.query.url)){
        return;
    }
    let srcurl=join(__dirname,ctx.query.url);
    if(fs.existsSync(srcurl)){          //存在目录
        if(fs.statSync(srcurl).isDirectory()){      //是目录返回目录
            let list=fs.readdirSync(srcurl);
            let type=[];
            let data={list,type};
            list.map(function(items){
                type.push(fs.statSync(join(srcurl,items)).isDirectory());
            });
            ctx.body=data;
        }else{
            let file=fs.readFileSync(srcurl);       //是文件就下载
            ctx.body=file;
        }
    }else{
        ctx.body="404";
    }
})
//新建文件夹
router.get("/file/mkdir",async (ctx)=>{
    let{path,name}=ctx.query;
    let dirpath=join(__dirname,path,name);
    if(!fs.existsSync(dirpath)){
        fs.mkdirSync(dirpath);
        return ctx.body="ok";
    }
    return ctx.body="目录已存在";
})
//文件移动和重命名
router.get("/file/moveAndRename",async (ctx)=>{
    let oldpath=join(__dirname,ctx.query.oldpath,ctx.query.oldname),
        newpath=join(__dirname,ctx.query.newpath);
    if(fs.existsSync(oldpath)&&fs.existsSync(newpath)){
        newpath=join(newpath,ctx.query.newname);
        if(fs.statSync(oldpath).isFile()){
            let oldfile=join(ctx.query.oldpath,ctx.query.oldname).replace(/\\/g,"/"),
                newfile=join(ctx.query.newpath,ctx.query.newname).replace(/\\/g,"/");
            await files.findOneAndUpdate({file:oldfile},{file:newfile});
        }
        fs.renameSync(oldpath,newpath);
        ctx.body="ok";
    }else{
        ctx.body="目录不存在";
    }
})

//管理员管理
router.get("/admin*",async (ctx)=>{
    if(ctx.path=="/Admin"){
        if(ctx.session.login){
            let a=join("/admin","AdminPage.html");
            await send(ctx,a);
        }else{
            let a=join("/admin","AdminLogin.html");
            await send(ctx,a);
        }
    }
    else{
        let a=join("/admin",ctx.path);
        await send(ctx,a);
    }
});
router.post(
    "/adminlogin",
    async (ctx)=>{
        let adminid=ctx.request.body.adminid;
        await admins.findOne({adminid,password:ctx.request.body.pwd},
            (error,result)=>{
                if(result){
                    ctx.session={
                        login:true
                    }
                    ctx.body=1;    //通过验证
                }else {
                    ctx.body=0;     //不通过验证
                }
            }
        )
    }
);



//转发web服务
router.get("/needs/*",async (ctx)=>{
    let str=ctx.path;
    await send(ctx,str);
});
router.get("/*",async (ctx)=>{
    let str=ctx.path;
    if(str=="/") str="index.html";
    if(str=="/admin") str="admin.html";
    let a=join("/build",str);
    await send(ctx,a);
});





koa.use(koabody({
        //支持文件上传功能
        multipart: true,
        formidable: {
            // 上传存放的路径
            // uploadDir: join(__dirname, "全部文件"),
            // 是否保持后缀不变
            keepExtensions: true,
            // 设置最大上传文件大小
            maxFileSize: 1024*1024*700,
            onError(err){
                console.log(err)
            }
        }
    }
));
koa.keys=["web项目比赛"];
koa.use(session(
    {
        key:"admininfo",
        overwrite:true,
        httpOnly:true,
        signed:true,
        rolling:false
    },
    koa
));
koa.use(cors())
    .use(logger())
    .use(router.routes()).use(router.allowedMethods())
    .listen(3005);
console.log("node服务器已经打开");