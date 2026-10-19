/**
 * Script principal du site CFPE-Elites.
 *
 * Fonctionnalités :
 * - Affichage dynamique des modules et sous-modules
 * - Ouverture et fermeture des modules
 * - Génération de liens WhatsApp personnalisés
 * - Gestion du menu mobile
 * - Gestion du formulaire de contact
 * - Mise à jour automatique de l'année du copyright
 */

// Numéro WhatsApp officiel du CFPE-Elites.
// Format international sans espace ni signe "+".
const WHATSAPP_NUMBER = "22898006858";

/**
 * Liste complète des modules et sous-modules.
 *
 * Pour ajouter un nouveau module, ajoutez un nouvel objet dans ce tableau.
 * Chaque module doit contenir :
 * - title : nom du module principal
 * - category : catégorie utilisée pour le filtrage
 * - description : courte présentation
 * - image : image illustrative
 * - submodules : liste des sous-modules
 */
const modules = [
    {
        title: "Informatique",
        category: "numerique",
        description:
            "Acquérez les bases et les compétences avancées indispensables en informatique.",
        image: "assets/apprentissage.jpg",
        submodules: [
            "Initiation à l'informatique",
            "Informatique avancée",
            "Excel avancé"
        ]
    },

    {
        title: "Comptabilité pratique",
        category: "professionnel",
        description:
            "Maîtrisez les notions essentielles de la comptabilité appliquée.",
        image: "assets/formateur.jpg",
        submodules: [
            "Comptabilité pratique"
        ]
    },

    {
        title: "Marketing pratique",
        category: "entrepreneuriat",
        description:
            "Développez des stratégies efficaces pour promouvoir vos produits et services.",
        image: "assets/entrepreneur.jpg",
        submodules: [
            "Marketing pratique"
        ]
    },

    {
        title: "Création numérique",
        category: "creation",
        description:
            "Développez votre créativité à travers les métiers de l'image et de l'impression.",
        image: "assets/apprentissage.jpg",
        submodules: [
            "Infographie",
            "Sérigraphie",
            "Infographie et sérigraphie"
        ]
    },

    {
        title: "Réseau et maintenance",
        category: "numerique",
        description:
            "Formez-vous à l'installation, à la maintenance et à la gestion des réseaux informatiques.",
        image: "assets/formateur.jpg",
        submodules: [
            "Maintenance informatique",
            "Réseau informatique",
            "Maintenance et réseau informatique"
        ]
    },

    {
        title: "Langue et expression",
        category: "professionnel",
        description:
            "Améliorez votre expression et votre communication dans un cadre professionnel.",
        image: "assets/etudiant-diplome.jpg",
        submodules: [
            "Anglais professionnel",
            "Art oratoire"
        ]
    },

    {
        title: "Auto-école",
        category: "professionnel",
        description:
            "Préparez-vous efficacement à la conduite et à l'obtention de votre permis.",
        image: "assets/hero-formation.jpg",
        submodules: [
            "Formation auto-école"
        ]
    },

    {
        title: "Importation Chine-Togo",
        category: "entrepreneuriat",
        description:
            "Apprenez à rechercher, acheter et importer des produits depuis la Chine.",
        image: "assets/entrepreneur.jpg",
        submodules: [
            "Importation Chine-Togo",
            "Importation avec Alibaba"
        ]
    },

    {
        title: "Secrétariat",
        category: "professionnel",
        description:
            "Développez des compétences polyvalentes dans les métiers du secrétariat.",
        image: "assets/formateur.jpg",
        submodules: [
            "Secrétariat-caisse",
            "Bureautique",
            "Comptabilité",
            "Bureautique-caisse-comptabilité",
            "Secrétariat médical"
        ]
    },

    {
        title: "Assistance",
        category: "sante",
        description:
            "Préparez-vous aux métiers d'assistance dans les secteurs médical et administratif.",
        image: "assets/etudiant-diplome.jpg",
        submodules: [
            "Délégué médical",
            "Agent de pharmacie",
            "Aide-soignant(e)",
            "Assistant(e) de direction"
        ]
    },

    {
        title: "Logiciels professionnels",
        category: "numerique",
        description:
            "Apprenez à utiliser les logiciels professionnels de gestion et d'analyse.",
        image: "assets/apprentissage.jpg",
        submodules: [
            "Logiciel SAGE 100 Comptabilité",
            "SAGE 100 Gestion commerciale",
            "SAGE 100 Paie",
            "SAGE 100 Comptabilité-Gestion commerciale-Paie",
            "STATA"
        ]
    },

    {
        title: "Transport, logistique et transit",
        category: "professionnel",
        description:
            "Découvrez les métiers du transport, de la logistique et du commerce international.",
        image: "assets/hero-formation.jpg",
        submodules: [
            "Transport, logistique et transit"
        ]
    },

    {
        title: "Bâtiment",
        category: "batiment",
        description:
            "Développez des compétences pratiques dans les métiers techniques du bâtiment.",
        image: "assets/formateur.jpg",
        submodules: [
            "Plomberie",
            "Peinture bâtiment et décoration d'intérieur",
            "Électricité bâtiment",
            "Froid et climatisation",
            "Antenne parabolique",
            "Énergie solaire",
            "Wi-Fi et installation réseau"
        ]
    },

    {
        title: "Autres formations",
        category: "artisanat",
        description:
            "Développez une activité génératrice de revenus grâce à des formations créatives et artisanales.",
        image: "assets/entrepreneur.jpg",
        submodules: [
            "Crochet",
            "Résine époxy",
            "Décoration",
            "Perlage",
            "Fabrication de box à cadeaux",
            "Fabrication de box à pizza",
            "Fabrication de sacs en pagne",
            "Confection de perruques",
            "Confection de dreadlocks métissées",
            "Onglerie",
            "Make-up",
            "Tresse",
            "Haute couture",
            "Stylisme",
            "Modélisme"
        ]
    }
];

/**
 * Encode un texte pour l'utiliser dans une URL.
 *
 * @param {string} text Texte à encoder
 * @returns {string} Texte encodé
 */
function encodeWhatsAppText(text) {
    return encodeURIComponent(text);
}

/**
 * Génère un lien WhatsApp personnalisé pour un sous-module.
 *
 * @param {string} moduleTitle Nom du module principal
 * @param {string} submoduleTitle Nom du sous-module
 * @returns {string} URL WhatsApp
 */
function createSubmoduleWhatsAppLink(moduleTitle, submoduleTitle) {
    const message =
        `Bonjour CFPE-Elites,%0A%0A` +
        `Je souhaite obtenir des informations sur la formation suivante :%0A` +
        `Module : ${encodeWhatsAppText(moduleTitle)}%0A` +
        `Sous-module : ${encodeWhatsAppText(submoduleTitle)}%0A%0A` +
        `Je voudrais également connaître les frais de formation.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

/**
 * Génère le HTML d'un module et de ses sous-modules.
 *
 * @param {Object} module Données du module
 * @param {number} index Position du module dans le tableau
 * @returns {string} Code HTML généré
 */
function createModuleAccordion(module, index) {
    const submodulesHtml = module.submodules
        .map(
            (submodule) => `
                <li class="submodule-item">
                    <span>${submodule}</span>

                    <a
                        class="submodule-whatsapp"
                        href="${createSubmoduleWhatsAppLink(
                            module.title,
                            submodule
                        )}"
                        target="_blank"
                        rel="noopener"
                        aria-label="Demander des informations sur ${submodule}"
                    >
                        WhatsApp
                    </a>
                </li>
            `
        )
        .join("");

    return `
        <article class="module-accordion" data-category="${module.category}">
            <button
                class="module-toggle"
                type="button"
                aria-expanded="${index === 0 ? "true" : "false"}"
                aria-controls="module-content-${index}"
            >
                <span class="module-toggle-content">
                    <span class="module-icon">✦</span>

                    <span>
                        <strong>${module.title}</strong>
                        <small>${module.submodules.length} formation(s) disponible(s)</small>
                    </span>
                </span>

                <span class="module-arrow">⌄</span>
            </button>

            <div
                id="module-content-${index}"
                class="module-content ${index === 0 ? "open" : ""}"
            >
                <div class="module-content-inner">
                    <div class="module-details">
                        <img
                            src="${module.image}"
                            alt="${module.title}"
                        >

                        <div>
                            <p>${module.description}</p>

                            <a
                                class="module-general-whatsapp"
                                href="${createSubmoduleWhatsAppLink(
                                    module.title,
                                    module.title
                                )}"
                                target="_blank"
                                rel="noopener"
                            >
                                Demander des renseignements
                            </a>
                        </div>
                    </div>

                    <h3>Sous-modules disponibles</h3>

                    <ul class="submodules-list">
                        ${submodulesHtml}
                    </ul>
                </div>
            </div>
        </article>
    `;
}

/**
 * Affiche les modules dans la page.
 *
 * @param {string} containerId Identifiant du conteneur
 * @param {Array} data Modules à afficher
 */
function renderModules(containerId, data) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = data
        .map((module, index) => createModuleAccordion(module, index))
        .join("");

    setupModuleAccordions();
}

/**
 * Configure les accordéons des modules.
 */
function setupModuleAccordions() {
    const moduleToggles = document.querySelectorAll(".module-toggle");

    moduleToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const contentId = toggle.getAttribute("aria-controls");
            const content = document.getElementById(contentId);
            const isOpen = toggle.getAttribute("aria-expanded") === "true";

            toggle.setAttribute("aria-expanded", String(!isOpen));
            content.classList.toggle("open", !isOpen);
        });
    });
}

/**
 * Configure les boutons de filtrage.
 */
function setupModuleFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const moduleContainer = document.getElementById("all-modules");

    if (!filterButtons.length || !moduleContainer) {
        return;
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const filteredModules =
                selectedFilter === "all"
                    ? modules
                    : modules.filter(
                          (module) => module.category === selectedFilter
                      );

            renderModules("all-modules", filteredModules);
        });
    });
}

/**
 * Configure le menu mobile.
 */
function setupMobileMenu() {
    const toggleButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (!toggleButton || !navigation) {
        return;
    }

    toggleButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
        });
    });
}

/**
 * Transforme le formulaire de contact en message WhatsApp.
 */
function setupWhatsAppForm() {
    const form = document.getElementById("whatsapp-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        const name = formData.get("name");
        const phone = formData.get("phone");
        const subject = formData.get("subject");
        const message = formData.get("message");

        const whatsappMessage =
            `Bonjour CFPE-Elites,%0A%0A` +
            `Nom : ${encodeWhatsAppText(name)}%0A` +
            `Téléphone : ${encodeWhatsAppText(phone)}%0A` +
            `Objet : ${encodeWhatsAppText(subject)}%0A%0A` +
            `Message : ${encodeWhatsAppText(message)}`;

        const whatsappUrl =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

        window.open(whatsappUrl, "_blank");
    });
}

/**
 * Actualise l'année du copyright.
 */
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll(".current-year");
    const currentYear = new Date().getFullYear();

    yearElements.forEach((element) => {
        element.textContent = currentYear;
    });
}

/**
 * Initialisation générale.
 */
document.addEventListener("DOMContentLoaded", () => {
    // La page d'accueil affiche les six premiers modules.
    renderModules("featured-modules", modules.slice(0, 6));

    // La page des modules affiche tous les modules.
    renderModules("all-modules", modules);

    setupModuleFilters();
    setupMobileMenu();
    setupWhatsAppForm();
    updateCopyrightYear();
});
