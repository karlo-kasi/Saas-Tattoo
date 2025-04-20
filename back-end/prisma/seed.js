import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // Crea uno studio
    const studio = await prisma.studio.create({
        data: {
            nome: 'Tatuami',
            email: 'info@tatuami.com',
            password: 'hashed_password', // metti hash se usi auth reale
            telefono: '3331234567',
            indirizzo: 'Via Roma 12, Milano',
        },
    });

    // Crea utenti (admin + tatuatore + collaboratore)
    const admin = await prisma.utente.create({
        data: {
            nome: 'Mario Admin',
            email: 'admin@tatuami.com',
            password: 'adminpass',
            ruolo: 'ADMIN',
            studioId: studio.id,
        },
    });

    const tatuatore = await prisma.utente.create({
        data: {
            nome: 'Luigi Tatuatore',
            email: 'tattoo@tatuami.com',
            password: 'tattoopass',
            ruolo: 'TATUATORE',
            studioId: studio.id,
        },
    });

    const collaboratore = await prisma.utente.create({
        data: {
            nome: 'Gina Collaboratrice',
            email: 'collab@tatuami.com',
            password: 'collabpass',
            ruolo: 'COLLABORATORE',
            studioId: studio.id,
        },
    });

    // Crea un servizio
    const servizio = await prisma.servizio.create({
        data: {
            nome: 'Tatuaggio Giapponese',
            prezzo: 150,
            durata: 90,
            studioId: studio.id,
        },
    });

    // Crea un cliente
    const cliente = await prisma.cliente.create({
        data: {
            nome: 'Marco Cliente',
            telefono: '3471234567',
            email: 'cliente@email.com',
            studioId: studio.id,
        },
    });

    // Crea un appuntamento
    const appuntamento = await prisma.appuntamento.create({
        data: {
            data: new Date('2025-04-22T15:00:00'),
            durata: 90,
            stato: 'PROGRAMMATO',
            note: 'Cliente vuole un drago sul braccio',
            clienteId: cliente.id,
            tatuatoreId: tatuatore.id,
            servizioId: servizio.id,
            studioId: studio.id,
        },
    });

    // Crea un pagamento
    await prisma.pagamento.create({
        data: {
            importo: 150,
            metodo: 'CARTA',
            stato: 'PAGATO',
            appuntamentoId: appuntamento.id,
        },
    });

    console.log('Database popolato con dati di esempio!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
