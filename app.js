document.addEventListener('DOMContentLoaded', () => {
    const compte = JSON.parse(localStorage.getItem('sauveTaBouffeCompte') || 'null');
    const connecte = localStorage.getItem('sauveTaBouffeConnecte') === 'oui';

    if (compte && connecte) {
        document.querySelectorAll('.nav-menu a[href="compte.html"]').forEach(lien => {
            lien.textContent = 'Bonjour ' + compte.nom + ' 👋';
        });
    }

    const notificationEnAttente = sessionStorage.getItem('sauveTaBouffeNotification');
    if (notificationEnAttente) {
        afficherNotificationGlobale(notificationEnAttente, 'succes');
        sessionStorage.removeItem('sauveTaBouffeNotification');
    }

    // Menu mobile
    const nav = document.querySelector('.barre-nav');
    const menu = document.querySelector('.nav-menu');
    if (nav && menu) {
        const boutonMenu = document.createElement('button');
        boutonMenu.type = 'button';
        boutonMenu.className = 'bouton-menu-mobile';
        boutonMenu.textContent = '☰';
        boutonMenu.setAttribute('aria-label', 'Ouvrir le menu');
        boutonMenu.addEventListener('click', () => menu.classList.toggle('ouvert'));
        nav.insertBefore(boutonMenu, menu);
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('ouvert')));
    }
});

function afficherNotificationGlobale(message, type = 'succes') {
    let notification = document.getElementById('notification-globale');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification-globale';
        notification.className = 'notification-globale';
        notification.setAttribute('aria-live', 'polite');
        document.body.appendChild(notification);
    }
    notification.textContent = message;
    notification.className = 'notification-globale visible ' + type;
    clearTimeout(window.notificationGlobaleTimer);
    window.notificationGlobaleTimer = setTimeout(() => notification.classList.remove('visible'), 3200);
}


function echapperHTML(valeur) {
    return String(valeur ?? '').replace(/[&<>'"]/g, caractere => ({
        '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;'
    })[caractere]);
}

function urlQRCode(reservation) {
    const contenu = [
        'SauveTaBouffe',
        reservation.reference,
        reservation.panier,
        reservation.quantite + ' panier(s)',
        reservation.date,
        reservation.retrait,
        Number(reservation.total).toLocaleString('fr-FR', {style:'currency', currency:'EUR'})
    ].join(' | ');
    return 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(contenu);
}

function statutCommande(reservation) {
    const statut = reservation.statut || 'En préparation';
    if (statut === 'Payée' || statut === 'Confirmée') return 'En préparation';
    return statut;
}

function etapeStatut(statut) {
    if (statut === 'Récupérée') return 3;
    if (statut === 'Prête à récupérer') return 2;
    return 1;
}

function telechargerFacture(reference) {
    const reservations = JSON.parse(localStorage.getItem('sauveTaBouffeReservations') || '[]');
    const reservation = reservations.find(item => item.reference === reference);
    if (!reservation) {
        afficherNotificationGlobale('Commande introuvable.', 'erreur');
        return;
    }
    const compte = JSON.parse(localStorage.getItem('sauveTaBouffeCompte') || '{}');
    const total = Number(reservation.total).toLocaleString('fr-FR', {style:'currency', currency:'EUR'});
    const facture = window.open('', '_blank', 'width=850,height=700');
    if (!facture) {
        afficherNotificationGlobale('Autorisez les fenêtres contextuelles pour ouvrir la facture.', 'erreur');
        return;
    }
    facture.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Facture ${echapperHTML(reference)}</title><style>
        body{font-family:Arial,sans-serif;color:#17351f;margin:45px}.entete{display:flex;justify-content:space-between;gap:30px;border-bottom:3px solid #015322;padding-bottom:20px}.logo{font-size:28px;font-weight:800;color:#015322}.badge{background:#dff3d4;padding:8px 14px;border-radius:999px;font-weight:700}.infos{display:grid;grid-template-columns:1fr 1fr;gap:25px;margin:35px 0}.bloc{background:#f5f8f2;padding:20px;border-radius:14px}table{width:100%;border-collapse:collapse;margin-top:25px}th,td{padding:14px;border-bottom:1px solid #ccd9c9;text-align:left}th{background:#015322;color:white}.total{text-align:right;font-size:22px;font-weight:800;margin-top:22px}.note{margin-top:45px;color:#5c6c60;font-size:13px}.actions{margin-top:30px;text-align:center}.actions button{background:#015322;color:white;border:0;padding:13px 22px;border-radius:10px;font-size:16px;cursor:pointer}@media print{.actions{display:none}}
    </style></head><body>
    <div class="entete"><div><div class="logo">SauveTaBouffe</div><p>Facture de réservation</p></div><div><span class="badge">PAYÉE</span><p><strong>Référence :</strong> ${echapperHTML(reference)}</p></div></div>
    <div class="infos"><div class="bloc"><strong>Client</strong><p>${echapperHTML(compte.nom || 'Client')}</p><p>${echapperHTML(reservation.email || compte.email || '')}</p></div><div class="bloc"><strong>Retrait</strong><p>${echapperHTML(reservation.date)}</p><p>${echapperHTML(reservation.retrait)}</p></div></div>
    <table><thead><tr><th>Article</th><th>Quantité</th><th>Total</th></tr></thead><tbody><tr><td>${echapperHTML(reservation.panier)}</td><td>${echapperHTML(reservation.quantite)}</td><td>${total}</td></tr></tbody></table>
    <div class="total">Total payé : ${total}</div><p><strong>Paiement :</strong> ${echapperHTML(reservation.paiement || 'Carte bancaire')}</p>
    <p class="note">Document généré localement dans le cadre de la démonstration SauveTaBouffe. Utilisez le bouton ci-dessous puis choisissez « Enregistrer au format PDF ».</p>
    <div class="actions"><button onclick="window.print()">Télécharger / enregistrer en PDF</button></div></body></html>`);
    facture.document.close();
}

// Barre supérieure : recherche intégrée, panier et page active
function initialiserBarreNavigation() {
    const nav = document.querySelector('.barre-nav');
    const menu = document.querySelector('.nav-menu');
    if (!nav || !menu || nav.querySelector('.nav-actions')) return;

    const actions = document.createElement('div');
    actions.className = 'nav-actions';

    const recherche = document.querySelector('.barre-recherche-flottante');
    if (recherche) {
        actions.appendChild(recherche);
        const champ = recherche.querySelector('input');
        const bouton = recherche.querySelector('button');
        const lancerRecherche = () => {
            const terme = (champ?.value || '').trim();
            if (!terme) return;
            window.location.href = 'prestations.html?recherche=' + encodeURIComponent(terme);
        };
        bouton?.addEventListener('click', (event) => {
            event.preventDefault();
            lancerRecherche();
        });
        champ?.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                lancerRecherche();
            }
        });
    }

    const lienPanier = document.createElement('a');
    lienPanier.href = 'panier.html';
    lienPanier.className = 'nav-panier';
    lienPanier.setAttribute('aria-label', 'Ouvrir le panier');
    lienPanier.innerHTML = '<span aria-hidden="true">🛒</span><span class="nav-panier-badge">0</span>';
    actions.appendChild(lienPanier);
    nav.appendChild(actions);

    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    menu.querySelectorAll('a').forEach(lien => {
        const cible = (lien.getAttribute('href') || '').split('?')[0].toLowerCase();
        if (cible === page) lien.setAttribute('aria-current', 'page');
    });

    mettreAJourBadgePanierNavigation();
}

function mettreAJourBadgePanierNavigation() {
    const badge = document.querySelector('.nav-panier-badge');
    if (!badge) return;
    let panier = [];
    try {
        panier = JSON.parse(localStorage.getItem('sauveTaBouffePanier') || '[]');
    } catch (_) {
        panier = [];
    }
    const nombre = Array.isArray(panier)
        ? panier.reduce((total, article) => total + Number(article.quantite || 1), 0)
        : 0;
    badge.textContent = nombre > 99 ? '99+' : String(nombre);
    badge.style.display = nombre > 0 ? 'grid' : 'none';
}

document.addEventListener('DOMContentLoaded', initialiserBarreNavigation);
window.addEventListener('storage', mettreAJourBadgePanierNavigation);
