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

![image](https://user-images.githubusercontent.com/73803585/198861210-2e83eadf-3d5b-4b89-bdd7-29ea96897c81.png)

![image](https://user-images.githubusercontent.com/73803585/198861215-bd021f11-70ba-44fa-ab90-dac19bbc8f56.png)

- File created

![image](https://user-images.githubusercontent.com/73803585/198861220-5c4b1289-9ff5-41cc-b7c1-301c30e7c840.png)

### Using Swagger :

- Open http://localhost:3000/api/ in your browser
- Go to the ArtistsController and click on the Artist ApiTag
- Click on the "Try it out" button
- Fill the form with the artist name and the file name (optional)
- Click on the "Execute" button
- The csv file will be created in the project folder 'src/WrittenCsvFiles/' under the name "yourFileName.csv" or "name.csv" if no fileName is provided

![image](https://user-images.githubusercontent.com/73803585/198861227-c82c2d08-026e-4f24-a85c-ee7ca519455e.png)
![image](https://user-images.githubusercontent.com/73803585/198861228-a7cabcf6-d2d7-435b-89cd-d75de4026203.png)

- File created      

![image](https://user-images.githubusercontent.com/73803585/198861230-a353344b-d7b9-4f9a-853f-a47f2cb3f171.png)

