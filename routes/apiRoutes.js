const fs = require('fs');
const uuid = require('uuid');

module.exports = (app) => {
	//Hooks up the api route 
	app.get('/api/notes', (req, res) => {
		//Read the db file and return the data as JSON
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) throw err;
			return res.json(JSON.parse(data))
		});
	});

	//Allows the user to post data 
	app.post('/api/notes', (req, res) => {
		let note = req.body;
		//Read the db file add an ID to the json obj
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) throw err;
			let notes = JSON.parse(data);
			//Using UUID package to apply the unique ID 
			note.id = uuid.v4();
			notes.push(note);
		fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
				return res.json(note);
			});
		});

	});

	//Bonus
	app.delete('/api/notes/:id', (req, res) => {

		fs.readFile("./db/db.json", "utf8", (err, data) => {
			let note = JSON.parse(data);
			//Refresh the list to show all ID's less the one that was deleted
			let notes = note.filter(note => { return note.id !== req.params.id })
			res.json(notes);
			fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
				if (err) {
					return console.log(err);
				}
			})
		})
	})

};