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
        const cardContainer = document.getElementById('cards-container');
        cardContainer.innerHTML = '';
        tools.forEach((tool) => {
            // console.log(tool);
            const {name, image, features, published_in, id} = tool;
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
                        <span onclick="showToolModal('${id}')" class="rounded-circle px-2 py-1 bg-primary arrow-btn" data-bs-toggle="modal" data-bs-target="#toolModal">
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


const showToolModal = async (toolId) =>{
    // console.log(toolId);
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${toolId}`;
    try{
        const loadToolDetails = await fetch(URL);
        const data = await loadToolDetails.json();
        showModal(data.data);
    } catch (error) {
        return alert('Something went wrong! Please try again later.');
    }
}


const showModal = (data) =>{
    // console.log(data);
    const {image_link, input_output_examples, accuracy, description, pricing, features, integrations} = data;
    console.log(image_link, input_output_examples, accuracy, description, pricing, features, integrations);
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="container position-relative">
            <button id="modalClose" type="button" class="btn-close position-absolute top-0 start-100 rounded-pill bg-danger p-2" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col border rounded">
                    <div class="card p-2 border-0">
                        <div class="card-body">
                        <h5 class="card-title">${description}</h5>
                            <div class="card-text d-flex gap-1">
                                <div class=" d-flex flex-column justify-content-center align-items-center bg-warning-subtle rounded text-center p-1 price-container">
                                    <span>
                                    ${pricing[0].plan?pricing[0].plan:'Free of Cost'}
                                    </span>
                                    <span>
                                    ${pricing[0].price?pricing[0].price:'Basic'}
                                    </span>
                                </div>
                                <div class=" d-flex flex-column justify-content-center align-items-center bg-warning-subtle rounded text-center p-1 price-container">
                                    <span>
                                    ${pricing[1].plan?pricing[1].plan:'Free Of Cost'}
                                    </span>
                                    <span>
                                    ${pricing[1].price?pricing[1].price:'Pro'}
                                    </span>
                                </div>
                                <div class=" d-flex flex-column justify-content-center align-items-center bg-warning-subtle rounded text-center p-1 price-container">
                                    <span>
                                    ${pricing[2].plan?pricing[2].plan:'Free Of Cost'}
                                    </span>
                                    <span>
                                    ${pricing[2].price?pricing[2].price:'Pro'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <img src="${image_link[1]?image_link[1] : image_link[0]}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${input_output_examples?input_output_examples[0].input : 'Can you give any example?'}</h5>
                            <p class="card-text">
                            ${input_output_examples?input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

