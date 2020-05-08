const LocalStrategy = require("passport").Strategy
const bcrypt=require("bcrypt")


function initialize(passport, getUserByUsername, getUserById){
    const authenticateUser= async (username,password,done)=>{
        const user=getUserByUsername(username)
        if(user.length==0){
            return done(null, false, {message: 'No user with the username'})
        }

        try {
            if (await bcrypt.compare(password,user.Password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (error) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField:'username'}),authenticateUser)
    passport.serializeUser((user,done)=>done(null, user.id))
    passport.deserializeUser((id,done)=>{return done(null,getUserById(id))})
}



module.exports=initialize