import express from 'express'
import XLSX from 'xlsx'
import fs from 'fs'

let app = express()

const env = process.env.NODE_ENV || 'dev'
const isProduction = env === 'production'



app.get('/read_file', (req, res) => {
	//XLSX.readFile('../../inputs/5RandomWellsJuly18.csv)
	let workbook = XLSX.readFile('inputs/40WellsJuly21.csv');
	let sheets = workbook.SheetNames;

	let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]])

	// fs.readFile('./inputs/5RandomWellsJuly18.csv', function read(err, data) {
	//     if (err) {
	//         throw err;
	//     }
	//     console.log(data)
	//     console.log(data.toString('utf8'))
	// });

	fs.readdir('./inputs', (err, files) => {
  	files.forEach(file => {
    	console.log(file);
  	});
	})

	res.json(data)
		res.end()
})

app.get('/get_files', (req, res) => {
	fs.readdir('./inputs', (err, files) => {
		res.json(files)
		res.end()
	})
})

export default app