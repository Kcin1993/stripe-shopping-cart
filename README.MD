### Resource

Encountering passport package issue([Missing credentials](https://www.youtube.com/watch?v=GHNLWHGCBEc&index=7&list=PLAcqMUt_lZO7-v7gHg5-2X0dVlvVY1DyX)) and have no way to solve. This example is starting from the [nodejs-shopping-cart-tutorial](https://github.com/mschwarzmueller/nodejs-shopping-cart-tutorial) of 03-user-signup-signin.

You can follow this video about building a shopping cart with Express & Stripe payment.


### Data base

The mongodb use the db name: shopping and the db port 27017(default).

If you want to import the seed data to the local mongodb.
```
//Run and connect to mongodb. In root folder
cd seed && node product-seeder.js
```

If you want to query data
```
//When mongo db is connect use shopping db
use shopping

//Find user
db.users.find()

//Find order
db.orders.find()

//Find product
db.products.find()
```

### Stripe

In this example the Stripe.js api version is V2. You can find the reference [here](https://stripe.com/docs/stripe.js/v2)


### Run in local

use local mongodb
```
//Run and connect to mongodb
sudo ./mongod
./mongo
```

```
//Start the server
npm start
```


### Run online

You can visit this [link](https://shrouded-refuge-63077.herokuapp.com/) to see the demo.

I use the heroku to host this app. This app will auto sleep after 20mins. It will take much more time, if it is first load.

1. mLab
* Create a mLab account
* Use free plan and choose a cloud provider
* Add a database user and use account and password to access db

My test Mongodb url: `mongodb://kcinlab:labtest@ds034677.mlab.com:34677/shopping`
Change mLab url to the moongoose connect

2. heroku

Create a heroku app

```
$ heroku create
```
and go to the heroku app dashboard connect the to github project. Herolu will update after the certain branch is update.

