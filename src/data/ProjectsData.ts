// Projectsdata.ts | TypeScript file that contains the data for the projects
import portfolio2 from '../assets/projects/portfolio2/portfolio2.png';
import portfolio1 from '../assets/projects/portfolio1/portfolio1.png';
import clarity from '../assets/projects/clarity/clarity.png';
import purchase4less from '../assets/projects/purchase4less/purchase4less.png';
import purchase4less_documentation from '../assets/projects/purchase4less/purchase4less_documentation.pdf';
import electronic_roulette from '../assets/projects/electronic_roulette/electronic_roulette.png';
import electronic_roulette_documentation from '../assets/projects/electronic_roulette/electronic_roulette_documentation.pdf';
import smart_home_securitysystem from '../assets/projects/smart_home_securitysystem/smart_home_securitysystem.png';
import smart_home_securitysystem_documentation from '../assets/projects/smart_home_securitysystem/smart_home_securitysystem_documentation.pdf';
import electronic_car from '../assets/projects/electronic_car/electronic_car.png';
import electronic_car_documentation from '../assets/projects/electronic_car/electronic_car_documentation.pdf';

// Project interface to define the structure of the data
interface Project {
    id: string
    name: { da: string, en: string }
    description: { da: string, en: string }
    githubUrl?: string
    deployedUrl?: string
    pdf?: string
    image: string
}

// Exporting the array of Project objects to use inside ProjectsSection.tsx (id = key)
export const projectsData: Project[] = [
    {
        id: '1',
        name: { da: 'Portefølje 2.0', en: 'Portfolio 2.0' },
        description: {
            da: 'Andet forsøg på at bygge min personlige portefølje.',
            en: 'Second attempt at building my personal portfolio.'
        },
        githubUrl: 'https://github.com/Ditz3n/Portfolio-2.0',
        // deployedUrl: 'https://ditz3n.github.io', // Deployed but wanted to redirect to the repository instead
        image: `${portfolio2}`	
    },
    {
        id: '2',
        name: { da: 'Portefølje 1.0', en: 'Portfolio 1.0' },
        description: {
            da: 'Portefølje til at vise mine projekter og færdigheder.',
            en: 'Portfolio to showcase my projects and skills.'
        },
        githubUrl: 'https://github.com/Ditz3n/Portfolio-1.0',
        image: `${portfolio1}`
    },
    {
        id: '3',
        name: { da: 'Clarity', en: 'Clarity' },
        description: {
            da: 'En simpel URL-forkorter, bygget med React og Express.',
            en: 'A simple URL shortener, built with React and Express.'
        },
        githubUrl: 'https://github.com/Ditz3n/Clarity',
        deployedUrl: 'https://clarity-coral-mu.vercel.app',
        image: `${clarity}`
    },
    {
        id: '4',
        name: { da: 'Purchase4Less', en: 'Purchase4Less' },
        description: {
            da: 'Valgfrit 4. semesterprojekt på Softwareteknologi.',
            en: 'Self-chosen 4th semester project in Software Technology.'
        },
        githubUrl: 'https://github.com/Ditz3n/Purchase4Less',
        pdf: `${purchase4less_documentation}`,
        image: `${purchase4less}`
    },
    {
        id: '5',
        name: { da: 'Elektronisk Roulette', en: 'Electronic Roulette' },
        description: {
            da: 'Valgfrit 3. semesterprojekt på Softwareteknologi.',
            en: 'Self-chosen 3rd semester project in Software Technology.'
        },
        pdf: `${electronic_roulette_documentation}`,
        image: `${electronic_roulette}`
    },
    {
        id: '6',
        name: { da: 'Smart Home Sikkerhedssystem', en: 'Smart Home Securitysystem' },
        description: {
            da: 'Valgfrit 2. semesterprojekt på Softwareteknologi.',
            en: 'Self-chosen 2nd semester project in Software Technology.'
        },
        pdf: `${smart_home_securitysystem_documentation}`,
        image: `${smart_home_securitysystem}`
    },
    {
        id: '7',
        name: { da: 'Elektronisk bil', en: 'Electronic car' },
        description: {
            da: 'Obligatorisk 1. semesterprojekt på Softwareteknologi.',
            en: 'Mandatory 1st semester project in Software Technology.'
        },
        pdf: `${electronic_car_documentation}`,
        image: `${electronic_car}`
    },
];