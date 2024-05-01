import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

ua = UserAgent()

# URL = "https://www.imdb.com/chart/top/"

r = requests.get('https://www.imdb.com/chart/top/', headers={'User-Agent': ua.chrome})
# print(r.text)
if r.status_code == 200:
    # Scrape the content
    content = r.text
    soup = BeautifulSoup(content, "html5lib")
    # print(soup.prettify())
    with open('sample.html', 'w', encoding='utf-8') as f:
        f.write(soup.prettify())


    # Do something with the content
    # print(content)
else:
    print("Failed to fetch the page")
# r = requests.get(URL)



# import requests

# response = requests.get('http://headers.scrapeops.io/v1/browser-headers?api_key=YOUR_API_KEY')

# print(response.json())