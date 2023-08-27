function processAjaxData(response, urlPath) {
    console.log("test")
    document.getElementById("content").innerHTML = response.html;
    document.title = response.pageTitle;
    window.history.pushState({ "html": response.html, "pageTitle": response.pageTitle }, "", urlPath);
}

(() => {
    window.onpopstate = function (e) {
        if (e.state) {
            document.getElementById("content").innerHTML = e.state.html;
            document.title = e.state.pageTitle;
        }
    };

    document.querySelector("#open_settings").addEventListener("click", () => {
        window.history.pushState("addSettings", "Title", "?settings");
    })

    document.querySelector("#new_list").addEventListener("click", () => {
        window.history.pushState("createList", "New List", "?list=hi there");
    })

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    console.log(params.settings === "" && "settings exist" || "it dont exis")
    console.log(params.list)
})()