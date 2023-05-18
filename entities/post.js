const postsContainer = document.getElementById("posts-list");

function createpostList(post) {
  const postsList = document.createElement("div");
  postsList.classList.add("post");
  // create card body
  const postsBody = document.createElement("div");
  postsBody.classList.add("posts-body");

  //create post link
  const postLink = document.createElement("a");
  postLink.classList.add("btn", "post-link");
  postLink.href = `comments.html?id=${userId}/posts/${post.id}`;
  postLink.innerText = post.title;

  //create status
  const postDescription = document.createElement("p");
  postDescription.classList.add("post-description");
  postDescription.innerText = post.body;

  //append all

  postsBody.appendChild(postLink);
  postsBody.appendChild(postDescription);
  return postsBody;
}

//errormessage when empty

function createMessageBox(message, type = "error") {
  const cl = `alert-${type}`;
  const errorMessageBox = document.createElement("div");
  errorMessageBox.classList.add("alert", cl);
  errorMessageBox.innerText = message;

  return errorMessageBox;
}

//loader function
function handleLoaded() {
  const loader = document.querySelector(".loader");
  loader.classList.add("hidden");
}

function getPosts() {
  fetch(`${API_URL}/${userId}/posts`)
    .then((response) => {
      handleLoaded();
      if (!response.ok) {
        throw new Error("Невдалось завантажити пости. Спробуйте пізніше");
      }
      // return  posts=[] <--if is empty-->
      return response.json();
    })
    .then((posts) => {
      if (!posts.length) {
        const errorMessageBox = createMessageBox("пости незнайдені");
        postsContainer.appendChild(errorMessageBox, "success");
      }
      posts.forEach((post) => {
        const postT = createpostList(post);
        postsContainer.appendChild(postT);
      });
    })
    .catch((error) => {
      const errorMessageBox = createMessageBox(error.message);
      postsContainer.appendChild(errorMessageBox, "error");
    });
}
getPosts();
