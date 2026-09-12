import { prisma } from '@/lib/prisma';


export async function createplant(request: Request) {
 try {
     const plantdetails = await request.json();
     const {commonname,latinname,careguide,createdat,updatedat,listings}=plantdetails;
     if(!commonname || !createdat || !updatedat || !listings){
         return new Response('Missing required fields', { status: 400 });
     }
     let newplant = await prisma.plant.create({
         data:{commonname,latinname,careguide,createdat,updatedat,listings}
     })
     return new Response({status:"Plant successfully created!"}, { status: 201 });
 }catch (error){
     return new Response({error:'Failed to create plant'}, { status: 500 });
 }
}

export async function getallplants() {
    try{
        const allplants = await prisma.plant.findMany();
        return new Response(allplants, { status: 200 });

    }catch (error){
        return new Response({error:"Couldnt get plants"},{status:500})
    }
}