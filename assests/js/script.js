
const cl = console.log;

const form = document.getElementById("form");

const input = document.getElementById("input");

const addbtn = document.getElementById("addbtn");

const updatebtn = document.getElementById("updatebtn");

const cancelbtn=document.getElementById("cancelbtn");



let todoArray = [
  {
    todo: "Javascript",
    id: "101",
  },
  {
    todo: "DSA",
    id: "102",
  },
  {
    todo: "Cloud",
    id: "103",
  },
];

// read

function tododata(arr) {
  let result = ``;
  arr.forEach(todo => {
    result += ` <li class="list-group-item d-flex justify-content-between align-items-center border border-dark " id="${todo.id}">
                              <strong>${todo.todo}</strong>
                             <div>
                                <i onclick="edittodo(this)" class="fa-solid fa-pen-to-square fa-2x text-info editbutton " role="button"></i>
                            <i  onclick="deletetodo(this)" class="fa-solid fa-trash-can fa-2x text-danger removebtn remove" role="button"></i>
                             </div>
                        </li> `
  })
  todolist.innerHTML = result;
};

tododata(todoArray);



// create

function createtodo(eve) {
  eve.preventDefault()
  let inputobj = {
    todo: input.value,
    id: Date.now().toString()
  }
  todoArray.push(inputobj);
  form.reset();

  const li = document.createElement("li");

  li.className = "list-group-item d-flex justify-content-between align-items-center border border-dark ";

  li.id = inputobj.id

  li.innerHTML = `<strong>${inputobj.todo}</strong>
                             <div>
                                <i onclick="edittodo(this)" class="fa-solid fa-pen-to-square fa-2x text-info editbutton " role="button"></i>
                            <i onclick="deletetodo(this)" class="fa-solid fa-trash-can fa-2x text-danger removebtn remove" role="button"></i>
                             </div>`

  todolist.append(li);


}

// delete

function deletetodo(eli) {
  let removeid = eli.closest("li").id;
  //  cl(removeid)
  let confirmation = confirm(`are you sure you want to delete ${removeid}`)

  if (confirmation) {
    let getindex = todoArray.findIndex(todo => todo.id === removeid)
    //  cl(getindex)
    todoArray.splice(getindex, 1)
    eli.closest("li").remove()
  }

}



// edit 

function edittodo(eli) {
  let editid = eli.closest("li").id
  // cl(editid)
  let editobj = todoArray.find(todo => todo.id === editid)
  input.value = editobj.todo

  //  cl(editobj)


  addbtn.classList.add("d-none");
  updatebtn.classList.remove("d-none");
  cancelbtn.classList.remove("d-none");
  updatebtn.setAttribute("editid", editid)

     let delbtn=document.querySelectorAll(".remove");

     delbtn.forEach(ele=>{
              ele.style.pointerevents="none";
              ele.style.opacity="0.10";
     })



  //  cl(updatebtn)

}


// update


function updatetodo() {

  let getid = this.getAttribute("editid")
  //  cl(getid)


  let newobj = {

    todo: input.value,
    id: getid

  }

  let getindex = todoArray.findIndex(todo => todo.id === getid)

  todoArray[getindex] = newobj


  //  cl( todoArray[getindex]=newobj.todo)

  let li = document.getElementById(getid);
  // cl(li)
  li.querySelector("strong").innerText = newobj.todo;
 form.reset();

    updatebtn.classList.add("d-none");
    addbtn.classList.remove("d-none");
    cancelbtn.classList.add("d-none");

    document.querySelectorAll(".remove").forEach(ele=>{
             ele.style.pointerevents='auto';
             ele.style.opacity='1';
    })

}


// cancel

function canceltodo(){

         let id=this.getAttribute("editid")
         id=null;
         input.value=``;
        //  cl(id)
        //  cancelbtn.classList.remove("d-none")
        
        updatebtn.classList.add("d-none");
        cancelbtn.classList.add("d-none");
        addbtn.classList.remove("d-none");

}




cancelbtn.addEventListener("click",canceltodo);
updatebtn.addEventListener("click", updatetodo);
form.addEventListener("submit", createtodo);
