import { RuleSection } from '../types';

export const placeholderSections: RuleSection[] = [
  {
    id: 'placeholder-general',
    title: 'Regolamento Generale',
    description: 'Regole base della comunità',
    icon: 'Shield',
    orderIndex: 1,
    rules: [
      {
        id: 'placeholder-rule-1',
        title: 'Benvenuto in MaracujaRP! 🏝️',
        content: `
          <h3>🌴 Benvenuto su Maracuja Roleplay!</h3>
          <p>Questa è una <strong>regola di esempio</strong> per mostrarti come funziona la piattaforma.</p>
          
          <h4>🎯 Caratteristiche principali:</h4>
          <ul>
            <li><strong>Editor ricco</strong> - Formattazione avanzata per le regole</li>
            <li><strong>Gestione sezioni</strong> - Organizza le regole per categoria</li>
            <li><strong>Ricerca intelligente</strong> - Trova rapidamente quello che cerchi</li>
            <li><strong>Pannello admin</strong> - Gestisci tutto facilmente</li>
          </ul>
          
          <blockquote>
            💡 <em>Suggerimento: Accedi come admin (username: admin, password: maracuja2025) per gestire regole e sezioni!</em>
          </blockquote>
          
          <p>🚀 <strong>Configura Supabase</strong> cliccando "Connect to Supabase" per avere dati persistenti!</p>
        `,
        orderIndex: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Sistema'
      },
      {
        id: 'placeholder-rule-2',
        title: 'Come Iniziare 🚀',
        content: `
          <h3>🛠️ Primi Passi</h3>
          <p>Per iniziare a utilizzare la piattaforma:</p>
          
          <ol>
            <li><strong>Configura Supabase</strong> - Clicca "Connect to Supabase" in alto</li>
            <li><strong>Accedi come Admin</strong> - Usa le credenziali: admin/maracuja2025</li>
            <li><strong>Crea le tue sezioni</strong> - Organizza le regole per categoria</li>
            <li><strong>Aggiungi regole</strong> - Usa l'editor ricco per formattare</li>
          </ol>
          
          <h4>🎨 Personalizzazione:</h4>
          <p>Puoi personalizzare:</p>
          <ul>
            <li>🏷️ <strong>Titoli e descrizioni</strong> delle sezioni</li>
            <li>🎯 <strong>Icone</strong> per ogni sezione (12 disponibili)</li>
            <li>📝 <strong>Contenuto ricco</strong> con formattazione HTML</li>
            <li>🔄 <strong>Ordine</strong> tramite drag & drop</li>
          </ul>
          
          <p class="text-center"><strong>🏝️ Buona navigazione nel paradiso tropicale! 🌺</strong></p>
        `,
        orderIndex: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Sistema'
      }
    ]
  },
  {
    id: 'placeholder-roleplay',
    title: 'Regole di Roleplay',
    description: 'Linee guida per il gioco di ruolo',
    icon: 'Users',
    orderIndex: 2,
    rules: [
      {
        id: 'placeholder-rule-3',
        title: 'Esempio di Regola Roleplay 🎭',
        content: `
          <h3>🎭 Regola di Esempio</h3>
          <p>Questa è una <strong>regola placeholder</strong> che mostra come potrebbero apparire le tue regole di roleplay.</p>
          
          <h4>📋 Elementi tipici di una regola:</h4>
          <ul>
            <li><strong>Titolo chiaro</strong> e descrittivo</li>
            <li><strong>Spiegazione dettagliata</strong> del comportamento richiesto</li>
            <li><strong>Esempi pratici</strong> di applicazione</li>
            <li><strong>Conseguenze</strong> in caso di violazione</li>
          </ul>
          
          <blockquote>
            ⚠️ <strong>Nota:</strong> Questa è solo una regola di esempio. Sostituiscila con le tue regole reali!
          </blockquote>
          
          <p>🎯 <em>Ricorda di essere sempre rispettoso e di seguire le linee guida della comunità.</em></p>
        `,
        orderIndex: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Sistema'
      }
    ]
  },
  {
    id: 'placeholder-behavior',
    title: 'Comportamento',
    description: 'Norme di comportamento nella comunità',
    icon: 'Heart',
    orderIndex: 3,
    rules: [
      {
        id: 'placeholder-rule-4',
        title: 'Rispetto e Cortesia 💝',
        content: `
          <h3>💝 Rispetto Reciproco</h3>
          <p>Il <strong>rispetto reciproco</strong> è la base di ogni comunità sana e divertente.</p>
          
          <h4>🌟 Comportamenti Positivi:</h4>
          <ul>
            <li>🤝 <strong>Cortesia</strong> - Tratta tutti con gentilezza</li>
            <li>🎯 <strong>Collaborazione</strong> - Lavora insieme per creare storie</li>
            <li>💬 <strong>Comunicazione</strong> - Esprimi le tue idee chiaramente</li>
            <li>🌱 <strong>Crescita</strong> - Aiuta i nuovi membri</li>
          </ul>
          
          <h4>❌ Comportamenti da Evitare:</h4>
          <ul>
            <li>🚫 Insulti o linguaggio offensivo</li>
            <li>🚫 Discriminazioni di qualsiasi tipo</li>
            <li>🚫 Spam o flooding nelle chat</li>
            <li>🚫 Comportamenti tossici</li>
          </ul>
          
          <div style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 12px; margin: 16px 0;">
            <strong>💡 Ricorda:</strong> Una comunità positiva è responsabilità di tutti! 🏝️
          </div>
        `,
        orderIndex: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Sistema'
      }
    ]
  }
];

export const getPlaceholderSections = (): RuleSection[] => {
  return placeholderSections.map(section => ({
    ...section,
    rules: section.rules.map(rule => ({
      ...rule,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  }));
};