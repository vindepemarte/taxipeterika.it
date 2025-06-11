GUIDA ALLA GESTIONE DELLA GALLERIA FOTO

Questa cartella contiene le immagini da mostrare nella sezione "Galleria Consegne" del sito.

COME AGGIUNGERE NUOVE FOTO:

1. Salva le immagini direttamente in questa cartella (formato consigliato: JPG o PNG)
2. Modifica il file galleria.js per aggiungere i dettagli di ogni immagine

Esempio di come aggiungere una nuova immagine nel file galleria.js:

Trova questa parte del codice:

```javascript
const galleryData = [
    {
        image: 'icone-animali-taxipet/about-us.jpg',
        caption: 'Consegna del cane Max a Roma',
        location: 'Roma'
    },
    {
        image: 'icone-animali-taxipet/taxi-piemonte.jpg',
        caption: 'Trasporto gatto Felix in Piemonte',
        location: 'Torino'
    }
    // More items can be added here
];
```

E aggiungi la tua nuova foto in questo modo:

```javascript
const galleryData = [
    {
        image: 'icone-animali-taxipet/about-us.jpg',
        caption: 'Consegna del cane Max a Roma',
        location: 'Roma'
    },
    {
        image: 'icone-animali-taxipet/taxi-piemonte.jpg',
        caption: 'Trasporto gatto Felix in Piemonte',
        location: 'Torino'
    },
    {
        image: 'galleria/nome-del-file.jpg',
        caption: 'Descrizione della foto',
        location: 'Luogo della consegna'
    }
    // More items can be added here
];
```

Assicurati di:
- Inserire il percorso corretto dell'immagine (incluso 'galleria/')
- Aggiungere una virgola dopo ogni elemento (tranne l'ultimo)
- Includere una descrizione significativa e il luogo di consegna 