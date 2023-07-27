import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements CheckInsRepository{
  async findById(id: string){
    const checkIn = await prisma.checkIn.findUnique({
      where:{
        id
      }
    })

    return checkIn
  }
  async create(data: Prisma.CheckInUncheckedCreateInput){
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }
  async findManyByUserId(userId: string, page: number){
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20, // Quantidade de resultados por página (pode ser ajustado conforme sua necessidade)
      skip: (page - 1) * 10, // Pular registros de acordo com a página (ajuste conforme sua necessidade)
    });

    return checkIns;
  }
  async countByUserId(userId: string){
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return count;
  }
  async findByUserIdOnDate(userId: string, date: Date){
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: date, // Retorna check-ins a partir da data informada
        },
      },
      orderBy: {
        created_at: "asc", // Ordena do mais antigo para o mais recente
      },
    });

    return checkIn;
  }
  async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  } 
}