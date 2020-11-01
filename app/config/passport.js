const LocalStrategy=require('passport-local').Strategy
const User=require('../models/user')
const bcrypt=require('bcrypt')

function init(passport){
    passport.use(new LocalStrategy({ usernameField: 'email'},async (email,password,done)=>{
        //login
        //check if email exists
        const user = await User.findOne({email:email})
        if(!user){
            return done(null, false, {message:'No user with this email'})
        }

        bcrypt.compare(password, user.password).then(match=>{
            if(match){
                return done(null,user,{message:'Logged in successfully'})
            }
            return done(null,false,{message:'Wrong username or password'})
        }).catch(err=>{
            return done(null,false,{message:'Something went wrong'})
        })

    }))

    //store in session to know about logged in user.here user id is storeed in session
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    //to fetch user in db with this id and now it becomes available in req.user
    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err, user)
        })
    })
}

module.exports=init