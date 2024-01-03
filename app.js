import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { routeProfile } from "./src/router/profile.js";
import { routeProject } from "./src/router/project.js";
import { routeEducation } from "./src/router/education.js";
import { routeBlog } from "./src/router/blog.js";
import { routeSkills } from "./src/router/skills.js";
import { routeAuth } from "./src/router/auth.js";
import { logging } from "./src/middleware/logging.js";
import { routeUnknown } from "./src/middleware/unknown.js";
import { ResponseError } from "./src/error/responseError.js";
import Joi from "joi";
//deklaraai penggunaan apk express
const app = express();
dotenv.config();

//untuk membaca json dari body
app.use(express.json());

app.use(cookieParser());
//middleware untuk collect data dari client
app.use(logging);

app.get('/', (req, res) => {
  res.send('<p>Hello World</p>')
  res.status(200).json({
    message: 'berhasil masuk ke halaman home',
  })
})


//profile

app.use(routeProfile);

//project
app.use(routeProject);

//ducation
app.use(routeEducation);

// separator start blog
app.use(routeBlog);

//separator start skills
app.use(routeSkills);

//separator start Auth
app.use(routeAuth);

//middleware for unknown path and error
app.use(routeUnknown);

//middleware for error   
app.use((error, req, res, next) => {
  if (!error) {
    return next()
  }
  //response error
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      message: error.message
    }).end();
    return;
  }
  //joi error
  if (error instanceof Joi.ValidationError) {
    res.status(400).json({
      message: error.message
    }).end();
    return;
  }
  //server error
    res.status(500).json({
      message: 'server error' + error.message,
      log: console.log(error)
    })
  }

)



//separator server run
const port = process.env.PORT
app.listen(5000, () => {
  console.log("server running on http://localhost:" + port);
})
