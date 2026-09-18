require('dotenv').config();

const express = require('express');
 const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
function verifyToken(req, res, next){
  const authHeader = req.headers['authorization'];

  if(!authHeader){
    return res.status(401).json({ message: "No token provided"});
  }
  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({message: "invalid or expired token"});
  }
}



const app = express();

app.use(express.json());
app.post('/users', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: "Email already exists" });
    }
});

app.get('/users', async (req, res)=> {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

app.get('/users/:id', async (req, res)=> {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(req.params.id) }
    });
    if (!user) {
        return res.status(404).json({ message: "User not found"});
    }
    res.status(200).json(user);
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      }
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
});

app.post('/register', async (req, res) =>{
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data:{
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age
      }
    });
    res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email});
  } catch (error) {
    res.status(409).json({ message: "Email already exists"});
  }
});

app.post('/login', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token: token });
});

app.get('/profile', verifyToken, async (req, res)=>{
  const user = await prisma.user.findUnique({
    where: {id: req.userId},
    select: {id: true, name: true, email: true, age: true}
  });
  res.status(200).json(user);
});

app.listen(3000, ()=> {
    console.log('Server running on http://localhost:3000');
});