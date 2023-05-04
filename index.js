const API_URL = 'https://gorest.co.in/public/v2/users?per_page=20&page=1';


const usersContainer = document.getElementById('users-list');

let users = [];



function createUserList(users) {
const user = document.createElement('div');
    user.classList.add('user');
    // create card body
    const usersBody = document.createElement('div');
    usersBody.classList.add('users-body');

//create user link
    const userLink = document.createElement("a")
    userLink.classList.add("btn", "user-link")
    userLink.href = `user.html?user_id=${users.id}`;
    userLink.innerText = users.name
    
    //create status
    const userStatus = document.createElement("p")
    userStatus.classList.add("user-status")
    userStatus.innerText = users.status

    //append all

    usersBody.appendChild(userLink)
    usersBody.appendChild(userStatus)
    return usersBody

}

//errormessage when empty

function createMessageBox(message, type = 'error') {
    const cl = `alert-${type}`;
    const errorMessageBox = document.createElement('div');
    errorMessageBox.classList.add('alert', cl);
    errorMessageBox.innerText = message;

    return errorMessageBox;
}

//loader function
function handleLoaded() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
}

function getProducts() {
    return fetch(API_URL)
        .then(response =>{
            handleLoaded();
        if (!response.ok) {
            throw new Error('Невдалось завантажити користувачів. Спробуйте пізніше');
        }
            // return  users=[] <--if is empty-->
        return response.json()
    })
        .then((users) => {
            if (!users.length) {
            const errorMessageBox = createMessageBox('Користувачі незнайдені');
            usersContainer.appendChild(errorMessageBox, 'success');
            }
            users.forEach(user => {
            const userT = createUserList(user);
            usersContainer.appendChild(userT);
        })
        })
        .catch(error => {
        const errorMessageBox = createMessageBox(error.message);
        usersContainer.appendChild(errorMessageBox, 'error');
    })
}
getProducts()
