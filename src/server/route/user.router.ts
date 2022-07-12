import * as trpc from '@trpc/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createUserSchema } from '../../schema/user.schema';
import { createRouter } from '../createRouter';

export const userRouter = createRouter().mutation('register', {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { name, email } = input;

    try {
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new trpc.TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
          });
        }
      }

      throw new trpc.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      });
    }
  }
});
