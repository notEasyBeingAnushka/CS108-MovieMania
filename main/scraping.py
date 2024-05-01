import requests
import json
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

ua = UserAgent()


r = requests.get('https://www.imdb.com/list/ls094833375/?sort=user_rating,desc&st_dt=&mode=detail&page=1', headers={'User-Agent': ua.chrome})

# Scrape the content
content = r.text
soup = BeautifulSoup(content, "html5lib")
# print(soup.prettify())
with open('data.html', 'w', encoding='utf-8') as f:
    f.write(soup.prettify())

# else:
    # print("Failed to fetch the page")
    
with open('movie_details.html', 'r', encoding='utf-8') as f:
    contents = f.read()
    
soup2 = BeautifulSoup(contents, 'html5lib')

movie_details = soup2.find_all('div', class_='lister-item-content')
images = soup2.find_all('div', class_='lister-item-image')
movies = []
for movie, image in zip(movie_details, images):
    p_tags = movie.find_all('p', class_='text-muted')
    title = movie.find('h3', class_='lister-item-header').find('a').text.strip()
    # print(p_tags[2].prettify())
    year = movie.find('h3', class_='lister-item-header').find('span', class_='lister-item-year').text.strip().replace('(', '').replace(')', '')
    rating = movie.find('div', class_='ipl-rating-widget').find('span', class_='ipl-rating-star__rating').text.strip()
    age_rating = p_tags[0].find('span', class_='certificate').text.strip()
    duration = p_tags[0].find('span', class_='runtime').text.strip()
    genre = p_tags[0].find('span', class_='genre').text.strip().split(',')
    for i in range(len(genre)):
        genre[i] = genre[i].strip()
    # image = movie.find('div', class_='lister-item-image').find('img')['loadlate']
    summary = movie.find('p', class_='').text.strip().replace('\n', ' ').replace('\t', '').replace('  ', ' ')
    
    stars_list = p_tags[1].find_all('a')
    director = stars_list[0].text.strip()
    stars = [star.text.strip() for star in stars_list[1:]]
    
    span_tags = p_tags[2].find_all('span')
    # print(p_tags[2].prettify())
    # print(len(span_tags))
    if(len(span_tags) == 5):
        gross = span_tags[4].text.strip()
    else:
        gross = None    
    # for image in images:
    image = image.find('img')['loadlate']
    
    movies.append({
        'title': title,
        'year': year,
        'rating': rating,
        'age_rating': age_rating,
        'duration': duration,
        'genre': genre,
        'image': image,
        'summary': summary,
        'director': director,
        'stars': stars,
        'gross': gross
    })
    
with open('final_movie_details.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, ensure_ascii=False, indent=4)
