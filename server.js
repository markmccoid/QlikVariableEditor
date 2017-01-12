const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');
const _ = require('lodash');

const app = express();

const DATA_FILE = path.join(__dirname, 'qvvariables.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//---------------------------------------------------
//--A get to api/variables will return the qvvariables.json
//--file as a javascript object.
//---------------------------------------------------
app.get('/api/variables', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    //Looks like .send without the JSON.parse does the same as res.json(...)
    //res.send(data);
    res.json(JSON.parse(data));
  });
});

//---------------------------------------------------
//--A GET to api/variables/app will return an
//--array containing a unique list of applications
//--contained in the qvvariables.json file
//---------------------------------------------------
app.get('/api/variables/app', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
  	let qvVars = JSON.parse(data);
  	//pull out the application into an array, then use lodash to grab uniques and sort it.
  	let applicationList = _(qvVars.map(varObj => varObj.application)).uniq().sortBy();
    res.setHeader('Cache-Control', 'no-cache');
    //Looks like .send without the JSON.parse does the same as res.json(...)
    //res.send(data);
    res.send(applicationList);
  });
});

//---------------------------------------------------
//--A GET to api/variables/:application will return an
//--array containing only the qvvariable objects for that
//--specific application as a javascript object.
//---------------------------------------------------
app.get('/api/variables/app/:appName', (req, res) => {
	console.log('server', req.params.appName);
  fs.readFile(DATA_FILE, (err, data) => {
    let qvVars = JSON.parse(data);
    let appName = req.params.appName.toLowerCase();
    let applicationVars = qvVars.filter(qvVar => qvVar.application.toLowerCase() === appName);
    res.setHeader('Cache-Control', 'no-cache');
    res.send(applicationVars);
  });
});

//---------------------------------------------------
//--A POST to api/variables will cause the object sent
//--to be added to the qvvariables.json file.
//--A new object with just the application that the
//--variable was added to will be returned
//---------------------------------------------------
app.post('/api/variables', (req, res) => {
	//If we send an JS object to a post, req.body will have the object in it.
  fs.readFile(DATA_FILE, (err, data) => {
    const variables = JSON.parse(data);

    const newVar = {
			id: uuid.v4(),
			application: req.body.application,
			name: req.body.name,
			expression: req.body.expression,
			description: req.body.description,
			notes: req.body.notes,
			group: req.body.group,
			locked: req.body.locked
		};
		//--add this new variable object too the variables array
    variables.push(newVar);
    //write the variables array back to disk
    fs.writeFile(DATA_FILE, JSON.stringify(variables), () => {
    	let applicationVars = variables.filter(qvVar => qvVar.application.toLowerCase() === req.body.application.toLowerCase());
      res.setHeader('Cache-Control', 'no-cache');
      //return the variables file so application can update it's
      res.json(applicationVars);
    });
  });
});

//---------------------------------------------------
//--A PUT to api/variables will cause the object sent
//--to be updated in the qvvariables.json file.
//--an empty object {} will be returned
//---------------------------------------------------
/**
 * @api {put} /api/variables update a single variable object
 * @apiName UpdateVariable
 * @apiGroup Variables
 *
 * @apiParam {Object} QVVariableObject QV Variable Object.
 *
 * @apiSuccess {Object} emptyObject An Empty Object.
 */
app.put('/api/variables', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const variables = JSON.parse(data);
    //Find the variable to be updated
    variables.forEach(qvVar => {
    	if (qvVar.id === req.body.id) {
				qvVar.application = req.body.application;
				qvVar.name = req.body.name;
				qvVar.expression = req.body.expression;
				qvVar.description = req.body.description;
				qvVar.notes = req.body.notes;
				qvVar.group = req.body.group;
				qvVar.locked = req.body.locked;
    	}
    });
    //write the variables array back to disk
    fs.writeFile(DATA_FILE, JSON.stringify(variables), () => {
      res.setHeader('Cache-Control', 'no-cache');
      //return the variables file so application can update it's
      res.json({});
      res.end();
    });
  });
});

//---------------------------------------------------
//--A DELETE to api/variables will cause the object with
//--the id sent to be deleted
//--an empty object {} will be returned
//---------------------------------------------------
app.delete('/api/variables/:id', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const variables = JSON.parse(data);
    //Filter and remove the variable to be deleted
    const varDeleted = variables.filter(qvVar => qvVar.id !== req.params.id);
    //write the variables array back to disk
    fs.writeFile(DATA_FILE, JSON.stringify(varDeleted), () => {
      res.setHeader('Cache-Control', 'no-cache');
      //return the variables file so application can update it's
      res.json({});
      res.end();
    });
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
