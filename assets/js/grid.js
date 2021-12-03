  (function(){
      const mainOptionItem = document.querySelectorAll(".main__links")
      let arrayMainOption = [];
      mainOptionItem.forEach(element => {
        arrayMainOption.push(element.textContent);
      });
      let clienteId= "-ZF7UX8191xAhpkiMMDhc4FCyqKocEZs9LJHSDCHQ1c";
      let requests =
      arrayMainOption.map(name =>
        fetch(
          `https://api.unsplash.com/search/photos/?client_id=${clienteId}&query=${name}`
        ),
      );
      load(requests);
      function load(requests){
        Promise.all(requests)
        .then(responses => {
          return responses;
        })
        .then(responses => Promise.all(responses.map(r =>
          r.json())
        ))
        .then(cards =>
          createCards(cards)
        );
      }
      let data=[]
      function createCards(dataPictures){
        window.data = dataPictures
        create()
        pintar(dataPictures)
      }
      function create(){
        const galleryGrid = document.querySelector(".gallery__grid");
        for(let i=0;i<10;i++){
          let containerItem = document.createElement("div");
          containerItem.classList.add("gallery__grid-item");
          let nItem = "item-"+i;
          containerItem.classList.add(nItem);
          // randomInitialIndex =  getRandomArbitrary(0,window.data.length);
          // randomIndexNext = getRandomArbitrary(0,window.data[randomInitialIndex].results.length);
          // containerItem.style.backgroundImage = `url(${window.data[randomInitialIndex].results[randomIndexNext].urls.full}`;
          galleryGrid.appendChild(containerItem)
          information = document.createElement("ul");
          information.classList.add("information");
          containerItem.appendChild(information);
          title = document.createElement("li");
          title.classList.add("title");
          // title.innerHTML = window.data[randomInitialIndex].results[randomIndexNext].user.last_name;
          information.appendChild(title);
          dividing = document.createElement("li");
          dividing.classList.add("dividing-line");
          information.appendChild(dividing);
          category = document.createElement("li");
          // category.innerHTML = arrayMainOption[randomInitialIndex];
          category.classList.add("category");
          information.appendChild(category);
        }
      }
      function pintar(dataPictures){
        console.log(dataPictures)
        const items = document.querySelectorAll(".gallery__grid-item");
        items.forEach(element => {
          element.style.backgroundImage = "";
          element.querySelector(".title").innerHTML = "";
          element.querySelector(".category").innerHTML = "";
        });
        items.forEach(element => {
          randomInitialIndex =  getRandomArbitrary(0,dataPictures.length);
          console.log(dataPictures)
          randomIndexNext = getRandomArbitrary(0,dataPictures[randomInitialIndex].results.length);
          element.style.backgroundImage = `url(${dataPictures[randomInitialIndex].results[randomIndexNext].urls.full}`;
          element.querySelector(".title").innerHTML = dataPictures[randomInitialIndex].results[randomIndexNext].user.last_name;
          element.querySelector(".category").innerHTML = arrayMainOption[randomInitialIndex];
        });
        
      }
      const viewOptions = document.querySelector(".view-options");
      viewOptions.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.target.classList.contains('options')) {
          let selectedOption = event.target.getAttribute("id")
          console.log(selectedOption)
          if(selectedOption == "list"){
            document.querySelector(".gallery__grid").classList.add("gallery__list")
            const items = document.querySelectorAll(".gallery__grid-item");
            let i = 0;
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
      const options = document.querySelector(".main--page-header");
      options.addEventListener("click",(event)=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.target.classList.contains('main__link')) {
          alert()
          event.preventDefault();
          event.stopImmediatePropagation();
          let txtOption = event.target
          let idOption = txtOption.getAttribute('id')
          pintar(window.data[idOption])

        }
      })
  })();