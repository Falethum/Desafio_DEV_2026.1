import prisma from "@database";

export const createCalcadoRepository = async (nome_produto: string, cor: string, marca: string, tamanho: number, preco:number ,quantidade_em_estoque: number ) =>{
    return await prisma.calcado.create({
        data: { 
                nome_produto,
                cor,
                marca,
                tamanho,
                preco,
                quantidade_em_estoque
        }
    });
};

export const readAllCalcadoRepository = async () => {
    return await prisma.calcado.findMany();
};

export const updateCalcadoRepository = async (id: number, nome_produto: string, cor: string, marca: string, tamanho: number, preco:number ,quantidade_em_estoque: number) =>{
    return await prisma.calcado.update({
        data: { 
            nome_produto,
            cor,
            marca,
            tamanho,
            preco,
            quantidade_em_estoque
         },
        where: { id }
    })
};

export const deleteCalcadoRepository = async (id: number) => {
    return await prisma.calcado.delete({
        where: { id }
    })
};