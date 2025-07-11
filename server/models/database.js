import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

let mongod = null;

const connectDB = async () => {
  try {
    // Check if we should use in-memory MongoDB for development
    const isWebContainer = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI || process.env.MONGODB_URI.includes('localhost') || process.env.MONGODB_URI.includes('127.0.0.1');
    
    let mongoUri;
    
    if (isWebContainer) {
      // Use in-memory MongoDB for WebContainer environment
      console.log('🚀 Inizializzazione database in-memory per ambiente di sviluppo...');
      mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbName: 'maracuja_rp'
        }
      });
      mongoUri = mongod.getUri();
      console.log('💾 Database in-memory creato:', mongoUri);
    } else {
      // Use provided MongoDB URI for production
      mongoUri = process.env.MONGODB_URI;
      console.log('🔗 Connessione a MongoDB esterno...');
    }

    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connesso con successo');
    
    // Seed initial data if database is empty
    await seedInitialData();
    
  } catch (error) {
    console.error('❌ Errore connessione MongoDB:', error);
    process.exit(1);
  }
};

// Seed initial data function
const seedInitialData = async () => {
  try {
    // Import models
    const { default: Rule } = await import('./Rule.js');
    const { default: RuleSection } = await import('./RuleSection.js');
    
    // Check if data already exists
    const existingRules = await Rule.countDocuments();
    if (existingRules > 0) {
      console.log('📚 Dati già presenti nel database');
      return;
    }

    console.log('🌱 Inizializzazione dati di base...');

    // Create default sections
    const sections = [
      {
        name: 'Regole Generali',
        description: 'Regole base del server',
        order: 1,
        isActive: true
      },
      {
        name: 'Roleplay',
        description: 'Regole per il gioco di ruolo',
        order: 2,
        isActive: true
      },
      {
        name: 'Chat e Comunicazione',
        description: 'Regole per chat e comunicazione',
        order: 3,
        isActive: true
      }
    ];

    const createdSections = await RuleSection.insertMany(sections);

    // Create default rules
    const rules = [
      {
        title: 'Rispetto reciproco',
        content: 'Tutti i giocatori devono trattarsi con rispetto reciproco.',
        section: createdSections[0]._id,
        order: 1,
        isActive: true,
        severity: 'medium'
      },
      {
        title: 'No metagaming',
        content: 'È vietato utilizzare informazioni OOC (Out of Character) nel gioco IC (In Character).',
        section: createdSections[1]._id,
        order: 1,
        isActive: true,
        severity: 'high'
      },
      {
        title: 'Linguaggio appropriato',
        content: 'Mantenere un linguaggio appropriato nelle chat pubbliche.',
        section: createdSections[2]._id,
        order: 1,
        isActive: true,
        severity: 'low'
      }
    ];

    await Rule.insertMany(rules);
    console.log('✅ Dati di base inizializzati con successo');

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione dei dati:', error);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🌴 Database MongoDB inizializzato correttamente');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Errore MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnesso');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
      console.log('🛑 Database in-memory fermato');
    }
    console.log('👋 Connessione database chiusa');
    process.exit(0);
  } catch (error) {
    console.error('❌ Errore durante la chiusura:', error);
    process.exit(1);
  }
});

export default connectDB;