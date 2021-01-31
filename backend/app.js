const cors = require('cors')
const express = require('express')
const uuid = require('uuid')

const dotenv = require('dotenv');
dotenv.config();
const { PORT, SECRET_KEY } = process.env;

const stripe = require('stripe')('SECRET_KEY')

const app = express();
app.use(express.json())
app.use(cors())

app.post("/payment", (req, res) => {
    const {product, token} = req.body;
    console.log(product);
    const idempontencyKey = uuid;

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {idempontencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`app runnin on port ${PORT}`))