
document.addEventListener("DOMContentLoaded", function(){ // проверка
  var recipeData ={
    name:"",
    pauseId: 0,
    pauseNum: 1,
    pause_0:[0,0],
    pause_1:[0,0],
    pause_2:[0,0],
    pause_3:[0,0],
    pause_4:[0,0],
    pause_5:[0,0],
    lastTime:0,
    dotNum: 1,
    dot_0: 0,
    dot_1: 0,
    dot_2: 0
  };

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

  document.querySelector(".jorForm").onsubmit = function(event){
    console.log('Отправка формы ....');
    event.preventDefault();
    recipeData.pauseId = document.querySelector('.jorTopUl .active').getAttribute('data-liJornal'); // ищем по класу актив кому пренадлежит атрибут присваеваем его значение
    recipeData.name = document.querySelector('.jorLiName').value; // записываем в обьект  имя рецепта
    recipeData.pauseNum = document.querySelector('.pauseSelect').value;
    var pauseBody = document.querySelectorAll('.pause') // собираем массив из всех пауз
    for(var i = 0; i < 6; i++){
      var x = pauseBody[i].querySelector('.pauseTemp').value;
      var y = pauseBody[i].querySelector('.pauseTime').value;
      x = Number(x); //переводим в число
      y = Number(y);
      for (var key in recipeData){  // проганяем цикл по всему асициотивному массиву
        if(x > 0 && y > 0){  //смотрим является ли числом и больше 0
          recipeData['pause_'+ i][0] = x; // проверяем на наличие ключа меняя индификатор
          recipeData['pause_'+ i][1] = y;
        }else{
          recipeData['pause_'+ i][0] = 0; // присваиваем 0 если данные == 0 или не евляются целочисленными
          recipeData['pause_'+ i][1] = 0;
        }
      }
    }
    recipeData.lastTime = document.querySelector('.twoPauseSelect .pauseTime').value;
    recipeData.dotNum = document.querySelector('.timeSelect').value;
    var timeBody = document.querySelectorAll('.twoPauseSelect .time');
    for(var i= 0; i < 3; i++){
      var y = timeBody[i].querySelector('.pauseTime').value;
      y = Number(y);
      for (var key in recipeData){
        if(y > 0){
          recipeData['dot_'+ i] = y;
        }else{
          recipeData['dot_'+ i] = 0;
        }
      }
    }
    console.log(recipeData);
    var urlComand = ('/jornal?pauseId='+recipeData.pauseId+'&'
    +'name='+recipeData.name+'&'
    +'pauseNum='+recipeData.pauseNum+'&'
    +'pauseTemp_0='+recipeData.pause_0[0]+'&'
    +'pauseTime_0='+recipeData.pause_0[1]+'&'
    +'pauseTemp_1='+recipeData.pause_1[0]+'&'
    +'pauseTime_1='+recipeData.pause_1[1]+'&'
    +'pauseTemp_2='+recipeData.pause_2[0]+'&'
    +'pauseTime_2='+recipeData.pause_2[1]+'&'
    +'pauseTime_3='+recipeData.pause_3[1]+'&'
    +'pauseTime_3='+recipeData.pause_3[1]+'&'
    +'pauseTime_4='+recipeData.pause_4[1]+'&'
    +'pauseTime_4='+recipeData.pause_4[1]+'&'
    +'pauseTime_5='+recipeData.pause_5[1]+'&'
    +'pauseTime_5='+recipeData.pause_5[1]+'&'
    +'lastTime='+recipeData.lastTime+'&'
    +'dotNum='+recipeData.dotNum+'&'
    +'dot_0='+recipeData.dot_0+'&'
    +'dot_1='+recipeData.dot_1+'&'
    +'dot_2='+recipeData.dot_2+'&');

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
        fun(xhr.responseText); // выполняем функцию callback,a

      }else{
        console.log('Код сервера: '+ xhr.status);
      }
    }
  }

}
