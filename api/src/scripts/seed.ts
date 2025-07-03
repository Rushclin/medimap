import { PrismaClient, FacilityType, WeekDay } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.healthFacility.deleteMany();
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
      {
        name: 'Aspirine',
        description: 'Antidouleur et anti-inflammatoire',
        code: '3400935687461',
      },
    
      {
        name: 'Metformine',
        description: 'Antidiabétique oral',
        code: '3400935687462',
      },
      {
        name: 'Atorvastatine',
        description: 'Statine pour le cholestérol',
        code: '3400935687463',
      },
      {
        name: 'Oméprazole',
        description: 'Inhibiteur de la pompe à protons',
        code: '3400935687464',
      },
      {
        name: 'Loratadine',
        description: 'Antihistaminique pour les allergies',
        code: '3400935687465',
      },
      {
        name: 'Salbutamol',
        description: 'Bronchodilatateur pour l’asthme',
        code: '3400935687466',
      },
      {
        name: 'Ciprofloxacine',
        description: 'Antibiotique fluoroquinolone',
        code: '3400935687467',
      },
      {
        name: 'Insuline',
        description: 'Hormone pour le diabète',
        code: '3400935687474',
      },
      
      {
        name: 'Levothyroxine',
        description: 'Hormone thyroïdienne',
        code: '3400935687476',
      },
      {
        name: 'Clopidogrel',
        description: 'Antiplaquettaire',
        code: '3400935687477',
      },

      {
        name: 'Warfarine',
        description: 'Anticoagulant',
        code: '3400935687478',
      },
      

    ],
  });

  // Fetch medication IDs by name
  const paracetamol = await prisma.medication.findFirst({ where: { name: 'Paracétamol' } });
const ibuprofene = await prisma.medication.findFirst({ where: { name: 'Ibuprofène' } });
const amoxicilline = await prisma.medication.findFirst({ where: { name: 'Amoxicilline' } });
const doliprane = await prisma.medication.findFirst({ where: { name: 'Doliprane' } });
const smecta = await prisma.medication.findFirst({ where: { name: 'Smecta' } });
const aspirine = await prisma.medication.findFirst({ where: { name: 'Aspirine' } });
const metformine = await prisma.medication.findFirst({ where: { name: 'Metformine' } });
const atorvastatine = await prisma.medication.findFirst({ where: { name: 'Atorvastatine' } });
const omeprazole = await prisma.medication.findFirst({ where: { name: 'Oméprazole' } });
const loratadine = await prisma.medication.findFirst({ where: { name: 'Loratadine' } });
const salbutamol = await prisma.medication.findFirst({ where: { name: 'Salbutamol' } });
const ciprofloxacine = await prisma.medication.findFirst({ where: { name: 'Ciprofloxacine' } });
const insuline = await prisma.medication.findFirst({ where: { name: 'Insuline' } });
const levothyroxine = await prisma.medication.findFirst({ where: { name: 'Levothyroxine' } });
const clopidogrel = await prisma.medication.findFirst({ where: { name: 'Clopidogrel' } });
const warfarine = await prisma.medication.findFirst({ where: { name: 'Warfarine' } });


  const facilities = await Promise.all([
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie La Salvia',
        address: 'Rte de Bamenda, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237691234567',
        latitude: 5.4895456056738015,
        longitude: 10.4055725097935,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        doctors: {
          create: {
            firstName: 'Jean',
            lastName: 'Nguema',
            specialty: 'Pharmacien',
            phone: '237692345678',
            availability: {
              create: generateAvailabilities(5),
            },
          },
        },
        stocks: {
          create: [
            { medicationId: paracetamol!.id, quantity: 50, price: 2.5 },
            { medicationId: ibuprofene!.id, quantity: 30, price: 3.2 },
            { medicationId: amoxicilline!.id, quantity: 20, price: 5.0 },
            { medicationId: doliprane!.id, quantity: 40, price: 3.0 },
            { medicationId: smecta!.id, quantity: 25, price: 4.0 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie Binam',
        address: 'Route Foumban, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237693456789',
        latitude: 5.482936151500336, 
        longitude: 10.429154521440006,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        doctors: {
          create: {
            firstName: 'Marie',
            lastName: 'Mbarga',
            specialty: 'Pharmacien',
            phone: '237694567890',
            availability: {
              create: generateAvailabilities(5),
            },
          },
        },
        stocks: {
          create: [
            { medicationId: aspirine!.id, quantity: 60, price: 2.0 },
            { medicationId: metformine!.id, quantity: 35, price: 3.5 },
            { medicationId: atorvastatine!.id, quantity: 25, price: 6.0 },
            { medicationId: omeprazole!.id, quantity: 30, price: 4.5 },
            { medicationId: levothyroxine!.id, quantity: 20, price: 5.5 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie du Marché B',
        address: '76 Route Bafoussam-Bamenda, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237695678901',
        latitude: 5.486203828950855, 
        longitude: 10.409263338628815,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        doctors: {
          create: {
            firstName: 'Paul',
            lastName: 'Tchoupo',
            specialty: 'Pharmacien',
            phone: '237696789012',
            availability: {
              create: generateAvailabilities(5),
            },
          },
        },
        stocks: {
          create: [
            { medicationId: levothyroxine!.id, quantity: 50, price: 3.0 },
            { medicationId: ciprofloxacine!.id, quantity: 40, price: 4.0 },
            { medicationId: salbutamol!.id, quantity: 30, price: 5.0 },
            { medicationId: loratadine!.id, quantity: 20, price: 3.5 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie Du Benin',
        address: 'N4, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237697890123',
        latitude: 5.480513683526335,  
        longitude: 10.413227182812149,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        stocks: {
          create: [
            { medicationId: loratadine!.id, quantity: 30, price: 4.0 },
            { medicationId: ciprofloxacine!.id, quantity: 25, price: 4.5 },
            { medicationId: salbutamol!.id, quantity: 20, price: 5.0 },
            { medicationId: insuline!.id, quantity: 10, price: 7.0 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie Les Merveilles',
        address: 'Unnamed Rd 2, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237698901234',
        latitude: 5.466084355915991,
        longitude: 10.40082888081393,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        stocks: {
          create: [
            { medicationId: warfarine!.id, quantity: 20, price: 5.0 },
            { medicationId: clopidogrel!.id, quantity: 25, price: 4.5 },
            { medicationId: paracetamol!.id, quantity: 50, price: 2.5 },
            { medicationId: ibuprofene!.id, quantity: 30, price: 3.2 },
            { medicationId: amoxicilline!.id, quantity: 20, price: 5.0 },
          ],
        },
      },
    }),
    
    
    
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie de la GRÂCE',
        address: 'Quartier Tamdja, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237691234567',
        latitude: 5.480573368872262, 
        longitude: 10.423742395792157,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        stocks: {
          create: [
            { medicationId: doliprane!.id, quantity: 20, price: 3.5 },
            { medicationId: ciprofloxacine!.id, quantity: 25, price: 4.5 },
            { medicationId: clopidogrel!.id, quantity: 30, price: 4.0 },
            { medicationId: warfarine!.id, quantity: 25, price: 4.5 },
            
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie De La Mifi',
        address: 'marché A, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237692345678',
        latitude: 5.4807595758379115, 
        longitude: 10.420654575930405,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        stocks: {
          create: [
            { medicationId: insuline!.id, quantity: 10, price: 7.0 },
            { medicationId: warfarine!.id, quantity: 20, price: 5.0 },
            { medicationId: clopidogrel!.id, quantity: 25, price: 4.5 },
            { medicationId: paracetamol!.id, quantity: 50, price: 2.5 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.PHARMACY,
        name: 'Pharmacie Pierre Moyo',
        address: 'Entree Akwa face Dubai Center',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237693456789',
        latitude: 5.478191424923785, 
        longitude: 10.418936426298204,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.TUESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.WEDNESDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.THURSDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.FRIDAY, openTime: '08:00', closeTime: '20:00' },
            { day: WeekDay.SATURDAY, openTime: '08:00', closeTime: '20:00' },
            //{ day: WeekDay.SUNDAY, isClosed: true },
          ],
        },
        stocks: {
          create: [
            { medicationId: ibuprofene!.id, quantity: 30, price: 3.2 },
            { medicationId: amoxicilline!.id, quantity: 20, price: 5.0 },
            { medicationId: doliprane!.id, quantity: 40, price: 3.0 },
            { medicationId: smecta!.id, quantity: 60, price: 2.0 },
          ],
        },
      },
    }),
    // Hôpitaux
    prisma.healthFacility.create({
      data: {
        type: FacilityType.HOSPITAL,
        name: 'Hôpital Régional de Bafoussam',
        address: 'Route de Douala, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237690123456',
        latitude: 5.4750,
        longitude: 10.4150,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.TUESDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.WEDNESDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.THURSDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.FRIDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.SATURDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.SUNDAY, openTime: '00:00', closeTime: '23:59' },
          ],
        },
        doctors: {
          create: {
            firstName: 'Sophie',
            lastName: 'Ngono',
            specialty: 'Médecin Généraliste',
            phone: '237697890123',
            availability: {
              create: generateAvailabilities(5),
            },
          },
        },
        stocks: {
          create: [
            { medicationId: ibuprofene!.id, quantity: 30, price: 4.0 },
            { medicationId: clopidogrel!.id, quantity: 20, price: 5.0 },
            
            { medicationId: insuline!.id, quantity: 10, price: 7.0 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.HOSPITAL,
        name: 'Hôpital Notre-Dame',
        address: 'Quartier Tyo, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237698901234',
        latitude: 5.4760,
        longitude: 10.4160,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.TUESDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.WEDNESDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.THURSDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.FRIDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.SATURDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.SUNDAY, openTime: '00:00', closeTime: '23:59' },
          ],
        },
        doctors: {
          create: {
            firstName: 'Emmanuel',
            lastName: 'Fokou',
            specialty: 'Chirurgien',
            phone: '237699012345',
            availability: {
              create: generateAvailabilities(5),
            },
          },
        },
        stocks: {
          create: [
            { medicationId: warfarine!.id, quantity: 20, price: 5.0 },
            { medicationId: clopidogrel!.id, quantity: 25, price: 4.5 },
            { medicationId: paracetamol!.id, quantity: 50, price: 2.5 },
            { medicationId: ibuprofene!.id, quantity: 30, price: 3.2 },
            { medicationId: amoxicilline!.id, quantity: 20, price: 5.0 },
          ],
        },
      },
    }),
    prisma.healthFacility.create({
      data: {
        type: FacilityType.HOSPITAL,
        name: 'Hôpital Saint-Vincent',
        address: 'Quartier Kamkop, Bafoussam, Cameroon',
        city: 'Bafoussam',
        postalCode: '00000',
        phone: '237690123456',
        latitude: 5.4770,
        longitude: 10.4170,
        openingHours: {
          create: [
            { day: WeekDay.MONDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.TUESDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.WEDNESDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.THURSDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.FRIDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.SATURDAY, openTime: '00:00', closeTime: '23:59' },
            { day: WeekDay.SUNDAY, openTime: '00:00', closeTime: '23:59' },
          ],
        },
        stocks: {
          create: [
            { medicationId: doliprane!.id, quantity: 40, price: 3.0 },
            { medicationId: smecta!.id, quantity: 25, price: 4.0 },
            { medicationId: clopidogrel!.id, quantity: 25, price: 4.5 },
            { medicationId: ibuprofene!.id, quantity: 20, price: 5.0 }
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
