const loadTools = async (num) => {
    showSpinnerBtn(true);
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const getTools = await fetch(URL);
        const data = await getTools.json();
        if(num){
            displayTools(data.data.tools.slice(0,num));
        } else {
            displayTools(data.data.tools);
        }
    } catch (error) {
        console.log(error);
        return alert ('Upps! Something Went Wrong. Please Try Again After Sometime.');
    }
}

const displayTools = (tools) => {
        console.log(tools);
        const cardContainer = document.getElementById('cards-container');
        cardContainer.innerHTML = '';
        tools.forEach((tool) => {
            const {name, image, features, published_in} = tool;
            console.log(image, features,published_in);
            const singleCard = document.createElement('div');
            singleCard.classList.add('col', 'border-1');
            singleCard.innerHTML = `
                <div class="card p-3">
                    <img class="rounded thumbnail-image" src="${image}" class="card-img-top" alt="tool-image">
                    <div class="card-body">
                        <h4 class="card-title">Features</h4>
                        <ol class="card-text  features-list">
                            <li>${features[0]}</li>
                            <li>${features[1]}</li>
                            <li>${features[2]}</li>
                        </ol>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <div>
                            <h5>${name}</h5>
                            <p class="m-0">
                            <i class="fa-solid fa-calendar-days"></i>
                            ${published_in}</p>
                        </div>
                        <span onclick="showToolModal" class="rounded-circle px-2 py-1 bg-primary arrow-btn">
                            <i class="fa-solid fa-arrow-right"></i>
                        </span>
                    </div>
                </div>
            `;
            showSpinnerBtn(false);
            cardContainer.appendChild(singleCard);
        })
}


const showSpinnerBtn = (status) =>{
    const spinner = document.getElementById('spinner');
    const showAllBtn = document.getElementById('show-all-btn');
    const sortBtn = document.getElementById('sort-btn');
    if(status){
        spinner.classList.remove('d-none');
        showAllBtn.classList.add('d-none');
        sortBtn.classList.add('d-none');
    } else {
        spinner.classList.add('d-none');
        showAllBtn.classList.remove('d-none');
        sortBtn.classList.remove('d-none');
    }
}







