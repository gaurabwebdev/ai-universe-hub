const loadTools = async (num) => {
    showSpinnerBtn(true);
    showBtnFunc();
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
    }
}

const displayTools = (tools) => {
        const cardContainer = document.getElementById('cards-container');
        cardContainer.innerHTML = '';
        tools.forEach((tool) => {
            // console.log(tool);
            const {name, image, features, published_in, id} = tool;
            // console.log(features);
            const singleCard = document.createElement('div');
            singleCard.classList.add('col', 'border-1');
            singleCard.innerHTML = `
                <div class="card p-3">
                    <img class="rounded thumbnail-image" src="${image}" class="card-img-top" alt="tool-image">
                    <div class="card-body">
                        <h4 class="card-title">Features</h4>
                        <ol>
                            ${generateFeatures(features)}
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
            cardContainer.appendChild(singleCard);
        })
        showSpinnerBtn(false);
}

const generateFeatures = (features) => {
    let featuresContainer = '';
    for (let i=0; i<features.length; i++){
        featuresContainer += `
            <li>${features[i]}</li>
        `;
    }
    return featuresContainer;
}

const showSpinnerBtn = (status) =>{
    const spinner = document.getElementById('spinner');
    const sortBtn = document.getElementById('sort-btn');
    if(status){
        spinner.classList.remove('d-none');
        sortBtn.classList.add('d-none');
    } else {
        spinner.classList.add('d-none');
        sortBtn.classList.remove('d-none');
    }
    
}

const showBtnFunc = () =>{
    const showAllBtn = document.getElementById('show-all-btn');
    showAllBtn.addEventListener('click', function(e){
        e.target.remove();
    })
}

const showToolModal = async (toolId) =>{
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${toolId}`;
    try{
        const loadToolDetails = await fetch(URL);
        const data = await loadToolDetails.json();
        showModal(data.data);
    } catch (error) {
        console.log(error);
    }
}


const showModal = (data) =>{
    // console.log(data);
    const {image_link, input_output_examples, accuracy, description, pricing, features, integrations} = data;
    console.log(pricing);
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
                        <div class="d-flex justify-content-around my-3">
                            <div class="p-2 rounded text-center fw-bold d-flex gap-2">
                                ${showPrices(pricing)}
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-start my-2">
                            <div>
                                <ul class="modal-features">
                                    <h4>Features</h4>
                                    ${generateModalFeatures(features)}
                                </ul>
                            </div>
                            <div>
                                <ul class="modal-integrations">
                                    <h4>Integrations</h4>
                                    ${generateFeatures(integrations)}
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
                        ${showAccuracy(accuracy)}
                        
                    </div>
                    <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
                        ${showInputOutput(input_output_examples)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

const showAccuracy = (accuracy) => {
    let accuracyField = '';
    if(accuracy.score){
        accuracyField += `
            <span class="btn btn-danger position-absolute end-0 pt-2 pe-2 accuracy-btn">
                ${accuracy.score * 100} % Accuracy
            </span>
        `;
    }
    return accuracyField;
}

const showInputOutput = (input_output_examples) => {
    const [firstInputOutput, secondInputOutput] = input_output_examples;
    let msgContainer = '';
    if(firstInputOutput.input || secondInputOutput.input){
        msgContainer += `
            <div class="card-text">
                <h4>${firstInputOutput.input || secondInputOutput.input?secondInputOutput.input: 'Can you give any example?'}</h4>
                <p >${firstInputOutput.output || secondInputOutput.output?secondInputOutput.output:'No! Not Yet! Take a break!!!'}</p>
            </div>
        `;
    }
    return msgContainer;
}

const showPrices = (pricing) => {
    console.log(pricing);
    let pricingPlanContainer = '';
    for(const package of pricing){
        console.log(package);
        pricingPlanContainer += `
                <div class="bg-light-subtle p-2 rounded text-center fw-bold pricing-plans text-success">
                    <p>${package.price?package.price:'Free Of Cost'}</p>
                    <p>${package.plan}</p>
                </div>
        `;
    }
    return pricingPlanContainer;
}




const generateModalFeatures = (features) => {
    const featureCollection = Object.values(features);
    let modalFeaturesContainer = '';
    for(let i = 0; i<featureCollection.length; i++){
        modalFeaturesContainer += `
            <li>${featureCollection[i].feature_name}</li>
        `;
    }
    return modalFeaturesContainer;
}

