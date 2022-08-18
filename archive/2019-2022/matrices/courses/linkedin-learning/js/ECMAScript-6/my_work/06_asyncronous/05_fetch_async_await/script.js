const githubRequest = async (login) => {
    let response = await fetch(`https://api.github.com/users/${login}`);
    let json = await response.json();
    let summary = `${json.id}, ${json.bio}`;
    console.log(summary);
};

githubRequest('LordSavhith');
