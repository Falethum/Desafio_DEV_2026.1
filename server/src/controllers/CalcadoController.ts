import { Request, Response } from "express";
import { realpath } from "fs";
import { createCalcadoRepository, readAllCalcadoRepository, updateCalcadoRepository, deleteCalcadoRepository  } from "src/repositorie/CalcadoRepositorie";

export const createCalcado = async (req: Request, res: Response) => {
    try{
        const {nome_produto, marca, cor, tamanho, preco, quantidade_em_estoque} = req.body;

        if(!nome_produto || ! marca || !cor || !tamanho || !preco || !quantidade_em_estoque){
            return res.status(400).json({
                message: "Informe os dados do calçado completamente."
            })
        }

        await createCalcadoRepository(nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque);

        return res.status(200).json({
            message: "Cadastro realizado."
        })
    } catch (error){
        return res.status(500).json({
            message: "Erro ao tentar criar usuário.",
            error,
        })
    }
}

export const readAllCalcado = async (req: Request, res: Response) => {
    try{
        const calcado = await readAllCalcadoRepository();

        if(!calcado){
            return res.status(404).json({
                message: "Nenhum calçado cadastrado no sistema."
            })
        }

        return res.status(200).json(calcado);

    } catch (erro){
        return res.status(500).json({
            message: "Erro ao buscar calçado."
        })
    }
}

export const updateCalcado = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const numericId = parseInt(id);

        if(!id){
            return res.status(404).json({
                message: "Calçado inexistente."
            })
        }

        const {nome_produto, marca, cor, tamanho,preco, quantidade_em_estoque } = req.body;

        await updateCalcadoRepository (numericId, nome_produto, cor,marca,tamanho, preco,quantidade_em_estoque)

        return res.status(200).json();

    } catch (error) {
        return res.status(500).json({
            message: "Erro ao tentar atualizar as informações do calçado.",
            error,
        })
    }
}

export const deleteCalcado = async (req: Request, res: Response) => {
    try { 
        const { id } = req.params;
        const numericId = parseInt(id);

        if(!id){
            return res.status(404).json({
                message: "Calçado inexistente."
            })
        };

        await deleteCalcadoRepository(numericId);

        return res.status(200).json({
            message: "Calçado removido do cadastro."
        })
    } catch (error){
        return res.status(500).json({
            message: "erro ao remover calçado."
        })
    }
}