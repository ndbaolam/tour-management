import { Request, Response } from "express";
import User from "../../models/users.model";
import sequelize from "../../config/database";
import md5 from 'md5';
import * as generate from "../../helpers/generate.helper";
import { QueryTypes } from "sequelize";

export const register = (req: Request, res: Response) => {
    res.render("client/pages/users/register", {
        pageTitle: "Register"
    });
}

export const registerPost = async (req: Request, res: Response) => {
    const {fullName, email, password} = req.body;

    const existEmail = await sequelize.query(`SELECT email FROM users WHERE email = '${email}'`,{
        type: QueryTypes.SELECT
    });

    if(existEmail.length === 0){
        const tokenUser: string = generate.generateRandomString(30);

        const sql: string = `
            INSERT INTO users (fullName, email, password, tokenUser, createdAt)
            VALUES ("${fullName}", "${email}", "${md5(password)}", "${tokenUser}", ${Date.now()});
        `;

        await sequelize.query(sql, { 
            type: QueryTypes.INSERT,
            model: User,
        });

        res.cookie("tokenUser", tokenUser);
    } else {
        console.log('Email already exists');
    }
    res.redirect('back');
}