const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const moviesData = fs.readFileSync('final_movie_details.json', 'utf-8');
const movies = JSON.parse(moviesData);

const server = http.createServer((req, res) => {
	// Construct the file path based on the requested URL
	if (req.url === '/register') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString(); // Convert Buffer to string
		});
		req.on('end', () => {
			user = JSON.parse(body);

			fs.readFile('./users.json', (err, data) => {
				users = JSON.parse(data);
				userfound = false;
				for (let i = 0; i < users.length; i++) {
					if (users[i].username == user.username) {
						userfound = true;
						res.end(JSON.stringify({ message: "User already exists" }));
					}
				}
				if (!userfound) {
					users.push(user);
					fs.writeFile('./users.json', JSON.stringify(users), (err) => {
						if (err) {
							res.end(JSON.stringify({ message: "Error registering user" }));
						}
						else {
							res.end(JSON.stringify({ message: "User registered successfully" }));
						}
					});
				}
			});

		});
	}
	else if (req.url === '/login') {
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString(); // Convert Buffer to string
		});
		req.on('error', err => {
			console.error('An error occurred:', err);
			res.end(JSON.stringify({ message: "An error occurred while processing the request" }));
		});
		req.on('end', () => {
			user = JSON.parse(body);
			// console.log(user);
			fs.readFile('./users.json', (err, data) => {
				if (err) {
					console.error('An error occurred:', err);
					res.end(JSON.stringify({ message: "An error occurred while reading the users file" }));
					return;
				}

				users = JSON.parse(data);
				let userfound = false;
				let authenticated = false;
				for (let i = 0; i < users.length; i++) {
					if (users[i].username == user.username) {
						userfound = true;
						if (users[i].password == user.password) {
							authenticated = true;
						}
						else {
							authenticated = false;
						}
						break;
					}
				}
				if (userfound) {
					if (authenticated) {
						res.end(JSON.stringify({ message: "User authenticated successfully" }));
					}
					else {
						res.end(JSON.stringify({ message: "Incorrect password" }));
					}
				}
				else {
					res.end(JSON.stringify({ message: "User not found" }));
				}
			});
		});
	}
	else {
		let filePath = req.url === '/' ? './site.html' : `.${req.url}`;

		// Determine the Content-Type based on the file extension
		let extname = String(path.extname(filePath)).toLowerCase();
		let contentType = 'text/html';
		let mimeTypes = {
			'.html': 'text/html',
			'.js': 'text/javascript',
			'.css': 'text/css',
			'.json': 'application/json',
			'.png': 'image/png',
			'.jpg': 'image/jpg',
			'.gif': 'image/gif',
			'.svg': 'image/svg+xml',
		};

		contentType = mimeTypes[extname] || 'application/octet-stream';

		// Read the file
		fs.readFile(filePath, (err, data) => {
			if (err) {
				res.end('404 Not Found');
			} else {
				res.end(data);
			}
		});
	}
});


server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
