const asyncAwaitHandler = (func)=> {
    return async(req,res,next)=>{
        try {
            await func(req,res,next)
        } catch (error) {
         // apiError carries its own status code and message
         res.status(error?.statusCode || 500).json({
            success : false,
            message : error?.statusCode ? error.message : "controller is not working in asyncHandler"
        })
        console.log(error)
    }
}}

export {asyncAwaitHandler}
