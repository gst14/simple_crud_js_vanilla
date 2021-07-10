let users = []
let table = document.querySelector('#dataset')
let namefield = document.querySelector('#name')
let usernamefield = document.querySelector('#username')
let emailfield = document.querySelector('#email')
console.log(`${namefield}, ${usernamefield}, ${emailfield}`)
const getData = async(users, idUser) => {
    try {
        let data = await fetch(`https://jsonplaceholder.typicode.com/users/${idUser}`)
        let newUser = await data.json()
        let { id, name, username, email } = newUser
        users.push({ id, name, username, email })
    } catch (error) {
        console.error(`Ha ocurrido un error: ${error}`)
    }
}

document.querySelector('#refresh')
    .addEventListener('click', () => {
        table.innerHTML = `
        <tr>
                    <th class="idRow">Id</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
        `
            // getData(users, users.length + 1)

        let rows = users.map(({ id, name, username, email }) => {
            return createRow(id, name, username, email)
        })
        table.innerHTML += rows.join(' ');

    })

document.querySelector('#save')
    .addEventListener('click', async() => {
        if (users.length < 10) {
            await getData(users, users.length + 1)
            let { id, name, username, email } = users[users.length - 1]
            let row = createRow(id, name, username, email)
            table.innerHTML += row;
        } else {
            alert('Ya no hay mas usuarios en la base de datos')
        }
    })

document.querySelector('#cancel')
    .addEventListener('click', () => {
        // users = []
        // document.querySelector('#refresh').click()
        namefield.value = ''
        usernamefield.value = ''
        emailfield.value = ''
    })

const createRow = (id, name, lastname, username) => {
    return `<tr>
        <td class="idRow">${id}</td>
        <td>${name}</td>
        <td>${lastname}</td>
        <td>${username}</td>
        <td class="edit"> <button class="btnEdit"><i class="fas fa-pencil-alt"></i></button></td>
        <td class="edit"> <button class="btnDelete"><i class="fas fa-trash"></i></button></td>
        
        </tr>
        `;
    // <td class="edit"> <a class="btnEdit" href="google.com?edit"><i class="fas fa-pencil-alt"></i></a></td>
    // <td class="delete"> <a class="btnDelete" href="google.com?delete"><i class="fas fa-trash"></i></a></td>
}

document.querySelectorAll('.btnEdit')
    .forEach(edit => {
        edit[0].addEventListener('click', (e) => editRow(e))
    })
document.querySelectorAll('.btnDelete')
    .forEach(edit => {
        edit[0].addEventListener('click', (e) => deleteRow(e))
    })

const editRow = (e) => {
    console.log(e)
    console.log('Edit button')
}
const deleteRow = (e) => {
    console.log(e)
    console.log('Delete button')
}