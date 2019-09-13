document.addEventListener("DOMContentLoaded", function() { // плавное появление страницы

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
//----------табы
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
 //---------------журнал
  document.querySelector('.jorTopUl').addEventListener('click', jornal); //клик на журнал
  function jornal(event){
    var dataLiJornal = event.target.getAttribute('data-liJornal'); // записывает облость нажатия относительно data
    if(dataLiJornal != null){ // проверка на правильную облость
      ajaxGet('/jornal?number='+dataLiJornal, function (data) {
        config = JSON.parse(data);
      }); 
      var dataJornalBody = document.getElementsByClassName('jorTopLi'); // создаем массив из ли
      for(var i = 0; i< dataJornalBody.length; i++){ // перебераем массив на поиск правильного варианта
        if(i == dataLiJornal){
          dataJornalBody[i].classList.add('active');
          document.querySelector('.jorInfo').style.display = 'none';
          document.querySelector('.jorForm').style.display = 'inline-flex';
        }else{
          dataJornalBody[i].classList.remove('active');
        }
      }
    }
  }
//--------селекты
  document.querySelector('.pauseSelect').addEventListener('change', selectPause); // смотрим за sect
  function selectPause(){
    var pauseData = document.querySelector('.pauseSelect').selectedIndex; // смотрим что изменилось
    var pauseBody = document.querySelectorAll('.pause'); // делаем массив из всех блоков
    for(var i = 0; i < pauseBody.length; i++ ){
      if( i <= pauseData ){
        pauseBody[i].querySelector('.pauseTemp').removeAttribute("disabled");
        pauseBody[i].querySelector('.pauseTime').removeAttribute("disabled");
      }else{
        pauseBody[i].querySelector('.pauseTemp').setAttribute("disabled", "");
        pauseBody[i].querySelector('.pauseTime').setAttribute("disabled", "");
        pauseBody[i].querySelector('.pauseTemp').value = '';
        pauseBody[i].querySelector('.pauseTime').value = '';
      }
    }
  }

  document.querySelector('.timeSelect').addEventListener('change', selectTime); // второй селект
  function selectTime(){
    var pauseData = document.querySelector('.timeSelect').selectedIndex;
    var pauseBody = document.querySelectorAll('.time');
    for(var i = 0; i < pauseBody.length; i++ ){

      if( i <= pauseData ){
        pauseBody[i].querySelector('.pauseTime').removeAttribute("disabled");
      }else{
        pauseBody[i].querySelector('.pauseTime').setAttribute("disabled", "");
        pauseBody[i].querySelector('.pauseTime').value = '';
      }
    }
  }

});
