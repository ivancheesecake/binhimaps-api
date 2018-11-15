require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const multer = require('multer');
const morgan = require('morgan');
const XLSX = require('xlsx');
const fs = require("fs");

// For deployment

const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")))


// const upload = multer({
//     dest: 'uploads/' // this saves your file into a directory called "uploads"

// }); 



var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);

var upload = multer( { storage: storage } );




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/sites', require('./sites/sites.controller'));
app.use('/species', require('./species/species.controller'));
app.use('/farmers_associations', require('./farmer_associations/farmer_associations.controller'));
app.use('/plantations', require('./plantations/plantations.controller'));
app.use('/maintenance_entries', require('./maintenance_entries/maintenance_entries.controller'));

// global error handler
app.use(errorHandler);

// start server

// Serve GeoJSON data

var data = JSON.parse(fs.readFileSync('data/data6.geojson', 'utf8'));
// var data = JSON.parse(fs.readFileSync('data/sngp.json', 'utf8'));

app.get('/features',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    res.json(data);

    // res.sendFile('sngp.json' , { root : __dirname});
})


app.post('/uploadexcel', upload.single('file'), (req, res,next) => {
    // console.log("EGG CELL");
    // res.status(200).send(JSON.stringify({success: true, message: "TANGINA"}));
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        
        const workbook = XLSX.readFile(req.file.path);
        // console.log(workbook);

        var worksheet = workbook.Sheets["TEMPLATE"];
        // console.log(worksheet);

        // Site Code

        var plantation = {}

        var desired_cell = worksheet["D3"];
        plantation.sitecode = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["E3"];
        plantation.siteyear = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["F3"];
        plantation.sitelot = (desired_cell ? desired_cell.v : undefined);    

        var desired_cell = worksheet["I3"];
        plantation.site = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["C5"];
        plantation.module = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["G5"];
        plantation.nature = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["K5"];
        plantation.vegetation_type = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["C7"];
        plantation.soil_color = (desired_cell ? desired_cell.v : undefined);
        
        var desired_cell = worksheet["G7"];
        plantation.soil_texture = (desired_cell ? desired_cell.v : undefined);

        plantation.seed_dispersers = []

        var desired_cell = worksheet["K6"];
        plantation.seed_dispersers.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["L6"];
        plantation.seed_dispersers.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["M6"];
        plantation.seed_dispersers.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["N6"];
        plantation.seed_dispersers.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["B8"];
        plantation.min_elevation = (desired_cell ? desired_cell.v : undefined);
        
        var desired_cell = worksheet["D8"];
        plantation.max_elevation = (desired_cell ? desired_cell.v : undefined);
    
        var desired_cell = worksheet["G8"];
        plantation.slope_range = (desired_cell ? desired_cell.v : undefined);
    
        var desired_cell = worksheet["I9"];
        plantation.location = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["C9"];
        plantation.wor = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["G9"];
        plantation.wor_amount = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["A12"];
        var  month = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["C12"];
        var  day =  (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["D12"];
        var  year = (desired_cell ? desired_cell.v : undefined);

        var month_translated = ""
        
        switch(month){

            case "January":
                month_translated = "01";
                break;
            case "February":
                month_translated = "02";
                break;

            case "March":
                month_translated = "03";
                break;

            case "April":
                month_translated = "04";
                break;

            case "May":
                month_translated = "05";
                break;

            case "June":
                month_translated = "06";
                break;
            
            case "July":
                month_translated = "07";
                break;
            case "August":
                month_translated = "08";
                break;
            case "September":
                month_translated = "09";
                break;
            case "October":
                month_translated = "10";
                break;
            case "November":
                month_translated = "11";
                break;

            case "December":
                month_translated = "12";
                break;
        
        }
        
        if(day.length == 1)
            day = "0"+day;
            
        plantation.date_establishment = year +"-"+month_translated+"-"+day;

        var desired_cell = worksheet["G10"];
        plantation.num_farmers = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["I11"];
        plantation.farmer_association = (desired_cell ? desired_cell.v : undefined);

        plantation.species_planted=[];

        for(var i=15; i<25; i++){

            var desired_cell = worksheet["A"+i];
            var desired_species = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["E"+i];
            var desired_l = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["F"+i];
            var desired_w = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["G"+i];
            var desired_numseedlings = (desired_cell ? desired_cell.v : undefined);

            if(desired_species!="" && desired_l!="" && desired_w!=""){
                plantation.species_planted.push({

                    spacing_l:desired_l,
                    spacing_w:desired_w,
                    species:desired_species,
                    num_seedlings:desired_numseedlings,
                })
            }
            else{
                continue;
            }

        }

        var desired_cell = worksheet["L14"];
        plantation.total_hectarage = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["C25"];
        plantation.regenerants_protected = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["E25"];
        plantation.survival_rate = (desired_cell ? desired_cell.v : undefined);

        plantation.planting_strategy = [];

        var desired_cell = worksheet["J18"];
        plantation.planting_strategy.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["K18"];
        plantation.planting_strategy.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["L18"];
        plantation.planting_strategy.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["M18"];
        plantation.planting_strategy.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["N18"];
        plantation.planting_strategy.push((desired_cell ? desired_cell.v : undefined));

        plantation.planting_source = [];


        var desired_cell = worksheet["J22"];
        plantation.planting_source.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["L22"];
        plantation.planting_source.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["J25"];
        plantation.planting_source.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["L25"];
        plantation.planting_source.push((desired_cell ? desired_cell.v : undefined));

        var desired_cell = worksheet["G25"];
        plantation.total_seedlings = (desired_cell ? desired_cell.v : undefined);

    

        console.log(plantation);

        res.status(200).send(JSON.stringify({success: true, plantation: plantation}));

        // return res.send({
        //   success: true
        // })
      }

    // res.json({"filename": req.file.filename, "type": req.file.mimetype});

});

app.post('/uploadexcelMaintenance', upload.single('file'), (req, res, next) => {
   
    // maintenance:{
    //     plantation_code:"",
    //     site:"",
    //     wor:"",
    //     wor_amount:"",
    //     date_conducted:"",

    //     fruit_trees:[{
    //         species:"",
    //         num_seedlings:"",
    //         amount:""
    //     }],

    //     materials:[{
    //         species:"",
    //         num_replanting:"",
    //         amount:""
    //     }],

    


    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        
        const workbook = XLSX.readFile(req.file.path);

        var worksheet = workbook.Sheets["Sheet2"];
        var maintenance = {};

        var desired_cell = worksheet["C5"];
        maintenance.wor = (desired_cell ? desired_cell.v : undefined);

        var desired_cell = worksheet["G5"];
        maintenance.wor_amount = (desired_cell ? desired_cell.v : undefined);
        
        maintenance.fruit_trees = [];

        for(var i=7; i<12; i++){

            var desired_cell = worksheet["C"+i];
            var desired_species = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["G"+i];
            var desired_num = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["J"+i];
            var desired_amount = (desired_cell ? desired_cell.v : undefined);


            if(desired_species!="" && desired_num!="" && desired_amount!=""){
                maintenance.fruit_trees.push({

                    species:desired_species,
                    num_seedlings:desired_num,
                    amount:desired_amount,
                })
            }
            else{
                continue;
            }

        }

        maintenance.materials = [];

        for(var i=13; i<19; i++){

            var desired_cell = worksheet["C"+i];
            var desired_species = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["G"+i];
            var desired_num = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["J"+i];
            var desired_amount = (desired_cell ? desired_cell.v : undefined);


            if(desired_species!="" && desired_num!="" && desired_amount!=""){
                maintenance.materials.push({

                    species:desired_species,
                    num_replanting:desired_num,
                    amount:desired_amount,
                })
            }
            else{
                continue;
            }

        }

        //     weight_fertilizer:"",
        //     amount_fertilizer:"",
        //     amount_fertilization:"",
        //     amount_hauling:"",
        //     weeding_type:"",
        //     amount_weeding:"",
        //     amount_replanting:"",
        //     num_firelines:"",
        //     amount_firelines:"",
        //     num_watchtowers:"",
        //     amount_watchtowers:"",
        //     num_signboards:"",
        //     amount_signboards:"",
        //     other_equipment:"",
        //     mointoring_implementation:"",
        //     survival_rate:"",
        //     status:"Pending"
        // },

            var desired_cell = worksheet["L13"];
            maintenance.weight_fertilizer = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["L16"];
            maintenance.amount_fertilizer = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["C20"];
            maintenance.amount_hauling = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["E21"];
            maintenance.weeding_type = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["F21"];
            maintenance.amount_weeding = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["H20"];
            maintenance.amount_fertilization = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["J20"];
            maintenance.amount_replanting = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["C24"];
            maintenance.num_firelines = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["C25"];
            maintenance.amount_firelines = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["G24"];
            maintenance.num_watchtowers = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["G25"];
            maintenance.amount_watchtowers = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["I24"];
            maintenance.num_signboards = (desired_cell ? desired_cell.v : undefined);

            var desired_cell = worksheet["I25"];
            maintenance.amount_signboards = (desired_cell ? desired_cell.v : undefined);
    
            var desired_cell = worksheet["K24"];
            maintenance.other_equipment = (desired_cell ? desired_cell.v : undefined);
    
            var desired_cell = worksheet["C26"];
            maintenance.mointoring_implementation = (desired_cell ? desired_cell.v : undefined);
    
            var desired_cell = worksheet["G26"];
            maintenance.survival_rate = (desired_cell ? desired_cell.v : undefined);

        
        console.log(maintenance);
        res.status(200).send(JSON.stringify({success: true, maintenance: maintenance}));

    }




});




const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
