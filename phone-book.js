'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    if (typeof name !== 'string' || typeof phone !== 'string' || typeof email !== 'string') {
        return;
    }
    var lowerEmail = email.toLocaleLowerCase();
    for (var i = 0; i < phoneBook.length; i++) {
        if (phoneBook[i].name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
            return;
        }
    }
    if (phoneTest(phone) && emailTest(lowerEmail)) {
        phoneBook.push({name: name, phone: phone, email: lowerEmail});
        //console.log('Контакт ' + name +  ' успешно добавлен.');
    } else {
        //console.log('Контакт ' + name + ' не был добавлен.');
    }
    // Ваша невероятная магия здесь

};

var phoneTest = function (phone) {
    var regPhone = /^\+?\d[\-\s]?((\(\d{3}\)\s)|(\d{3}\s?))\d{3}[\-\s]?\d[\-\s]?\d{3}$/i;
    if (regPhone.test(phone)) {
        return true;
    }
};

var emailTest = function (email) {
    var regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Zа-яА-Я0-9-]+(\.[a-zA-Zа-яА-Я0-9]+)+$/;
    if (regEmail.test(email)) {
        return true;
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
    for (var i = 0; i < phoneBook.length; i++) {
        var curRecord = phoneBook[i];
        var lowerName = curRecord.name.toLocaleLowerCase();
        var nameMatch = lowerName.indexOf(lowerQuery);
        var phoneMatch = curRecord.email.indexOf(lowerQuery);
        var emailMatch = curRecord.phone.indexOf(lowerQuery);
        if ((nameMatch > -1) || (phoneMatch > -1) || (emailMatch > -1)) {
            result.push(curRecord.name + ', ' + curRecord.phone + ', ' + curRecord.email);
            continue;
        }
    }
    for (i = 0; i < result.length; i++) {
        console.log(result[i]);
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {

    // Ваша необьяснимая магия здесь
    var counter = 0;
    var lowerQuery = query.toLocaleLowerCase();
    for (var i = 0; i < phoneBook.length; i++) {
        var curRecord = phoneBook[i];
        var lowerName = curRecord.name.toLocaleLowerCase();
        var nameMatch = lowerName.indexOf(lowerQuery);
        var phoneMatch = curRecord.email.indexOf(lowerQuery);
        var emailMatch = curRecord.phone.indexOf(lowerQuery);
        if ((nameMatch > -1) || (phoneMatch > -1) || (emailMatch > -1)) {
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
    data = data.split('\r\n');
    for (var i = 0; i < data.length; i++) {
        var record = data[i].split(';');
        module.exports.add(record[0], record[1], record[2]);
    }
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/

var generateNSymbol = function(symbol, n) {
    var line = '';
    for (var i = 0; i < n; i++) {
        line += symbol;
    }
    return line;
};

var drawTopLine = function (lengthName, lengthPhone, lengthEmail) {
    var line = '┌';
    line += generateNSymbol('─', lengthName + 4);
    line += '┬';
    line += generateNSymbol('─', lengthPhone + 4);
    line += '┬';
    line += generateNSymbol('─', lengthEmail + 4);
    line += '┐';
    return line;
};

var drawMiddleLine = function (lengthName, lengthPhone, lengthEmail) {
    var line = '├';
    line += generateNSymbol('─', lengthName + 4);
    line += '┼';
    line += generateNSymbol('─', lengthPhone + 4);
    line += '┼';
    line += generateNSymbol('─', lengthEmail + 4);
    line += '┤';
    return line;
};

var drawBottomLine = function (lengthName, lengthPhone, lengthEmail) {
    var line = '└';
    line += generateNSymbol('─', lengthName + 4);
    line += '┴';
    line += generateNSymbol('─', lengthPhone + 4);
    line += '┴';
    line += generateNSymbol('─', lengthEmail + 4);
    line += '┘';
    return line;
};

var drawLine = function (name, lengthName, phone, lengthPhone, email, lengthEmail) {
    var line = '│';
    name += generateNSymbol(' ', lengthName - name.length);
    phone += generateNSymbol(' ', lengthPhone - phone.length);
    email += generateNSymbol(' ', lengthEmail - email.length);
    line += '  ' + name + '  │  ' + phone + '  │  ' + email + '  │';
    return line;
};

module.exports.showTable = function showTable(filename) {
    if (phoneBook.length === 0) {
        console.log('Телефонная книга пуста');
        return;
    }

    var maxNameLength = 0;
    var maxPhoneLength = 0;
    var maxEmailLength = 0;
    // Ваша чёрная магия здесь
    for (var i = 0; i < phoneBook.length; i++) {
        var currentRecord = phoneBook[i];
        if (currentRecord.name.length > maxNameLength) {
            maxNameLength = currentRecord.name.length;
        }
        if (currentRecord.phone.length > maxPhoneLength) {
            maxPhoneLength = currentRecord.phone.length;
        }
        if (currentRecord.email.length > maxEmailLength) {
            maxEmailLength = currentRecord.email.length;
        }
    }
    console.log(drawTopLine(maxNameLength, maxPhoneLength, maxEmailLength));
    console.log(drawLine('Имя', maxNameLength, 'Телефон', maxPhoneLength, 'email', maxEmailLength));
    console.log(drawMiddleLine(maxNameLength, maxPhoneLength, maxEmailLength));
    for (var i = 0; i < phoneBook.length; i++) {
        var cur = phoneBook[i];
        console.log(drawLine(cur.name, maxNameLength,
            cur.phone, maxPhoneLength, cur.email, maxEmailLength));
    }
    console.log(drawBottomLine(maxNameLength, maxPhoneLength, maxEmailLength));
};
