# Rest Api
## Description

This is a Rest Api that takes json data from a last.fm Api endpoint, map it to an Artist model and write it in a csv file.

## Running the Project

### WebStorm IDE :
download webstorm from https://www.jetbrains.com/webstorm/ and open the project.

### Command Line :

```bash
# install dependencies
$ npm install

# Run nest project
$ npm run start:dev

```

## How to test the project (API)

### Using Insomnia (or postman) :

- Open Insomnia (or postman)
- Create a new request
- Set the method to Get
- Set the url to http://localhost:3000/artists/WriteArtistInfoToCSV and add query params (name, fileName(optional))
Or http://localhost:3000/artists/WriteArtistInfoToCSV?artist=yourArtistName&fileName=yourFileName
- Send the request
- The csv file will be created in the project folder 'src/WrittenCsvFiles/' under the name "yourFileName.csv" or "name.csv" if no fileName is provided

![img.png](src/imgs/img.png)
![img_1.png](src/imgs/img_1.png)
- File created

![img_2.png](src/imgs/img_2.png)

### Using Swagger :

- Open http://localhost:3000/api/ in your browser
- Go to the ArtistsController and click on the Artist ApiTag
- Click on the "Try it out" button
- Fill the form with the artist name and the file name (optional)
- Click on the "Execute" button
- The csv file will be created in the project folder 'src/WrittenCsvFiles/' under the name "yourFileName.csv" or "name.csv" if no fileName is provided

![img_3.png](src/imgs/img_3.png)
![img_4.png](src/imgs/img_4.png)

- File created      

![img_5.png](src/imgs/img_5.png)

