const API_POSTS = 'https://gorest.co.in/public/v2/posts';
const API_COMMENTS = 'https://gorest.co.in/public/v2/comments';

const postId = new URLSearchParams(window.location.search).get('id');

const postsContainer = document.getElementById('posts-list');

let posts = [];

function createpostList(post) {
const postsList = document.createElement('div');
    postsList.classList.add('post');
    // create card body
    const postsBody = document.createElement('div');
    postsBody.classList.add('posts-body');

//create post link
    const postLink = document.createElement("a")
    postLink.classList.add("btn", "post-link")
    postLink.href = `user-posts.html?id=${postId}`;
    postLink.innerText = post.title
    
    //create status
    const postDescription = document.createElement("p")
    postDescription.classList.add("post-description")
    postDescription.innerText = post.body

    //append all

    postsBody.appendChild(postLink)
    postsBody.appendChild(postDescription)
    return postsBody

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
    return fetch(API_POSTS)
        .then(response =>{
            handleLoaded();
        if (!response.ok) {
            throw new Error('Невдалось завантажити користувачів. Спробуйте пізніше');
        }
            // return  posts=[] <--if is empty-->
        return response.json()
    })
        .then((posts) => {
            if (!posts.length) {
            const errorMessageBox = createMessageBox('Користувачі незнайдені');
            postsContainer.appendChild(errorMessageBox, 'success');
            }
            posts.forEach(post => {
            const postT = createpostList(post);
            postsContainer.appendChild(postT);
        })
        })
        .catch(error => {
        const errorMessageBox = createMessageBox(error.message);
        postsContainer.appendChild(errorMessageBox, 'error');
    })
}
getProducts()
