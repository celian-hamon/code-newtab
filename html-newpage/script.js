addEventListener("load", main);

async function main() {
    chrome.storage.local.get("stockage", function (result) {
        let json = result.stockage;

        json = json.data
        console.log(json)
        for (let i = 0; i < json.length; i++) {
            let group = document.createElement("div")
            group.id = json[i].name
            group.className = "group"
            group.innerHTML = `
                <h1>${json[i].name}</h1>
            `
            for (let j = 0; j < json[i].links.length; j++) {
                let link = document.createElement("a")
                if (json[i].links[j].sub) {
                    link.className = "sub"
                    firstWordLength = json[i].links[j].name.split("/")[0].length
                    link.innerHTML = json[i].links[j].name.substring(firstWordLength)
                } else {
                    link.className = "row"
                    link.innerHTML = json[i].links[j].name
                }
                link.href = json[i].links[j].url
                group.appendChild(link)
            }

            document.body.appendChild(group)
        }
    });
}

addEventListener("click", function (event) {
    if (event.target.id == "setup") {
        console.log("setup")

        chrome.tabs.create({ url: "html-newpage/setup.html" });

    }
});