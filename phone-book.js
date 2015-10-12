'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (typeof(name) === 'string' && typeof(phone) === 'string' && typeof(email) === 'string') {
        var lowerEmail = email.toLocaleLowerCase();
        for (var i in phoneBook) {
            if (phoneBook[i].name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                return undefined;
            }
        }
        if (phoneTest(phone) && emailTest(lowerEmail)) {
            phoneBook.push({name: name, phone: phone, email: lowerEmail});
            //console.log('Контакт ' + name +  ' успешно добавлен.');
        }
        else {
            //console.log('Контакт ' + name + ' не был добавлен.');
        }
    }
    // Ваша невероятная магия здесь

};

var phoneTest = function(phone) {
    var regPhone = /^(\+\d|\d)?[\-\s]?((\(\d{3}\)\s)|(\d{3}\s?))\d{3}[\-\s]?\d[\-\s]?\d{3}$/i;
    if (regPhone.test(phone)){
        return true;
    }
    else {
        return false;
    }
};

var emailTest = function(email) {
    var regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Zа-яА-Я0-9-]+(\.[a-zA-Zа-яА-Я0-9 -.]+)+$/;
    if (regEmail.test(email)){
        return true;
    }
    else {
        return false;
    }
};
/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var result = [];
    // Ваша удивительная магия здесь
    var lowerQuery = query.toLocaleLowerCase();
    for (var i in phoneBook) {
        var curRecord = phoneBook[i];
        var lowerName = curRecord.name.toLocaleLowerCase();
        if (lowerName.indexOf(lowerQuery) > -1) {
            result.push(curRecord);
            continue;
        }
        if (curRecord.email.indexOf(lowerQuery) > -1) {
            result.push(curRecord);
            continue;
        }
        if (curRecord.phone.indexOf(lowerQuery) > -1) {
            result.push(curRecord);
            continue;
        }
    }
    for (i in result) {
        console.log(result[i].name + ', ' + result[i].phone + ', ' + result[i].email);
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {

    // Ваша необьяснимая магия здесь
    var counter = 0;
    var lowerQuery = query.toLocaleLowerCase();
    for (var i in phoneBook) {
        var curRecord = phoneBook[i];
        var lowerName = curRecord.name.toLocaleLowerCase();
        if (lowerName.indexOf(lowerQuery) > -1) {
            phoneBook.splice(i, 1);
            counter += 1;
            continue;
        }
        if (curRecord.email.indexOf(lowerQuery) > -1) {
            phoneBook.splice(i, 1);
            counter += 1;
            continue;
        }
        if (curRecord.phone.indexOf(lowerQuery) > -1) {
            phoneBook.splice(i, 1);
            counter += 1;
            continue;
        }
    }
    console.log('Было удалено ' + counter + ' контактов.');
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
    data =  data.split('\n');
    for (var i = 0; i < data.length; i++) {
        var record = data[i].split(';');
        module.exports.add(record[0], record[1], record[2]);
    }

};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable(filename) {

    // Ваша чёрная магия здесь

};
