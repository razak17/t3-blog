import * as trpc from '@trpc/server';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { createUserSchema, requestOtpSchema } from '../../schema/user.schema';
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
})
  .mutation('request-otp', {
    input: requestOtpSchema,
    async resolve({ input, ctx }) {
      const { email, redirect } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      // send email to user

      return true;
    },
  });
