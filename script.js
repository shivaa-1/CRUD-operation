// function to show data
async function getdata(){

    let data = await fetch("https://6459e8fd65bd868e930b5825.mockapi.io/users",{
        method: 'GET',
        headers:{
        "Content-Type": "application/json"
        }
    })
    let res = await data.json();
    // console.log(res);
    const output = document.querySelector('#output');
    output.innerHTML="";

    res.forEach((obj,index) => {
        output.innerHTML+=`
        <div class="cards d-flex">
        <div class="leftside">
        <img src="${obj.avatar}" alt="${obj.name}"/>
        </div>
        <div class="rgtside">
        <p>${index+1}</p>
        <h4>${obj.name}</h4>
      
        <button onclick="edituser(${obj.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        <button onclick="deleteuser(${obj.id})" class="btn btn-primary">Delete</button>
        </div>
        </div>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <input type="text" id="name" class="" placeholder="Enter Your Username">
      <input type="text" id="avatar" class="" placeholder="Enter Your Avatar Url">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onclick="savechanges(${obj.id})" type="button" class="btn btn-primary"  data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
        `
    });
}

// function to edit the data
async function edituser(id){
    console.log("edit")

    const res = await fetch(`https://6459e8fd65bd868e930b5825.mockapi.io/users/${id}`,{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
        }
    })
    
    const data=await res.json();
    // console.log(data);

    console.log(id)
    const name = document.querySelector('#name');
    const avatar = document.querySelector('#avatar');
    name.value=data.name;
    avatar.value=data.avatar;

}


// function to save the changes

async function savechanges(id){
    const name= document.querySelector('#name').value;
    const avatar = document.querySelector('#avatar').value;

    const newdata={
        name:name,
        avatar:avatar,
    }
    console.log(newdata);
    const data = await fetch(`https://6459e8fd65bd868e930b5825.mockapi.io/users/${id}`,{
        method: 'put',
        body: JSON.stringify(newdata),
        headers:{
            "Content-Type":"application/json",
        }
    })
    console.log(data)

    getdata();
}




// function for add user
async function adddata(){
    const username = document.querySelector('#username').value;
    const useravatar = document.querySelector('#useravatar').value;

    let userdata={
        name:username,
        avatar:useravatar,
    }

    let senddata = await fetch("https://6459e8fd65bd868e930b5825.mockapi.io/users",{
        method: 'post',
        body: JSON.stringify(userdata),
        headers:{
            "Content-Type": "application/json",
        }
    })
    // console.log(senddata):
    getdata()
}

// function for delete the user details
async function deleteuser(id){
    console.log(id)
    let res = await fetch(`https://6459e8fd65bd868e930b5825.mockapi.io/users/${id}`,{
        method: 'DELETE',
        headers:{
            "Content-Type":"application/json",
        }
    })

    console.log(res)
    let deluser=await res.json()

    console.log(deluser)
    getdata()
}