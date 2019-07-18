
document.addEventListener("DOMContentLoaded", function(){ // проверка
  document.querySelector(".wifiForm").onsubmit = function(event){
   console.log('Отправка формы ....');
   event.preventDefault();
   var pass = document.querySelector('#password').value;
   var ssid = document.querySelector('#ssid').value;
   pass = encodeURIComponent(pass); // приводим к коректному значению
   ssid = encodeURIComponent(ssid);// приводим к коректному значению
   if(pass==''||ssid==''){return console.log('Ошибка: отправлена пустая форма!');
  }
   var urlComand = ('/ssid?ssid='+ssid+'&'+'password='+pass );
   ajaxGet(urlComand,function(data){
    console.log('Ответ от сервера: ' + data);
   })
  }
});

function ajaxGet(urlComand, callback){
  var fun = callback || function(data){};

  var xhr = new XMLHttpRequest(); //создаем новый экземпляр обекта
  xhr.open('GET',urlComand); // задаем метод и сообщение для передачи
  xhr.send(); // осуществляем отправку команды

  var i = 0; // для счета попыток
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 ){
      if(xhr.status === 200){ // если код ответа 200 (удалось)
        fun(xhr.responseText); //отдаем принятое сообщение и выполняем функцию callback,a

      }else{
        console.log('Код сервера: '+ xhr.status);
      }
    }
  }

}
