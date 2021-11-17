const profileDiv = document.querySelector(".overview"); //div to display profile
const username = "hbouchard5";
const repoList = document.querySelector(".repo-list"); //unordered list
const reposSection = document.querySelector(".repos");  //section to display all repos
const repoSingle = document.querySelector(".repo-data");    //section to display repo details
const backButton = document.querySelector(".view-repos");   //button to return to all repos
const filterInput = document.querySelector(".filter-repos");    //user input to search by text


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

    //call function to display repo data on webpage
    displayRepos(repos);
};

//load all repos when page refreshes
fetchRepos();

//function to create HTML to display repo data
const displayRepos = function(repos) {
    for (let repo of repos) {
        let newli = document.createElement("li");
        newli.classList.add("repo");
        newli.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(newli);
    }
    //show input search box
    filterInput.classList.remove("hide");

    //hide "back to Repo Gallery" button
    backButton.classList.add("hide");
};

//event listener for click on one of the repo names
repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;

        //call function to get individual repo data
        repoInfo(repoName);
    }
});

//async function to get data for individual repo
const repoInfo = async function(repoName) {
    //fetch all parameters for repo that was clicked on
    const holdData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const singleRepo = await holdData.json();
    
    //fetch coding languages based on language_url parameter from clicked repo
    const fetchLanguages = await fetch(`${singleRepo.languages_url}`);
    const languageData = await fetchLanguages.json();

    //convert language object to language array
    let languageArray = [];
    for (let language in languageData) {
        languageArray.push(language);
    }
    displayDetails(singleRepo, languageArray);
};

//function to display individual repo details
const displayDetails = function(repoInfo, languages) {
    repoSingle.innerHTML = "";
    
    let newDetailsDiv = document.createElement("div");
    newDetailsDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoSingle.append(newDetailsDiv);

    repoSingle.classList.remove("hide");
    reposSection.classList.add("hide");
    backButton.classList.remove("hide");
};

//click event to return back to gallery
backButton.addEventListener("click", function() {
    repoSingle.classList.add("hide");
    reposSection.classList.remove("hide");

    //hide "back to Repo Gallery" button
    backButton.classList.add("hide");
});


filterInput.addEventListener("input", function(e){
    //capture user input from text box
    const inputVal = e.target.value;

    //select all repos into an array
    const repos = document.querySelectorAll(".repo");
    const searchText = inputVal.toLowerCase();

    //check which repos match the search input
    for (let repo of repos) {
        //lower case version of repo name
        const repoText = repo.innerText.toLowerCase();

        //if repo contains search text
        if (repoText.includes(searchText)) {
            if (repo.classList.contains("hide")) {
                repo.classList.remove("hide");
            }   
        } else {
            //if repo does not contain search text 
            if (repo.classList.contains("hide")) {
            } else {
                repo.classList.add("hide");
            }
        }
    }
});
