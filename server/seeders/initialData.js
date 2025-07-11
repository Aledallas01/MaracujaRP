import dotenv from 'dotenv';
import mongoose from 'mongoose';
import RuleSection from '../models/RuleSection.js';
import Rule from '../models/Rule.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/maracuja_rp';

const seedData = async () => {
  try {
    console.log('🌴 Connessione a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connesso a MongoDB');

    console.log('🌴 Inizializzazione dati...');

    // Clear existing data
    await RuleSection.deleteMany({});
    await Rule.deleteMany({});

    // Create rule sections
    const sections = await RuleSection.create([
      {
        title: 'Regolamento Generale',
        description: 'Regole base della comunità',
        icon: 'Shield',
        orderIndex: 1
      },
      {
        title: 'Regole di Roleplay',
        description: 'Linee guida per il gioco di ruolo',
        icon: 'Users',
        orderIndex: 2
      },
      {
        title: 'Comportamento',
        description: 'Norme di comportamento',
        icon: 'Heart',
        orderIndex: 3
      },
      {
        title: 'Sanzioni',
        description: 'Sistema sanzionatorio',
        icon: 'AlertTriangle',
        orderIndex: 4
      }
    ]);

    // Create rules
    await Rule.create([
      {
        sectionId: sections[0]._id,
        title: 'Rispetto reciproco',
        content: 'È fondamentale mantenere sempre un atteggiamento rispettoso verso tutti i membri della comunità, sia in gioco che fuori dal gioco.',
        orderIndex: 1
      },
      {
        sectionId: sections[0]._id,
        title: 'Linguaggio appropriato',
        content: 'Evitare insulti, bestemmie eccessive, linguaggio discriminatorio o offensivo. Mantenere un ambiente accogliente per tutti.',
        orderIndex: 2
      },
      {
        sectionId: sections[0]._id,
        title: 'No spam o flooding',
        content: 'Non inviare messaggi ripetitivi, spam o flooding nelle chat. Utilizzare i canali appropriati per ogni tipo di comunicazione.',
        orderIndex: 3
      },
      {
        sectionId: sections[0]._id,
        title: 'Account multipli',
        content: 'È vietato possedere più di un account per giocatore. Ogni persona può avere un solo personaggio attivo alla volta.',
        orderIndex: 4
      },
      {
        sectionId: sections[1]._id,
        title: 'Stay In Character (IC)',
        content: 'Quando si è in gioco, bisogna rimanere sempre nel personaggio. Le informazioni OOC non devono influenzare le azioni IC.',
        orderIndex: 1
      },
      {
        sectionId: sections[1]._id,
        title: 'No Powergaming',
        content: 'È vietato forzare azioni su altri giocatori senza il loro consenso o ignorare i limiti realistici del proprio personaggio.',
        orderIndex: 2
      },
      {
        sectionId: sections[1]._id,
        title: 'No Metagaming',
        content: 'Non utilizzare informazioni ottenute fuori dal personaggio (OOC) per influenzare le azioni del proprio personaggio in gioco.',
        orderIndex: 3
      },
      {
        sectionId: sections[1]._id,
        title: 'Realismo nelle azioni',
        content: 'Tutte le azioni devono essere realistiche e coerenti con il mondo di gioco. Evitare comportamenti irrealistici o esagerati.',
        orderIndex: 4
      },
      {
        sectionId: sections[1]._id,
        title: 'Sviluppo del personaggio',
        content: 'Il personaggio deve avere una storia coerente e svilupparsi nel tempo. Evitare cambiamenti drastici di personalità senza motivazione.',
        orderIndex: 5
      },
      {
        sectionId: sections[2]._id,
        title: 'Fair Play',
        content: 'Giocare sempre in modo leale, aiutando a creare un ambiente di gioco divertente per tutti i partecipanti.',
        orderIndex: 1
      },
      {
        sectionId: sections[2]._id,
        title: 'Collaborazione',
        content: 'Collaborare con gli altri giocatori per creare storie interessanti e coinvolgenti, evitando atteggiamenti egoistici.',
        orderIndex: 2
      },
      {
        sectionId: sections[2]._id,
        title: 'Risoluzione conflitti',
        content: 'In caso di conflitti, cercare sempre di risolverli tramite il dialogo pacifico o contattando un amministratore.',
        orderIndex: 3
      },
      {
        sectionId: sections[2]._id,
        title: 'Supporto ai nuovi giocatori',
        content: 'Aiutare e supportare i nuovi membri della comunità, facilitando il loro inserimento nel gruppo.',
        orderIndex: 4
      },
      {
        sectionId: sections[3]._id,
        title: 'Sistema di warning',
        content: 'Le infrazioni minori comportano warning verbali o scritti. Tre warning comportano una sanzione temporanea.',
        orderIndex: 1
      },
      {
        sectionId: sections[3]._id,
        title: 'Sospensioni temporanee',
        content: 'Per infrazioni moderate: sospensione da 1 a 30 giorni a seconda della gravità dell\'infrazione commessa.',
        orderIndex: 2
      },
      {
        sectionId: sections[3]._id,
        title: 'Ban permanente',
        content: 'Per infrazioni gravi o ripetute: esclusione permanente dalla comunità senza possibilità di appello.',
        orderIndex: 3
      },
      {
        sectionId: sections[3]._id,
        title: 'Appelli',
        content: 'È possibile fare appello per le sanzioni entro 7 giorni tramite il sistema di ticket dedicato.',
        orderIndex: 4
      }
    ]);

    console.log('✅ Dati iniziali inseriti con successo!');
    console.log('🔑 Credenziali Admin: admin / maracuja2025');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Errore durante il seeding:', error);
    process.exit(1);
  }
};

seedData();