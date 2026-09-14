const express = require('express');
const conn = require('./conn');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {

    const fn = req.body.fn;
    const ln = req.body.ln;
    const age = req.body.age;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const address = req.body.address;
    const civilStatus = req.body.civilStatus;
    const phone = req.body.phone;

    const education = req.body.education;
    const course = req.body.course;

    const father = req.body.father;
    const mother = req.body.mother;
    const siblings = req.body.siblings;

    const hobbies = req.body.hobbies;
    const skills = req.body.skills;

    console.log(fn);
    console.log(ln);
    console.log(age);
    console.log(gender);
    console.log(birthday);
    console.log(address);
    console.log(civilStatus);
    console.log(phone);
    console.log(education);
    console.log(course);
    console.log(father);
    console.log(mother);
    console.log(siblings);
    console.log(hobbies);
    console.log(skills);

    const insert = `INSERT INTO biodata VALUES ('0','${fn}','${ln}','${age}','${gender}','${birthday}',' ${address}','${civilStatus}','${phone}','${education}','${course}','${father}','${mother}','${siblings}','${hobbies}','${skills}')`;

conn.query(insert, (err)=>{
    if(err) throw err;
    res.send(
        `<script>
        alert('data inserted');
        location.href = '/';
        </script>`
    );    
    });
});

app.listen(8000);
