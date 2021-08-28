const searchFood = async () => {

    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    const error = document.getElementById('error');
    if (searchText == '') {
        error.style.color = "red";
        error.innerText = "Please Some Text Search Your Result";
    } else {
        error.innerText = '';
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displaySearchResult(data.meals))
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);
    }

}

const displaySearchResult = meals => {
    // console.log(meals);
    const searchResult = document.getElementById('search-result');
    searchResult.innerText = '';
    if (!meals) {
        const p = document.createElement('p');
        p.style.textAlign = "center";
        p.innerText = "Result Not Fount";
        searchResult.style.color = "#fff";
        searchResult.style.backgroundColor = '#FA8072';
        searchResult.appendChild(p);
    } else {
        searchResult.style.backgroundColor = "#fff";
        meals.forEach(product => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.style.cursor = "pointer";
            div.innerHTML = `
            <div class="card h-100" onclick="loadMealDetail(${product.idMeal})">
                <img src="${product.strMealThumb}" class="card-img-top rounded-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.strMeal}</h5>
                    <p class="card-text">${product.strInstructions.slice(0,99)}...</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
            // console.log(product);
        })
    }


}

const loadMealDetail = async id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetail(data.meals[0])
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    const mealDetailShow = document.getElementById('meal-detail-show');
    mealDetailShow.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="img-fluid rounded-start rounded-3" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                <p>Items:${meal.strIngredient1}</p>
            </div>
        </div>
    </div>
    `;
    console.log(meal);
}