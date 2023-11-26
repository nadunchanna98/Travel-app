const Langchain = require('langchain');
const Pinecone = require('pinecone');

const langchain = new Langchain();
const pinecone = new Pinecone();

// const pdfRead = async (req, res) => {
//     const { url } = req.body;
//     const pdf = await pinecone.pdfRead(url);
//     const text = await langchain.textExtract(pdf);
//     res.send(text);
//     }
    

const pdfText = await langchain.extractText('diseases.pdf');

console.log(pdfText);
// Split the PDF text into chapters
const chapters = pdfText.split('##');

// Create a Pinecone index
const index = await pinecone.createIndex('diseases');

// Add the chapters to the index
for (const chapter of chapters) {
    const title = chapter.split('\n')[0];
    const content = chapter.split('\n').slice(1);
  
    const document = {
      title,
      content,
    };
  
    await index.insert(document);
  }