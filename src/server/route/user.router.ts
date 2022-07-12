import { createRouter } from '../createRouter';

export const userRouter = createRouter().mutation('register', {
  async resolve({ ctx }) {

    ctx.prisma;
  }
});
