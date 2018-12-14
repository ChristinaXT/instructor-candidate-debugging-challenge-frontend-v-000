const handleSubmit = (e) => {
  e.preventDefault();
  inputString = e.target[0].value
  identicon = new Identicon(inputString);
  updateGravatar(identicon)
  loadComments(inputString)
};

function loadComments(gravatar) {
  fetch(`http://localhost:3000/comments?gravatar=${gravatar}`)
    .then(resp => resp.json())
    .then(resp => {
      respComments = resp.map(c => c)
      comments = respComments.map(comment => comment.content)
      updateComments(comments)
    })
}

function newComment(e) {
  comment = e.target.value
  gravatar = document.getElementById("identicon-form")[0].value

  fetch(`http://localhost:3000/comments`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      content: comment,
      gravatar
    })
  }).then(r => { r.json() })
    .then(function(stuff) {
      addComment(comment)
    });

}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("identicon-form")
  form.addEventListener("submit", handleSubmit)
  const commentForm = document.getElementById("comment-form")
  form.addEventListener("submit", newComment)
})
