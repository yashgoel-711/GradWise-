import AiReq from "../services/OpenAI/OpenAI.services";
import { apiError } from "../utils/apiError.utils";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils";
import { apiResponse } from "../utils/apiResponse.utils.js";


const Aihandle = asyncAwaitHandler(async (req,res)=>{
    const {prompt} = req.body
    if(!prompt){
        throw new apiError(408," please give prompt")
    }
    const response  = await AiReq(prompt)

    if(!response){
        throw new apiError(408,"cannot get the response")
    }
    console.log(response)
    return res.status(200).json(
        new apiResponse(200,{
            "response": response,
        })
    )

})
export {Aihandle}