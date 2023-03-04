let sortingTools = [];
const loadTools = async (num) => {
    showSpinnerBtn(true);
    showBtnFunc();
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const getTools = await fetch(URL);
        const data = await getTools.json();
        if(num){
            sortingTools = data.data.tools.slice(0,num);
            displayTools(data.data.tools.slice(0,num));
        } else {
            sortingTools = data.data.tools;
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
            const {name, image, features, published_in, id} = tool;
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
    const {image_link, input_output_examples, accuracy, description, pricing, features, integrations} = data;
    console.log(pricing);
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <span class="modal-close-btn position-absolute fs-4 top-0 end-0 z-1 bg-danger rounded-circle px-2" data-bs-toggle="modal" data-bs-target="#toolModal">
            <i class="fa-solid fa-xmark" ></i>
        </span>
        <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col p-2 border-0 rounded">
                <div class="card border border-danger py-2 px-3 rounded bg-danger-subtle modal-card">
                    <h4>${description}</h4>
                    <div class="card-body">
                        <div class="d-flex justify-content-around my-3">
                            <div class="p-2 rounded text-center fw-bold d-flex gap-2 fw-bold">
                                <div class="p-2 bg-light-subtle rounded d-flex flex-column justify-content-end align-items-center text-success">
                                    <p>
                                       ${pricing?pricing[0].price:'Free Of Cost'} 
                                    </p>
                                    <p>
                                        ${pricing?pricing[0].plan:'Basic'}
                                    </p>
                                </div>
                                <div class="p-2 bg-light-subtle rounded d-flex flex-column justify-content-end align-items-center text-warning">
                                    <p>
                                        ${pricing?pricing[1].price:'Free Of Cost'} 
                                    </p>
                                    <p>
                                        ${pricing?pricing[1].plan:'Pro'}
                                    </p>
                                </div>
                                <div class="p-2 bg-light-subtle rounded d-flex flex-column justify-content-end align-items-center text-danger">
                                    <p>
                                        ${pricing?pricing[2].price:'Contact Us For Pricing'} 
                                    </p>
                                    <p>
                                        ${pricing?pricing[2].plan:'Enterprise'}
                                    </p>
                                </div>
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
                                <h4>Integrations</h4>
                                <ul class="modal-integrations">
                                    ${generateIntegrations(integrations)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col p-2 border-0 rounded">
                <div class="card border py-2 px-3 rounded modal-card">
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
            <span class="btn btn-danger position-absolute end-0 me-2 mt-2 pt-2 pe-2 accuracy-btn">
                ${accuracy.score * 100}% Accuracy
            </span>
        `;
    }
    return accuracyField;
}

const generateIntegrations = (integrations) => {
    console.log(integrations);
    let integrationsContainer = '';
    if(integrations){
        integrations.forEach((integrationItem) => {
            integrationsContainer += `
            <li>${integrationItem}</li>
        `;
        })
    } else {
        integrationsContainer += `
            No Data Found
        `;
    }
    return integrationsContainer;
}

const showInputOutput = (input_output_examples) => {
    console.log(input_output_examples);
    let inputOutputContainer = '';
    if(input_output_examples){
        inputOutputContainer += `
            <h4>${input_output_examples[1].input || input_output_examples[0].input}</h4>
            <p>${input_output_examples[1].output || input_output_examples[0].output}</p>
        `;
    } else {
        inputOutputContainer += `
            <h4>Can you give any example?</h4>
            <p>No! Not Yet! Take a break!!!</p>
        `;
    }
    return inputOutputContainer;
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

const sortCard = () =>{
    const supportingTools = []
    sortingTools.forEach((tool) => {
        console.log(tool.published_in);
        tool.published_in = new Date (tool.published_in);
        supportingTools.push(tool);

    });
    sortingTools.sort((a,b) => b.published_in.getTime() - a.published_in.getTime());
    sortingTools.forEach((tool) => {
        const year = new Date(tool.published_in).getFullYear();
        const month = ("0" + (new Date(tool.published_in).getMonth()+1)).slice(-2);
        const day = ("0" + new Date(tool.published_in).getDate()).slice(-2);
        tool.published_in = `${day}/${month}/${year}`;
    })
    displayTools(sortingTools);
}
