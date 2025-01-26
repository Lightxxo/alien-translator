const express = require('express');
const path = require('path');
const { Sequelize, DataTypes } = require('@sequelize/core');  // Corrected import for Sequelize
const app = express();
const port = 7070;
var cors = require('cors');



const sequelize = new Sequelize({
  dialect: 'postgres', 
  database: 'alien',
  user: 'postgres',
  password: 'a',
  host: 'localhost',
  port: 5432,
  ssl: false,  
  clientMinMessages: 'notice',

});


const Link = sequelize.define('Link', {
  link: {
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: true,}

}, {timeStamp: false, createdAt: false, updatedAt: false, id: false});



const Words = sequelize.define('Words', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  earthWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alienWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {timeStamp: false, createdAt: false, updatedAt: false, id: false});


sequelize.sync({ force: true })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });



app.use(express.json());

app.use(cors());

app.post('/share', async (req, res) => {
  let { data } = req.body;
  console.log('GENERATE SHARE LINK', typeof data, data);

  try {

    const link = await Link.create({ data });
    res.json(link);
  } catch (err) {
    console.error('Error creating link:', err);
    res.status(500).json({ message: 'Error creating link', error: err.message });
  }
});


app.get('/share', async (req, res) => {
  try {
    const links = await Link.findAll();
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching links', error: err });
  }
});






app.post('/words', async (req, res) => {
    const { earthWord, alienWord, category } = req.body;
    console.log('GOT POST REQUEST', earthWord,alienWord, category);
      try {
        const word = await Words.create({ earthWord, alienWord, category });
        res.json(word);
      } catch (err) {
        res.status(500).json({ message: 'Error creating word', error: err });
      }
});


app.get('/words', async (req, res) => {
  try {
    const words = await Words.findAll();
    console.log(words);
    res.json(words);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching words', error: err });
  }
});

app.delete('/words/:id', async (req, res) => {
  const { id } = req.params;
  try {
    Words.destroy({ where: { id } }).then((r) => {res.json({ message: 'Word deleted', r });});
    
  } catch (err) {
    res.status(500).json({ message: 'Error deleting word', error: err });
  }
});

app.use(express.static(path.join(__dirname, '../build')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
