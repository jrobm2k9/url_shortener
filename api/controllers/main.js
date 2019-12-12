// Application logic, remember to export fcns

/*Let's the controllers access the mongodb */
const mongoose = require('mongoose');
const dns = require('dns');

/* Brings in the url model so you can interact with the url collection */
const UrlsModel = mongoose.model('Urls');

const urlCreate = (req, res) => {
    try {
        let parseUrl = new URL(req.body.url);
        console.log('This is the result of testing the protocol: ' + (parseUrl.protocol !== 'http:' && parseUrl.protocol !== 'https:') + '  ' + parseUrl.protocol);
        if (parseUrl.protocol !== 'http:' && parseUrl.protocol !== 'https:'){
            console.log('We are here in the if statement before the 400');
            res.status(400).json({"error":"invalid URL"});
        }else {
        //let newIp = /172[.]\d{1,3}[.]\d{1,3}[.]\d{1,3}/;

        dns.lookup(parseUrl.hostname, (err, address) => {
            console.log('This is the address: %j ', address);
            /* if (address === undefined || newIp.test(address) == true){ */
                if (address === undefined){
                console.log('No, were here');
                res.status(400).json({"error":"invalid URL"});
            } else{
                let shortUrl = Math.floor(Math.random() * 1000) + 1;
                console.log('Writing the url to the database');
                UrlsModel.create({
                    original_url: req.body.url,
                    short_url: shortUrl
                });
                res.status(200).json({ original_url: req.body.url, short_url: shortUrl });
            }
        });}
    } catch (error) {
        console.log('We are in the catch ');
        res.status(400).json({"error":"invalid URL"});
    }
};

const urlsReadShortUrl = (req, res) => {
    console.log(req.params.shortUrl);
    UrlsModel
      .find({short_url: req.params.shortUrl}, {original_url: 1, _id: 0})
      .exec((err, origUrl) => {
          //origUrl = JSON.parse(origUrl);
          let result = origUrl.map(a => a.original_url);
          console.log(result[0]);
          //var values = Object.keys(origUrlTest).map(function (key) { return origUrlTest[key]; });
          //console.log('This is the original url: ' + values);
          res
            .status(302)
            .redirect(result[0]);
      });
};

const indexes = (req, res) => {
    res.json({ success: 'True' });
};

module.exports = {
    indexes,
    urlsReadShortUrl,
    urlCreate
};