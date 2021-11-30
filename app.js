import express from 'express';
import { engine } from 'express-handlebars';
import {userRouter} from './routes/user.js';
import {guestRouter} from './routes/guest.js';
import {adminRouter} from './routes/admin.js';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("main",{layout:false});
  });


app.use("/user",userRouter);   
app.use("/guest",guestRouter);
app.use("/admin",adminRouter);




app.listen(3000);