const express = require('express');
const router = express.Router();
var multer = require('multer');
const db = require('../db/db.js');
const Excel = require("exceljs");
const path = require('path');

//multer middleware
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});

var upload = multer({storage: storage});

//Show event form
router.get("/",(req, res)=>{
    res.render("event");
});
//list events
router.get("/event-list",(req, res)=>{
    db.query(`SELECT * FROM events`,
    (err, result) => {

        if(!result.length) {
            res.render("event_list",{warning:'No Data Available',eventLists:[]});
        } else {
            res.render("event_list",{eventLists:result});
        }
    });
});

//add events
router.post("/add",upload.single('image'),(req,res)=>{
        var errors ='';
        var form = {
            eventName: req.body.eventName,
            location: req.body.location
        };
        
        req.checkBody('eventName').not().isEmpty().withMessage('Event Name is required'),
        req.checkBody('location').not().isEmpty().withMessage('Location is required'),
        req.checkBody('endDate').not().isEmpty().withMessage('End Date is required'),
        req.checkBody('startDate').not().isEmpty().withMessage('Start Date is required')

        //check validate data
        var errors = req.validationErrors();
        if(errors){
            res.render('event', {
                errors: errors,
                form:form
            });
        }
        if (!req.file) {
            res.render('event', {
                warning:"Banner is Required",
                form:form
            });
            console.log("No file received");
        }
            db.query(`INSERT INTO events (event_name,location,start_date,end_date,banner) VALUES ('${req.body.eventName}',
            ${db.escape(req.body.location)},${db.escape(req.body.startDate)},
            ${db.escape(req.body.endDate)},${db.escape(req.file.filename)})`,(err, result) => {
            if(result){
                
                res.render("event",{result:'Event is created successfully...'});
            }
            if (err) {
                console.log(err);
                res.render("event",{warning:"Somthing went wrong..."});                     
            }
            });
});

// Edit event Form
router.get("/edit-event/:id",(req,res)=>{
    db.query(`SELECT * FROM events WHERE id =${req.params.id}`,
    (err, result) => {
        if(!result.length) {
            res.render("edit-event",{msg:'No Data Available'});
        } else {
            var data=JSON.stringify(result);
            var data1=JSON.parse(data);
            res.render("edit-event",{
                editEvent: data1[0]
            });
        }
    });
});

//update event
router.post("/update-event/:id",upload.single('image'),(req, res)=>{
    req.checkBody('eventName').not().isEmpty().withMessage('Event Name is required'),
    req.checkBody('location').not().isEmpty().withMessage('Location is required'),
    req.checkBody('endDate').not().isEmpty().withMessage('End Date is required'),
    req.checkBody('startDate').not().isEmpty().withMessage('Start Date is required')

    var errors = req.validationErrors();
    if(errors){
        db.query(`SELECT * FROM events WHERE id =${req.params.id}`,
        (err, result) => {
            if(result) {
                var data=JSON.stringify(result);
                var data1=JSON.parse(data);
                res.render("edit-event",{
                    editEvent: data1[0],
                    errors: errors
                });
            }
        })
    }
    if (!req.file) {
        db.query(`SELECT * FROM events WHERE id =${req.params.id}`,
        (err, result) => {
            if(result) {
                var data=JSON.stringify(result);
                var data1=JSON.parse(data);
                res.render("edit-event",{
                    editEvent: data1[0],
                    warning:'Banner is Required'
                });
            }
        });
    }else{
        db.query(`UPDATE events SET event_name = ${db.escape(req.body.eventName)},
        location = ${db.escape(req.body.location)},start_date =${db.escape(req.body.startDate)},
        end_date =${db.escape(req.body.endDate)},banner =${db.escape(req.file.filename)} 
        WHERE id = ${db.escape(req.params.id)}`, (err, result) => {
        if (err) {
            console.log("Somthing went wrong...");
        }
        if(result){
            res.redirect('/event-list');
        }
       });
    }
});

//Delete events
router.get("/delete-event/:id",(req,res)=>{
    db.query(`DELETE FROM events WHERE id = ${db.escape(req.params.id)}`, (err, result) => {
        if (err) {
            console.log("Somthing went wrong...");
        }
        res.redirect('/event-list');
    });
});
//all events delete
router.post("/remove",(req,res)=>{
    console.log(req.body.removeEventValue);
    console.log("req.body.removeEventValue");
    
    if(req.body.removeEventValue =="all"){
        var sql = "DELETE FROM events";
    }else{
        var data = req.body.removeEventValue+"0";
        var value = data.split(',');
        var sql = 'DELETE FROM events WHERE id IN ('+ value +')';
        console.log(sql);
    }
    db.query(sql,(err,result) => {
        if (result) {
            res.json(result);
        }
    });
});
//excel export events
router.post('/excel', function(req, res){

    try {
        var data = req.body.removeEventValue+"0";
        var value = data.split(',');
         
        db.query(`SELECT * FROM events WHERE id IN (${value})`,
        (err,result) => {
            if(result) {
                var data=JSON.stringify(result);
                var parseData=JSON.parse(data);
 
                var workbook = new Excel.Workbook();
                var worksheet = workbook.addWorksheet();
    
                worksheet.columns = [
                    { header: "Event Name", key: "event_name", width: 15 },
                    { header: "Location", key: "location", width: 15 },
                    { header: "Start Date", key: "start_date", width: 15 },
                    { header: "End Date", key: "end_date", width: 15 },
                    { header: "Banner", key: "banner", width: 30 }
                ];
                  
                parseData.forEach(element => {
                    worksheet.addRow({
                        event_name: element.event_name,
                        location: element.location,
                        start_date: element.start_date,
                        end_date: element.end_date,
                        banner: element.banner
                    });
                });
            
                workbook.xlsx.writeFile("E:/test/public/upload/newEvent.xlsx")
                .then(response => {
                    console.log(path.join(__dirname, "E:/test/public/upload/newEvent.xlsx"));
                    res.sendFile(path.join(__dirname, "E:/test/public/upload/newEvent.xlsx"));
                    var resultData = true;
                    res.json(resultData);
                })
                .catch(err => {
                    console.log(err);
                });
            }
        });
    } catch (err) {
        console.log("this is the error: " + err);
    }
});

module.exports = router;

