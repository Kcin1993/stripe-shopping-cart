var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://kcinlab:labtest@ds034677.mlab.com:34677/shopping'); //Use the mongoose
// mongoose.connect('localhost:27017/shopping'); //Use the local

var products = [
    new Product({
        imagePath: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/1430100/android/sticker.png;compress=true',
        title: '小雞人跳躍',
        description: '小雞人跳躍10元',
        price: 10
    }),
    new Product({
        imagePath: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/1430118/android/sticker.png;compress=true',
        title: '小雞人睡覺',
        description: '小雞人睡覺20元',
        price: 20
    }),
    new Product({
        imagePath: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/1430134/android/sticker.png;compress=true',
        title: '小小雞人拍桌',
        description: '小小雞人拍桌40元',
        price: 40
    }),
    new Product({
        imagePath: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/1430137/android/sticker.png;compress=true',
        title: '小雞人保母',
        description: '小雞人保母50元',
        price: 50
    }),
    new Product({
        imagePath: 'https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/4873539/android/sticker.png;compress=true',
        title: '小雞人蛻變',
        description: '小雞人蛻變60元',
        price: 60
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}