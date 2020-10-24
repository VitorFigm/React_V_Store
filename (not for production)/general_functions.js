///change class
function final_appearance(el) {
    el = document.getElementById(el)
    el.classList.remove('initial_appearance')
}
function initial_appearance(el) {
    el = document.getElementById(el)
    el.classList.add('initial_appearance')
}

///HTTP request
export async function request_home_page(callback,page){
    const form = new FormData()
    form.append('page', page)
    const form_url = new URLSearchParams(form).toString()
    try{
        let response = await fetch('https://the-v-store.herokuapp.com/?'+form_url)
        const worked = true
        callback(worked,await response.json() )
    }catch(err){
        const worked = false
        callback(worked)
    }
}

export async function request_brand_list(callback){
    try{
        const response = await fetch('https://the-v-store.herokuapp.com/brands')
        const brands= await response.json()
        const worked = true
        callback(worked,brands.list)
    }catch(err){
        const worked = false
        callback(worked)
    }
}

export async function request_products_with_search_bar(callback,query){
    const form = new FormData()
    form.append('product_name',query)
    const form_url = new URLSearchParams(form).toString()
    try{
        let response = await fetch('https://the-v-store.herokuapp.com/filter?'+form_url)
        const worked = true
        callback(worked,await response.json())
    }catch(err){
        const worked = false
        callback(worked)
    }
}

export async function request_products_with_filters(callback,page,query,submited_form){
    const form = new FormData(submited_form)  
    if(query!=="")form.append('product_name',query)
    form.append('page',page)
    const form_url = new URLSearchParams(form).toString()
    try{
        let response = await fetch('https://the-v-store.herokuapp.com/filter?'+form_url)
        const worked = true
        callback(worked,await response.json())
    }catch(err){
        const worked = false
        callback(worked)
    }
}

export default { final: final_appearance, initial: initial_appearance }