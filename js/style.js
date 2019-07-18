document.addEventListener("DOMContentLoaded", function() { // Ожидаем загрузки ДОМ
//часть для первоночальной загрузки
  var dataTab = document.querySelector('.active').getAttribute('data-tab'); // присваивает значение по умолчанию относительно html
  var tabBody = document.getElementsByClassName('cont');
  for(var i=0; i < tabBody.length; i++){ // начинаем цикл равный количеству элементоа массива для того чтобы сделать блок активный не нужные не активными
    if(i == dataTab){
      tabBody[i].style.display = 'block';
    }else{
      tabBody[i].style.display = 'none';
    }
  }

//часть по обработчику действий
  document.querySelector('.sidebarUl').addEventListener('click',tabs); //находим список устанавливаем обработку соботия на клик
  function tabs(event){
      var tabCle = document.getElementsByClassName('sidebarButton'); // указываем путь до активного класса
       for(var i=0; i < tabCle.length; i++){ // сбрасываем актив сов сех классов
         tabCle[i].classList.remove('active');
       }
      event.target.classList.add('active'); // вешаем активный класс
      dataTab = event.target.getAttribute('data-tab'); // записываем номер эелемента по атрибуту data-
      tabBody = document.getElementsByClassName('cont'); // из всех ечеек контента состовляем массив
      for(var i=0; i < tabBody.length; i++){ // начинаем цикл равный количеству элементоа массива для того чтобы сделать блок активный не нужные не активными
        if(i == dataTab){
          tabBody[i].style.display = 'block';
        }else{
          tabBody[i].style.display = 'none';
        }
      }
  }
});
