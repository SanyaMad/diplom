if(!localStorage.getItem('marka')){
    localStorage.setItem('marka', JSON.stringify('all'))
}
if(document.querySelector('.gallery__link')){
    document.querySelectorAll('.gallery__link').forEach(link =>{
        link.addEventListener('click', ()=>{
            localStorage.setItem('marka', JSON.stringify(link.dataset.marka))
        })
    })
}




