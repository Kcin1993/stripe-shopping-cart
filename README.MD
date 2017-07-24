### Resource

Encountering passport package issue([Missing credentials](https://www.youtube.com/watch?v=GHNLWHGCBEc&index=7&list=PLAcqMUt_lZO7-v7gHg5-2X0dVlvVY1DyX)) and have no way to solve. This example is starting from the [nodejs-shopping-cart-tutorial](https://github.com/mschwarzmueller/nodejs-shopping-cart-tutorial) of 03-user-signup-signin.

You can follow this video about building a shopping cart with Express & Stripe payment.


### Seed Data

The mongodb use the db name: shopping and the db port 27017(default).

If you want to import the seed data to the local mongodb.
```
//in root folder
cd seed && node product-seeder.js
```

### Stripe

In this example the Stripe.js api version is V2. You can find the reference [here](https://stripe.com/docs/stripe.js/v2)


### Run in local

use local mongodb
```
sudo ./mongod
./mongo
```

```
npm start
```


