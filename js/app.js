const loadPhones = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    // new contant remove old content
    phoneContainer.innerHTML = '';
    document.getElementById('search-field').value='';
    // only 20 phone
    phones = phones.slice(0,20);
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
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                      </div>
        `;
        phoneContainer.appendChild(phoneDiv);

    });
            // end spiner
            toggelSpener(false);
}




// button click search phone
document.getElementById('btn-search').addEventListener('click',function(){
    toggelSpener(true);
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    // console.log(searchText);
})


const toggelSpener = loading => {
    const displyLoader =document.getElementById('loader');
    if(loading){
        displyLoader.classList.remove('d-none');
    }else{
        displyLoader.classList.add('d-none');
    }
}

// loadPhones();