import { Request, Response } from "express";
import { createUserRepository, deleteUserRepository, readAllUsersRepository, updateUserRepository } from "src/repositorie/UserRepositorie";


export const createUser = async (req: Request, res: Response) => {
    try {
        const {name, email, cpf, password} = req.body;

        if (!name || !email || !cpf || !password){
            return res.status(400).json({
                message: "Preencha todos os espaços obrigatórios."
            });
        }

        await createUserRepository(name, email, cpf, password);

        return res.status(201).json({
            message: "Usuário criado."
        })
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao tentar criar usuário.",
            error,
        })
    }
}   

export const readAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await readAllUsersRepository();
        
        if (!users){
            return res.status(404).json({
                message: "Nenhum usuário criado."
            })
        }

        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar o usuário.",
            error,
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        if(!id){
            return res.status(404).json({
                message: "Usuário inexistente."
            }) 
        }

        const {name, email, cpf,password } = req.body;

        await updateUserRepository(id, name, email, cpf, password)

        return res.status(200).json();

    } catch (error){
        return res.status(400).json({
            message: "Erro ao tentar atualizar o usuário.",
            error,  
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        if(!id){
            return res.status(404).json({
                message: "Usuário inexistente."
            }) 
        }   

        await deleteUserRepository(id);

        return res.status(200).json({
            message: "Usuário removido do cadastro."
        })
    } catch (error){
        return res.status(500).json({
            message: "erro ao remover o usuário.",
            error,
        })
    }
}

