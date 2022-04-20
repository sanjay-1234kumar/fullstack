

const express = require('express');

const DbConnect = require('./databse');



const app = express();

const AmzonProductModel = require('./AmzonProduct');
app.set('view engine', 'ejs');

app.use('', express.static('catergory'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//databse connection 

DbConnect();

app.get('/', (req, res, next) => {

    return res.render('index', {
        cater: [
            { id: "appliances", name: "Appliances", im: "c1.jpg" },
            { id: "electronics", name: "Electronics", im: "c2.jpg" },
            { id: "home-&-kitchen", name: "Home & Kitchen", im: "c3.jpg" }],
        product: [{ _id: "pr101", name: "fisrt product",imlink:"ada", buylink:"ada"}],
    });
});


app.get('/about', (req, res, next) => {

    return res.render('about', { user: "sanjay" });
});


app.get('/catergory', (req, res, next) => {

    return res.render('catergory', {
        d: [
            { id: "appliances", name: "Appliances", im: "c1.jpg" },
            { id: "electronics", name: "Electronics", im: "c2.jpg" },
            { id: "home-&-kitchen", name: "Home & Kitchen", im: "c3.jpg" },
            { id: "sports-&-fitness", name: "Sports & Fitness", im: "c4.jpg" },
            { id: "toys-&-games", name: "Toys & Games", im: "c5.jpg" },
            { id: "watches", name: "Watches", im: "c6.jpg" }]
    });
});

app.get('/products/:id', async (req, res, next) => {


    const { id } = req.params;
    try {

        const result = await AmzonProductModel.find({ cater: id });

        return res.render('product', { data: result, id });
    } catch (error) {

        console.log(error);
        return next(error);
    }


});

app.get('/prform', (req, res, next) => {

    return res.render('prform.ejs');


});

app.post('/add-pr', async (req, res, next) => {



    let { cater, rating, name, brand, imlink, buylink } = req.body;

    rating = parseInt(rating);

    try {

        const result = await AmzonProductModel.create({ cater, rating, name, brand, imlink, buylink });



        return res.json({ or: true, result });

    } catch (error) {

        console.log(error);

        return next(error);

    }

});


app.use((err, req, res, next) => {

    return res.json({ status: 400, message: "some error" });
});

app.listen(5000, () => {

    console.log("sever is runing at port 5000");

});

