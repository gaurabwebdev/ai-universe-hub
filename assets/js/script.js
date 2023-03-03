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
                    <div onload="showDefaultFeatures(${features})" class="card-body">
                        <h4 class="card-title">Features</h4>
                        <ol class="card-text  features-list">
                            
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

const showDefaultFeatures = (features) => {
    console.log(features);
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
    console.log(data);
    const {image_link, input_output_examples, accuracy, description, pricing, features, integrations} = data;
    const [firsInOut, secondInOut] = input_output_examples;
    // console.log(image_link, input_output_examples, accuracy, description, pricing, features, integrations);
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <span class="modal-close-btn position-absolute fs-4 top-0 end-0 z-1 bg-danger rounded-circle px-2" data-bs-toggle="modal" data-bs-target="#toolModal">
            <i class="fa-solid fa-xmark" ></i>
        </span>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col p-2 border-0 rounded">
                <div class="card border border-danger py-2 px-3 rounded bg-danger-subtle">
                    <h4>${description}</h4>
                    <div class="card-body">
                        <div class="d-flex justify-content-evenly">
                            <div class="d-flex flex-column text-center p-2 bg-body-tertiary rounded fw-bold text-success">
                                <span>${pricing[0].price}</span>
                                <span>${pricing[0].plan}</span>
                            </div>
                            <div class="d-flex flex-column text-center p-2 bg-body-tertiary rounded fw-bold text-warning">
                                <span>${pricing[1].price}</span>
                                <span>${pricing[1].plan}</span>
                            </div>
                            <div class="d-flex flex-column text-center p-2 bg-body-tertiary rounded fw-bold text-danger">
                                <span>${pricing[2].price}</span>
                                <span>${pricing[2].plan}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-start my-2">
                            <div>
                                <ul class="modal-features">
                                    <h4>Features</h4>
                                    
                                </ul>
                            </div>
                            <div>
                                <ul class="modal-integrations">
                                    <h4>Integrations</h4>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col p-2 border-0 rounded">
                <div class="card border py-2 px-3 rounded">
                    <div class="position-relative">
                        <img src="${image_link[1]?image_link[1]: image_link[0]}" class="card-img-top" alt="...">
                        <span class="btn btn-danger position-absolute end-0 mt-2 me-2">${accuracy.score * 100}% Accuracy</span>
                    </div>
                    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
                        <h5 class="card-title">${secondInOut.input?secondInOut.input:firsInOut.input || 'Can you give any example?'}</h5>
                        <p class="card-text">${secondInOut.output?secondInOut.output:firsInOut.output || 'No! Not Yet! Take a break!!!'}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}




{/* <li>${integrations[0]}</li>
<li>${integrations[1]}</li>
<li>${integrations[2]}</li> 
<li>${features.feature_name}</li>*/}

{/* <li>${features[0]}</li>
<li>${features[1]}</li>
<li>${features[2]}</li> */}