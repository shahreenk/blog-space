let postsArray = [];
const titleInputEl = document.getElementById('post-title');
const bodyInputEl = document.getElementById('post-body');
const form = document.querySelector('form');

// creates HTML from each post in the postsArray and adds it to the posts-container
function renderPosts() {
    let postsHtml = '';
    postsArray.forEach(post => {
        postsHtml += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `
    })
    document.getElementById('posts-container').innerHTML = postsHtml;
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts') // requests the posts resource from the API
    .then(res => res.json()) // turns the response from JSON to JavaScript
    .then(data => {
        postsArray = data.slice(0, 5); // populates postsArray with first 5 post objects from the API
        renderPosts();
    });

form.addEventListener('submit', e => {
    e.preventDefault();
    const titleValue = titleInputEl.value;
    const bodyValue = bodyInputEl.value;
    const postData = {
        title: titleValue,
        body: bodyValue
    }
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {"Content-Type": "application/json"}
    })
        .then(res => res.json())
        .then(postData => {
            postsArray.unshift(postData); // adds the new postData object to the beginning of the postsArray
            renderPosts();
            form.reset();
        });
})