const profileDiv = document.querySelector(".overview");
const username = "hbouchard5";

//async function to github API to fetch user profile data
const getProfile = async function() {
    const request = await fetch(`https://api.github.com/users/${username}`);
    data = await request.json();
    console.log(data);

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