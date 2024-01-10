const express = require("express");
var fs = require("fs");

const router = express.Router();
const filePath ="src/data/recipea-data.json";

router.get("/find-recipea", (req, res) => {


  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    try {
      const resData = JSON.parse(data);
      res.status(200).json(resData);
    } catch (error) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Internal Server Error');
    }
  });
});

router.get("/find-recipiea/:id", (req, res) => {
    const {id} = req.params



  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    try {
      const resData = JSON.parse(data);
      res.status(200).json(resData[id]);
    } catch (error) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Internal Server Error');
    }
  });
});

router.delete("/trash-recipea/:id", async (req, res) => {
    const indexToDelete = parseInt(req.params.id, 10);
  
  
    try {
      // Read the JSON file
      await fs.readFile(filePath,  "utf8", async(err,rawData)=>{
      
  
      console.log(rawData)
      const jsonData = JSON.parse(rawData)
  
      // Check if the index is valid
      if (indexToDelete >= 0 && indexToDelete < jsonData.length) {
        // Remove the entry at the specified index
        jsonData.splice(indexToDelete, 1);
  
        // Save the updated JSON data back to the file
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2, ), (err)=>{
            console.log(err)
        });
  
        res.json({ success: true, message: `Entry at index ${indexToDelete} deleted successfully.` });
      } else {
        res.status(400).json({ success: false, message: 'Invalid index provided.' });
      }
    });
    } catch (error) {
      console.error('Error deleting entry:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
