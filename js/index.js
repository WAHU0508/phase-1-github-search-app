document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    form.addEventListener('submit', handleSubmit);
})

function handleSubmit(event) {
  event.preventDefault();
  const searchInput = document.getElementById('search');
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchUsers(searchTerm)
      .then(displayUsers)
      .catch(error => console.error(error));
  }
}

function searchUsers(searchTerm) {
  return fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => data.items);
}

function displayUsers(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach(user => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = user.html_url;
    link.target = '_blank';
    link.textContent = user.login;
    const avatar = document.createElement('img');
    avatar.src = user.avatar_url;
    avatar.alt = `${user.login}'s avatar`;
    avatar.width = 30; 
    avatar.height = 30;
    listItem.appendChild(avatar);
    listItem.appendChild(link);
    userList.appendChild(listItem);
    link.addEventListener('click', () => displayRepos(user.login));
  });
}

function displayRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      const reposList = document.getElementById('repos-list');
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.target = '_blank';
        link.textContent = repo.name;
        listItem.appendChild(link);
        reposList.appendChild(listItem);
      });
    })
    .catch(error => console.error(error));
}