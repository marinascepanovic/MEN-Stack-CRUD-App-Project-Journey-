const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render("applications/index.ejs", {music: currentUser.music})
    } catch (error){
        console.log(error)
        res.redirect("/")
    }
  });

  router.get('/new', async (req, res)=> {
    try {
       
        res.render("applications/new.ejs")
    } catch (error){
        console.log(error)
    }
  })

  router.post('/', async (req, res) => {
    try {
        console.log(req.session.user._id)
    
        const currentUser = await User.findById(req.session.user._id)
        
        console.log("current User:", currentUser)
        currentUser.music.push(req.body)
        console.log("req.body:", req.body)
   
        await currentUser.save();
    
        res.redirect(`/users/${currentUser._id}/music`);
    } catch (error){
        console.log(error)
        res.redirect("/")
    }
  })

  router.get("/:musicId", async (req, res)=> {
  
    try {
        const currentUser = await User.findById(req.session.user._id)
        const music = currentUser.music.id(req.params.musicId)
        res.render("applications/show.ejs", {music: music})
    } catch (error) {
        console.log("show Page:", error)
    }
  })

  router.delete("/:musicId", async (req, res)=>{
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.music.id(req.params.musicId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/music`)
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
  })

  router.get("/:musicId/edit", async (req, res)=> {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const music = currentUser.music.id(req.params.musicId)
        res.render("applications/edit.ejs", {music: music})

    } catch (error){
        console.log(error)
    }
  })


router.put('/:musicId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const musicId = req.params.musicId;
    const music = currentUser.music.id(musicId); 

    music.set(req.body);
  
    await currentUser.save();
    
    res.redirect(
      `/users/${currentUser._id}/music`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


module.exports = router