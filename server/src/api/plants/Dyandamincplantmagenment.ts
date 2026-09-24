import { prisma } from '@/lib/prisma';

const prisma = new PrismaClient();


interface PlantFilterParams {
    query?: string;           // Text search for common or latin name
    careLevel?: string;       // e.g., "EASY", "MODERATE", "EXPERT"
    lightLevel?: string;      // e.g., "LOW", "INDIRECT", "DIRECT"
    page?: number;
    limit?: number;
}


export async function getFilteredPlants({query, careLevel, lightLevel, page = 1, limit = 10,}: PlantFilterParams) {
    try {
        const skip = (page - 1) * limit;

        // Construct the dynamic filter object
        const whereClause: any = {};

        // Filter by Care Level if provided
        if (careLevel) {
            whereClause.careLevel = careLevel;
        }

        // Filter by Light Level if provided
        if (lightLevel) {
            whereClause.lightLevel = lightLevel;
        }

        // Case-insensitive search across common or latin names
        if (query) {
            whereClause.OR = [
                { commonName: { contains: query, mode: 'insensitive' } },
                { latinName: { contains: query, mode: 'insensitive' } },
            ];
        }

        // Run query and total count concurrently
        const [plants, totalCount] = await prisma.$transaction([
            prisma.plant.findMany({
                where: whereClause,
                skip,
                take: limit,
                include: {
                    listings: {
                        include: {
                            images: true,
                        },
                    },
                },
                orderBy: {
                    commonName: 'asc',
                },
            }),
            prisma.plant.count({ where: whereClause }),
        ]);

        return {
            plants,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        };
    } catch (error) {
        console.error('Error fetching filtered plants:', error);
        throw new Error('Failed to retrieve plants');
    }
}


export async function deleteplant(request: Request) {
  try{
    const planttype = await request.json();
    const {id,commonName}=planttype;
    let queryresult= await prisma.Plant.delete({where:{commonName}});
    return new Response("Successfully deleted plant", { status: 200 });
  }catch (error){
      return new Response("Failed to delete plant", { status: 500 });
  }
}


export async function editimage(request: Request) {
    try{
        const image = await request.json();
        const {id,ur}=image;
        let queryresult= await prisma.Image.update({where:{commonName}});
        return new Response("Successfully updated image", { status: 200 });
    }catch (error){
        return new Response("Failed to updated image", { status: 500 });
    }
}

export async function updateprice(request: Request) {
    try{
    const listingtype = await request.json();
    const {id,plant,price}=listingtype;
    let queryresult= await prisma.Listing.update({where:{plant},data:{price}});
    return new Response("Successfully updated price", { status: 200 });}
    catch (error){
        return new Response("Failed to update price", { status: 500 });
    }

}

export async function createlisting(request: Request) {try{
    const listingtype = await request.json();
    const {title,des,price,status,images,plant}=listingtype;
    let queryresult= await prisma.Listing.create({data:{title,des,price,status,images,plant}});
    await prisma.plant.update({where:{commonName:plant},data:{listings:{connect:{id:queryresult.id}}}});
     //need to update the plant table with the new listing id in the listings array
    return new Response("Successfully created listing", { status: 200 });}
catch (error){return new Response("Failed to create listing", { status: 500 });
}}


export async function editlisting(request: Request) {try{
    const listingtype = await request.json();
    const {id,title,des,price,status,images,plant}=listingtype;
    let queryresult= await prisma.Listing.update(
        {where:{id},data:{title,des,price,status,images,plant}});
    return new Response("Successfully updated listing", { status: 200 });}
catch (error){return new Response("Failed to update listing", { status: 500 });}}




export async function deletelisting(request: Request) {try{
    const listingtype = await request.json();
    const {id}=listingtype;
    let queryresult= await prisma.Listing.delete({where:{id}});
    return new Response("Successfully deleted listing", { status: 200 });}catch (error){return new Response("Failed to delete listing", { status: 500 });}}