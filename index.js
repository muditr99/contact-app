const express = require('express');

const path = require('path');

const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware 1
// app.use(function(req, res, next){
//     console.log('middleware 1 called');
//     next();
// });

// // middleware 2
// app.use(function(req, res, next){
//     console.log('middleware 2 called');
//     next();
// })

var contactList = [
    {
        name : "tony",
        pno : "27"
    },
    {
        name : "isco",
        pno : "28"
    },
    {
        name : "klose",
        pno : "34"
    }
]

app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("error in fetching contacts from db", err);
        }
        // console.log(contacts);
        return res.render('home', {
            title: "My contact List",
            contact_list : contacts
           });
    });
    
    /*return res.render('home', {
         title: "My contact List",
         contact_list : contactList
        });*/
    // res.send('<h1>this works fine</h1>');
})

app.get('/practice', function(req, res){
    return res.render('practice', { title: "ejs depth"});
})

app.post('/create-contact', function(req, res){
    // console.log(req.body);
    // contactList.push(req.body);

   /* contactList.push({
        name : req.body.name,
        pno : req.body.phone,
    });*/
    Contact.create({
        name : req.body.name,
        pno : req.body.phone,
    }, function(err, newContact){
        if(err){
            console.log("error in creating a contact", err);
            return;
        }
        console.log(newContact);
        return res.redirect('/');
    })

    // console.log(contactList);
    // return res.redirect('/')
})

app.get('/delete-contact', function(req, res){
    // console.log(req.query);
    /*let pno = req.query.phone;

    let contactIndex = contactList.findIndex((item) => {
        return item.pno == pno;
    })

    // console.log(contactIndex);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }*/

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting the contact", err);
            return;
        }
        return res.redirect('/');
    });

    // return res.redirect('/');
})

app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }
    console.log('express server is running on port', port);
})