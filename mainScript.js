function processAjaxData(response, urlPath) {
    console.log("test")
    document.getElementById("content").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({ "html": response.html, "pageTitle": response.pageTitle }, "", urlPath);
}

(() => {
    let db;
    const request = indexedDB.open("ToDoList");

    request.onerror = (event) => {
        console.error("Bro, I don't think your IndexedDB work.");
    };

    request.onsuccess = (event) => {
        db = event.target.result;
    };

    request.onupgradeneeded = (event) => {
        // Save the IDBDatabase interface
        const db = event.target.result;

        // Create an objectStore for this database
        const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
    };

    window.onpopstate = function (e) {
        if (e.state) {
            document.getElementById("content").innerHTML = e.state.html;
            document.title = e.state.pageTitle;
        }
    };

    document.querySelector("#github").addEventListener("click", () => {
        window.open("https://github.com/AlaTomKing/to-do-list")
    })

    // document.querySelector("#open_settings").addEventListener("click", () => {
    //     window.history.pushState("addSettings", "Title", "?settings");
    // })

    document.querySelector("#new_list").addEventListener("click", () => {
        window.history.pushState("createList", "New List", "?list=hi there");
    })

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    // console.log(params.settings === "" && "settings exist" || "it dont exis")
    console.log(params.list)

    window.addEventListener("keydown", (e) => {
        switch (e.code) {
            case "ArrowLeft":
                console.log("arrow left")
                break
            case "ArrowRight":
                console.log("arrow right")
                break
            case "Space":
                console.log("space")
                break
        }
    })
})()