import { createUserSchema } from '../../schema/user.schema';
import { createRouter } from '../createRouter';

export const userRouter = createRouter().mutation('register', {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { name, email } = input;

    const user = await ctx.prisma.user.create({
      data: {
        name,
        email,
      }
    });
    return user;
  }
});
