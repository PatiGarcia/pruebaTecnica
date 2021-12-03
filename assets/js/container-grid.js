(function(){
    const createCards = ()=>{
        const galleryGrid = document.querySelector(".gallery__grid");
        for(let i=0;i<10;i++){
          let containerItem = document.createElement("div");
          containerItem.classList.add("gallery__grid-item");
          // containerItem.classList.add("heart")
          let nItem = "item-"+i;
          containerItem.classList.add(nItem);
          galleryGrid.appendChild(containerItem)
          information = document.createElement("ul");
          information.classList.add("information");
          containerItem.appendChild(information);
          title = document.createElement("li");
          title.classList.add("title");
          information.appendChild(title);
          line = document.createElement("li");
          line.classList.add("dividing-line");
          information.appendChild(line);
          category = document.createElement("li");
          category.classList.add("category");
          information.appendChild(category);
        }
    }
    let searchWords = [];
    const consultApi = ()=>{
        const clienteId= "-ZF7UX8191xAhpkiMMDhc4FCyqKocEZs9LJHSDCHQ1c";
        const url = "https://api.unsplash.com/search/photos/?client_id="
        const mainOptionItem = document.querySelectorAll(".main__links")
        mainOptionItem.forEach(element => {
            searchWords.push(element.textContent);
        });
        let requests = searchWords.map(word =>
            fetch(
              `${url}${clienteId}&query=${word}`
            ),
        );
        responseApi(requests);
    }
    function responseApi(requests){
        Promise.all(requests)
        .then(responses => {
            return responses;
        })
        .then(responses => Promise.all(responses.map(r =>
            r.json())
        ))
        .then(cards =>
            card(cards)
        );
    }
    function card(data){
      let arrayAll =[]
      fillCards("all");
      function fillCards(search){
        const items = document.querySelectorAll(".gallery__grid-item");
        items.forEach(element => {
            element.style.backgroundImage = "";
            element.querySelector(".title").innerHTML = "";
            element.querySelector(".category").innerHTML = "";
        });
        let i=0, selected;
        items.forEach(element => {
            if(search == "all"){
                selected =  getRandomArbitrary(0,data.length);
                arrayAll.push(selected)
            }else{
              selected=search
            }
            if(search == "All"){
              selected = arrayAll[i]
            }
            element.style.backgroundImage = `url(${data[selected].results[i].urls.full}`;
            element.querySelector(".title").innerHTML = data[selected].results[i].user.last_name;
            element.querySelector(".category").innerHTML = searchWords[selected];
            i=i+1;
        });
      }
      //grid or list buttons
      const viewOptions = document.querySelector(".view-options");
      viewOptions.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        let i = 0;
        const items = document.querySelectorAll(".gallery__grid-item");
        if (event.target.classList.contains('options')) {
          let selectedOption = event.target.getAttribute("id")
          if(selectedOption == "list"){
            document.querySelector(".gallery__grid").classList.add("gallery__list")
            items.forEach(element => {
              let nItem = 'item-'+i
              element.classList.remove(nItem)
              element.classList.add("item")
              i=i+1
            });
          }
          if(selectedOption == "grid"){
            document.querySelector(".gallery__grid").classList.remove("gallery__list")
            items.forEach(element => {
              let nItem = 'item-'+i
              element.classList.add(nItem)
              element.classList.remove("item")
              i=i+1
            });
          }
        }
      })
      //selected from options
      const option = document.querySelector(".main--page-header")
      option.addEventListener("click",(event)=>{
          event.preventDefault();
          event.stopImmediatePropagation();
          let txtOption = event.target
          let idOption = txtOption.getAttribute("id")
          if (event.target.classList.contains('main__links')) {
              fillCards(idOption)
          }else{
            fillCards("All")
          }
      })
      //click shoow me more
      const buttonShow = document.querySelector(".button__show");
      const modal = document.querySelector("#modal")
      buttonShow.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        modal.style.display = "block";
      })
      const close = document.querySelector("#close")
      close.addEventListener("click",()=>{
        modal.style.display="none"
      })
    }
    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }
    consultApi();
    createCards();
})();

