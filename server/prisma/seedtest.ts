import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const monstera = await prisma.plant.create({
        data: {
            commonName: 'Monstera Deliciosa',
            latinName: 'Monstera deliciosa',
            careGuide: 'Bright indirect light, water when top 2 inches of soil dry out.',
            listings: {
                create: {
                    title: 'Top Cutting with Variegation',
                    description: 'Healthy rooted cutting with strong fenestrations.',
                    price: 35.00,
                    status: 'available',
                    images: {
                        create: [
                            { url: 'https://placehold.co/600x400?text=Monstera+1' }
                        ]
                    }
                }
            }
        }
    });

    console.log('Database seeded successfully!', { monstera });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });