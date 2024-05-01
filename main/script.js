function movie_display(movie, rating_show = true) {
    if (rating_show) {
        a = `
        <img src=${movie.image}></img>
        <div class="movie_info_small">
            <h4>${movie.title}</h4>
            <p>${movie.year} | ${movie.duration} | ${movie.rating} (IMDB)</p>
            <p>${movie.genre}</p>
        </div>
        <div class="radio_movie_rating">
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-1" name="rating-${movie.title.replace(/ /g, '_')}" value="1">
                <label for="${movie.title.replace(/ /g, '_')}-rating-1">1</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-2" name="rating-${movie.title.replace(/ /g, '_')}" value="2">
                <label for="${movie.title.replace(/ /g, '_')}-rating-2">2</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-3" name="rating-${movie.title.replace(/ /g, '_')}" value="3">
                <label for="${movie.title.replace(/ /g, '_')}-rating-3">3</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-4" name="rating-${movie.title.replace(/ /g, '_')}" value="4">
                <label for="${movie.title.replace(/ /g, '_')}-rating-4">4</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-5" name="rating-${movie.title.replace(/ /g, '_')}" value="5">
                <label for="${movie.title.replace(/ /g, '_')}-rating-5">5</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-6" name="rating-${movie.title.replace(/ /g, '_')}" value="6">
                <label for="${movie.title.replace(/ /g, '_')}-rating-6">6</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-7" name="rating-${movie.title.replace(/ /g, '_')}" value="7">
                <label for="${movie.title.replace(/ /g, '_')}-rating-7">7</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-8" name="rating-${movie.title.replace(/ /g, '_')}" value="8">
                <label for="${movie.title.replace(/ /g, '_')}-rating-8">8</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-9" name="rating-${movie.title.replace(/ /g, '_')}" value="9">
                <label for="${movie.title.replace(/ /g, '_')}-rating-9">9</label>
            </div>
            <div>
                <input type="radio" id="${movie.title.replace(/ /g, '_')}-rating-10" name="rating-${movie.title.replace(/ /g, '_')}" value="10">
                <label for="${movie.title.replace(/ /g, '_')}-rating-10">10</label>
            </div>
        </div>
    `} else {
        a = `
        <img src=${movie.image}></img>
        <div class="movie_info_small">
            <h4>${movie.title}</h4>
            <p>${movie.year} | ${movie.duration} | ${movie.rating} (IMDB)</p>
            <p>${movie.genre}</p>
        </div>
        <div class="radio_movie_rating">
        </div>
        `
    }
    return a;
}
function movie_complete_display(movie) {
    a = `
    <img src = ${movie.image}></img >
        <div class="movie_info_detailed">
            <h3>${movie.title}</h3>
            <p>${movie.year} | ${movie.duration} | ${movie.rating} (IMDB) | ${movie.age_rating}</p>
            <p>${movie.genre} | ${movie.gross}</p>
            <p>Director: ${movie.director}</p>
            <p>Cast: ${movie.stars}</p>
            <p>${movie.summary}</p>
        </div>
    `
    return a
}
site = document.getElementById('search_item');
// if (document.URL.includes('site.html')) {
function permanent_rating_display() {
    document.querySelectorAll('.radio_movie_rating').forEach((radio_set) => {
        radio_set.querySelectorAll('input').forEach((input) => {
            if (input.checked) {
                radio_set.querySelectorAll('div').forEach((div) => {
                    div.style.transform = "scale(1)"
                })
            }
            input.addEventListener('change', () => {
                radio_set.querySelectorAll('div').forEach((div) => {
                    div.style.transform = "scale(1)"
                })
            })
        })
    })
}
if (site) {
    fetch('final_movie_details.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('container');
            const shuffledData = data.sort(() => Math.random() - 0.5);
            shuffledData.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.innerHTML = movie_display(movie);
                movieDiv.id = movie.title.replace(/ /g, '_');
                movieDiv.className = 'movie_content';
                container.appendChild(movieDiv);
            });
            permanent_rating_display();
        })
    search_item = document.getElementById('search_item');
    search = document.getElementById('search');
    search_box = document.getElementById('search_box');
    suggestions = document.getElementById('suggestions');
    cross_button = document.getElementById('cross_button');
    search_item.addEventListener('keyup', () => {
        cross_button.style.display = 'block';
        fetch('final_movie_details.json')
            .then(response => response.json())
            .then(data => {
                const searchString = search_item.value.toLowerCase();
                const filteredMovies = data.filter(movie => {
                    return movie.title.toLowerCase().startsWith(searchString);
                }).concat(data.filter(movie => {
                    return !movie.title.toLowerCase().startsWith(searchString) && movie.title.toLowerCase().includes(searchString);
                }));
                const container = document.getElementById('container');
                container.innerHTML = '';
                console.log("filtered = ", filteredMovies.length);
                if (filteredMovies.length === 0) {
                    const movieDiv = document.createElement('div');
                    movieDiv.innerHTML = `<h4> No movies found</h4> `;
                    container.appendChild(movieDiv);
                    movieDiv.className = 'no_movie';
                }
                else if (filteredMovies.length === 1) {
                    const movieDiv = document.createElement('div');
                    movieDiv.innerHTML = movie_complete_display(filteredMovies[0]);
                    movieDiv.id = filteredMovies[0].id;
                    movieDiv.className = 'movie_detailed_content';
                    container.appendChild(movieDiv);
                }
                else {
                    filteredMovies.forEach(movie => {
                        const movieDiv = document.createElement('div');
                        movieDiv.innerHTML = movie_display(movie);
                        movieDiv.id = movie.title.replace(/ /g, '_');
                        movieDiv.className = 'movie_content';
                        container.appendChild(movieDiv);
                    });
                    permanent_rating_display();
                }
                filteredMovie_titles = filteredMovies.map(movie => movie.title);
                if (search_item.value === '') {
                    suggestions.innerHTML = '';
                }
                else {
                    suggestions.innerHTML = filteredMovie_titles
                        .filter(title => title.toLowerCase().startsWith(search_item.value.toLowerCase()))
                        .concat(filteredMovie_titles.filter(title => !title.toLowerCase().startsWith(search_item.value.toLowerCase()) && title.toLowerCase().includes(search_item.value.toLowerCase())))
                        .slice(0, 5)
                        .map(title => `<div class="suggestions_buttons">${title}</div>`)
                        .join('');
                    console.log(suggestions.innerHTML)
                }
                // if (suggestions.childNodes.length === 1) {
                //     suggestions.innerHTML = '';
                // }
                localStorage.setItem('movies', JSON.stringify(filteredMovie_titles));
            })
            .then(() => {
                document.querySelectorAll('.suggestions_buttons').forEach(s => {
                    s.addEventListener('click', () => {
                        search_item.value = s.innerText;
                        fetch('final_movie_details.json')
                            .then(response => response.json())
                            .then(data => {
                                movie = data.filter(movie => movie.title === s.innerText).map(movie => movie);
                                const movieDiv = document.createElement('div');
                                movieDiv.innerHTML = movie_complete_display(movie[0]);
                                console.log(movie[0]);
                                movieDiv.id = movie[0].title.replace(/ /g, '_');
                                movieDiv.className = 'movie_detailed_content';
                                container.innerHTML = '';
                                container.appendChild(movieDiv);
                                suggestions.innerHTML = '';
                                search_item.value = movie[0].title;
                                document.querySelectorAll('.movie_content').forEach(movie => movie.remove());
                            });
                    });
                });
            });
    });
    function suggestion_press() {
        movie_titles = JSON.parse(localStorage.getItem('movies'));
        console.log(movie_titles);
        fetch('final_movie_details.json')
            .then(response => response.json())
            .then(data => {
                movie = data.filter(movie => movie.title === movie_titles[0]).map(movie => movie);
                const movieDiv = document.createElement('div');
                movieDiv.innerHTML = movie_complete_display(movie[0]);
                console.log(movie[0]);
                movieDiv.id = movie[0].title.replace(/ /g, '_');
                movieDiv.className = 'movie_detailed_content';
                container.innerHTML = '';
                container.appendChild(movieDiv);
                suggestions.innerHTML = '';
                search_item.value = movie[0].title;
                document.querySelectorAll('.movie_content').forEach(movie => movie.remove());
            });
    }
    search_item.addEventListener('keyup', (e) => {
        cross_button.style.display = 'block';
        if (e.key === 'Enter' || e.keyCode === 13) {
            // localStorage.getItem('movies');
            suggestion_press();
        }
    });
    register_button = document.getElementById('register');
    register_button.addEventListener('click', () => {
        window.location.href = './register.html';
    });

    login_button = document.getElementById('login');
    login_button.addEventListener('click', () => {
        window.location.href = './login.html';
    });

    async function ratedMoviesUpdater() {
        let rated_movies = [];
        let ratings_for_rated_movies = {};
        let data = await fetch('final_movie_details.json').then(response => response.json());

        data.forEach(movie => {
            const radios = document.getElementsByName(`rating-${movie.title.replace(/ /g, '_')}`);
            for (let radio of radios) {
                if (radio.checked) {
                    rated_movies.push(movie.title);
                    ratings_for_rated_movies[movie.title] = radio.value;
                    break;
                }
            }
        });

        // console.log(rated_movies);
        // console.log(ratings_for_rated_movies);
        localStorage.setItem('rated_movies', JSON.stringify(rated_movies));
        localStorage.setItem('ratings_for_rated_movies', JSON.stringify(ratings_for_rated_movies));

        return rated_movies.length;
    }

    let recommender_button = document.getElementById('recommender');
    recommender_button.addEventListener('click', async () => {
        let a = await ratedMoviesUpdater();
        console.log(a);
        if (a < 5) {
            alert('Please rate at least 5 movies to get recommendations');
        }
        else {
            window.location.href = './recommended.html';
        }
    });
    let Genres_filtered = document.getElementById('genres_for_filtering').querySelectorAll('input');
    Genres_filtered.forEach(genre => {
        genre.addEventListener('change', () => {
            list_of_genres = [];
            for (g of Genres_filtered) {
                if (g.checked) {
                    list_of_genres.push(g.value);
                }
            }
            fetch('final_movie_details.json')
                .then(response => response.json())
                .then(data => {
                    arranged_data = filterMoviesByGenre(data);
                    // console.log(arranged_data);
                    // console.log(list_of_genres)
                    let list_of_sets = {}
                    for (let g of list_of_genres) {
                        list_of_sets[g] = new Set(arranged_data[g]);
                    }
                    let filtered_titles = []
                    //take intersection of all sets in list of sets
                    if (list_of_genres.length == 0) {
                        filtered_titles = data.map(movie => movie.title)
                    }
                    else {
                        filtered_titles = [...list_of_sets[list_of_genres[0]]];
                        for (let i = 0; i < list_of_genres.length; i++) {
                            filtered_titles = filtered_titles.filter(x => list_of_sets[list_of_genres[i]].has(x));
                        }
                    }
                    // console.log(filtered_titles);
                    filtered_data = [];
                    for (movie_title of filtered_titles) {
                        filtered_data = filtered_data.concat(data.filter(movie => movie.title === movie_title).map(movie => movie));
                    }
                    console.log(filtered_data);
                    return filtered_data
                })
                .then(() => {
                    const container = document.getElementById('container');
                    container.innerHTML = '';
                    filtered_data.forEach(movie => {
                        const movieDiv = document.createElement('div');
                        movieDiv.innerHTML = movie_display(movie);
                        movieDiv.id = movie.title.replace(/ /g, '_');
                        movieDiv.className = 'movie_content';
                        container.appendChild(movieDiv);
                    })
                    permanent_rating_display();
                });
        });
    });
    document.getElementById("sort").addEventListener('change', function () {
        let selectedOption = this.value
        fetch("final_movie_details.json")
            .then(response => response.json())
            .then(data => {
                if (selectedOption === "alphabetically") {
                    data = data.sort((a, b) => a.title.localeCompare(b.title));
                }
                else if (selectedOption === "rating") {
                    data = data.sort((a, b) => b.rating - a.rating);
                }
                else if (selectedOption === "year") {
                    data = data.sort((a, b) => b.year - a.year);
                }
                else {
                    data = data.sort((a, b) => Math.random() - 0.5);
                }
                const container = document.getElementById('container');
                container.innerHTML = '';
                data.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.innerHTML = movie_display(movie);
                    movieDiv.id = movie.title.replace(/ /g, '_');
                    movieDiv.className = 'movie_content';
                    container.appendChild(movieDiv);
                })
                permanent_rating_display();
            })

    })
    movies = document.querySelectorAll('.movie_content');
    console.log(movies);
    for (movie of movies) {
        movie.addEventListener('dblclick', () => {
            console.log('double clicked');
            let movie_display_on_double_click = document.getElementById('movie_display_on_double_click');
            movie_display_on_double_click.style.display = 'flex';
            movie_display_on_double_click.style.flexDirection = 'column';
            movie_display_on_double_click.style.justifyContent = 'center';
            fetch('final_movie_details.json')
                .then(response => response.json())
                .then(data => {
                    clickedMovie = data.filter(movie => movie.title.replace(/ /g, '_') === movie.id).map(movie => movie);
                    movie_display_on_double_click.innerHTML = movie_complete_display(clickedMovie);
                });
            // movie_display_on_double_click.innerHTML = movie_complete_display(movie);
        });
    }
    window.onload = function () {
        if (localStorage.getItem('loggedIn') === 'true') {
            login_button.textContent = 'Logout';
            login_button.addEventListener('click', () => {
                localStorage.setItem('loggedIn', 'false');
                this.textContent = 'Login';
                window.location.href = './site.html';
            });
        }
    }
}

function filterMoviesByGenre(data) {
    const genres = [...new Set(data.flatMap(movie => movie.genre))];
    const moviesByGenre = {};
    console.log(genres);

    genres.forEach(genre => {
        moviesByGenre[genre] = data.filter(movie => movie.genre.includes(genre)).map(movie => movie.title);
    });
    // console.log(moviesByGenre);

    return moviesByGenre;
}
if (location.href.includes('recommended.html')) {
    fetch('final_movie_details.json')
        .then(response => response.json())
        .then(data => {
            rated_movies = JSON.parse(localStorage.getItem('rated_movies'));
            ratings_for_rated_movies = JSON.parse(localStorage.getItem('ratings_for_rated_movies'));
            console.log(rated_movies);
            console.log(ratings_for_rated_movies);
            rated_movies_data = data.filter(movie => rated_movies.includes(movie.title)).map(movie => movie);
            console.log(rated_movies_data);
            // Allgenres = [...new Set(data.flatMap(movie => movie.genre))];
            movies_of_each_rated_genre = {};
            eachGenreAverageRating = {};
            no_of_movies_of_a_genre = {};
            for (movie of rated_movies_data) {
                for (genre of movie.genre) {
                    if (!movies_of_each_rated_genre[genre]) {
                        movies_of_each_rated_genre[genre] = {};
                        eachGenreAverageRating[genre] = 0;
                    }
                    movies_of_each_rated_genre[genre][movie.title] = [movie.rating, ratings_for_rated_movies[movie.title], movie.genre.length];
                    no_of_movies_of_a_genre[genre] = no_of_movies_of_a_genre[genre] ? no_of_movies_of_a_genre[genre] + 1 : 1;
                }
            }
            // console.log(movies_of_each_rated_genre)
            for (genre in movies_of_each_rated_genre) {
                sumN = 0;
                sumD = 0;
                for (movie in movies_of_each_rated_genre[genre]) {
                    a = movies_of_each_rated_genre[genre][movie];
                    sumN += (a[0] * a[1]) / a[2];
                    sumD += a[0] / a[2];
                }
                eachGenreAverageRating[genre] = sumN / sumD;
            }
            // console.log(eachGenreAverageRating);
            time_of_rated_movies = {}
            for (movie of rated_movies_data) {
                intDuration = parseInt(movie.duration.split(' ')[0])
                time_of_rated_movies[movie.title] = [movie.rating, intDuration];
            }
            average_time_of_movies = {}
            sumN_time = 0;
            sumD_time = 0;
            for (movie in time_of_rated_movies) {
                a = time_of_rated_movies[movie];
                sumD_time += a[0];
                sumN_time += a[0] * a[1];
            }
            // for (movie in time_of_rated_movies) {
            //     a = time_of_rated_movies[movie];
            average_time_of_movies[movie] = sumN_time / sumD_time;
            average_year_of_rated_movies = {}
            sumN_year = 0;
            sumD_year = 0;
            for (movie of rated_movies_data) {
                sumN_year += movie.rating * movie.year;
                sumD_year += movie.rating;
            }
            average_year_of_movies = sumN_year / sumD_year;
            let remaining_data = data.map(movie => movie);
            // }
            // console.log(average_time_of_rated_movie);
            let main_recommended_movies = [];
            let score_of_movies_array = {};
            console.log(movies_of_each_rated_genre);
            for (let i = 0; i < 5; i++) {
                score_of_movies = {};
                remaining_data = remaining_data.filter(movie => !rated_movies.includes(movie.title)).map(movie => movie);
                remaining_data.forEach(movie => {
                    score_of_movies[movie.title] = 0;
                    for (genre of movie.genre) {
                        if (movies_of_each_rated_genre[genre]) {
                            score_of_movies[movie.title] += (eachGenreAverageRating[genre] * 10) / movie.genre.length;
                        }
                    }
                    if (Math.abs(movie.duration.split(' ')[0] - average_time_of_movies) <= 15) {
                        score_of_movies[movie.title] += 5;
                    }
                    score_of_movies[movie.title] += Math.max(25 - Math.abs(movie.year - average_year_of_movies), 0);
                });
                score_of_movies_array[i] = Object.entries(score_of_movies);
                score_of_movies_array[i].sort((a, b) => b[1] - a[1]);
                // console.log(score_of_movies_array[i]);
                let top_five_movies = score_of_movies_array[i].slice(0, 5).map(movie => movie[0]);
                // console.log(top_five_movies);
                let recommended_movies = data.filter(movie => top_five_movies.includes(movie.title)).map(movie => movie);
                // console.log(recommended_movies);
                main_recommended_movies.push(recommended_movies[0]);
                for (genre in eachGenreAverageRating) {
                    // console.log(l);
                    if (recommended_movies[0].genre.includes(genre)) {
                        l = no_of_movies_of_a_genre[genre];
                        eachGenreAverageRating[genre] -= 1 / l;
                    }

                }
                console.log(main_recommended_movies[i]);
                //remove main_recommended_movies[i] from remaining_data
                remaining_data = remaining_data.filter(movie => movie.title !== recommended_movies[0].title);
                console.log(eachGenreAverageRating);
            }

            let recommended_container = document.getElementById('recommended_movies');
            main_recommended_movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.innerHTML = movie_display(movie, false);
                movieDiv.id = movie.title.replace(/ /g, '_');
                // movieDiv.className = 'recommended_movie_content';
                movieDiv.classList.add('movie_content');
                recommended_container.appendChild(movieDiv);
            });
        });
}
if (document.URL.includes('register.html')) {
    userName = document.getElementById('username');
    Name = document.getElementById('name');
    password = document.getElementById('password');
    confirmPassword = document.getElementById('confirm_password');
    email = document.getElementById('email');
    submit_register_button = document.getElementById('submit_register');
    // submit_register_button.addEventListener('click', () => {
    //     window.location.href = './site.html';
    // });
    submit_register_button.addEventListener('click', () => {
        const user = {
            'username': userName.value,
            'name': Name.value,
            'password': password.value,
            'email': email.value
        };
        if (user.username == "") {
            alert('Please enter a username');
        }
        else if (user.name == "") {
            alert('Please enter a name');
        }
        else if (user.password == "") {
            alert('Please enter a password');
        }
        else if (user.email == "") {
            alert('Please enter an email');
        }
        else if (password.value !== confirmPassword.value) {
            alert('Passwords do not match');
        }
        else if (!/^[a-zA-Z][\S]*$/.test(user.username)) {
            alert('Username must start with a letter and should not contain spaces');
        }
        else if (!/^[a-zA-Z\s]+$/.test(user.name)) {
            alert('Name must contain only alphabets and spaces');
        }
        else if (user.password.length < 8) {
            alert('Password must be at least 8 characters long');
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
            alert('Invalid email format');
        }
        else {
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'User already exists') {
                        alert('User already exists');
                    }
                    else {
                        alert('Registration successful');
                        window.location.href = './login.html';
                    }
                })
        }
    })
}
if (document.URL.includes('login.html')) {
    userName = document.getElementById('username');
    password = document.getElementById('password');
    submit_login_button = document.getElementById('submit_login');
    register_button = document.getElementById('register');
    // forgot_password_button = document.getElementById('forgot_password');
    submit_login_button.addEventListener('click', () => {
        const userData = {
            'username': userName.value,
            'password': password.value
        };
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User not found') {
                    alert('User not found, first register yourself');
                }
                else if (data.message === 'Invalid password') {
                    alert('Invalid password');
                }
                else {
                    alert('Login successful');
                    localStorage.setItem('loggedIn', 'true');
                    window.location.href = './site.html';
                }
            })
    })
    // forgot_password_button.addEventListener('click', () => {
    //     window.location.href = './forgot_password.html';
    // });
    register_button.addEventListener('click', () => {
        window.location.href = './register.html';
    });
}