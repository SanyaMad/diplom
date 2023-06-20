let form = `<form>
<input type="text" id="article-title" placeholder="Введите заголовок статьи">
<textarea id="article-text" placeholder="Введите текст статьи"></textarea>
<input type="file" id="article-photo">
<button type="button" onclick="addArticle()">Добавить статью</button>
</form>`
let formPhoto = `<input type="text" id="urlInput" placeholder="Enter image URL">
                <select name="imya" id="id" class="selectImg">
                    <option value="audi">audi</option>
                    <option value="porsche">porsche</option>
                    <option value="bmw">bmw</option>
                    <option value="hyundai">hyundai</option>
                    <option value="ford">ford</option>  
                </select>
<button onclick="addImage()" id="addButton">Add image</button>`

if(JSON.parse(localStorage.getItem('admin'))){
    if(document.querySelector('.adminkaPhoto')){
        document.querySelector('.adminkaPhoto').innerHTML = formPhoto
    }
    if(document.querySelector('.adminka')){
        document.querySelector('.adminka').innerHTML = form
    }
}

