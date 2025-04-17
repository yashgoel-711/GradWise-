const asyncAwaitHandler = (func)=> {
    return async(req,res,next)=>{
        try {
            await func(req,res,next)
        } catch (error) {
         res.status(500).json({
            success : false,
            message : "controller is not working in asyncHandler"
        })
        console.log(error)
    }
}}

export {asyncAwaitHandler}