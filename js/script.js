const profileDiv = document.querySelector(".overview"); //div to display profile
const username = "hbouchard5";
const repoList = document.querySelector(".repo-list"); //unordered list

//async function to github API to fetch user profile data
const getProfile = async function() {
    const result = await fetch(`https://api.github.com/users/${username}`);
    let data = await result.json();
    //console.log(data);

    //call function to populate webpage with profile information
    displayProfile(data);
};

//function to add the HTML to display user profile data
const displayProfile = function(data) {
    const profileInfo = document.createElement("div");
    profileInfo.classList.add("user-info");
    profileInfo.innerHTML = `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} /> 
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>
        `;
    profileDiv.append(profileInfo); //append HTML to profile <div> 
};

//call async function to github API
getProfile();

//async function call to fetch public repos
const fetchRepos = async function() {
    const result = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    let repos = await result.json();
    console.log(repos);

    //call function to display repo data on webpage
    displayRepos(repos);
};

fetchRepos();

//function to create HTML to display repo data
const displayRepos = function(repos) {
    for (let repo of repos) {
        let newli = document.createElement("li");
        newli.classList.add("repo");
        newli.innerHTML = `<h3>${repo.full_name}</h3>`;
        repoList.append(newli);
    }
};