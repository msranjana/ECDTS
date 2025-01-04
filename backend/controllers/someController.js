const xml2js = require('xml2js');

// Function to convert XML to JSON
const convertXmlToJson = async (xml) => {
    try {
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(xml);
        return result;
    } catch (err) {
        console.error('Error converting XML to JSON:', err);
        throw err;
    }
};

// Example usage
const exampleFunction = async (req, res) => {
    const xmlData = '<root><child>example</child></root>'; // Replace with your XML data
    try {
        const jsonData = await convertXmlToJson(xmlData);
        res.json(jsonData);
    } catch (err) {
        res.status(500).send('Error processing XML data');
    }
};

module.exports = {
    exampleFunction
};
