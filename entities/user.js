
const API_URL = 'https://gorest.co.in/public/v2/users';


const userName = document.querySelector('.user-name')
const userEmail = document.querySelector('.user-email')

function getById() {
    const params = new URL(document.location).searchParams
    return params.get('id')
}

const userId = getById()
 
async function getUser() {
       
        const response = await fetch(`${API_URL}/${userId}`);
        const user = await response.json();
    
        userName.innerText = user.name;
        userEmail.innerText = user.email;

}

getUser()
