// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Prisma 클라이언트 인스턴스를 export
export default prisma;
