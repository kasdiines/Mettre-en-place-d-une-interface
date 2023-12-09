//foncton qui filltre mes mots 
document.getElementById("filterInput").addEventListener("input", function() {
    var filterValue = this.value.toLowerCase();
    var inbox = document.getElementsByClassName("box");

    for (var i = 0; i < inbox.length; i++) {
        var box = inbox[i];
        var text = box.textContent || box.innerText;

        if (text.toLowerCase().indexOf(filterValue) > -1) {
            box.classList.remove("hidden");
        } else {
            box.classList.add("hidden");
        }
    }
});
const container = document.getElementById('container');
const loadingText = document.createElement('div');
loadingText.classList.add('loading-text');
loadingText.textContent = 'Loading...';
container.appendChild(loadingText);

let page = 1;
let isLoading = false;

//function qui fais appel a mon api
function fetchData() {
    isLoading = true;
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
        .then(response => response.json())
        .then(data => {
            loadingText.style.display = 'none';

            data.forEach(item => {
                const paragraph = document.createElement('div');
                paragraph.innerHTML = `
                    <h2>${item.title}</h2>
                    <p>${item.body}</p>
                `;
                paragraph.classList.add('box');
                container.appendChild(paragraph);
            });

            isLoading = false;
            page++;
        })
        .catch(error => {
            console.log('Une erreur s\'est produite :', error);
            isLoading = false;
        });
}

function handleScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    if (scrollTop + windowHeight >= documentHeight - 100 && !isLoading) {
        loadingText.style.display = 'block';
        fetchData();
    }
}

window.addEventListener('scroll', handleScroll);

// Initial load
fetchData();
     
