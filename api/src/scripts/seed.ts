import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Nettoyer la base d'abord (optionnel)
  await prisma.subdomain.deleteMany();
  await prisma.domain.deleteMany();

  // Domaines et sous-domaines scientifiques
  const scientificDomains = [
    {
      name: 'Mathématiques',
      description: 'Science des nombres, des formes et des structures',
      subdomains: [
        { name: 'Algèbre', description: 'Étude des structures algébriques' },
        {
          name: 'Géométrie',
          description: 'Étude des formes et de leurs propriétés',
        },
        { name: 'Analyse', description: 'Étude des fonctions et des limites' },
        {
          name: 'Probabilités',
          description: 'Étude des phénomènes aléatoires',
        },
      ],
    },
    {
      name: 'Physique',
      description: "Science de la matière et de l'énergie",
      subdomains: [
        {
          name: 'Mécanique classique',
          description: 'Mouvement des corps macroscopiques',
        },
        {
          name: 'Physique quantique',
          description: "Comportement de la matière à l'échelle atomique",
        },
        {
          name: 'Thermodynamique',
          description: 'Étude des transferts thermiques',
        },
        {
          name: 'Astrophysique',
          description: "Physique appliquée à l'astronomie",
        },
      ],
    },
    {
      name: 'Biologie',
      description: 'Science du vivant',
      subdomains: [
        { name: 'Génétique', description: "Étude des gènes et de l'hérédité" },
        {
          name: 'Biologie moléculaire',
          description: 'Étude des molécules du vivant',
        },
        { name: 'Écologie', description: 'Étude des écosystèmes' },
        { name: 'Neurosciences', description: 'Étude du système nerveux' },
      ],
    },
    {
      name: 'Informatique',
      description: "Science du traitement automatique de l'information",
      subdomains: [
        {
          name: 'Intelligence Artificielle',
          description: 'Algorithmes intelligents',
        },
        {
          name: 'Systèmes distribués',
          description: 'Systèmes fonctionnant sur plusieurs machines',
        },
        {
          name: 'Cybersécurité',
          description: 'Protection des systèmes informatiques',
        },
        {
          name: 'Science des données',
          description: 'Analyse et interprétation des données',
        },
      ],
    },
    {
      name: 'Chimie',
      description: 'Science de la composition de la matière',
      subdomains: [
        {
          name: 'Chimie organique',
          description: 'Étude des composés carbonés',
        },
        {
          name: 'Chimie inorganique',
          description: 'Étude des autres éléments',
        },
        { name: 'Biochimie', description: 'Chimie des processus biologiques' },
        {
          name: 'Chimie physique',
          description: 'Application de la physique à la chimie',
        },
      ],
    },
  ];

  // Création des domaines et sous-domaines
  for (const domainData of scientificDomains) {
    const domain = await prisma.domain.create({
      data: {
        name: domainData.name,
        description: domainData.description,
        subdomains: {
          create: domainData.subdomains,
        },
      },
      include: {
        subdomains: true,
      },
    });

    console.log(
      `Domaine créé: ${domain.name} avec ${domain.subdomains.length} sous-domaines`,
    );
  }

  console.log('Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
