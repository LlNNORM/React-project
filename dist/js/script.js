document.addEventListener('DOMContentLoaded', ()=> {
const tabs=document.querySelectorAll('.tabheader__item'),
      tabsContent=document.querySelectorAll('.tabcontent'),
      tabsParent=document.querySelector('.tabheader__items');
function hideTabContent() {
  tabsContent.forEach(item=> item.style.display = 'none');
  tabs.forEach(item => item.classList.remove('tabheader__item_active'));
};
function showTabContent (i = 0) {
  tabsContent[i].style.display='block';
  tabs[i].classList.add('tabheader__item_active')
}
hideTabContent();
showTabContent();
tabsParent.addEventListener('click', (event) => {
  const target = event.target;
  if (target && target.classList.contains('tabheader__item')) {
    tabs.forEach((elem, i) =>{
      if (target==elem) {
        hideTabContent()
        showTabContent(i)}
    })
  }
})
// Timer
const deadLine='2023-07-04';
function getTimeRemaining (endTime) {
let days, hours, minutes, seconds;
const t=Date.parse(endTime) - Date.parse(new Date());
      if (t<=0) {
        days=0;
        hours=0;
        minutes=0;
        seconds=0;
      } else
              {days=Math.floor(t / (1000*60*60*24)),
              hours=Math.floor((t/(1000*60*60))%24),
              minutes=Math.floor((t/(1000*60))%60),
              seconds=Math.floor((t/1000)%60);}

      return{
        'total': t,
        'days': days,
        'hours':hours,
        'minutes':minutes,
        'seconds':seconds

      }
};
function getZero(num) {
  if (num>=0 && num<10) return `0${num}`
      else return num;

}
function setClock(selector, endTime) {
  const timer=document.querySelector(selector);
        days= timer.querySelector('#days'),
        hours= timer.querySelector('#hours'),
        minutes= timer.querySelector('#minutes'),
        seconds= timer.querySelector('#seconds'),
        timeInterval=setInterval(updateClock,1000);

        updateClock();

  function updateClock() {
    const t=getTimeRemaining(endTime);

         days.innerHTML=getZero(t.days);
         hours.innerHTML=getZero(t.hours);
         minutes.innerHTML=getZero(t.minutes);
         seconds.innerHTML=getZero(t.seconds);

         if (t.total<= 0) {
          clearInterval(timeInterval);
         }
  };
       
};
setClock('.timer',deadLine);
console.log(Date.parse('2023-07-04') - Date.parse(new Date()));


 
//  function showModalByScroll () {
    
//       if (window.pageYOffset + document.documentElement.clientHeight> 
//         document.documentElement.scrollHeight-1) {
//           openModal();
//           window.removeEventListener('scroll',showModalByScroll);
//         }   
//  }
//  window.addEventListener('scroll',showModalByScroll);

class MenuCard {
  constructor(imageLink,alt,subtitle,description,price, parentSelector, ...classes) {
    this.imageLink=imageLink;
    this.alt=alt;
    this.subtitle=subtitle;
    this.description=description;
    this.price=price;
    this.parent=document.querySelector(parentSelector);
    this.classes=classes;
  }
  render() {
   const element=document.createElement('div');
   if (this.classes.length===0) {
      this.element='menu__item';
      element.classList.add(this.element);
   } else this.classes.forEach(className => element.classList.add(className))
   element.innerHTML=`
                    <img src=${this.imageLink} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
   `;
    this.parent.append(element);
  }
};
new MenuCard(
  'img/tabs/vegy.jpg', 
  'vegy',
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
   229,
  '.menu .container').render();
new MenuCard(
  'img/tabs/elite.jpg', 
  'elite',
  'Меню “Премиум”',
  'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
  550,
  '.menu .container').render();
new MenuCard(
  'img/tabs/post.jpg', 
  'post',
  'Меню "Постное"',
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    430,
  '.menu .container').render();

  //Modal

const modalTrigger=document.querySelectorAll('[data-modal]'),
      modal=document.querySelector('.modal');

      function openModal () {
        modal.style.display='block';
        document.body.style.overflow='hidden';
        clearInterval(modalTimerId);
        }
        
      function closeModal () {
        modal.style.display='none';
        document.body.style.overflow='';
        }
        
        function postData(form) {
          form.addEventListener('submit', (event)=>{
            event.preventDefault();
            
            const statusMessage=document.createElement('img');
            statusMessage.src=message.loading;
            statusMessage.style.cssText = `
                display : block;
                margin : 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);
        
            fetch('server.php', {
              method: 'POST',
              // headers: {
              //   'Content-type':'application/json',
                body: formData
              }).then(data=> {
                console.log(data)
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=>{
              showThanksModal(message.failure);
            }).finally(()=>{
               form.reset();
            });
          });
          };

          function showThanksModal(message)  {
            const previousModalDialog = document.querySelector('.modal__dialog');
            previousModalDialog.style.display = 'none';
            openModal();
          
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class = 'modal__content'>
                <div data-close class="modal__close">&times;</div>
                    <div class = 'modal__title'>${message}</div>
                </div>
                `;
                document.querySelector('.modal').append(thanksModal);
            setTimeout(()=>{
                  thanksModal.remove();
                  previousModalDialog.style.display='block';
                  closeModal();
            },4000)
          }

modalTrigger.forEach(btn => {
btn.addEventListener('click', openModal);
});

modal.addEventListener('click', (event)=>{
if (event.target===modal || event.target.getAttribute('data-close') == '') {
  closeModal();
} 
});

document.addEventListener('keydown', (e)=>{
if (e.code==='Escape' && modal.style.display==='block') closeModal ();
})
const modalTimerId = setTimeout(openModal, 50000);

//forms

const forms = document.querySelectorAll('form');

forms.forEach(item => {
  postData(item); 
});

const message = {
  loading : 'img/form/spinner.svg',
  success : 'Спасибо! Скоро мы с вами свяжемся',
  failure : 'Что-то пошло не так ...'
};




    

    // const object = {};
    // formData.forEach(fuction(value,key){
    //   object[key] = value;
    // });

    // const json = JSON.stringify(object);

   

//   });
// }


})