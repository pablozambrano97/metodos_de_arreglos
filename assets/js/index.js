const input_tarea=document.getElementById("input_tarea");
const boton_agregar=document.getElementById("button-addon2");
const totales=document.getElementById("total_tareas");
const lista_tareas=document.getElementById("lista_tareas");
let tareas=[{id:Date.now(),nombre:"Lavar ropa", completed: false},{id:Date.now()+1,nombre:"Hacer la cama", completed: false},{id:Date.now()+2,nombre:"Ir al supermercado", completed: false}];
let html_tareas="";
let tareas_realizadas=0;
function renderizar_totales(){
    totales.innerHTML=`<tr>
    <th scope="row">Total</th>
    <td>${tareas.length}</td> 
    </tr>
    <tr>
    <th scope="row">Realizadas</th>
    <td>${tareas_realizadas}</td> 
    </tr>
    `;
};
function renderizar_tareas(){

    tareas.forEach( tarea=> html_tareas+=`
    <tr>
        <th scope="row">${tarea.id}</th>
        <td>${tarea.nombre}</td>
        <td>
        <div class="input-group-text">
            <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" onclick="completed(${tarea.id})">
        </div>
        </td>
        <td>
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="borrar(${tarea.id})">Eliminar</button>
        </td>
    </tr>`);

    lista_tareas.innerHTML=html_tareas;
    html_tareas="";
};
renderizar_tareas();
renderizar_totales();
function borrar(id){
    let indice=tareas.findIndex(tarea=> tarea.id===id);
    if(tareas[indice].completed===true){
        alert("Tarea completada, no la puede eliminar");
    }else{
    tareas.splice(indice,1);
    renderizar_tareas();
    renderizar_totales();
    }
};

function completed(id){
    let indice=tareas.findIndex(tarea=>tarea.id===id);
    let tarea_click=tareas.find((tarea)=>tarea.id===id);
    tareas[indice]={
        id: tarea_click.id,
        nombre:tarea_click.nombre,
        completed: tarea_click.completed === true ? false : true
    }
    tareas_realizadas=tareas.filter(tarea=> tarea.completed === true).length;
    renderizar_totales();
};

boton_agregar.addEventListener("click",()=>{
    if(input_tarea.value!==""){
        let nueva_tarea={
            id: Date.now(),
            nombre: input_tarea.value[0].toUpperCase() + input_tarea.value.substring(1),
            completed: false
        };
        tareas.push(nueva_tarea);
        input_tarea.value="";
        renderizar_tareas();
        renderizar_totales();
    }else{
    alert("Ingrese tarea por realizar");
    }
});