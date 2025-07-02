import { PrismaClient, FacilityType, WeekDay } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.healthFacility.deleteMany();
  await prisma.$transaction([
    prisma.favorite.deleteMany(),
    prisma.stock.deleteMany(),
    prisma.medication.deleteMany(),
    prisma.doctorAvailability.deleteMany(),
    prisma.doctor.deleteMany(),
    prisma.openingHour.deleteMany(),
    prisma.healthFacility.deleteMany(),
  ]);

  // const facilities = await prisma.healthFacility.createMany({
  //   data: [
  //     {
  //       type: FacilityType.PHARMACY,
  //       name: 'Pharmacie du Centre',
  //       address: '12 Rue de la République',
  //       city: 'Paris',
  //       postalCode: '75001',
  //       phone: '0142607080',
  //       email: 'contact@pharmacie-centre.fr',
  //       website: 'https://pharmacie-centre.fr',
  //       latitude: 48.8592,
  //       longitude: 2.3417,
  //     },
  //     {
  //       type: FacilityType.PHARMACY,
  //       name: 'Pharmacie de la Gare',
  //       address: '5 Avenue des Ternes',
  //       city: 'Lyon',
  //       postalCode: '69002',
  //       phone: '0478425364',
  //       latitude: 45.764,
  //       longitude: 4.8357,
  //     },
  //     {
  //       type: FacilityType.HOSPITAL,
  //       name: 'Hôpital Saint-Louis',
  //       address: '1 Avenue Claude Vellefaux',
  //       city: 'Paris',
  //       postalCode: '75010',
  //       phone: '0142494949',
  //       email: 'contact@hopital-saintlouis.fr',
  //       website: 'https://hopital-saintlouis.fr',
  //       latitude: 48.8738,
  //       longitude: 2.3706,
  //     },
  //     {
  //       type: FacilityType.PHARMACY,
  //       name: 'Pharmacie de Nuit',
  //       address: '56 Boulevard Saint-Michel',
  //       city: 'Paris',
  //       postalCode: '75006',
  //       phone: '0143546372',
  //       latitude: 48.8476,
  //       longitude: 2.3404,
  //     },
  //     {
  //       type: FacilityType.HOSPITAL,
  //       name: 'CHU de Bordeaux',
  //       address: 'Place Amélie Raba Léon',
  //       city: 'Bordeaux',
  //       postalCode: '33000',
  //       phone: '0556795656',
  //       email: 'accueil@chu-bordeaux.fr',
  //       website: 'https://www.chu-bordeaux.fr',
  //       latitude: 44.8378,
  //       longitude: -0.5792,
  //     },
  //     {
  //       type: FacilityType.PHARMACY,
  //       name: 'Pharmacie des Tilleuls',
  //       address: '18 Rue des Fleurs',
  //       city: 'Marseille',
  //       postalCode: '13001',
  //       phone: '0491857463',
  //       latitude: 43.2965,
  //       longitude: 5.3698,
  //     },
  //     {
  //       type: FacilityType.HOSPITAL,
  //       name: 'Hôpital de la Timone',
  //       address: '264 Rue Saint-Pierre',
  //       city: 'Marseille',
  //       postalCode: '13005',
  //       phone: '0491386000',
  //       website: 'https://hopital-timone.fr',
  //       latitude: 43.2902,
  //       longitude: 5.4014,
  //     },
  //     {
  //       type: FacilityType.PHARMACY,
  //       name: 'Pharmacie du Marché',
  //       address: '3 Place du Marché',
  //       city: 'Lille',
  //       postalCode: '59000',
  //       phone: '0320516243',
  //       latitude: 50.6292,
  //       longitude: 3.0573,
  //     },
  //     {
  //       type: FacilityType.HOSPITAL,
  //       name: 'CHU de Toulouse',
  //       address: '2 Rue Viguerie',
  //       city: 'Toulouse',
  //       postalCode: '31059',
  //       phone: '0532223366',
  //       website: 'https://www.chu-toulouse.fr',
  //       latitude: 43.6043,
  //       longitude: 1.4437,
  //     },
  //     {
  //       type: FacilityType.PHARMACY,
  //       name: 'Pharmacie de Garde',
  //       address: '7 Avenue de la Libération',
  //       city: 'Nice',
  //       postalCode: '06000',
  //       phone: '0493978645',
  //       latitude: 43.7102,
  //       longitude: 7.262,
  //     },
  //   ],
  //   skipDuplicates: true,
  // });

  const medications = await prisma.medication.createMany({
    data: [
      {
        name: 'Paracétamol',
        description: 'Antidouleur et antipyrétique',
        code: '3400935687456',
      },
      {
        name: 'Ibuprofène',
        description: 'Anti-inflammatoire non stéroïdien',
        code: '3400935687457',
      },
      {
        name: 'Amoxicilline',
        description: 'Antibiotique pénicilline',
        code: '3400935687458',
      },
      {
        name: 'Doliprane',
        description: 'Antidouleur à base de paracétamol',
        code: '3400935687459',
      },
      {
        name: 'Smecta',
        description: 'Traitement des diarrhées',
        code: '3400935687460',
      },
    ],
  });

  // Fetch medication IDs by name
  const paracetamol = await prisma.medication.findFirst({ where: { name: 'Paracétamol' } });
  const doliprane = await prisma.medication.findFirst({ where: { name: 'Doliprane' } });

  const facilities = await Promise.all([
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie Centrale',
        address: "1 Place de l'Hôtel de Ville",
        city: 'Paris',
        postalCode: '75004',
        phone: '0142785632',
        latitude: 48.8566,
        longitude: 2.3522,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '09:00', closeTime: '19:00' },
            // { day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        doctors: {
          create: {
            firstName: 'Jean',
            lastName: 'Dupont',
            specialty: 'Pharmacien',
            phone: '0678452314',
            availability: {
              create: generateAvailabilities(5),
            },
          },
        },
        stocks: {
          create: [
            {
              medicationId: paracetamol!.id,
              quantity: 50,
              price: 2.5,
            },
            {
              medicationId: doliprane!.id,
              quantity: 30,
              price: 3.2,
            },
          ],
        },
      },
    }),
    // ... (autres établissements similaires)
  ]);
  console.log('Seed complété avec succès !');
  // console.log(`Seed créé: ${facilities.count} établissements de santé`);
}

function generateAvailabilities(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);
    return { date };
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
