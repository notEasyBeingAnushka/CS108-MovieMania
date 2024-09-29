import requests
import json
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

ua = UserAgent()
url1 = 'https://www.imdb.com/list/ls094833375/?sort=user_rating,desc&st_dt=&mode=detail&page=1'
url2 = 'https://www.imdb.com/list/ls094833375/?sort=user_rating,desc&st_dt=&mode=detail&page=2'
r1 = requests.get(url1, headers={'User-Agent': ua.chrome})
r2 = requests.get(url2, headers={'User-Agent': ua.chrome})

    # Scrape the content
# content = r.text
soup1 = BeautifulSoup(r1.text, "html5lib")
soup2 = BeautifulSoup(r2.text, "html5lib")
# print(soup.prettify())
with open('data1.html', 'w', encoding='utf-8') as f:
    f.write(soup1.prettify())
with open('data2.html', 'w', encoding='utf-8') as f:
    f.write(soup2.prettify())

# else:
    # print("Failed to fetch the page")
    
with open('movie_details1.html', 'r', encoding='utf-8') as f:
    contents1 = f.read()
with open('movie_deatils2.html', 'r', encoding='utf-8') as f:
    contents2 = f.read()
    
soup1 = BeautifulSoup(contents1, 'html5lib')
soup2 = BeautifulSoup(contents2, 'html5lib')

movie_details1 = soup1.find_all('div', class_='lister-item-content')
movie_details2 = soup2.find_all('div', class_='lister-item-content')
images1 = soup1.find_all('div', class_='lister-item-image')
images2 = soup2.find_all('div', class_='lister-item-image')
movie_details = movie_details1 + movie_details2
images = images1 + images2
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
    
with open('final_movie.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, ensure_ascii=False, indent=4)
