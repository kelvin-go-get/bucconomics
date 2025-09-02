import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const User = {
  async create({ email, password, fullName, walletAddress }: { email: string; password: string; fullName?: string | null; walletAddress?: string | null }) {
    return await prisma.user.create({
      data: { email, password, ...(fullName ? { fullName } : {}), ...(walletAddress ? { walletAddress } : {}) },
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async update(id: string, data: { fullName?: string; walletAddress?: string; isProfileComplete?: boolean }) {
    return await prisma.user.update({ where: { id }, data });
  },

  async updatePassword(id: string, hashedPassword: string) {
    return await prisma.user.update({ where: { id }, data: { password: hashedPassword, resetToken: null, resetTokenExpiry: null } });
  },

  async setResetToken(email: string, token: string, expiry: Date) {
    return await prisma.user.update({ where: { email }, data: { resetToken: token, resetTokenExpiry: expiry } });
  },

  async findByResetToken(token: string) {
    return await prisma.user.findFirst({ where: { resetToken: token, resetTokenExpiry: { gt: new Date() } } });
  },
};

export default User;


