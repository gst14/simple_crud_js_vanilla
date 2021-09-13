let users = [];
let table = document.querySelector("#dataset");
let namefield = document.querySelector("#name");
let usernamefield = document.querySelector("#username");
let emailfield = document.querySelector("#email");
let userid = undefined;
let currentUser = undefined;

const editRow = (e) => {
  console.log("Edit button");
};
const deleteRow = (e) => {
  console.log("Delete button");
};

const addEditDeleteEvent = () => {
  let editBtns = [...document.querySelectorAll(".btnEdit")];
  editBtns.forEach((e) => {
    e.onclick = (v) => {
      let idEntry = Number(e.id.split("_")[1]);
      let user = users[idEntry];
      if (user) {
        currentUser = user;
        userid = user.id;
        namefield.value = user.name;
        usernamefield.value = user.username;
        emailfield.value = user.email;
      } else {
        console.error(`No hay registro para el usuario con id ${e.id}`);
      }
    };
  });

  let deleteBtns = [...document.querySelectorAll(".btnDelete")];
  deleteBtns.forEach((d) => {
    d.onclick = (v) => {
      let idEntry = Number(d.id.split("_")[1]);
      let response = confirm(
        `¿Seguro que desea eliminar el registro ID ${idEntry}?`
      );
      if (response) {
        users.splice(idEntry, 1);
      }
      clearFields();
      document.querySelector("#refresh").click();
      currentUser = undefined;
    };
  });
};

document.querySelector("#refresh").addEventListener("click", () => {
  table.innerHTML = `
        <tr>
            <th class="idRow">Id</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        `;

  let rows = users.map(({ id, name, username, email }) => {
    return createRow(id, name, username, email);
  });
  table.innerHTML += rows.join(" ");
  addEditDeleteEvent();
});

const clearFields = () => {
  namefield.value = "";
  usernamefield.value = "";
  emailfield.value = "";
};

document.querySelector("#save").addEventListener("click", () => {
  let { id, name, username, email } = createUser();
  if (!currentUser) {
    let row = createRow(id, name, username, email);
    document.querySelector("#dataset").innerHTML += row;
    users.push({ id, name, username, email });
  } else {
    users[currentUser.id] = {
      id: currentUser.id,
      name,
      username,
      email,
    };
  }
  clearFields();
  addEditDeleteEvent();
  document.querySelector("#refresh").click();
  currentUser = undefined;
});

document.querySelector("#cancel").addEventListener("click", () => {
  clearFields();
  currentUser = undefined;
});

const createUser = () => {
  return {
    id: users.length,
    name: namefield.value.trim(),
    username: usernamefield.value.trim(),
    email: emailfield.value,
  };
};

const createRow = (id, namefield, usernamefield, emailfield) => {
  if (!namefield.length) {
    alert("Debe completar el campo nombre");
    return undefined;
  }
  if (!usernamefield.length) {
    alert("Debe completar el campo de nombre de usuario");
    return undefined;
  }
  if (!emailfield.length) {
    alert("Debe completar el campo de email");
    return undefined;
  }

  return `<tr>
        <td class="idRow">${id}</td>
        <td>${namefield}</td>
        <td>${usernamefield}</td>
        <td>${emailfield}</td>
        <td class="edit"> <button class="btnEdit" id="edit_${id}"><i class="fas fa-pencil-alt"></i></button></td>
        <td class="edit"> <button class="btnDelete" id="delete_${id}"><i class="fas fa-trash"></i></button></td>
        
        </tr>
        `;
};
