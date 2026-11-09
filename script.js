let x =document.querySelector("#close");
let fomdiv =document.querySelector(".formdiv");
let createbtn=document.querySelector("#Createbtn");
let form =document.querySelector("form");
let userarr=JSON.parse(localStorage.getItem("userarr")) ||[];
let maincontainer=document.querySelector(".maincontainer");
let isUpdated =false;
let updatedUserIndex=null;


console.log("hi");
let renderUI=()=>{
    maincontainer.innerHTML="";
    userarr.forEach((val,index)=>{
        maincontainer.innerHTML+=`
            <div class="userbox">
                <img id="userphoto"  src="${val.url}"
                <p id="name">${val.name}</p>
                <div class="email">${val.email}</div>
                <div class="userbtns">
                    <button onclick="updatefun(${index})" id="upbtn">Update</button>
                    <button onclick="del(${index})" id="debtn">Delete</button>
                </div>
            </div>`
    })
}

let updatefun=(index)=>{
    isUpdated=true;
    updatedUserIndex=index;

    let updatedUser=userarr[index];

    fomdiv.style.display="flex";
    
    form[0].value=updatedUser.name;
    form[1].value=updatedUser.email;
    form[2].value=updatedUser.url;



}









let del=(index)=>{
    userarr.splice(index,1);
    localStorage.setItem("userarr",JSON.stringify(userarr));
    renderUI();
}

createbtn.addEventListener("click",()=>{
    form.reset();
    fomdiv.style.display="flex";
    
})
x.addEventListener("click",()=>{
    fomdiv.style.display="none";
})

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    
    let name = form[0].value;
    let email = form[1].value;
    let url= form[2].value;
    if(name===""||email===""||url===""){
        alert("enter details");
        return;
    }
    let userobj={
        name:name,
        email:email,
        url:url,
    }
    
    if(isUpdated){
        userarr[updatedUserIndex]=userobj;
        isUpdated=false;
        updatedUserIndex=null;
        fomdiv.style.display="null";
    }else{
        userarr.push(userobj);
    }
    console.log(userarr);
    
    renderUI();

    localStorage.setItem("userarr",JSON.stringify(userarr));



    form.reset();
    fomdiv.style.display="none";


})
renderUI();