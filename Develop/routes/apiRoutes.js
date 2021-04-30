const fs = require('fs');
const uuid = require('uuid');

module.exports = (app) => {

	app.get('/api/notes', (req, res) => {
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) throw err;
			return res.json(JSON.parse(data))
		});
	});

	app.post('/api/notes', (req, res) => {
		const note = req.body;
		
		fs.readFile("./db/db.json", "utf8", (err, data) => {
			if (err) throw err;
			let notes = JSON.parse(data)
			note.id = uuid.v4();
			notes.push(note)

		fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
				return res.json(note)
			});
		});

	});

	//delete

};