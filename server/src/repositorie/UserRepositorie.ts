/* Repositories é um diretório que ajuda na concisão do
diretório de UserController 
*/ 

import prisma from "@database";


// cria conexão com o banco de dados
export const createUserRepository = async (name: string, email: string, cpf: string, password: string) => {
     return await prisma.user.create({
        data: { 
            name,
            email,
            cpf,
            password }
    });
};

export const readAllUsersRepository = async () => {
    return await prisma.user.findMany();
};

export const updateUserRepository = async (id: string, name: string, email: string, cpf: string, password: string) =>{
    return await prisma.user.update({
        data:{
            name,
            email,
            cpf,
            password
        },
        where: { id }
    });
};

export const deleteUserRepository = async (id: string) =>{
    return await prisma.user.delete({
        where: { id }
    });
};
