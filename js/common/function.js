document.addEventListener("DOMContentLoaded", function () { // запустить код после загрузки DOM

  //--------Конфигурации
  var recipeData = {
    "name": "",
    "pauseId": 0,
    "pauseNum": 1,
    "pause_0": [0, 0],
    "pause_1": [0, 0],
    "pause_2": [0, 0],
    "pause_3": [0, 0],
    "pause_4": [0, 0],
    "pause_5": [0, 0],
    "lastTime": 0,
    "dotNum": 1,
    "dot_0": 0,
    "dot_1": 0,
    "dot_2": 0
  };

  var config;
  var dataServ;

  //-------Принятие конфига с сервера   (1 этап)
  var config;
  setTimeout(function () {
    document.querySelector('.container').style.opacity = '1';
  }, 500)
  ajaxGet('/config', function (data) {
    config = JSON.parse(data);
    document.querySelector('#ssid').value = config.ssid;
    document.querySelector('#password').value = config.password;
    setTimeout(function () {
      window.setTimeout(instance, delay); //запуск таймера
    }, 3000)
  }); // вызов запроса

  //---------------------------------

  //-------циклический опрос сервера (2 этап)
  var start = new Date().getTime(),
    time = 0,
    elapsed = '0.0',
    delay = 1000;

  function instance() {
    time += delay;
    elapsed = Math.floor(time / delay) / 10;
    if (Math.round(elapsed) == elapsed) {
      elapsed += '.0';
    }
    ajaxGet('/data', function (data) {
      dataServ = JSON.parse(data);
    }); // вызов запроса
    var diff = (new Date().getTime() - start) - time;
    window.setTimeout(instance, (delay - diff));
  }

  //-------------------------------------------------------------

  //---- отправка wifi формы
  document.querySelector(".wifiForm").addEventListener('submit', function (event) {
    var doc = document;
    console.log('Отправка формы ....');
    event.preventDefault();
    var pass = doc.querySelector('#password').value;
    var ssid = doc.querySelector('#ssid').value;
    pass = encodeURIComponent(pass); // приводим к коректному значению
    ssid = encodeURIComponent(ssid); // приводим к коректному значению
    if (pass == '' || ssid == '') {
      return console.log('Ошибка: отправлена пустая форма!')
    };
    var urlComand = ('/ssid?ssid=' + ssid + '&' + 'password=' + pass);
    ajaxGet(urlComand, function (data) {
      console.log('Ответ от сервера: ' + data)
    });
  });

  //---- запись данных из журнала в обьект
  document.querySelector(".jorForm").onsubmit = function (event) {
    var doc = document;
    console.log('Отправка формы ....');
    event.preventDefault();
    recipeData.pauseId = doc.querySelector('.jorTopUl .active').getAttribute('data-liJornal'); // ищем по класу актив кому пренадлежит атрибут присваеваем его значение
    recipeData.name = doc.querySelector('.jorLiName').value; // записываем в обьект  имя рецепта
    recipeData.pauseNum = doc.querySelector('.pauseSelect').value;
    var pauseBody = doc.querySelectorAll('.pause') // собираем массив из всех пауз
    for (var i = 0; i < 6; i++) {
      var x = pauseBody[i].querySelector('.pauseTemp').value;
      var y = pauseBody[i].querySelector('.pauseTime').value;
      x = Number(x); //переводим в число
      y = Number(y);
      for (var key in recipeData) { // проганяем цикл по всему асициотивному массиву
        if (x > 0 && y > 0) { //смотрим является ли числом и больше 0
          recipeData['pause_' + i][0] = x; // проверяем на наличие ключа меняя индификатор
          recipeData['pause_' + i][1] = y;
        } else {
          recipeData['pause_' + i][0] = 0; // присваиваем 0 если данные == 0 или не евляются целочисленными
          recipeData['pause_' + i][1] = 0;
        }
      }
    }
    recipeData.lastTime = doc.querySelector('.twoPauseSelect .pauseTime').value;
    recipeData.dotNum = doc.querySelector('.timeSelect').value;
    var timeBody = doc.querySelectorAll('.twoPauseSelect .time');
    for (var i = 0; i < 3; i++) {
      var y = timeBody[i].querySelector('.pauseTime').value;
      y = Number(y);
      for (var key in recipeData) {
        if (y > 0) {
          recipeData['dot_' + i] = y;
        } else {
          recipeData['dot_' + i] = 0;
        }
      }
    }
    

    /*
    console.log(recipeData);
    var urlComand = '/jornal?pauseId=' + recipeData.pauseId + '&' +
      'name=' + recipeData.name + '&' +
      'pauseNum=' + recipeData.pauseNum + '&' +
      'pauseTemp_0=' + recipeData.pause_0[0] + '&' +
      'pauseTime_0=' + recipeData.pause_0[1] + '&' +
      'pauseTemp_1=' + recipeData.pause_1[0] + '&' +
      'pauseTime_1=' + recipeData.pause_1[1] + '&' +
      'pauseTemp_2=' + recipeData.pause_2[0] + '&' +
      'pauseTime_2=' + recipeData.pause_2[1] + '&' +
      'pauseTime_3=' + recipeData.pause_3[1] + '&' +
      'pauseTime_3=' + recipeData.pause_3[1] + '&' +
      'pauseTime_4=' + recipeData.pause_4[1] + '&' +
      'pauseTime_4=' + recipeData.pause_4[1] + '&' +
      'pauseTime_5=' + recipeData.pause_5[1] + '&' +
      'pauseTime_5=' + recipeData.pause_5[1] + '&' +
      'lastTime=' + recipeData.lastTime + '&' +
      'dotNum=' + recipeData.dotNum + '&' +
      'dot_0=' + recipeData.dot_0 + '&' +
      'dot_1=' + recipeData.dot_1 + '&' +
      'dot_2=' + recipeData.dot_2 + '&';
    */

   var dataRe = JSON.stringify(recipeData);


    ajaxPost('/jornal',dataRe ,function (data) {
      console.log('Ответ от сервера: ' + data);
    });
  }

});


function ajaxGet(urlComand, callback) {
  var fun = callback || function (data) {};

  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlComand, true);
  xhr.onreadystatechange = function () {
    if (this.status === 200) {
      if (this.readyState != 4) return;
      fun(xhr.responseText);
    } else {
      if (this.readyState != 4) return;
      console.log('Ошибка код: ' + this.status);
    }
  }
  xhr.send();
}


function ajaxPost(urlComand, info , callback) {
  var fun = callback || function (data) {};

  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", urlComand, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.onreadystatechange = function () {
    if (this.status === 200) {
      if (this.readyState != 4) return;
      fun(xhr2.responseText);
    } else {
      //if (this.readyState != 4) return;
      console.log('Ошибка код: ' + this.status);
    }
  }
  xhr2.send(info);
}