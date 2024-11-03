import { Request, Response, NextFunction } from "express";
import { body, Result, validationResult } from "express-validator";

const validateHandleError=async(req:Request, res:Response, next:NextFunction)=>{

    const results:Result= validationResult(req)
    const errors = results.array();

    if(!results.isEmpty()){

        return res.status(400).send({ errors: errors, })
    }

    next();
}


export const validateUser=()=>[

    body("name").isString().notEmpty().withMessage("Name must be string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("city").isString().notEmpty().withMessage("City must be string"),
    body("country").isString().notEmpty().withMessage("Country must be string"),
    validateHandleError,
]