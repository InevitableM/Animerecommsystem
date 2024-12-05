console.clear();
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const port = 100;
const list= [];
const ans ={'fav_gen': ['Fantasy',], 'fav_rat': ['PG-13 - Teens 13 or older'], 'fav_typ': ['TV']}

app.get('/anime',async(req,res)=>{
  try{
    const resp= await fetch('http://localhost:2000/anim');
    if(resp.ok){
        const data = await resp.json();
        res.send(data.message);
        console.log(data);
    }
    else{
        console.log('error');
    }
    }
    catch(err){
        console.log(err);
    }
})

app.post('/re',async(req,res)=>{
    try{
        const resp= await fetch('http://localhost:2000/recom',{
            method:'POST',
            headers:{ 'content-type':'application/json'},
            body: JSON.stringify(req.body),
        });
       const data = await resp.json();
       if(resp.ok){
         list.push(data);
        }
       else{console.log('error')}
    }
    catch(err){
        console.log(err);
     }
    res.send(list);
    list.length = 0;
    console.log(req.body);
})

app.get('/getanime',async(req,res)=>{
    res.send(list);
})

app.get('/',(req,res)=>{
    res.send('Welcome to anime page');
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});