const API_COMMENTS = 'https://gorest.co.in/public/v2/comments'
const postId = new URLSearchParams(window.location.search).get('id');

const commentsContainer = document.getElementById('comments-list');

let comments = [];

function createcommentsList(comments) {
const commentsList = document.createElement('div');
    commentsList.classList.add('comments');
    // create card body
    const commentsBody = document.createElement('div');
    commentsBody.classList.add('comments-body');
    commentsBody.href = `comments.html`;

//create comments link
    const commentsLink = document.createElement("p")
    commentsLink.classList.add("comments-name")
  
    commentsLink.innerText = comments.name
    
    //create status
    const commentsDescription = document.createElement("p")
    commentsDescription.classList.add("comments-description")
    commentsDescription.innerText = comments.body

    //append all

    commentsBody.appendChild(commentsLink)
    commentsBody.appendChild(commentsDescription)
    return commentsBody

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

function getComments() {
    return fetch(`${API_URL}/${userId}/posts/${postId}`)
        .then(response =>{
            handleLoaded();
        if (!response.ok) {
            throw new Error('коментарі відсутні');
        }
            // return  comments=[] <--if is empty-->
        return response.json()
    })
        .then((comments) => {
            if (!comments.length) {
            const errorMessageBox = createMessageBox('Коментарі незнайдені');
            commentsContainer.appendChild(errorMessageBox, 'success');
            }
            comments.forEach(comments => {
            const commentsT = createcommentsList(comments);
            commentsContainer.appendChild(commentsT);
        })
        })
        .catch(error => {
        const errorMessageBox = createMessageBox(error.message);
        commentsContainer.appendChild(errorMessageBox, 'error');
    })
}
getComments()
