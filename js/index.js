document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('github-form')
    searchForm.addEventListener('submit', submitData)

    function userDataDisplay(userData){
        newUserData = userData.items
        newUserData.forEach(buildUser)
    }

       function buildUser(user){
            const userName = document.createElement('li')
            const container = document.getElementById('user-list')
            container.appendChild(userName)
            let name = user.login
            userName.textContent = "- " + name + ":  "

            userName.id = `${name}`

            const userLink = document.createElement('a')
            userName.appendChild(userLink)
            userLink.href = user.html_url
            userLink.textContent = "         " + user.html_url

            userName.addEventListener('click', getData)

            function getData(){
                fetch(`https://api.github.com/users/${name}/repos`)
                .then(response => response.json())
                .then(personData => showData(personData))
                
                function showData(user){
                    const displayData = document.createElement('li')
                    userName.appendChild(displayData)
                    console.log(user)
                    user.forEach(findRepos)

                    function findRepos(person){
                        const oneRepo = document.createElement('li')
                        displayData.appendChild(oneRepo)
                       listOfRepos = person.html_url
                       console.log(listOfRepos)
                        oneRepo.textContent = listOfRepos
                    }
                     
                    //consolelog shows a list of the correct url to repos, 
                    //but when make it textcontext for the li it comes up as test repo 1
                }
            }

       }

    function submitData(e){
        e.preventDefault()
        const userSearchWord = document.getElementById('search').value
       fetch(`https://api.github.com/search/users?q=${userSearchWord}`)
       .then(response => response.json())
       .then(githubData => userDataDisplay(githubData))

       

    }
})