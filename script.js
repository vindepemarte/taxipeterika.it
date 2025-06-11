document.addEventListener('DOMContentLoaded', function() {
    // Hide loading overlay when page loads
    setTimeout(function() {
        var loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(function() {
                loadingOverlay.style.display = 'none';
                
                // Start stats counter animation after the loading overlay is gone
                animateCounters();
            }, 300);
        } else {
            console.error('Loading overlay element not found');
            // Still try to animate counters even if overlay is missing
            animateCounters();
        }
    }, 800);

    // Stats counter animation
    function animateCounters() {
        const counters = [
            { id: 'years-count', target: 10, duration: 1000 },
            { id: 'clients-count', target: 70000, duration: 2000 },
            { id: 'animals-count', target: 100000, duration: 2500 },
            { id: 'km-count', target: 2, duration: 1000, suffix: ' milioni' }
        ];
        
        counters.forEach(counter => {
            const counterElement = document.getElementById(counter.id);
            if (!counterElement) return;
            
            const startTime = Date.now();
            const endTime = startTime + counter.duration;
            
            function updateCounter() {
                const now = Date.now();
                const progress = Math.min(1, (now - startTime) / counter.duration);
                
                // Apply easing function for a smoother finish
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                let currentValue;
                if (counter.target >= 1000) {
                    // Format with thousands separator for large numbers
                    currentValue = Math.floor(counter.target * easedProgress).toLocaleString();
                } else {
                    currentValue = Math.floor(counter.target * easedProgress);
                }
                
                counterElement.textContent = currentValue + (counter.suffix || '');
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            updateCounter();
        });
    }

    // Handle navbar scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // Set active menu item based on current section
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.parentElement.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    // Initial check
    setActiveNavItem();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a nav link
    const navMenuLinks = document.querySelectorAll('nav ul li a');
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Modal functionality for Privacy Policy and Terms
    const privacyLink = document.getElementById('privacy-policy-link');
    const termsLink = document.getElementById('terms-link');
    const cookieSettingsLink = document.getElementById('cookie-settings-link');
    const cookiePolicyLink = document.getElementById('cookie-policy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const termsModal = document.getElementById('terms-modal');
    const cookiePolicyModal = document.getElementById('cookie-policy-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    if (cookieSettingsLink) {
        cookieSettingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCookieModal();
        });
    }

    if (cookiePolicyLink) {
        cookiePolicyLink.addEventListener('click', function(e) {
            e.preventDefault();
            cookiePolicyModal.style.display = 'block';
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            privacyModal.style.display = 'none';
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === termsModal) {
            termsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Populate the services section
    populateServices();

    // Populate the routes section
    populateRoutes();

    // Populate the testimonials section
    populateTestimonials();

    // Populate the gallery section
    populateGallery();

    // Populate legal content 
    populateLegalContent();

    // Cookie Consent Management
    initCookieConsent();
});

// Services data
const servicesData = [
    {
        icon: 'icone-animali-taxipet/svg/cane.svg',
        title: 'Trasporto Cani',
        description: 'Trasporto confortevole e sicuro per il tuo amico a quattro zampe in tutta Italia.',
        documents: {
            required: [
                'Libretto sanitario con vaccinazioni in regola',
                'Microchip con relativa iscrizione anagrafe canina',
                'Certificato di buona salute',
                'Fotocopia documenti di identità proprietario attuale e nuovo proprietario',
                'Necessario portare sacchettino crocchette da somministrare durante il viaggio'
            ]
        }
    },
    {
        icon: 'icone-animali-taxipet/svg/gatto.svg',
        title: 'Trasporto Gatti',
        description: 'Servizio di trasporto dedicato ai gatti con particolare attenzione al loro comfort e tranquillità.',
        documents: {
            required: [
                'Libretto sanitario con vaccinazioni in regola',
                'Microchip obbligatorio (Lombardia)',
                'Trasportino gatto',
                'Certificato di buona salute',
                'Fotocopia documenti di identità proprietario attuale e nuovo proprietario',
                'Necessario portare sacchettino crocchette da somministrare durante il viaggio'
            ]
        }
    },
    {
        icon: 'icone-animali-taxipet/svg/coniglio.svg',
        title: 'Trasporto Conigli',
        description: 'Trasporto specializzato per conigli e altri piccoli mammiferi con attenzione alle loro esigenze specifiche.',
        documents: {
            required: [
                'Libretto sanitario con vaccinazioni in regola',
                'Certificato di buona salute',
                'Trasportino coniglio',
                'Fotocopia documenti di identità proprietario attuale e nuovo proprietario'
            ]
        }
    },
    {
        icon: 'icone-animali-taxipet/svg/tartaruga.svg',
        title: 'Trasporto Tartarughe',
        description: 'Servizio di trasporto per tartarughe e rettili con controllo della temperatura e delle condizioni ambientali.',
        documents: {
            required: [
                'Documentazione CITES (per specie protette)',
                'Contenitore di polistirolo appropriato per il trasporto (adeguato alle dimensioni dell\'animale)',
                'Fotocopia documenti di identità proprietario attuale e nuovo proprietario'
            ]
        }
    },
    {
        icon: 'icone-animali-taxipet/svg/pappagallo.svg',
        title: 'Trasporto Uccelli',
        description: 'Trasporto per uccelli domestici con particolare attenzione alla ventilazione e alla riduzione dello stress.',
        documents: {
            required: [
                'Documentazione CITES (ove richiesto)',
                'Trasportino adeguato',
                'Fotocopia documenti di identità proprietario attuale e nuovo proprietario'
            ]
        }
    },
    {
        icon: 'icone-animali-taxipet/svg/gallina.svg',
        title: 'Trasporto Animali da Cortile',
        description: 'Servizio di trasporto per galline e altri animali da cortile con veicoli appositamente attrezzati.',
        documents: {
            required: [
                'Compilazione foglio rosa (<a href="modello_4_generico.pdf" download target="_blank">scarica modello 4</a>)',
                'Fotocopia documenti di identità proprietario attuale e nuovo proprietario'
            ]
        }
    },
    {
        icon: 'icone-animali-taxipet/svg/current-marker.svg',
        title: 'Taxi Animali Piemonte',
        description: 'Servizio taxi dedicato al trasporto animali nel territorio piemontese con auto di piccole dimensioni.',
        documents: {
            required: [
                'Fare riferimento alla documentazioni richieste per ogni singolo animale sopra elencate'
            ]
        }
    }
];

// Routes data
const routesData = [
    {
        name: 'Versante Adriatico',
        description: 'Trasporto animali lungo la costa adriatica, da nord a sud e viceversa.',
        nextTrip: '9 Maggio 2025',  // Modificare questa data per il prossimo viaggio
        cities: [
            'Trofarello', 'Asti', 'Tortona', 'Melegnano', 'Parma', 
            'Reggio Emilia', 'Modena', 'Bologna', 'Imola', 'Rimini', 
            'Pesaro', 'Ancona', 'Pescara', 'Termoli', 'Foggia', 
            'Caserta', 'Nola', 'Eboli', 'Lauria', 'Cosenza', 
            'Lamezia', 'Rosarno', 'Villa San Giovanni', 'Messina', 'Palermo', 'Catania'
        ],
        return: true
    },
    {
        name: 'Versante Tirrenico',
        description: 'Trasporto animali lungo la costa tirrenica, da nord a sud e viceversa.',
        nextTrip: '30 Aprile 2025',  // Modificare questa data per il prossimo viaggio
        cities: [
            'Trofarello', 'Asti', 'Tortona', 'Melegnano', 'Parma', 
            'Reggio Emilia', 'Modena', 'Bologna', 'Firenze', 'Arezzo', 
            'Valdichiana', 'Orte', 'Roma', 'Valmontone', 'Frosinone', 
            'Cassino', 'Caserta', 'Nola', 'Eboli', 'Lauria', 'Cosenza', 
            'Lamezia', 'Rosarno', 'Villa San Giovanni', 'Messina', 'Palermo', 'Catania'
        ],
        return: true
    }
];

// Testimonial data
const testimonialsData = [
    {
        content: 'Servizio impeccabile! Ho trasportato il mio Labrador da Milano a Palermo senza alcun problema. Lo staff è molto professionale e attento alle esigenze degli animali.',
        author: 'Marco R.'
    },
    {
        content: 'Ho utilizzato il servizio di TaxiPet Erika per trasportare la mia gatta in Sicilia. Consiglio vivamente questo servizio a chiunque debba trasportare i propri animali per lunghe distanze.',
        author: 'Giulia M.'
    },
    {
        content: 'Ottima esperienza! Il mio coniglio è arrivato a destinazione tranquillo e senza stress. Personale cortese e disponibile per qualsiasi esigenza.',
        author: 'Federico B.'
    },
    {
        content: 'Servizio eccellente e puntuale. La mia tartaruga è stata trasportata con tutte le cure necessarie. Tornerò sicuramente a utilizzare TaxiPet Erika!',
        author: 'Laura C.'
    }
];

// Function to populate services section
function populateServices() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';

        // Create the HTML markup
        let serviceHTML = `
            <img src="${service.icon}" alt="${service.title}" class="service-icon">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            <div class="document-requirements">
                <h4>Documenti Necessari</h4>
                <ul>
        `;

        // Add each required document (with HTML support)
        service.documents.required.forEach(doc => {
            serviceHTML += `<li>${doc}</li>`;
        });

        // Close the HTML markup
        serviceHTML += `
                </ul>
            </div>
        `;

        serviceCard.innerHTML = serviceHTML;
        servicesGrid.appendChild(serviceCard);
    });
}

// Function to populate routes section
function populateRoutes() {
    const routesContainer = document.querySelector('.routes-container');
    if (!routesContainer) return;

    routesData.forEach(routeData => {
        const route = document.createElement('div');
        route.className = 'route-card';

        // Create the HTML for the route
        let routeHTML = `
            <div class="route-header">
                <h3>${routeData.name}</h3>
                <p class="route-description">${routeData.description}</p>
            </div>
            <div class="route-next-trip">
                <div class="next-trip-label">Prossima partenza:</div>
                <div class="next-trip-date">${routeData.nextTrip}</div>
            </div>
            <div class="route-map">
                <div class="route-line"></div>
                <div class="route-cities-container">
        `;
        
        // Add each city
        routeData.cities.forEach((city, index) => {
            routeHTML += `
                <div class="route-city-point">
                    <div class="city-marker"></div>
                    <div class="city-name">${city}</div>
                </div>
            `;
        });
        
        routeHTML += `
                </div>
            </div>
        `;
        
        // Add return indicator if applicable
        if (routeData.return) {
            routeHTML += `
                <div class="route-return-info">
                    <div class="return-icon"></div>
                    <p>Servizio disponibile anche per il ritorno</p>
                </div>
            `;
        }
        
        route.innerHTML = routeHTML;
        routesContainer.appendChild(route);
    });
}

// Function to populate testimonials section
function populateTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;

    testimonialsData.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';

        testimonialCard.innerHTML = `
            <div class="testimonial-content">${testimonial.content}</div>
            <div class="testimonial-author">- ${testimonial.author}</div>
        `;

        testimonialsContainer.appendChild(testimonialCard);
    });
}

// Function to populate gallery section
function populateGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    if (!galleryContainer) return;

    // Default gallery items in case external data isn't available
    const defaultGalleryItems = [
        {
            image: 'icone-animali-taxipet/about-us.jpg',
            caption: 'Consegna completata'
        },
        {
            image: 'icone-animali-taxipet/taxi-piemonte.jpg',
            caption: 'Consegna completata'
        }
    ];

    // Try to load galleryData from the external file, or use defaults
    let galleryItems = [];
    try {
        // If galleryData is already defined (from the galleria.js script)
        if (typeof galleryData !== 'undefined' && galleryData.length > 0) {
            galleryItems = galleryData;
        } else {
            galleryItems = defaultGalleryItems;
        }
    } catch (error) {
        console.error('Errore nel caricamento dei dati della galleria:', error);
        galleryItems = defaultGalleryItems;
    }

    // Check if we have any gallery items
    if (galleryItems.length === 0) {
        // No images - display null state
        const nullState = document.createElement('div');
        nullState.className = 'gallery-null-state';
        nullState.innerHTML = `
            <img src="icone-animali-taxipet/svg/error.svg" alt="Nessuna immagine" class="null-state-icon">
            <h3>Nessuna immagine nella galleria</h3>
            <p>Le foto dei nostri trasporti saranno presto disponibili.</p>
        `;
        galleryContainer.appendChild(nullState);
        return;
    }

    // Add gallery items
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.caption}">
            <div class="gallery-caption">
                <div class="caption-text">${item.caption}</div>
            </div>
        `;

        galleryContainer.appendChild(galleryItem);
    });
}

// Function to populate legal content
function populateLegalContent() {
    // Privacy Policy
    const privacyContent = document.getElementById('privacy-content');
    if (privacyContent) {
        privacyContent.innerHTML = `
            <h3>Privacy Policy di TaxiPet Erika</h3>
            <p><strong>Ultimo aggiornamento:</strong> ${new Date().toLocaleDateString()}</p>
            <p>La presente Privacy Policy descrive le modalità di raccolta e trattamento dei dati personali degli utenti che utilizzano i servizi di trasporto animali di TaxiPet Erika.</p>
            
            <h4>1. Titolare del Trattamento</h4>
            <p>Il titolare del trattamento dei dati è TaxiPet Erika, con sede in Italia. Il titolare può essere contattato all'indirizzo email: info@taxipeterika.it</p>
            
            <h4>2. Tipologie di Dati Raccolti</h4>
            <p>Raccogliamo solo i dati necessari per la prenotazione e l'esecuzione del servizio di trasporto animali, tra cui:</p>
            <ul>
                <li>Dati personali del proprietario: nome, cognome, indirizzo, numero di telefono, email</li>
                <li>Dati relativi all'animale: specie, razza, età, condizioni di salute, documentazione sanitaria</li>
                <li>Informazioni sul servizio: date, luoghi di partenza e arrivo, eventuali esigenze particolari</li>
            </ul>
            
            <h4>3. Cookie e Tecnologie di Tracciamento</h4>
            <p>Il nostro sito web utilizza cookie e tecnologie simili per migliorare l'esperienza dell'utente. I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita il nostro sito.</p>
            
            <p><strong>Utilizziamo i seguenti tipi di cookie:</strong></p>
            <ul>
                <li><strong>Cookie necessari:</strong> Essenziali per il funzionamento tecnico del sito web. Questi cookie non possono essere disattivati.</li>
                <li><strong>Cookie analitici:</strong> Ci permettono di analizzare come gli utenti interagiscono con il nostro sito, consentendoci di migliorare la funzionalità e l'esperienza utente. Questi cookie sono anonimi e non tracciano informazioni personali.</li>
                <li><strong>Cookie di preferenza:</strong> Consentono al sito di ricordare le scelte fatte dall'utente e di fornire funzionalità personalizzate.</li>
            </ul>
            
            <p>L'utente può gestire le proprie preferenze sui cookie utilizzando il banner dei cookie visualizzato alla prima visita o tramite il link "Impostazioni Cookie" presente nel footer del sito.</p>
            
            <p>La base giuridica per l'utilizzo dei cookie necessari è il legittimo interesse; per gli altri tipi di cookie, la base giuridica è il consenso dell'utente.</p>
            
            <h4>4. Finalità del Trattamento</h4>
            <p>I dati vengono raccolti esclusivamente per:</p>
            <ul>
                <li>Gestire la prenotazione e l'erogazione del servizio di trasporto</li>
                <li>Adempiere agli obblighi legali e fiscali</li>
                <li>Contattare il cliente in caso di necessità relative al servizio</li>
                <li>Migliorare la qualità del servizio</li>
                <li>Analizzare l'utilizzo del sito web e migliorare l'esperienza utente (tramite cookie analitici, previo consenso)</li>
                <li>Personalizzare l'esperienza utente sul sito (tramite cookie di preferenza, previo consenso)</li>
            </ul>
            
            <h4>5. Modalità di Trattamento</h4>
            <p>I dati personali vengono trattati con strumenti manuali, informatici e telematici, con logiche strettamente correlate alle finalità indicate e in modo da garantire la sicurezza e la riservatezza dei dati stessi.</p>
            
            <h4>6. Conservazione dei Dati</h4>
            <p>I dati personali vengono conservati per il tempo necessario a fornire il servizio richiesto e per adempiere agli obblighi legali e fiscali, per un periodo non superiore a 5 anni dalla conclusione del servizio.</p>
            
            <p>I cookie tecnici/necessari scadono alla chiusura della sessione o al massimo dopo 1 anno. I cookie analitici e di preferenza hanno una durata massima di 1 anno, ma possono essere cancellati in qualsiasi momento tramite le impostazioni del browser.</p>
            
            <h4>7. Condivisione dei Dati</h4>
            <p>I dati personali non vengono condivisi con terze parti, se non quando necessario per l'erogazione del servizio o per adempiere a obblighi di legge.</p>
            
            <h4>8. Diritti dell'Utente</h4>
            <p>In qualità di interessato, hai il diritto di:</p>
            <ul>
                <li>Accedere ai tuoi dati personali</li>
                <li>Chiedere la rettifica o la cancellazione dei dati</li>
                <li>Limitare il trattamento o opporti al trattamento</li>
                <li>Richiedere la portabilità dei dati</li>
                <li>Revocare il consenso in qualsiasi momento</li>
                <li>Presentare un reclamo all'autorità di controllo competente (in Italia, il Garante per la Protezione dei Dati Personali)</li>
            </ul>
            
            <h4>9. Cookie e Navigazione di Terze Parti</h4>
            <p>Il nostro sito può contenere collegamenti a siti esterni che hanno le proprie informative sulla privacy. Non abbiamo controllo su questi siti e non siamo responsabili delle loro pratiche relative alla privacy.</p>
            
            <h4>10. Modifiche alla Privacy Policy</h4>
            <p>TaxiPet Erika si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche verranno pubblicate su questa pagina. Ti invitiamo a consultare regolarmente questa pagina per rimanere aggiornato.</p>
            
            <h4>11. Contatti</h4>
            <p>Per esercitare i tuoi diritti o per qualsiasi informazione relativa al trattamento dei tuoi dati personali, puoi contattarci ai riferimenti forniti sul sito.</p>
        `;
    }

    // Terms and Conditions
    const termsContent = document.getElementById('terms-content');
    if (termsContent) {
        termsContent.innerHTML = `
            <h3>Termini e Condizioni di TaxiPet Erika</h3>
            <p><strong>Ultimo aggiornamento:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h4>1. Accettazione dei Termini</h4>
            <p>Utilizzando i servizi di trasporto animali di TaxiPet Erika, l'utente accetta integralmente i presenti Termini e Condizioni.</p>
            
            <h4>2. Descrizione del Servizio</h4>
            <p>TaxiPet Erika offre servizi di trasporto animali dal Nord al Sud Italia e viceversa, nonché servizi di taxi con auto piccola per il territorio piemontese.</p>
            
            <h4>3. Prenotazione</h4>
            <p>La prenotazione del servizio può essere effettuata tramite telefono o messaggi WhatsApp ai numeri indicati sul sito. La prenotazione è confermata solo dopo l'accettazione da parte di TaxiPet Erika.</p>
            
            <h4>4. Documentazione Necessaria</h4>
            <p>Il cliente è tenuto a fornire tutta la documentazione richiesta per il trasporto dell'animale, come indicato nella sezione "Servizi" del sito. L'assenza della documentazione richiesta può comportare l'impossibilità di erogare il servizio.</p>
            
            <h4>5. Responsabilità</h4>
            <p>TaxiPet Erika si impegna a garantire la massima sicurezza e comfort durante il trasporto degli animali. Tuttavia, non può essere ritenuta responsabile per problemi di salute dell'animale non dichiarati dal proprietario o per eventi non prevedibili durante il trasporto.</p>
            
            <h4>6. Cancellazione e Rimborsi</h4>
            <p>La cancellazione del servizio deve essere comunicata con un preavviso di almeno 48 ore. Cancellazioni effettuate con meno di 48 ore di preavviso possono comportare l'addebito di una penale.</p>
            
            <h4>7. Trasporto</h4>
            <p>Gli animali devono essere trasportati in condizioni adeguate e in conformità con le normative vigenti sul benessere animale. TaxiPet Erika si riserva il diritto di rifiutare il trasporto in caso di condizioni non conformi.</p>
            
            <h4>8. Pagamento</h4>
            <p>Il pagamento del servizio deve essere effettuato secondo le modalità concordate al momento della prenotazione.</p>
            
            <h4>9. Privacy</h4>
            <p>I dati personali forniti dal cliente saranno trattati in conformità con la Privacy Policy di TaxiPet Erika.</p>
            
            <h4>10. Modifiche ai Termini</h4>
            <p>TaxiPet Erika si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche entrano in vigore dal momento della pubblicazione sul sito.</p>
            
            <h4>11. Legge Applicabile</h4>
            <p>I presenti Termini e Condizioni sono regolati dalla legge italiana.</p>
        `;
    }
    
    // Cookie Policy
    const cookiePolicyContent = document.getElementById('cookie-policy-content');
    if (cookiePolicyContent) {
        cookiePolicyContent.innerHTML = `
            <h3>Cookie Policy di TaxiPet Erika</h3>
            <p><strong>Ultimo aggiornamento:</strong> ${new Date().toLocaleDateString()}</p>
            
            <h4>1. Cosa sono i cookie</h4>
            <p>I cookie sono piccoli file di testo che i siti visitati dagli utenti inviano ai loro terminali, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti in occasione di visite successive. I cookie sono utilizzati per diverse finalità, hanno caratteristiche diverse, e possono essere utilizzati sia dal titolare del sito che si sta visitando, sia da terze parti.</p>
            
            <h4>2. Tipologie di cookie utilizzati da questo sito</h4>
            <p>Il sito TaxiPet Erika utilizza le seguenti categorie di cookie:</p>
            
            <h5>2.1 Cookie tecnici/necessari</h5>
            <p>Questi cookie sono essenziali per il corretto funzionamento del sito web. Consentono la navigazione e l'utilizzo delle funzioni di base. Non raccolgono informazioni personali utilizzabili a scopo di marketing. I cookie necessari non possono essere disattivati e non richiedono il consenso dell'utente secondo le normative GDPR e legge sui cookie italiana.</p>
            <p><strong>Esempi:</strong> cookie di sessione, cookie per memorizzare il consenso dell'utente ai cookie.</p>
            <p><strong>Durata:</strong> principalmente cookie di sessione (cancellati alla chiusura del browser) o con durata massima di 1 anno.</p>
            
            <h5>2.2 Cookie analitici</h5>
            <p>Questi cookie ci permettono di raccogliere informazioni anonime sull'utilizzo del nostro sito web, come ad esempio quali pagine vengono visitate più spesso, quanto tempo trascorrono gli utenti sul sito e se si verificano errori. I dati raccolti sono aggregati e anonimi, quindi non ci consentono di identificare i singoli utenti.</p>
            <p><strong>Esempi:</strong> cookie per statistiche e analytics anonimizzati.</p>
            <p><strong>Durata:</strong> i cookie analitici hanno generalmente una durata di 1 anno ma possono essere cancellati in qualsiasi momento tramite le impostazioni del browser.</p>
            <p><strong>Base giuridica:</strong> Il consenso esplicito dell'utente (Art. 6(1)(a) GDPR).</p>
            
            <h5>2.3 Cookie di preferenza</h5>
            <p>Questi cookie consentono al sito web di ricordare le scelte effettuate dall'utente e di fornire funzionalità personalizzate. Possono essere utilizzati per ricordare le modifiche apportate alla dimensione del testo, ai font e ad altre parti personalizzabili della pagina web.</p>
            <p><strong>Esempi:</strong> cookie per ricordare impostazioni e preferenze dell'utente.</p>
            <p><strong>Durata:</strong> i cookie di preferenza hanno generalmente una durata di 1 anno ma possono essere cancellati in qualsiasi momento tramite le impostazioni del browser.</p>
            <p><strong>Base giuridica:</strong> Il consenso esplicito dell'utente (Art. 6(1)(a) GDPR).</p>
            
            <h4>3. Come gestire i cookie</h4>
            <p>Puoi gestire le tue preferenze sui cookie in diversi modi:</p>
            <ul>
                <li><strong>Tramite il banner cookie:</strong> Al primo accesso al nostro sito, ti verrà mostrato un banner che ti permette di accettare o rifiutare i diversi tipi di cookie.</li>
                <li><strong>Tramite il link "Impostazioni Cookie":</strong> Presente nel footer del sito, ti permette di modificare le tue preferenze in qualsiasi momento.</li>
                <li><strong>Tramite le impostazioni del browser:</strong> Ogni browser permette di bloccare o eliminare i cookie. Di seguito i link alle istruzioni per i browser più comuni:
                    <ul>
                        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank">Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank">Mozilla Firefox</a></li>
                        <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank">Safari</a></li>
                        <li><a href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank">Internet Explorer</a></li>
                        <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank">Microsoft Edge</a></li>
                    </ul>
                </li>
            </ul>
            <p>Ti ricordiamo che la disattivazione dei cookie potrebbe influire sulla funzionalità del sito.</p>
            
            <h4>4. Cookie di terze parti</h4>
            <p>Il nostro sito attualmente non utilizza cookie di terze parti per finalità di marketing o profilazione. Se in futuro dovessimo integrare tali servizi, aggiorneremo questa Cookie Policy e richiederemo un nuovo consenso.</p>
            
            <h4>5. Trasferimento di dati all'estero</h4>
            <p>I dati raccolti attraverso i cookie non vengono trasferiti al di fuori dell'Unione Europea.</p>
            
            <h4>6. Aggiornamenti alla Cookie Policy</h4>
            <p>La presente Cookie Policy può essere soggetta a modifiche per riflettere cambiamenti nella legislazione o nell'utilizzo dei cookie sul sito. Ti invitiamo a consultare periodicamente questa pagina.</p>
            
            <h4>7. Contatti</h4>
            <p>Per qualsiasi domanda o chiarimento riguardo l'utilizzo dei cookie su questo sito, puoi contattarci ai recapiti indicati nella sezione Contatti del sito.</p>
        `;
    }
}

// Cookie Consent Management
function initCookieConsent() {
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const closeCookieBanner = document.getElementById('close-cookie-banner');
    const acceptAllCookies = document.getElementById('accept-all-cookies');
    const acceptSelectedCookies = document.getElementById('accept-selected-cookies');
    const rejectAllCookies = document.getElementById('reject-all-cookies');
    const cookiePolicyLink = document.getElementById('cookie-policy-link');
    const cookieSettingsModal = document.getElementById('cookie-settings-modal');
    const modalSavePreferences = document.getElementById('modal-save-preferences');
    
    // Checkboxes
    const analyticsCheckbox = document.getElementById('cookie-analytics');
    const preferencesCheckbox = document.getElementById('cookie-preferences');
    const modalAnalyticsCheckbox = document.getElementById('modal-cookie-analytics');
    const modalPreferencesCheckbox = document.getElementById('modal-cookie-preferences');
    
    // Check if user has already made a choice
    const cookieConsent = getCookie('cookie_consent');
    
    // If no choice has been made, show the banner
    if (!cookieConsent) {
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    } else {
        // Apply the saved preferences
        applySavedCookiePreferences();
    }
    
    // Close button event
    if (closeCookieBanner) {
        closeCookieBanner.addEventListener('click', () => {
            cookieBanner.classList.remove('show');
        });
    }
    
    // Accept all cookies
    if (acceptAllCookies) {
        acceptAllCookies.addEventListener('click', () => {
            setCookiePreferences(true, true, true);
            cookieBanner.classList.remove('show');
        });
    }
    
    // Accept selected cookies
    if (acceptSelectedCookies) {
        acceptSelectedCookies.addEventListener('click', () => {
            const analytics = analyticsCheckbox.checked;
            const preferences = preferencesCheckbox.checked;
            setCookiePreferences(true, analytics, preferences);
            cookieBanner.classList.remove('show');
        });
    }
    
    // Reject all cookies
    if (rejectAllCookies) {
        rejectAllCookies.addEventListener('click', () => {
            setCookiePreferences(true, false, false);
            cookieBanner.classList.remove('show');
        });
    }
    
    // Cookie policy link
    if (cookiePolicyLink) {
        cookiePolicyLink.addEventListener('click', (e) => {
            e.preventDefault();
            openCookieModal();
        });
    }
    
    // Cookie settings modal save button
    if (modalSavePreferences) {
        modalSavePreferences.addEventListener('click', () => {
            const analytics = modalAnalyticsCheckbox.checked;
            const preferences = modalPreferencesCheckbox.checked;
            setCookiePreferences(true, analytics, preferences);
            cookieSettingsModal.style.display = 'none';
        });
    }
    
    // Sync checkboxes between banner and modal
    if (analyticsCheckbox && modalAnalyticsCheckbox) {
        analyticsCheckbox.addEventListener('change', () => {
            modalAnalyticsCheckbox.checked = analyticsCheckbox.checked;
        });
        
        modalAnalyticsCheckbox.addEventListener('change', () => {
            analyticsCheckbox.checked = modalAnalyticsCheckbox.checked;
        });
    }
    
    if (preferencesCheckbox && modalPreferencesCheckbox) {
        preferencesCheckbox.addEventListener('change', () => {
            modalPreferencesCheckbox.checked = preferencesCheckbox.checked;
        });
        
        modalPreferencesCheckbox.addEventListener('change', () => {
            preferencesCheckbox.checked = modalPreferencesCheckbox.checked;
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cookieSettingsModal) {
            cookieSettingsModal.style.display = 'none';
        }
    });
    
    // Close button in modal
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    // Load saved preferences to checkboxes
    loadSavedPreferences();
}

// Function to open cookie settings modal
function openCookieModal() {
    const cookieSettingsModal = document.getElementById('cookie-settings-modal');
    cookieSettingsModal.style.display = 'block';
    
    // Load saved preferences to modal checkboxes
    loadSavedPreferences();
}

// Function to set cookie preferences
function setCookiePreferences(necessary, analytics, preferences) {
    // Create preferences object
    const cookiePreferences = {
        necessary: necessary,
        analytics: analytics,
        preferences: preferences,
        timestamp: new Date().toISOString()
    };
    
    // Save preferences as a cookie
    setCookie('cookie_consent', JSON.stringify(cookiePreferences), 365);
    
    // Apply the preferences
    applyCookiePreferences(cookiePreferences);
}

// Function to apply cookie preferences
function applyCookiePreferences(preferences) {
    // Always enable necessary cookies
    
    // Handle analytics cookies
    if (preferences.analytics) {
        enableAnalyticsCookies();
    } else {
        disableAnalyticsCookies();
    }
    
    // Handle preference cookies
    if (preferences.preferences) {
        enablePreferenceCookies();
    } else {
        disablePreferenceCookies();
    }
}

// Function to apply saved cookie preferences
function applySavedCookiePreferences() {
    const cookieConsent = getCookie('cookie_consent');
    
    if (cookieConsent) {
        try {
            const preferences = JSON.parse(cookieConsent);
            applyCookiePreferences(preferences);
        } catch (e) {
            console.error('Error parsing cookie preferences:', e);
        }
    }
}

// Function to load saved preferences to checkboxes
function loadSavedPreferences() {
    const cookieConsent = getCookie('cookie_consent');
    
    if (cookieConsent) {
        try {
            const preferences = JSON.parse(cookieConsent);
            
            // Set checkboxes based on saved preferences
            const analyticsCheckbox = document.getElementById('cookie-analytics');
            const preferencesCheckbox = document.getElementById('cookie-preferences');
            const modalAnalyticsCheckbox = document.getElementById('modal-cookie-analytics');
            const modalPreferencesCheckbox = document.getElementById('modal-cookie-preferences');
            
            if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics;
            if (preferencesCheckbox) preferencesCheckbox.checked = preferences.preferences;
            if (modalAnalyticsCheckbox) modalAnalyticsCheckbox.checked = preferences.analytics;
            if (modalPreferencesCheckbox) modalPreferencesCheckbox.checked = preferences.preferences;
        } catch (e) {
            console.error('Error loading saved preferences:', e);
        }
    }
}

// Function to enable analytics cookies
function enableAnalyticsCookies() {
    // This is where you would initialize analytics services like Google Analytics
    console.log('Analytics cookies enabled');
}

// Function to disable analytics cookies
function disableAnalyticsCookies() {
    // This is where you would disable analytics services
    console.log('Analytics cookies disabled');
}

// Function to enable preference cookies
function enablePreferenceCookies() {
    // This is where you would enable preference-related functionality
    console.log('Preference cookies enabled');
}

// Function to disable preference cookies
function disablePreferenceCookies() {
    // This is where you would disable preference-related functionality
    console.log('Preference cookies disabled');
}

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = '';
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/; SameSite=Lax';
}

// Function to get a cookie value
function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    
    return null;
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
} 