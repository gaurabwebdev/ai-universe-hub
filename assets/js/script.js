const loadTools = async (num) => {
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
        tools.forEach((tool) => {
            const singleCard = document.createElement('div');
            singleCard.classList.add('col');
            singleCard.innerHTML = `
                <div class="card">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            `;
            cardContainer.appendChild(singleCard);
        })
}











