

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
        product: [
            {
                _id: "pr101", name: "Panasonic 1.5 Ton 5 Star Wi-Fi Twin-Cool Inverter Split Air Conditioner (Copper, Auto Convertible, Shield Blu Anti-Corrosion Technology, 2022",
                imlink: "https://m.media-amazon.com/images/I/51CFPrvNH7L._SL1270_.jpg",
                buylink: "https://www.amazon.in/Panasonic-Conditioner-Convertible-Anti-Corrosion-CU-NU18XKYWA/dp/B09R29RSFH/ref=lp_22501440031_1_2",
            },
           
            {
                _id: "pr103",
                name: "Preethi Blue Leaf Diamond MG-214 mixer grinder 750 watt (Blue/White), 3 jars & Flexi Lid, FBT motor with 2yr Guarantee & Lifelong Free Service",
                imlink: "https://m.media-amazon.com/images/I/51a02ZDkk6S._SL1000_.jpg",
                buylink: "https://www.amazon.in/dp/B0188KPKB2/ref=s9_acsd_al_bw_c2_x_3_i?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-4&pf_rd_r=FZYA4JMC6XVQD4GXK2EH&pf_rd_t=101&pf_rd_p=59c6f785-7a98-4655-83d9-eec87c06b405&pf_rd_i=21488095031",
            },
            {
                _id: "pr104",
                name: "Sfane Duffel Gym Bag,Shoulder Bag for Men & Women with Shoe Compartment (Dark Orange)",
                imlink: "https://m.media-amazon.com/images/I/7130t59Sk5L._SL1500_.jpg",
                buylink: "https://www.amazon.in/Sfane-Duffel-Shoulder-Compartment-Orange/dp/B09WZD4Y2S/ref=sr_1_24?pf_rd_i=1984443031&pf_rd_m=A1K21FY43GMZF8&pf_rd_p=0309658b-9436-4e81-add5-f5e572f1a211&pf_rd_r=0QAGMJAEBGWSFVDYRG4M&pf_rd_s=merchandised-search-4&pf_rd_t=101&qid=1650535693&refinements=p_n_date_first_available_absolute%3A1318488031%2Cp_28%3A-pants-track-bra-sweatshirt-trackpants-Longies-thermal-top-shorts-shirt-hoodie-Symbol-Eden&s=sports&sr=1-24&th=1",
            },
            {
                _id: "pr105",
                name: "Smartivity Crazy Wheels STEM DIY Fun Toys | Spin Speed - 1800 RPM | Fast Speed, Amazing Stunt & Jump Actions",
                imlink: "https://m.media-amazon.com/images/I/81t0yAkVstL._SL1500_.jpg",
                buylink: "https://www.amazon.in/gp/product/B09X7D85FY/ref=s9_acss_bw_cg_HTLHead_3a1_w?pf_rd_m=A1K21FY43GMZF8&pf_rd_s=merchandised-search-8&pf_rd_r=BB12WEDXV6VWQGSFPQHF&pf_rd_t=101&pf_rd_p=85a7c3e9-8e71-4505-acba-30113d3ebfd7&pf_rd_i=1350380031&th=1",
            },
            {
                _id: "pr106",
                name: "Fossil Gen 5 Touchscreen Men's Smartwatch with Speaker, Heart Rate, GPS, Music Storage and Smartphone Notifications",
                imlink: "https://m.media-amazon.com/images/I/71tc0IQKJGL._UL1500_.jpg",
                buylink: "https://www.amazon.in/dp/B07SSVWD1X/ref=QAHzEditorial_en_IN_1?pf_rd_r=VV2KQ6SPT35XJ715DEAM&pf_rd_p=597ca950-c281-4385-9a78-bf4a000b37a4&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-4&pf_rd_t=30901&pf_rd_i=1350387031&th=1",
            },
        ],
    });
});

app.get('/allpr', async (req, res, next) => {

    try {
        const result = await AmzonProductModel.find();

        return res.json(result);

    } catch (error) {

        console.log(error);
        return next(error);

    }


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

