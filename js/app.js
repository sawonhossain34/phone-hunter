const loadPhones = async (searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
}

const displayPhones = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    // new contant remove old content
    phoneContainer.innerHTML = '';
    // document.getElementById('search-field').value='';


    // only 10 phone
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // no phone found
    const noPhone = document.getElementById('no-phone-found');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }

    // show all phone
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML=`
        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text    below as a natural lead-in to additional content. This content is a little bit longer.
                          </p>
                          <button onclick ="loadPhoneDetails('${phone.slug}')"  href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Dtails</button>
                          
                        </div>
                      </div>
        `;
        phoneContainer.appendChild(phoneDiv);

    });
            // end spiner
            toggelSpener(false);
}



const prossessSearch = (dataLimit) => {
    toggelSpener(true);
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}
// button click search phone
document.getElementById('btn-search').addEventListener('click',function(){
    prossessSearch(10);
})
// input field key enter event handelar
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        prossessSearch(10);
      // code for enter
    }
});

const toggelSpener = loading => {
    const displyLoader =document.getElementById('loader');
    if(loading){
        displyLoader.classList.remove('d-none');
    }else{
        displyLoader.classList.add('d-none');
    }
}

// no the best way to the btn show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    prossessSearch();
})

const loadPhoneDetails = async id => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
console.log(phone);
const modalTitle = document.getElementById('exampleModalLabel');
modalTitle.innerText=phone.name;
const phoneDetails =document.getElementById('phone-details');
phoneDetails.innerHTML =`
<p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'NO reeaseDate'}</p>
<p>Stroage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'not found '}</p>
<p>Others: ${phone.others ? phone.others.Bluetooth : 'NO bluetooth'}</p>
`;
}



loadPhones('apple');