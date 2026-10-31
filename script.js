const pincodeInput = document.getElementById('pincodeInput');
const lookupBtn = document.getElementById('lookupBtn');
const errorMsg = document.getElementById('errorMsg');
const loader = document.getElementById('loader');
const resultsSection = document.getElementById('resultsSection');
const pincodeDisplay = document.getElementById('pincodeDisplay');
const messageDisplay = document.getElementById('messageDisplay');
const filterInput = document.getElementById('filterInput');
const postalGrid = document.getElementById('postalGrid');
const noResultMsg = document.getElementById('noResultMsg');

let allPostalData = [];
let apiMessage = '';
let currentPincode = '';

lookupBtn.addEventListener('click', handleLookup);

filterInput.addEventListener('input', (e) => {
    const filterValue = e.target.value.toLowerCase().trim();
    const filteredData = allPostalData.filter(item => 
        item.Name.toLowerCase().includes(filterValue)
    );
    renderResults(filteredData);
});

async function handleLookup() {
    const pincode = pincodeInput.value.trim();
    
    errorMsg.classList.add('hidden');
    errorMsg.textContent = '';
    resultsSection.classList.add('hidden');
    noResultMsg.classList.add('hidden');
    filterInput.value = '';

    if (pincode.length !== 6 || isNaN(pincode)) {
        errorMsg.textContent = 'Pincode must be 6 digits';
        errorMsg.classList.remove('hidden');
        return;
    }

    currentPincode = pincode;
    loader.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        
        loader.classList.add('hidden');

        if (data && data[0].Status === 'Success') {
            allPostalData = data[0].PostOffice;
            apiMessage = data[0].Message;
            pincodeDisplay.textContent = `Pincode: ${currentPincode}`;
            messageDisplay.textContent = `Message: ${apiMessage}`;
            renderResults(allPostalData);
            resultsSection.classList.remove('hidden');
        } else {
            errorMsg.textContent = data[0].Message || 'Failed to fetch postal data.';
            errorMsg.classList.remove('hidden');
        }
    } catch (error) {
        loader.classList.add('hidden');
        errorMsg.textContent = 'An error occurred while fetching data. Please try again.';
        errorMsg.classList.remove('hidden');
    }
}

function renderResults(data) {
    postalGrid.innerHTML = '';
    
    if (data.length === 0) {
        noResultMsg.classList.remove('hidden');
        return;
    }

    noResultMsg.classList.add('hidden');

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'postal-card';
        card.innerHTML = `
            <p>Name: ${item.Name}</p>
            <p>Branch Type: ${item.BranchType}</p>
            <p>Delivery Status: ${item.DeliveryStatus}</p>
            <p>District: ${item.District}</p>
            <p>Division: ${item.Division}</p>
        `;
        postalGrid.appendChild(card);
    });
}