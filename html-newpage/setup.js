addEventListener("load", main);

function main() {
    chrome.storage.local.get("stockage", function (result) {
        let json = result.stockage;
        json = json.data

        for (let i = 0; i < json.length; i++) {
            let group = document.createElement("div")
            group.id = json[i].name
            group.className = "group"
            group.id = json[i].name
            group.innerHTML = `
                <input type="text" value="${json[i].name}"></input>
                <button class="delete-button">delete</button>
                <button class="draw-button">keyboard_arrow_down</button>
                <button class="add-link-button">add_circle</button>
            `
            document.getElementById("rows-groups").appendChild(group)
        }
    })
}

//
addEventListener("click", function (event) {
    //add a row
    if (event.target.id == "addLinkButton") {
        let group = document.createElement("div")
        group.id = "group"
        group.className = "group"
        group.innerHTML = `
            <input type="text" value=""></input>
            <button class="delete-button">delete</button>
            <button class="draw-button">keyboard_arrow_down</button>
            <button class="add-link-button">add_circle</button>

        `
        document.getElementById("rows-groups").appendChild(group)
    }

    //delete a row
    if (event.target.className == "delete-button") {
        let group = event.target.parentElement
        group.remove()
    }

    //draw link child of a row
    if (event.target.className == "draw-button") {
        let group = event.target.parentElement
        chrome.storage.local.get("stockage", function (result) {
            let json = result.stockage;
            json = json.data

            for (let i = 0; i < json.length; i++) {
                if (json[i].name == group.id) {
                    for (let j = 0; j < json[i].links.length; j++) {
                        let link = document.createElement("div")
                        link.className = "link"
                        link.innerHTML = `
                        <input type="text" value="${json[i].links[j].name}"></input>
                        <input type="text" value="${json[i].links[j].url}"></input>
                        <button class="delete-button">delete</button>
                    `
                        group.appendChild(link)

                    }
                }
            }
        })
    }

    //add empty link child of a row
    if (event.target.className == "add-link-button") {
        let group = event.target.parentElement
        let link = document.createElement("div")
        link.className = "link"
        link.innerHTML = `
            <input type="text" value=""></input>
            <input type="text" value=""></input>
            <button class="delete-button">delete</button>

        `
        group.appendChild(link)
    }

    //save data
    if (event.target.id == "saveButton") {
        //drop current save
        chrome.storage.local.set({ "stockage": { data: [] } })

        //get all groups of links
        let elements = document.getElementsByClassName("group");

        //for each group
        let groups = []
        for (let i = 0; i < elements.length; i++) {
            //if group is not empty
            if (elements[i].value == "") {
                continue
            } else {
                //create a new group
                let group = {
                    name: elements[i].children[0].value,
                    links: []
                }
                //get all links on the page
                let links = elements[i].getElementsByClassName("link");
                //for each link
                for (let j = 0; j < links.length; j++) {
                    //if link is not empty
                    if (links[j].children[0].value == "" || links[j].children[1].value == "") {
                        continue
                    } else {
                        //create a new link element 
                        let link = {
                            name: links[j].children[0].value,
                            url: links[j].children[1].value,
                        }
                        //add the link to the group
                        group.links.push(link)
                    }

                }
                //add the group to the array
                groups.push(group)
                console.log(group)
            }

            //save the array
            chrome.storage.local.set({ "stockage": { data: groups } })
        }
        document.getElementById("saveButton").innerHTML = `saved <span class="material-icons-outlined">
        check_circle_outline
        </span>`
    }
});