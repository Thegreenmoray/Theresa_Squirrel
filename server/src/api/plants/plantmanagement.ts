import { prisma } from '@/lib/prisma';
import Pagination from '@/components/Pagination';
const prisma = new PrismaClient();

export async function getallplants(page: number=1, limit: number=10) {
    try {
        // Calculate how many items to skip based on the current page
        const skip = (page - 1) * limit;

        // Run both the paginated query and total count in a single transaction
        const [plants, totalCount] = await prisma.$transaction([
            prisma.plant.findMany({
                skip: skip,
                take: limit,
                include: {
                    listings: {
                        include: {
                            images: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            prisma.plant.count(),
        ]);

        const totalPages = Math.ceil(totalCount / limit);

        return {
            plants,
            totalCount,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        console.error('Failed to fetch paginated plants:', error);
        throw new Error('Could not retrieve plant listings');
    }
}
