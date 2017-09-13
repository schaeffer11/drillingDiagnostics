import express from 'express'
import XLSX from 'xlsx'
import fs from 'fs'

let app = express()

const env = process.env.NODE_ENV || 'dev'
const isProduction = env === 'production'


app.get('/get_files', (req, res) => {
	fs.readdir('./inputs', (err, files) => {
		res.json(files)
		res.end()
	})
})



app.get('/read_file', (req, res) => {
	let { file } = req.query

	let workbook = XLSX.readFile('inputs/' + file);
	let sheets = workbook.SheetNames;

	let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheets[0]])

	// fs.readFile('./inputs/5RandomWellsJuly18.csv', function read(err, data) {
	//     if (err) {
	//         throw err;
	//     }
	//     console.log(data)
	//     console.log(data.toString('utf8'))
	// });

	res.json(data)
		res.end()
})



export default app