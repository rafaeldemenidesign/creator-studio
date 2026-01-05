// --- STATE ---
let appState = {
    user: null, // { name, username, avatar }
    mode: 'single', // 'single', 'carousel', 'week', 'bio'
    niche: null,
    slides: [],
    currentSlideIndex: 0,
    uploadedImage: null,
    brand: {
        useColor: false,
        color: '#000000',
        font: 'default'
    },
    // New Granular Design State
    design: {
        useCustomColors: false,
        colors: { title: '#000000', sub: '#000000', bg: '#ffffff', accent: '#3b82f6' },
        typography: {
            titleSize: 100, // percentage
            align: 'center' // left, center, right
        },
        image: {
            scale: 1,
            x: 50,
            y: 50,
            fullScreen: false
        },
        logo: {
            src: null,
            size: 80
        }
    },
    // BIO STATE (NEW)
    bio: {
        name: 'Seu Nome',
        role: 'Sua Profissão',
        text: 'Sua biografia curta aqui.',
        avatar: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
        links: [
            { id: 1, label: 'Agende uma Reunião', url: '#', type: 'highlight' },
            { id: 2, label: 'Meu Site Oficial', url: '#', type: 'link' },
            { id: 3, label: 'Instagram', url: '#', type: 'link' }
        ],
        accentColor: '#F59E0B',
        useGradient: true, // New: Gradient toggle
        colors: {
            text: '#e2e8f0', // Light slate for dark mode bg
            role: '#94a3b8'  // Muted slate
        },
        whatsapp: '', // New: WhatsApp number
        bgImage: null,
        // NEW: Font size controls
        fontSizes: {
            name: 100,
            role: 100,
            text: 100
        }
    }
};

// --- CONFIG ---
const TEMPLATES = {
    single: [
        { id: 'modern-cover', name: 'Capa Impacto' },
        { id: 'modern-photo', name: 'Foto e Texto' },
        { id: 'modern-list', name: 'Lista Clean' },
        { id: 'modern-quote', name: 'Frase Minimalista' }
    ],
    carousel: [
        { id: 'carousel-cover', name: 'Capa Carrossel' },
        { id: 'carousel-content', name: 'Conteúdo / Dica' },
        { id: 'carousel-cta', name: 'Chamada Final' }
    ]
};
TEMPLATES.week = TEMPLATES.single;

const niches = [
    // Nichos Originais
    { id: 'marketing', title: 'Marketing Digital', icon: '🚀', colors: { primary: '#2563EB', text: '#1E293B', bg: '#F8FAFC', secondary: '#F59E0B' }, font: "'Inter', sans-serif", hashtags: "#marketingdigital #empreendedorismo #negociosonline" },
    { id: 'health', title: 'Saúde & Bem-estar', icon: '🌿', colors: { primary: '#059669', text: '#064E3B', bg: '#ECFDF5', secondary: '#10B981' }, font: "'Lato', sans-serif", hashtags: "#saude #bemestar #vidasaudavel" },
    { id: 'tech', title: 'Tecnologia', icon: '💻', colors: { primary: '#7C3AED', text: '#4C1D95', bg: '#F5F3FF', secondary: '#8B5CF6' }, font: "'Inter', sans-serif", hashtags: "#tecnologia #inovacao #tech" },
    { id: 'lifestyle', title: 'Lifestyle', icon: '✨', colors: { primary: '#DB2777', text: '#831843', bg: '#FDF2F8', secondary: '#EC4899' }, font: "'Poppins', sans-serif", hashtags: "#lifestyle #estilo #vidamoderna" },
    { id: 'finance', title: 'Finanças', icon: '💰', colors: { primary: '#0D9488', text: '#134E4A', bg: '#F0FDFA', secondary: '#14B8A6' }, font: "'Montserrat', sans-serif", hashtags: "#financas #investimentos #dinheiro" },

    // Nichos Femininos Empreendedores
    { id: 'estetica', title: 'Estética & Beleza', icon: '💆‍♀️', colors: { primary: '#E91E63', text: '#880E4F', bg: '#FFF0F5', secondary: '#F8BBD9' }, font: "'Playfair Display', serif", hashtags: "#estetica #beleza #skincare #autocuidado" },
    { id: 'confeitaria', title: 'Confeitaria & Doces', icon: '🧁', colors: { primary: '#EC407A', text: '#AD1457', bg: '#FFF8E1', secondary: '#FCE4EC' }, font: "'Dancing Script', cursive", hashtags: "#confeitaria #bolosdecorados #docesgourmet" },
    { id: 'nailart', title: 'Nail Art & Manicure', icon: '💅', colors: { primary: '#D81B60', text: '#880E4F', bg: '#FCE4EC', secondary: '#F48FB1' }, font: "'Poppins', sans-serif", hashtags: "#nailart #unhasdecoradas #manicure" },
    { id: 'coaching', title: 'Coaching Feminino', icon: '🌸', colors: { primary: '#9C27B0', text: '#4A148C', bg: '#F3E5F5', secondary: '#E1BEE7' }, font: "'Montserrat', sans-serif", hashtags: "#coaching #empoderamento #mulheres" },
    { id: 'artesanato', title: 'Artesanato & Handmade', icon: '🧶', colors: { primary: '#8D6E63', text: '#4E342E', bg: '#EFEBE9', secondary: '#D7CCC8' }, font: "'Lora', serif", hashtags: "#artesanato #feitoamao #handmade" },
    { id: 'consultoria', title: 'Consultoria de Imagem', icon: '👠', colors: { primary: '#00897B', text: '#004D40', bg: '#E0F2F1', secondary: '#B2DFDB' }, font: "'Lato', sans-serif", hashtags: "#consultoriadeimagem #estilopessoal #moda" }
];

// --- DOM ELEMENTS ---
const views = {
    signup: document.getElementById('signup-view'),
    home: document.getElementById('home-view'),
    niche: document.getElementById('niche-selection-view'),
    editor: document.getElementById('editor-view'),
    bio: document.getElementById('bio-view')
};

const dom = {
    // Signup
    signupForm: document.getElementById('signup-form'),
    signupName: document.getElementById('signup-name'),
    signupUsername: document.getElementById('signup-username'),
    signupAvatar: document.getElementById('signup-avatar'),
    signupAvatarPreview: document.getElementById('signup-avatar-preview'),
    signupBtn: document.getElementById('signup-btn'),
    usernameStatus: document.getElementById('username-status'),

    // Header User
    headerUser: document.getElementById('header-user'),
    headerAvatar: document.getElementById('header-avatar'),
    headerName: document.getElementById('header-name'),
    headerUsername: document.getElementById('header-username'),
    logoutBtn: document.getElementById('logout-btn'),

    // Editor & Canvas DOM (Merged from old dom)
    canvas: document.getElementById('post-canvas'),
    wrapper: document.querySelector('.canvas-wrapper'),
    carouselControls: document.getElementById('carousel-controls'),
    slideIndicator: document.getElementById('slide-indicator'),
    editorTitle: document.getElementById('editor-title'),
    nicheGrid: document.querySelector('.niche-grid'),
    tabs: document.querySelectorAll('.tab-btn'),
    tabPanes: document.querySelectorAll('.tab-pane'),
    bioPreviewFrame: document.getElementById('bio-preview-frame'),
    bioLinksList: document.getElementById('bio-links-list')
};

const inputs = {
    // Content
    title: document.getElementById('input-title'),
    subtitle: document.getElementById('input-subtitle'),
    text: document.getElementById('input-text'),
    image: document.getElementById('input-image'),
    logo: document.getElementById('input-logo'),

    // Bio Inputs
    bioName: document.getElementById('bio-name'),
    bioRole: document.getElementById('bio-role'),
    bioText: document.getElementById('bio-text'),
    bioAvatar: document.getElementById('bio-avatar'), // hidden file input
    bioLayout: document.getElementById('bio-layout'),
    bioFont: document.getElementById('bio-font'),
    bioBgImage: document.getElementById('bio-bg-image'),

    // Design
    font: document.getElementById('font-select'),
    bgColor: document.getElementById('bg-color-picker'),
    titleColor: document.getElementById('title-color-picker'),
    subColor: document.getElementById('sub-color-picker'),
    accentColor: document.getElementById('accent-color-picker'),

    // Controls
    imageScale: document.getElementById('img-scale'),
    imageX: document.getElementById('img-pos-x'),
    imageY: document.getElementById('img-pos-y'),
    imageFull: document.getElementById('img-fullscreen'),
    logoSize: document.getElementById('logo-size'),
    titleSize: document.getElementById('title-size'),
    textAlign: document.getElementById('text-align'),

    // Bio Font Sizes
    bioNameSize: document.getElementById('bio-name-size'),
    bioRoleSize: document.getElementById('bio-role-size'),
    bioTextSize: document.getElementById('bio-text-size'),

    // Bio Banner
    bioBanner: document.getElementById('bio-banner'),
    bioBannerZoom: document.getElementById('bio-banner-zoom'),
    bioBannerY: document.getElementById('bio-banner-y')
};

// --- INITIALIZATION ---
function init() {
    initFirebase(); // New Auth Entry Point
    setupEventListeners();
}

// --- USER & AUTH LOGIC (FIREBASE) ---

let auth, db;
let isLoginMode = false;

// Initialize Firebase dynamically to keep app.js as global script
async function initFirebase() {
    try {
        // Import Config
        const module = await import('./firebase-config.js');
        auth = module.auth;
        db = module.db;

        // Import Auth Functions
        const { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");
        const { doc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

        console.log("🔥 Firebase Initialized");

        // Session Listener
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("✅ User Logged In:", user.email);
                appState.user = {
                    uid: user.uid,
                    name: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    avatar: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=6366f1&color=fff`,
                    username: user.email.split('@')[0].replace(/[^a-z0-9]/g, '') // fallback slug
                };

                // Fetch extra profile data (CPF, custom slug)
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        // Merge firestore data
                        appState.user = { ...appState.user, ...data };
                    }
                } catch (e) { console.error("Error fetching profile:", e); }

                updateHeaderUser();
                views.signup.classList.add('hidden');
                views.home.classList.remove('hidden');
            } else {
                console.log("👋 User Logged Out");
                appState.user = null;
                views.signup.classList.remove('hidden');
                views.home.classList.add('hidden');
            }
        });

        // Form Submit Handler
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.onsubmit = async (e) => {
                e.preventDefault();
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const btn = document.getElementById('signup-btn');

                btn.disabled = true;
                const originalText = btn.textContent;
                btn.textContent = "Processando...";

                try {
                    if (isLoginMode) {
                        // LOGIN
                        await signInWithEmailAndPassword(auth, email, password);
                    } else {
                        // SIGNUP
                        const name = document.getElementById('signup-name').value;
                        const cpf = document.getElementById('signup-cpf').value;

                        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;

                        // Update Auth Profile
                        await updateProfile(user, { displayName: name });

                        // Save to Firestore
                        await setDoc(doc(db, "users", user.uid), {
                            name, email, cpf,
                            username: email.split('@')[0].replace(/[^a-z0-9]/g, ''),
                            createdAt: new Date()
                        });
                    }
                } catch (error) {
                    console.error("Auth Error:", error);
                    let msg = "Erro desconhecido.";
                    if (error.code === 'auth/email-already-in-use') msg = "Este email já está em uso.";
                    if (error.code === 'auth/wrong-password') msg = "Senha incorreta.";
                    if (error.code === 'auth/user-not-found') msg = "Usuário não encontrado.";
                    if (error.code === 'auth/weak-password') msg = "A senha deve ter pelo menos 6 caracteres.";
                    alert(msg);
                    btn.disabled = false;
                    btn.textContent = originalText;
                }
            };
        }

    } catch (error) {
        console.error("❌ Firebase Init Failed:", error);
        alert("Erro ao conectar com servidor de segurança. Verifique sua conexão.");
    }
}

window.toggleLoginMode = function () {
    isLoginMode = !isLoginMode;
    const btn = document.getElementById('toggle-login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const nameGroup = document.getElementById('signup-name').closest('.form-group');
    const cpfGroup = document.getElementById('signup-cpf').closest('.form-group'); // New
    const avatarGroup = document.querySelector('.avatar-upload'); // Select by class
    const title = document.querySelector('.signup-card h2');
    const subtitle = document.querySelector('.signup-card p');

    if (isLoginMode) {
        // Switch to LOGIN
        btn.textContent = 'Quero criar uma conta nova';
        signupBtn.textContent = 'Entrar';
        signupBtn.disabled = false; // Always enable for login
        // Hide extra fields
        if (nameGroup) nameGroup.style.display = 'none';
        if (cpfGroup) cpfGroup.style.display = 'none';
        if (avatarGroup) avatarGroup.style.display = 'none';

        title.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Bem-vindo de volta!';
        subtitle.textContent = 'Digite seu email e senha para acessar.';
    } else {
        // Switch to SIGNUP
        btn.textContent = 'Já tenho um Link na Bio';
        signupBtn.textContent = 'Criar Conta';
        signupBtn.disabled = false;
        // Show extra fields
        if (nameGroup) nameGroup.style.display = 'block';
        if (cpfGroup) cpfGroup.style.display = 'block';
        if (avatarGroup) avatarGroup.style.display = 'flex'; // grid/flex usually

        title.innerHTML = '<i class="fa-solid fa-hand-spock"></i> Crie sua conta';
        subtitle.textContent = 'Comece a criar conteúdo profissional hoje mesmo.';
    }
}
// Cleanup: Removed old listeners and logic
// New Firebase listeners are attached inside initFirebase()

function updateHeaderUser() {
    if (!appState.user) return;
    dom.headerAvatar.src = appState.user.avatar || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    dom.headerName.textContent = appState.user.name || appState.user.username;
    dom.headerUsername.textContent = '@' + appState.user.username;
}

function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        auth.signOut().then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error("Erro ao sair", error);
        });
    }
}

dom.logoutBtn.addEventListener('click', handleLogout);

// --- NAVIGATION ---
function startFlow(mode) {
    appState.mode = mode;
    views.home.classList.add('hidden');
    views.niche.classList.remove('hidden');
    renderNicheGrid();
}

function startBioFlow() {
    appState.mode = 'bio';
    views.home.classList.add('hidden');
    views.bio.classList.remove('hidden');

    // Init Bio Preview
    inputs.bioName.value = appState.bio.name;
    inputs.bioRole.value = appState.bio.role;
    inputs.bioText.value = appState.bio.text;

    renderBioLinksList();
    renderBioPreview();

    // Update button state (Publicar/Atualizar)
    updatePublishButtonState();
}

function goHome() {
    hideAllViews();
    views.home.classList.remove('hidden');
}

function goNiche() {
    hideAllViews();
    views.niche.classList.remove('hidden');
}

function hideAllViews() {
    views.home.classList.add('hidden');
    views.niche.classList.add('hidden');
    views.editor.classList.add('hidden');
    views.bio.classList.add('hidden');
    views.signup.classList.add('hidden');
}

// ... (Rest of existing functions: renderNiches, selectNiche, etc.)
// ... (Including the updated generateBioHTML and renderBioPreview logic from previous steps)

// Function to Publish Bio
async function publishLinkInBio() {
    if (!appState.user) return alert('Erro: Usuário não logado.');

    const btn = document.getElementById('publish-bio-btn');
    const isUpdate = localStorage.getItem('bio_published_' + appState.user.username);

    btn.innerHTML = isUpdate ? '⏳ Atualizando...' : '⏳ Publicando...';
    btn.disabled = true;

    try {
        const htmlContent = generateBioHTML();

        const response = await fetch('/api/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                slug: appState.user.username,
                content: htmlContent
            })
        });

        const data = await response.json();

        if (data.success) {
            // Save published state forever
            localStorage.setItem('bio_published_' + appState.user.username, data.url);

            // Update button to "Atualizar" permanently
            btn.innerHTML = '🔄 Atualizar';
            btn.disabled = false;

            showPublishSuccess(data.url, isUpdate);
        } else {
            alert('Erro ao publicar: ' + (data.error || 'Erro desconhecido'));
            btn.innerHTML = isUpdate ? '🔄 Atualizar' : '🚀 Publicar';
            btn.disabled = false;
        }
    } catch (err) {
        console.error(err);
        alert('Erro de conexão ao publicar.');
        btn.innerHTML = isUpdate ? '🔄 Atualizar' : '🚀 Publicar';
        btn.disabled = false;
    }
}

function showPublishSuccess(url, isUpdate) {
    const title = isUpdate ? 'Site Atualizado!' : 'Site Publicado!';
    const message = isUpdate ? 'Suas alterações já estão online.' : 'Seu Link na Bio está online e pronto para usar.';

    const modalHtml = `
    <div id="publish-success-modal" style="position:fixed; inset:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:9999;">
        <div style="background:white; padding:30px; border-radius:16px; max-width:400px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.5);">
            <div style="font-size:50px; margin-bottom:10px;">${isUpdate ? '✅' : '🚀'}</div>
            <h2 style="color:#111827; margin-bottom:10px; font-weight:800;">${title}</h2>
            <p style="color:#6B7280; margin-bottom:20px;">${message}</p>
            
            <div style="background:#F3F4F6; padding:12px; border-radius:8px; margin-bottom:20px; font-family:monospace; word-break:break-all; border:1px solid #E5E7EB; color:#4F46E5;">
                <a href="${url}" target="_blank" style="text-decoration:none; color:inherit;">${url.replace(/\?v=\d+/, '')}</a>
            </div>

            <div style="display:flex; gap:10px; justify-content:center;">
                <a href="${url}" target="_blank" class="primary-btn" style="text-decoration:none;">Abrir Site</a>
                <button onclick="document.getElementById('publish-success-modal').remove()" style="padding:10px 20px; border:1px solid #E5E7EB; background:white; border-radius:8px; cursor:pointer;">Fechar</button>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Check if already published on load
function updatePublishButtonState() {
    if (!appState.user) return;
    const btn = document.getElementById('publish-bio-btn');
    if (!btn) return;

    const publishedUrl = localStorage.getItem('bio_published_' + appState.user.username);
    if (publishedUrl) {
        btn.innerHTML = '🔄 Atualizar';
    } else {
        btn.innerHTML = '🚀 Publicar';
    }
}

function setupEventListeners() {
    // Mode Selection is inline onclick

    // Editor Tabs
    setupEditorListeners();
    // openPublishModal is defined at the end of the file
}

// renderNicheGrid is defined below at line 523

function setupCanvasScaling() {
    if (!dom.wrapper || !dom.canvas) return;
    // Simple scaling logic
    const padding = 40;
    const availH = dom.wrapper.clientHeight - padding;
    const scale = Math.min(1, availH / 1350); // fit height
    dom.canvas.style.transform = `scale(${scale})`;
}

function setupEditorListeners() {
    // Navigation
    window.switchTab = switchTab;
    window.setAlignment = setAlignment;
    window.addBioLink = addBioLink;
    window.removeBioLink = removeBioLink; // exposed global
    // window.downloadBioSite removed (replaced publish-bio-btn)

    // Niche Selection
    if (dom.nicheGrid) {
        dom.nicheGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.niche-item');
            if (item) selectNiche(item.dataset.id);
        });
    }

    // Inputs (Content)
    ['input', 'change'].forEach(evt => {
        if (inputs.title) inputs.title.addEventListener(evt, updateCurrentSlide);
        if (inputs.subtitle) inputs.subtitle.addEventListener(evt, updateCurrentSlide);
        if (inputs.footer) inputs.footer.addEventListener(evt, updateCurrentSlide);
        if (inputs.layout) inputs.layout.addEventListener(evt, updateCurrentSlide);
    });

    // Smart List (Subtitle Enter Key)
    if (inputs.subtitle) inputs.subtitle.addEventListener('keydown', handleSmartList);

    // Design Inputs - Brand (Legacy/High Level)
    if (inputs.brandColor) inputs.brandColor.addEventListener('input', updateDesignState);
    if (inputs.useBrandColor) inputs.useBrandColor.addEventListener('change', updateDesignState);
    if (inputs.brandFont) inputs.brandFont.addEventListener('change', updateDesignState);

    // Design Inputs - Granular
    if (inputs.useCustomColors) inputs.useCustomColors.addEventListener('change', updateDesignState);
    if (inputs.colorTitle) inputs.colorTitle.addEventListener('input', updateDesignState);
    if (inputs.colorSub) inputs.colorSub.addEventListener('input', updateDesignState);
    if (inputs.colorBg) inputs.colorBg.addEventListener('input', updateDesignState);
    if (inputs.colorAccent) inputs.colorAccent.addEventListener('input', updateDesignState);

    if (inputs.titleSize) inputs.titleSize.addEventListener('input', updateDesignState);

    if (inputs.imgScale) inputs.imgScale.addEventListener('input', updateDesignState);
    if (inputs.imgPosX) inputs.imgPosX.addEventListener('input', updateDesignState);
    if (inputs.imgPosY) inputs.imgPosY.addEventListener('input', updateDesignState);
    if (inputs.imgFullScreen) inputs.imgFullScreen.addEventListener('change', updateDesignState);

    if (inputs.logoSize) inputs.logoSize.addEventListener('input', updateDesignState);

    // Image Uploads
    if (inputs.image) inputs.image.addEventListener('change', handleImageUpload);
    if (inputs.logo) inputs.logo.addEventListener('change', handleLogoUpload);

    // BIO LISTENERS
    if (inputs.bioName) inputs.bioName.addEventListener('input', updateBioState);
    if (inputs.bioRole) inputs.bioRole.addEventListener('input', updateBioState);
    if (inputs.bioText) inputs.bioText.addEventListener('input', updateBioState);
    if (inputs.bioAccent) inputs.bioAccent.addEventListener('input', updateBioState);
    if (inputs.bioAvatar) inputs.bioAvatar.addEventListener('change', handleBioAvatarUpload);
    if (inputs.bioBg) inputs.bioBg.addEventListener('change', handleBioBgUpload);

    // NEW LISTENERS (Refinement)
    const bioBannerInput = document.getElementById('bio-banner-image');
    if (bioBannerInput) bioBannerInput.addEventListener('change', handleBioBannerUpload);

    const bioFontInput = document.getElementById('bio-font');
    if (bioFontInput) bioFontInput.addEventListener('change', updateBioState);

    const bioLayoutOrder = document.getElementById('bio-layout-order');
    if (bioLayoutOrder) bioLayoutOrder.addEventListener('change', updateBioState);

    const bioBannerZoom = document.getElementById('bio-banner-zoom');
    if (bioBannerZoom) bioBannerZoom.addEventListener('input', updateBioState);

    const bioBannerY = document.getElementById('bio-banner-y');
    if (bioBannerY) bioBannerY.addEventListener('input', updateBioState);

    const bioColorAccent = document.getElementById('bio-color-accent');
    if (bioColorAccent) bioColorAccent.addEventListener('input', updateBioState);


    // Carousel/Week Nav
    const prev = document.getElementById('prev-slide');
    if (prev) prev.addEventListener('click', () => changeSlide(-1));

    const next = document.getElementById('next-slide');
    if (next) next.addEventListener('click', () => changeSlide(1));

    const add = document.getElementById('add-slide');
    if (add) add.addEventListener('click', addSlide);

    const rem = document.getElementById('remove-slide');
    if (rem) rem.addEventListener('click', removeSlide);

    // Download
    const dl = document.getElementById('download-btn');
    if (dl) dl.addEventListener('click', downloadCurrent);
}

// --- UTILITIES (Navigation & Rendering) ---

function switchView(viewName) {
    // Hide all
    Object.values(views).forEach(v => {
        if (v) {
            v.classList.add('hidden');
            v.classList.remove('active'); // ensure no stray active classes
        }
    });

    // Show target
    const target = views[viewName];
    if (target) {
        target.classList.remove('hidden');
    }
}

function renderNicheGrid() {
    if (!dom.nicheGrid || typeof niches === 'undefined') return;

    dom.nicheGrid.innerHTML = niches.map(niche => `
        <div class="niche-item" data-id="${niche.id}">
            <div class="niche-icon"><i class="${niche.icon}"></i></div>
            <div class="niche-name">${niche.title}</div>
        </div>
    `).join('');
}

// --- LOGIC: UI & TABS ---
function switchTab(tabId) {
    // Update Buttons
    dom.tabs.forEach(btn => {
        if (btn.id === `tab-btn-${tabId}`) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // Update Panes
    dom.tabPanes.forEach(pane => {
        if (pane.id === `tab-${tabId}`) pane.classList.remove('hidden');
        else pane.classList.add('hidden');
    });
}

function setAlignment(align) {
    appState.design.typography.align = align;

    // Update Buttons Visual
    document.querySelectorAll('.align-btn').forEach(btn => {
        if (btn.dataset.align === align) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    renderCanvas();
}

function handleSmartList(e) {
    if (e.key === 'Enter') {
        const cursor = this.selectionStart;
        const value = this.value;
        const textBefore = value.substring(0, cursor);
        const lines = textBefore.split('\n');
        const lastLine = lines[lines.length - 1];

        // Check for "1. ", "2. ", "- ", etc.
        const match = lastLine.match(/^(\d+)\.\s/);
        if (match) {
            e.preventDefault();
            const currentNum = parseInt(match[1]);
            const nextNum = currentNum + 1;
            const insert = `\n${nextNum}. `;

            // Insert text
            this.value = value.substring(0, cursor) + insert + value.substring(cursor);
            this.selectionStart = this.selectionEnd = cursor + insert.length;

            // Update state immediately so it renders
            appState.slides[appState.currentSlideIndex].subtitle = this.value;
            renderCanvas();
        }
    }
}

// --- LOGIC: DATA ---



function selectNiche(nicheId) {
    appState.niche = niches.find(n => n.id === nicheId);
    appState.slides = [];

    // Reset Design State on new niche (Optional, maybe keep user prefs?)
    // For now, let's reset to ensure clean slate, but keep Logo if uploaded?
    // appState.design.logo.src = null; // Maybe keep logo

    // Initialize Layouts
    if (appState.mode === 'week') {
        const defaultPlan = [
            { title: 'Segunda: Motivacional', sub: 'Comece a semana inspirando sua audiência.', layout: 'modern-quote' },
            { title: 'Terça: Educativo', sub: 'Ensine algo valioso com uma lista prática.', layout: 'modern-list' },
            { title: 'Quarta: Bastidores', sub: 'Mostre o que acontece por trás das câmeras.', layout: 'modern-photo' },
            { title: 'Quinta: Prova Social', sub: 'Compartilhe um depoimento ou resultado.', layout: 'modern-cover' },
            { title: 'Sexta: Oferta', sub: 'Faça uma chamada para ação irresistível.', layout: 'modern-cover' },
        ];
        const plan = appState.niche.weekPlan || defaultPlan;
        plan.forEach(day => appState.slides.push({ title: day.title, subtitle: day.sub, footer: '@seu.perfil', layout: day.layout, image: null }));
    } else if (appState.mode === 'carousel') {
        appState.slides.push({ title: appState.niche.prompts?.cover || 'Título', subtitle: 'Intro...', footer: '@seu.perfil', layout: 'carousel-cover', image: null });
        appState.slides.push({ title: 'Dica Importante', subtitle: 'Conteúdo...', footer: '@seu.perfil', layout: 'carousel-content', image: null });
    } else {
        appState.slides.push({ title: appState.niche.prompts?.cover || 'Título Incrível', subtitle: 'Conteúdo do post...', footer: '@seu.perfil', layout: 'modern-cover', image: null });
    }

    appState.currentSlideIndex = 0;

    // Auto-fill default colors for Granular controls (so they aren't black by default)
    inputs.colorTitle.value = appState.niche.colors.primary;
    inputs.colorSub.value = appState.niche.colors.text;
    inputs.colorBg.value = appState.niche.colors.bg;
    inputs.colorAccent.value = appState.niche.colors.secondary;

    loadEditorUI();
    switchView('editor');
    renderCanvas();
}

function loadEditorUI() {
    if (appState.mode === 'carousel' || appState.mode === 'week') {
        dom.carouselControls.classList.remove('hidden');
        const titleSuffix = appState.mode === 'week' ? '(Planejamento Semanal)' : '(Carrossel)';
        dom.editorTitle.innerText = `Criando ${titleSuffix} - ${appState.niche.title}`;
    } else {
        dom.carouselControls.classList.add('hidden');
        dom.editorTitle.innerText = `Criando Post - ${appState.niche.title}`;
    }
    const options = TEMPLATES[appState.mode];
    inputs.layout.innerHTML = options.map(opt => `<option value="${opt.id}">${opt.name}</option>`).join('');
    loadSlideValues(0); // Load initial
}

function updateCurrentSlide() {
    const slide = appState.slides[appState.currentSlideIndex];
    slide.title = inputs.title.value;
    slide.subtitle = inputs.subtitle.value;
    slide.footer = inputs.footer.value;
    slide.layout = inputs.layout.value;
    renderCanvas();
}

function updateDesignState() {
    // Brand (Legacy)
    appState.brand.useColor = inputs.useBrandColor.checked;
    appState.brand.color = inputs.brandColor.value;
    appState.brand.font = inputs.brandFont.value;

    // Granular
    appState.design.useCustomColors = inputs.useCustomColors.checked;
    appState.design.colors.title = inputs.colorTitle.value;
    appState.design.colors.sub = inputs.colorSub.value;
    appState.design.colors.bg = inputs.colorBg.value;
    appState.design.colors.accent = inputs.colorAccent.value;

    appState.design.typography.titleSize = inputs.titleSize.value;

    appState.design.image.scale = inputs.imgScale.value;
    appState.design.image.x = inputs.imgPosX.value;
    appState.design.image.y = inputs.imgPosY.value;
    appState.design.image.fullScreen = inputs.imgFullScreen.checked;

    appState.design.logo.size = inputs.logoSize.value;

    renderCanvas();
}

function loadSlideValues(index) {
    const slide = appState.slides[index];
    inputs.title.value = slide.title;
    inputs.subtitle.value = slide.subtitle;
    inputs.footer.value = slide.footer;
    inputs.layout.value = slide.layout;

    if (appState.mode === 'week') {
        const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
        dom.slideIndicator.innerText = days[index] || `Dia ${index + 1}`;
    } else {
        dom.slideIndicator.innerText = `Slide ${index + 1}/${appState.slides.length}`;
    }
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            appState.slides[appState.currentSlideIndex].image = evt.target.result;
            // Reset image position on new upload
            appState.design.image.scale = 1;
            appState.design.image.x = 50;
            appState.design.image.y = 50;
            inputs.imgScale.value = 1;
            inputs.imgPosX.value = 50;
            inputs.imgPosY.value = 50;
            renderCanvas();
        };
        reader.readAsDataURL(file);
    }
}

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            appState.design.logo.src = evt.target.result;
            renderCanvas();
        };
        reader.readAsDataURL(file);
    }
}

// --- CAROUSEL LOGIC ---
function changeSlide(dir) {
    const newIndex = appState.currentSlideIndex + dir;
    if (newIndex >= 0 && newIndex < appState.slides.length) {
        appState.currentSlideIndex = newIndex;
        loadSlideValues(newIndex);
        renderCanvas();
    }
}

function addSlide() {
    if (appState.slides.length >= 10) return alert('Máximo de 10 slides.');
    const prev = appState.slides[appState.slides.length - 1];
    appState.slides.push({
        title: 'Novo Slide', subtitle: '...', footer: prev.footer,
        layout: appState.mode === 'carousel' ? 'carousel-content' : 'modern-cover', image: null
    });
    changeSlide(1);
}

function removeSlide() {
    if (appState.slides.length <= 1) return;
    appState.slides.splice(appState.currentSlideIndex, 1);
    if (appState.currentSlideIndex >= appState.slides.length) appState.currentSlideIndex = appState.slides.length - 1;
    loadSlideValues(appState.currentSlideIndex);
    renderCanvas();
}


// --- RENDERING ENGINE ---
function renderCanvas() {
    if (appState.mode === 'bio') {
        renderBioPreview();
        return;
    }

    const slide = appState.slides[appState.currentSlideIndex];
    if (!slide) return;
    renderSlideToContainer(dom.canvas, slide, appState.niche, 1);
    renderFeedPreview();
}

function renderFeedPreview() {
    const grid = document.getElementById('feed-grid');
    if (!grid) return;
    grid.innerHTML = '';
    appState.slides.forEach((slide, index) => {
        const item = document.createElement('div');
        item.className = `feed-item ${index === appState.currentSlideIndex ? 'active' : ''}`;
        item.onclick = () => {
            appState.currentSlideIndex = index;
            loadSlideValues(index);
            renderCanvas();
        };
        const thumbContainer = document.createElement('div');
        Object.assign(thumbContainer.style, { width: '100%', height: '100%', position: 'relative', overflow: 'hidden' });

        const content = document.createElement('div');
        // Scale down for preview
        Object.assign(content.style, {
            width: '1080px', height: '1350px', transform: 'scale(0.12)', transformOrigin: 'top left'
        });

        renderSlideToContainer(content, slide, appState.niche, 1);
        thumbContainer.appendChild(content);
        item.appendChild(thumbContainer);
        grid.appendChild(item);
    });
}

function renderSlideToContainer(container, slide, niche, scale) {
    // 1. Resolve Colors
    let primary = niche.colors.primary;
    let secondary = niche.colors.secondary;
    let bg = niche.colors.bg;
    let text = niche.colors.text;

    // Brand Override (Legacy/High Level)
    if (appState.brand.useColor) {
        primary = appState.brand.color;
    }

    // Granular Override (Highest Level)
    if (appState.design.useCustomColors) {
        primary = appState.design.colors.title; // Map title color to primary for consistency
        text = appState.design.colors.sub;
        bg = appState.design.colors.bg;
        secondary = appState.design.colors.accent;
    }

    // Resolve Font
    const font = appState.brand.font !== 'default' ? appState.brand.font : niche.font;

    // Resolve Typography & Styles
    const titleSize = appState.design.typography.titleSize / 100; // 1.0 = normal
    const align = appState.design.typography.align;

    // Resolve Image
    const imgScale = appState.design.image.scale;
    const imgX = appState.design.image.x;
    const imgY = appState.design.image.y;
    // Object-position syntax: x% y%
    const objPos = `${imgX}% ${imgY}%`;
    const imgTransform = `scale(${imgScale})`;
    const fullScreen = appState.design.image.fullScreen;

    // Resolve Logo
    const logoHtml = appState.design.logo.src ?
        `<img src="${appState.design.logo.src}" style="position: absolute; top: 40px; right: 40px; width: ${appState.design.logo.size}px; z-index: 50; object-fit: contain;">` : '';


    // --- TEMPLATE LOGIC ---
    let html = '';
    const containerBase = `
        width: 100%; height: 100%; position: relative; overflow: hidden;
        font-family: ${font}; background: ${bg}; color: ${text};
        display: flex; flex-direction: column; text-align: ${align};
    `;

    // Shapes
    const shapeStyle1 = `position: absolute; top: -100px; right: -100px; width: 600px; height: 600px; background: ${primary}; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; opacity: 0.1; z-index: 0; pointer-events: none;`;
    const shapeStyle2 = `position: absolute; bottom: -50px; left: -50px; width: 400px; height: 400px; background: ${secondary}; border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; opacity: 0.2; z-index: 0; pointer-events: none;`;


    // ### 1. IMPACT COVER
    if (slide.layout.includes('cover')) {
        // Full screen override logic
        const imgStyle = fullScreen ?
            `position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover; object-position: ${objPos}; transform: ${imgTransform}; z-index: 1; opacity: 0.4;` :
            `position: absolute; bottom: 80px; right: 80px; width: 350px; height: 350px; border-radius: 20px; object-fit: cover; object-position: ${objPos}; transform: ${imgTransform}; box-shadow: 20px 20px 0 ${primary}20; z-index: 2;`;

        html = `
            <div style="${containerBase}; padding: 80px;">
                ${logoHtml}
                <div style="${shapeStyle1}"></div>
                <div style="${shapeStyle2}"></div>
                
                ${slide.image ? `<img src="${slide.image}" style="${imgStyle}">` : ''}

                <div style="flex: 1; z-index: 10; display: flex; flex-direction: column; justify-content: center; align-items: ${align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start')};">
                    <div style="background: ${primary}; color:white; padding: 12px 30px; border-radius: 50px; margin-bottom: 40px; font-weight: 700; font-size: 1.2rem; align-self: ${align === 'center' ? 'center' : (align === 'right' ? 'flex-end' : 'flex-start')};">
                        NOVO POST
                    </div>
                    <h1 style="font-size: calc(5.5rem * ${titleSize}); line-height: 1.05; font-weight: 900; margin-bottom: 30px; color: ${primary};">
                        ${slide.title}
                    </h1>
                    <p style="font-size: 2rem; line-height: 1.5; opacity: 0.8; max-width: 90%;">
                        ${slide.subtitle}
                    </p>
                </div>
                
                <div style="margin-top: auto; font-weight: 600; font-size: 1.4rem; color: ${text}; z-index: 10; text-align: ${align};">
                    ${slide.footer}
                </div>
            </div>
        `;
    }

    // ### 2. LIST / CONTENT
    else if (slide.layout.includes('list') || slide.layout.includes('content')) {
        const items = slide.subtitle.split('\n');
        html = `
            <div style="${containerBase}; padding: 80px;">
                ${logoHtml}
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 15px; background: linear-gradient(90deg, ${primary}, ${secondary});"></div>
                
                <h1 style="font-size: calc(3.5rem * ${titleSize}); font-weight: 800; color: ${primary}; margin-bottom: 60px; margin-top: 40px; border-bottom: 2px solid #e5e5e5; padding-bottom: 30px;">
                    ${slide.title}
                </h1>
                
                <div style="flex: 1; display: flex; flex-direction: column; gap: 30px; text-align: left;">
                    ${items.map((it, i) => `
                        <div style="display: flex; align-items: flex-start; gap: 25px;">
                            <div style="background: ${secondary}40; color: ${primary}; min-width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.5rem;">
                                ${i + 1}
                            </div>
                            <p style="font-size: 1.8rem; line-height: 1.4; color: ${text}; font-weight: 500;">
                                ${it || '...'}
                            </p>
                        </div>
                    `).join('')}
                </div>

                <div style="margin-top: 40px; font-weight: 700; color: ${primary}; font-size: 1.2rem; text-align: right;">
                    ${slide.footer} ➔
                </div>
            </div>
        `;
    }

    // ### 3. PHOTO (Modern Cutout/Gradient)
    else if (slide.layout.includes('photo')) {
        html = `
            <div style="${containerBase};">
                ${logoHtml}
                <div style="height: 60%; position: relative; overflow: hidden;">
                    ${slide.image ?
                `<img src="${slide.image}" style="width:100%; height:100%; object-fit: cover; object-position: ${objPos}; transform: ${imgTransform}; transform-origin: center;">` :
                `<div style="width:100%; height:100%; background: #ddd; display:flex; align-items:center; justify-content:center;">Sem Imagem</div>`
            }
                    <div style="position: absolute; bottom: -1px; left: 0; width: 100%; height: 150px; background: linear-gradient(to top, ${bg} 10%, rgba(255,255,255,0) 100%);"></div>
                </div>
                <div style="height: 40%; background: ${bg}; padding: 60px; display: flex; flex-direction: column; justify-content: center; position: relative; text-align: ${align};">
                    <h1 style="font-size: calc(3.5rem * ${titleSize}); line-height: 1.1; font-weight: 900; color: ${primary}; margin-bottom: 20px;">
                        ${slide.title}
                    </h1>
                    <p style="font-size: 1.5rem; opacity: 0.8;">${slide.subtitle}</p>
                    <div style="position: absolute; bottom: 40px; right: 40px; font-weight: bold;">${slide.footer}</div>
                </div>
            </div>
        `;
    }

    // ### 4. CTA / BIG TYPE
    else {
        html = `
            <div style="${containerBase}; background: ${primary}; color: white; justify-content: center; align-items: center; padding: 60px; text-align: center;">
                 ${logoHtml}
                 <div style="border: 2px solid rgba(255,255,255,0.2); border-radius: 40px; padding: 80px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    
                    <h1 style="font-size: calc(4.5rem * ${titleSize}); font-weight: 900; margin-bottom: 40px; line-height: 1.2;">
                        ${slide.title}
                    </h1>
                    <p style="font-size: 2rem; opacity: 0.9; max-width: 80%; line-height: 1.5;">
                        ${slide.subtitle}
                    </p>
                    
                    <div style="margin-top: 50px; background: white; color: ${primary}; padding: 20px 50px; border-radius: 100px; font-weight: 800; font-size: 1.5rem; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                        Saiba Mais
                    </div>

                    <div style="position: absolute; bottom: 40px; font-size: 1.2rem; opacity: 0.8;">${slide.footer}</div>
                 </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

// --- UTILS ---
function setupCanvasScaling() {
    const wrapper = dom.wrapper;
    const container = document.querySelector('.canvas-area');
    if (!wrapper || !container) return; // Might be in bio view where these don't exist the same way

    // Logic for Bio View is different, handled in specific render
    if (appState.mode === 'bio') return;

    const availableWidth = container.clientWidth - 64;
    const availableHeight = window.innerHeight * 0.65;
    const originalW = 1080;
    const originalH = 1350;
    let scale = Math.min(availableWidth / originalW, availableHeight / originalH);
    scale = Math.min(scale, 1.0);
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.marginBottom = `-${(originalH - (originalH * scale))}px`;
}

function downloadCurrent() {
    htmlToImage.toPng(dom.canvas, { quality: 1.0, pixelRatio: 2 })
        .then((dataUrl) => {
            const link = document.createElement('a');
            const suffix = appState.mode === 'carousel' ? `-slide${appState.currentSlideIndex + 1}` : '';
            link.download = `post-${appState.niche?.id || 'post'}${suffix}.png`;
            link.href = dataUrl;
            link.click();
            generateAndCopyCaption();
        });
}

function generateAndCopyCaption() {
    const slide = appState.slides[appState.currentSlideIndex];
    if (!slide) return;
    const niche = appState.niche;
    const caption = `${slide.title.toUpperCase()}\n\n${slide.subtitle}\n\n.\n.\n${niche.hashtags || '#conteudo'}`;
    navigator.clipboard.writeText(caption).then(() => showToast("Imagem Baixada & Legenda Copiada! ✅"))
        .catch(() => showToast("Imagem Baixada! (Erro ao copiar legenda)"));
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ---------------------------
// BIO CREATOR LOGIC (Enhanced)
// ---------------------------

// ---------------------------
// BIO CREATOR LOGIC (Final Minimalist Polish)
// ---------------------------

const bioInputs = {
    font: document.getElementById('bio-font'),
    layout: document.getElementById('bio-layout-order'),
    banner: document.getElementById('bio-banner-image'),
    bannerZoom: document.getElementById('bio-banner-zoom'),
    bannerY: document.getElementById('bio-banner-y'),
    // Save button removed as per request
    // NEW: Colors & WhatsApp
    whatsapp: document.getElementById('bio-whatsapp'),
    colorText: document.getElementById('bio-color-text'),
    colorRole: document.getElementById('bio-color-role'),
    colorAccent: document.getElementById('bio-color-accent'),
    useGradient: document.getElementById('bio-use-gradient'),
    // NEW: Font size sliders
    nameSize: document.getElementById('bio-name-size'),
    roleSize: document.getElementById('bio-role-size'),
    textSize: document.getElementById('bio-text-size'),
    nameSizeValue: document.getElementById('bio-name-size-value'),
    roleSizeValue: document.getElementById('bio-role-size-value'),
    textSizeValue: document.getElementById('bio-text-size-value')
};

function startBioFlow() {
    appState.mode = 'bio';
    switchView('bio');

    // Setup Listeners for New Advanced Controls
    if (bioInputs.font) bioInputs.font.addEventListener('change', updateBioState);
    if (bioInputs.layout) bioInputs.layout.addEventListener('change', updateBioState);

    // Listeners for New Features
    if (bioInputs.whatsapp) bioInputs.whatsapp.addEventListener('input', updateBioState);
    if (bioInputs.colorText) bioInputs.colorText.addEventListener('input', updateBioState);
    if (bioInputs.colorRole) bioInputs.colorRole.addEventListener('input', updateBioState);
    if (bioInputs.colorAccent) bioInputs.colorAccent.addEventListener('input', updateBioState);
    if (bioInputs.useGradient) bioInputs.useGradient.addEventListener('change', updateBioState);

    // Standard Inputs
    if (bioInputs.banner) {
        bioInputs.banner.addEventListener('change', handleBioBannerUpload);
    }
    if (bioInputs.bannerZoom) bioInputs.bannerZoom.addEventListener('input', updateBioState);
    if (bioInputs.bannerY) bioInputs.bannerY.addEventListener('input', updateBioState);

    // NEW: Font Size Sliders with value display
    if (bioInputs.nameSize) {
        bioInputs.nameSize.addEventListener('input', () => {
            if (bioInputs.nameSizeValue) bioInputs.nameSizeValue.textContent = bioInputs.nameSize.value + '%';
            updateBioState();
        });
    }
    if (bioInputs.roleSize) {
        bioInputs.roleSize.addEventListener('input', () => {
            if (bioInputs.roleSizeValue) bioInputs.roleSizeValue.textContent = bioInputs.roleSize.value + '%';
            updateBioState();
        });
    }
    if (bioInputs.textSize) {
        bioInputs.textSize.addEventListener('input', () => {
            if (bioInputs.textSizeValue) bioInputs.textSizeValue.textContent = bioInputs.textSize.value + '%';
            updateBioState();
        });
    }

    // Save Button Logic REMOVED (Redundant)

    loadBioDefaults();
    renderBioPreview();

    // Change download button text contextually
    const dlBtn = document.getElementById('download-btn');
    if (dlBtn) {
        dlBtn.innerText = "🌐 Acessar Meu Link";
        dlBtn.onclick = downloadBioSite; // Override click handler
    }
}

function loadBioDefaults() {
    inputs.bioName.value = appState.bio.name;
    inputs.bioRole.value = appState.bio.role;
    inputs.bioText.value = appState.bio.text;

    // Use getElementById instead of broken reference
    const bioAccentInput = document.getElementById('bio-color-accent');
    if (bioAccentInput) bioAccentInput.value = appState.bio.accentColor;

    // Load New Advanced Defaults
    if (bioInputs.whatsapp) bioInputs.whatsapp.value = appState.bio.whatsapp || '';
    if (bioInputs.colorText && appState.bio.colors) bioInputs.colorText.value = appState.bio.colors.text || '#e2e8f0';
    if (bioInputs.colorRole && appState.bio.colors) bioInputs.colorRole.value = appState.bio.colors.role || '#94a3b8';
    if (bioInputs.useGradient) bioInputs.useGradient.checked = appState.bio.useGradient !== false; // Default true is cleaner

    // Load advanced defaults
    if (bioInputs.font) bioInputs.font.value = appState.bio.font || "'Montserrat', sans-serif";
    if (bioInputs.layout) bioInputs.layout.value = appState.bio.layout || "default";

    if (appState.bio.bannerSettings) {
        if (bioInputs.bannerZoom) bioInputs.bannerZoom.value = appState.bio.bannerSettings.zoom;
        if (bioInputs.bannerY) bioInputs.bannerY.value = appState.bio.bannerSettings.y;
    }

    // NEW: Load font size defaults
    if (bioInputs.nameSize) {
        bioInputs.nameSize.value = appState.bio.fontSizes?.name || 100;
        if (bioInputs.nameSizeValue) bioInputs.nameSizeValue.textContent = bioInputs.nameSize.value + '%';
    }
    if (bioInputs.roleSize) {
        bioInputs.roleSize.value = appState.bio.fontSizes?.role || 100;
        if (bioInputs.roleSizeValue) bioInputs.roleSizeValue.textContent = bioInputs.roleSize.value + '%';
    }
    if (bioInputs.textSize) {
        bioInputs.textSize.value = appState.bio.fontSizes?.text || 100;
        if (bioInputs.textSizeValue) bioInputs.textSizeValue.textContent = bioInputs.textSize.value + '%';
    }

    renderBioLinksList();
}

// updateBioState is defined below at line 1250 (single definition)

function handleBioAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            appState.bio.avatar = evt.target.result;
            renderBioPreview();
        };
        reader.readAsDataURL(file);
    }
}

function handleBioBgUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            appState.bio.bgImage = evt.target.result;
            renderBioPreview();
        };
        reader.readAsDataURL(file);
    }
}

// Removed duplicate handleBioBannerUpload
// Key logic moved to the single definition below

function renderBioLinksList() {
    dom.bioLinksList.innerHTML = '';
    appState.bio.links.forEach((link, index) => {
        const el = document.createElement('div');
        el.className = 'bio-link-item';

        let iconPlaceholder = 'fa-link';
        const lower = link.label.toLowerCase();
        if (lower.includes('instagram')) iconPlaceholder = 'fa-instagram';
        if (lower.includes('whatsapp')) iconPlaceholder = 'fa-whatsapp';
        if (lower.includes('youtube')) iconPlaceholder = 'fa-youtube';
        if (lower.includes('linkedin')) iconPlaceholder = 'fa-linkedin';
        if (lower.includes('site') || lower.includes('web')) iconPlaceholder = 'fa-globe';
        if (lower.includes('tiktok')) iconPlaceholder = 'fa-tiktok';

        el.innerHTML = `
            <div style="flex:1; display:flex; flex-direction:column; gap:4px;">
                <input type="text" class="link-label-input" data-index="${index}" value="${link.label}" placeholder="Título (ex: Instagram)">
                <input type="text" class="link-url-input" data-index="${index}" value="${link.url}" placeholder="https://..." style="font-size:0.8rem; color:#666;">
            </div>
            <div style="display:flex; align-items:center; color:#666; font-size:1.2rem; margin-right:10px;">
                <i class="fa-brands ${iconPlaceholder}" style="font-family: 'Font Awesome 6 Brands', 'Font Awesome 6 Free';"></i>
            </div>
            <button class="bio-link-remove" onclick="removeBioLink(${index})">×</button>
        `;
        dom.bioLinksList.appendChild(el);
    });

    // Attach Listeners properly
    document.querySelectorAll('.link-label-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = e.target.getAttribute('data-index');
            appState.bio.links[idx].label = e.target.value;
            renderBioPreview(); // Live Update
        });
    });

    document.querySelectorAll('.link-url-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const idx = e.target.getAttribute('data-index');
            appState.bio.links[idx].url = e.target.value;
            renderBioPreview(); // Live Update
        });
    });
}

window.updateBioLink = (index, field, value) => {
    appState.bio.links[index][field] = value;
    // NOTE: We DO NOT re-render the list here to preserve focus.
    // We only update the preview.
    renderBioPreview();
};

window.addBioLink = function () {
    appState.bio.links.push({ id: Date.now(), label: 'Novo Link', url: '#', type: 'link' });
    renderBioLinksList(); // Re-render logic only on ADD
    renderBioPreview();
}

window.removeBioLink = function (index) {
    appState.bio.links.splice(index, 1);
    renderBioLinksList(); // Re-render logic only on REMOVE
    renderBioPreview();
}

// --- BIO COMPONENT LOGIC ---

function updateBioState() {
    // Basic Info
    appState.bio.name = inputs.bioName.value;
    appState.bio.role = inputs.bioRole.value;
    appState.bio.text = inputs.bioText.value;

    // Design & Layout
    const accentInput = document.getElementById('bio-color-accent');
    appState.bio.accentColor = accentInput ? accentInput.value : '#F59E0B';

    // New Colors & Toggles
    if (bioInputs.colorText) appState.bio.colors.text = bioInputs.colorText.value;
    if (bioInputs.colorRole) appState.bio.colors.role = bioInputs.colorRole.value;
    if (bioInputs.useGradient) appState.bio.useGradient = bioInputs.useGradient.checked;
    if (bioInputs.whatsapp) appState.bio.whatsapp = bioInputs.whatsapp.value.replace(/[^0-9]/g, '');

    const fontInput = document.getElementById('bio-font');
    appState.bio.font = fontInput ? fontInput.value : "'Montserrat', sans-serif";

    const layoutInput = document.getElementById('bio-layout-order');
    appState.bio.layout = layoutInput ? layoutInput.value : 'default';

    // Banner Config
    const zoomInput = document.getElementById('bio-banner-zoom');
    const yInput = document.getElementById('bio-banner-y');

    appState.bio.bannerSettings = {
        zoom: zoomInput ? zoomInput.value : 100,
        y: yInput ? yInput.value : 50
    };

    // NEW: Font Sizes
    const nameSize = document.getElementById('bio-name-size');
    const roleSize = document.getElementById('bio-role-size');
    const textSize = document.getElementById('bio-text-size');

    appState.bio.fontSizes = {
        name: nameSize ? nameSize.value : 100,
        role: roleSize ? roleSize.value : 100,
        text: textSize ? textSize.value : 100
    };

    renderBioPreview();
}

function handleBioBannerUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
        appState.bio.banner = evt.target.result; // Standardized to .banner

        // Show controls
        const controls = document.getElementById('banner-adjust-controls');
        if (controls) controls.style.display = 'block';

        renderBioPreview();
    };
    reader.readAsDataURL(file);
}

function renderBioPreview() {
    const bio = appState.bio;
    const accent = bio.accentColor;
    const font = bio.font || "'Montserrat', sans-serif";
    const layout = bio.layout || "default"; // Fixed missing declaration

    // New Colors
    const colorText = bio.colors?.text || '#ffffff'; // Default white for dark mode
    const colorRole = bio.colors?.role || accent;
    const useGradient = bio.useGradient !== false; // Default true

    // Extract font family name for inline style
    const fontFamily = font.split(',')[0].replace(/'/g, "");

    // Prepare Banner Style
    const bannerUrl = bio.banner || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80';
    const zoom = bio.bannerSettings?.zoom || 100;
    const posY = bio.bannerSettings?.y || 50;

    // Apply Font to Frame wrapper
    if (dom.bioPreviewFrame) {
        dom.bioPreviewFrame.style.fontFamily = fontFamily;
    }

    // Font size calculations
    const nameSizeFactor = (bio.fontSizes?.name || 100) / 100;
    const roleSizeFactor = (bio.fontSizes?.role || 100) / 100;
    const textSizeFactor = (bio.fontSizes?.text || 100) / 100;

    // Banner Logic
    let bannerHTML = '';
    if (bio.banner) {
        bannerHTML = `<div style="width:100%; height:140px; background: url('${bio.banner}'); background-size: ${zoom}%; background-position: center ${posY}%; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08);"></div>`;
    }

    // Gradient Logic
    const gradientBg = useGradient
        ? `background: linear-gradient(135deg, ${accent}, #a855f7);`
        : `background: ${accent};`;

    const gradientText = useGradient
        ? `background: linear-gradient(135deg, ${accent}, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
        : `color: ${accent};`;

    // --- HTML BLOCKS ---
    const profileBlock = `
            <div style="display:flex; flex-direction:column; align-items:center; width:100%; margin-bottom: 16px;">
                <div style="position: relative; margin-bottom: 16px;">
                    ${useGradient ? `<div style="position: absolute; inset: -4px; background: linear-gradient(135deg, ${accent}, #a855f7); border-radius: 50%; opacity: 0.7;"></div>` : ''}
                    <img src="${bio.avatar}" style="position: relative; width: 100px; height: 100px; border-radius: 50%; border: 4px solid #0f172a; object-fit: cover; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
                </div>

                <h1 style="font-size: calc(1.4rem * ${nameSizeFactor}); font-weight: 700; margin-bottom: 4px; letter-spacing: -0.5px; color: ${colorText}; text-shadow: 0 2px 10px rgba(0,0,0,0.3); line-height: 1.2; text-align: center;">${bio.name}</h1>
                <p style="font-size: calc(0.65rem * ${roleSizeFactor}); color: ${colorRole}; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; text-align: center;">${bio.role}</p>
                <p style="font-size: calc(0.8rem * ${textSizeFactor}); color: ${colorText}; opacity: 0.8; text-align: center; line-height: 1.6; max-width: 90%; font-weight: 400;">${bio.text}</p>
            </div>`;

    const actionsBlock = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; margin-bottom: 12px;">
                 <div style="background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor: pointer;">
                    <div style="width: 36px; height: 36px; ${gradientBg} border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-location-dot" style="color:white; font-size: 0.9rem;"></i>
                    </div>
                    <span style="font-size:0.7rem; color:${colorText}; opacity:0.7; font-weight: 500;">Localização</span>
                 </div>
                 <div style="background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); padding: 14px; border-radius: 16px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor: pointer;">
                    <div style="width: 36px; height: 36px; ${gradientBg} border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-regular fa-address-card" style="color:white; font-size: 0.9rem;"></i>
                    </div>
                    <span style="font-size:0.7rem; color:${colorText}; opacity:0.7; font-weight: 500;">Salvar Contato</span>
                 </div>
            </div>`;

    const separator = `<div style="width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); margin: 8px 0;"></div>`;

    const linksBlock = `
            <div style="width: 100%; display: flex; flex-direction: column; gap: 12px;">
                ${bio.links.map(link => {
        let iconClass = 'fa-solid fa-link';
        const l = link.label.toLowerCase();
        if (l.includes('instagram')) iconClass = 'fa-brands fa-instagram';
        if (l.includes('whatsapp') || l.includes('fale comigo')) iconClass = 'fa-brands fa-whatsapp';
        if (l.includes('youtube')) iconClass = 'fa-brands fa-youtube';
        if (l.includes('tiktok')) iconClass = 'fa-brands fa-tiktok';
        if (l.includes('site') || l.includes('web')) iconClass = 'fa-solid fa-globe';

        return `
                    <div style="
                        width: 100%;
                        padding: 14px 16px;
                        background: rgba(15, 23, 42, 0.4);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(255,255,255,0.05);
                        border-radius: 14px;
                        display: flex;
                        align-items: center;
                        gap: 14px;
                        color: ${colorText};
                        cursor: pointer;
                        transition: transform 0.2s;
                    " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                        <div style="width: 38px; height: 38px; background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03)); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="${iconClass}" style="font-size: 1rem; color: ${accent};"></i>
                        </div>
                        <span style="font-weight: 500; font-size: 0.85rem; flex: 1;">${link.label}</span>
                        <i class="fa-solid fa-arrow-right" style="font-size: 0.65rem; opacity: 0.5;"></i>
                    </div>
                `}).join('')}
            </div>`;

    // --- COMPOSE LAYOUT ---
    let mainContent = '';
    if (layout === 'banner_top') mainContent = bannerHTML + profileBlock + actionsBlock + separator + linksBlock;
    else if (layout === 'banner_middle') mainContent = profileBlock + bannerHTML + actionsBlock + separator + linksBlock;
    else if (layout === 'links_first') mainContent = linksBlock + separator + profileBlock + actionsBlock + bannerHTML;
    else if (layout === 'minimal') mainContent = profileBlock + bannerHTML + linksBlock;
    else mainContent = profileBlock + actionsBlock + separator + bannerHTML + linksBlock;

    // --- FLOATING WHATSAPP ---
    let waFloatHTML = '';
    if (bio.whatsapp && bio.whatsapp.length > 8) {
        waFloatHTML = `
        <div class="bio-whatsapp-float">
            <i class="fa-brands fa-whatsapp"></i>
        </div>`;
    }

    const html = `
    <div style="width:100%; min-height:100%; font-family: ${font}; background: radial-gradient(ellipse 80% 50% at 50% -20%, ${accent}12, transparent), radial-gradient(ellipse 60% 40% at 100% 100%, #7c3aed18, transparent), #0f172a; color: ${colorText}; display: flex; flex-direction: column; align-items: center; padding: 0; box-sizing: border-box; position: relative; overflow-x: hidden;">
        ${bio.bgImage ? `<div style="position: absolute; top:0; left:0; width:100%; height:100%; background: url('${bio.bgImage}') center/cover; opacity: 0.12; z-index: 0;"></div>` : ''}
        
        <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.6), #0f172a); z-index: 1;"></div>

        <div style="z-index: 10; width: 100%; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
            ${mainContent}

            <!-- SOCIAL FOOTER -->
            <div style="display: flex; gap: 14px; margin-top: 24px; opacity: 0.5;">
                <i class="fa-brands fa-instagram"></i>
                <i class="fa-brands fa-whatsapp"></i>
                <i class="fa-brands fa-linkedin"></i>
            </div>

            <div style="font-size: 9px; margin-top: 4px; opacity: 0.25; letter-spacing: 2px; text-transform: uppercase;">
                Powered by Webmini
            </div>
        </div>

        ${waFloatHTML}
    </div>
    `;

    // Live Indicator
    const indicator = `
        <div style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); border-radius:20px; padding:4px 10px; display:flex; align-items:center; gap:6px; z-index:100; pointer-events:none;">
            <div style="width:6px; height:6px; background:#22c55e; border-radius:50%; box-shadow:0 0 8px #22c55e;"></div>
            <span style="font-size:0.6rem; color:white; font-weight:600; text-transform:uppercase; letter-spacing:1px;">Live Preview</span>
        </div>
    `;

    dom.bioPreviewFrame.innerHTML = html + indicator;
}

// NEW: Extract HTML generation for reuse in Publish
function generateBioHTML() {
    const bio = appState.bio;
    const accent = bio.accentColor;
    const font = bio.font || "'Montserrat', sans-serif";
    const layout = bio.layout || "default";

    // Reconstruct Banner Logic for Export
    let bannerHTML = '';
    if (bio.banner) {
        const zoom = bio.bannerSettings?.zoom || 100;
        const posY = bio.bannerSettings?.y || 50;
        bannerHTML = `<div class="w-full h-44 bg-cover rounded-2xl mb-6 shadow-2xl ring-1 ring-white/10 hover:ring-gold/30 transition-all duration-500" style="background-image: url('${bio.banner}'); background-size: ${zoom}%; background-position: center ${posY}%;"></div>`;
    }

    // NEW: Font size calculations for Export
    const nameSizeFactor = (bio.fontSizes?.name || 100) / 100;
    const roleSizeFactor = (bio.fontSizes?.role || 100) / 100;
    const textSizeFactor = (bio.fontSizes?.text || 100) / 100;

    // Reconstruct Blocks for Export - MODERNIZED
    const profileBlock = `
        <div class="flex flex-col items-center mb-8 w-full relative animate-fade-in">
            <div class="relative mb-5 group cursor-pointer">
                <div class="absolute -inset-2 bg-gradient-to-r from-gold via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-700 animate-pulse-slow"></div>
                <div class="absolute -inset-1 bg-gradient-to-r from-gold to-purple-600 rounded-full opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <img src="${bio.avatar}" class="relative w-28 h-28 rounded-full border-4 border-dark object-cover shadow-2xl ring-2 ring-white/20">
            </div>
            <h1 class="font-bold text-white tracking-tight mb-1 drop-shadow-lg" style="font-size: calc(1.6rem * ${nameSizeFactor})">${bio.name}</h1>
            <p class="text-gold font-semibold tracking-[0.15em] uppercase mb-3 drop-shadow-md" style="font-size: calc(0.7rem * ${roleSizeFactor})">${bio.role}</p>
            <p class="text-slate-400 text-center leading-relaxed font-light max-w-xs" style="font-size: calc(0.875rem * ${textSizeFactor})">${bio.text}</p>
        </div>`;

    const actionsBlock = `
        <div class="grid grid-cols-2 gap-3 w-full mb-6 animate-fade-in animation-delay-100">
            <button class="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 group active:scale-95 transition-all duration-300">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/20 transition-all duration-300">
                    <i class="fa-solid fa-location-dot text-gold"></i>
                </div>
                <span class="text-xs font-medium text-slate-300">Localização</span>
            </button>
            <button onclick="downloadVCard()" class="glass-card p-4 rounded-2xl flex flex-col items-center gap-2 group active:scale-95 transition-all duration-300">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/20 transition-all duration-300">
                    <i class="fa-regular fa-address-card text-gold"></i>
                </div>
                <span class="text-xs font-medium text-slate-300">Salvar Contato</span>
            </button>
        </div>`;

    const separator = `<div class="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>`;

    const formatUrl = (u) => {
        if (!u) return '#';
        let url = u.trim();
        if (url.startsWith('#http')) url = url.substring(1);
        if (url.startsWith('#www')) url = url.substring(1);
        if (!url.match(/^[a-zA-Z]+:/) && !url.startsWith('#') && !url.startsWith('/')) {
            return 'https://' + url;
        }
        return url;
    };

    const linksBlock = `
        <div class="flex flex-col gap-3 w-full">
            ${bio.links.map((link, index) => {
        let finalUrl = formatUrl(link.url);
        let iconClass = 'fa-solid fa-link';
        const l = link.label.toLowerCase();
        if (l.includes('instagram')) iconClass = 'fa-brands fa-instagram';
        if (l.includes('whatsapp')) iconClass = 'fa-brands fa-whatsapp';
        if (l.includes('youtube')) iconClass = 'fa-brands fa-youtube';
        if (l.includes('tiktok')) iconClass = 'fa-brands fa-tiktok';
        if (l.includes('twitter') || l.includes('x.com')) iconClass = 'fa-brands fa-x-twitter';
        if (l.includes('site') || l.includes('loja') || l.includes('web')) iconClass = 'fa-solid fa-globe';
        if (l.includes('email') || l.includes('contato')) iconClass = 'fa-solid fa-envelope';

        return `
                <a href="${finalUrl}" target="_blank" rel="noopener" class="link-card group animate-slide-up" style="animation-delay: ${index * 80}ms">
                    <div class="flex items-center gap-4">
                        <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:bg-gold group-hover:shadow-lg group-hover:shadow-gold/30 transition-all duration-300">
                            <i class="${iconClass} text-base text-slate-300 group-hover:text-dark transition-colors"></i>
                        </div>
                        <span class="font-medium text-sm text-slate-100 group-hover:text-white transition-colors">${link.label}</span>
                    </div>
                    <i class="fa-solid fa-arrow-right text-xs text-slate-500 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300"></i>
                </a>
            `}).join('')}
        </div>`;

    // Export Layout Logic
    let mainContent = '';
    if (layout === 'banner_top') mainContent = bannerHTML + profileBlock + actionsBlock + separator + linksBlock;
    else if (layout === 'banner_middle') mainContent = profileBlock + bannerHTML + actionsBlock + separator + linksBlock;
    else if (layout === 'links_first') mainContent = linksBlock + separator + profileBlock + actionsBlock + bannerHTML;
    else if (layout === 'minimal') mainContent = profileBlock + bannerHTML + linksBlock;
    else mainContent = profileBlock + actionsBlock + separator + bannerHTML + linksBlock;

    // Find WhatsApp Link for Floating Button
    const waLink = bio.links.find(l => l.label.toLowerCase().includes('whatsapp'));
    const waHref = waLink ? formatUrl(waLink.url) : '#';
    const waDisplay = waLink ? 'flex' : 'none';

    return `<!DOCTYPE html>
<html lang="pt-br" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!-- CACHE CONTROL -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    
    <meta name="theme-color" content="#020617">
    <meta name="description" content="${bio.role} - ${bio.text.substring(0, 100)}">
    <title>${bio.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- FONTS: All available options imported -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Lato:wght@300;400;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Merriweather:wght@300;400;700&family=Montserrat:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;600;700&family=Oswald:wght@300;400;500;700&family=Outfit:wght@300;400;500;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { 
                        gold: '${accent}', 
                        dark: '#020617', 
                        surface: '#0f172a',
                        glass: 'rgba(15, 23, 42, 0.6)'
                    },
                    fontFamily: { sans: [${font.split(',')[0]}, 'sans-serif'] },
                    animation: { 
                        'bounce-slow': 'bounce 3s infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'fade-in': 'fadeIn 0.6s ease-out forwards',
                        'slide-up': 'slideUp 0.5s ease-out forwards',
                        'glow': 'glow 2s ease-in-out infinite alternate'
                    },
                    keyframes: {
                        fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }},
                        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' }},
                        glow: { '0%': { boxShadow: '0 0 20px ${accent}40' }, '100%': { boxShadow: '0 0 30px ${accent}60, 0 0 60px ${accent}30' }}
                    }
                }
            }
        }
        
        function downloadVCard() {
            const vcard = "BEGIN:VCARD\\nVERSION:3.0\\nFN:${bio.name}\\nTITLE:${bio.role}\\nNOTE:${bio.text.replace(/"/g, '\\"')}\\nEND:VCARD";
            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'contato.vcf';
            a.click();
        }

        function toggleTheme() {
            const html = document.documentElement;
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }
    </script>
    <style>
        * { -webkit-tap-highlight-color: transparent; }
        html { scroll-behavior: smooth; }
        body { font-family: ${font}; }
        
        /* Animated Gradient Background */
        .bg-mesh {
            background: 
                radial-gradient(ellipse 80% 50% at 50% -20%, ${accent}15, transparent),
                radial-gradient(ellipse 60% 40% at 100% 100%, #7c3aed20, transparent),
                radial-gradient(ellipse 50% 30% at 0% 80%, #06b6d420, transparent),
                #020617;
            background-attachment: fixed;
        }
        
        /* Glassmorphism */
        .glass-card {
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        .glass-card:hover {
            background: rgba(15, 23, 42, 0.7);
            border-color: ${accent}40;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${accent}15;
        }
        
        /* Link Cards */
        .link-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 18px;
            border-radius: 16px;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
        }
        .link-card:hover {
            transform: translateY(-3px) scale(1.01);
            background: rgba(15, 23, 42, 0.7);
            border-color: ${accent}50;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 25px ${accent}20;
        }
        .link-card:active {
            transform: scale(0.98);
        }
        
        /* Animations */
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.5s ease-out forwards; }
        .animation-delay-100 { animation-delay: 100ms; }
        
        /* Mobile touch feedback */
        @media (hover: none) {
            .link-card:active, .glass-card:active {
                transform: scale(0.97);
                opacity: 0.9;
            }
        }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${accent}40; border-radius: 4px; }
    </style>
</head>
<body class="bg-mesh text-slate-200 min-h-screen relative overflow-x-hidden selection:bg-gold selection:text-black">
    <!-- Background Image Layer -->
    ${bio.bgImage ? `<div class="fixed inset-0 bg-cover bg-center opacity-15 z-0" style="background-image: url('${bio.bgImage}')"></div>` : ''}
    
    <!-- Gradient Overlay -->
    <div class="fixed inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark z-0 pointer-events-none"></div>

    <main class="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col items-center py-10 px-5">
        
        <!-- Top Controls -->
        <div class="absolute top-5 right-5 flex gap-3 text-white/40">
             <button class="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-white transition-colors" aria-label="Toggle theme">
                 <i class="fa-solid fa-moon text-sm"></i>
             </button>
             <button class="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:text-white transition-colors" aria-label="Share">
                 <i class="fa-solid fa-share-nodes text-sm"></i>
             </button>
        </div>

        ${mainContent}

        <!-- Footer Social -->
        <footer class="mt-12 flex gap-5 text-slate-500">
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300"><i class="fa-brands fa-linkedin"></i></a>
        </footer>
        <p class="mt-6 text-[9px] text-slate-600 uppercase tracking-widest opacity-40">Powered by Webmini</p>

    </main>

    <!-- Floating WhatsApp -->
    <a href="${waHref}" target="_blank" rel="noopener" style="display: ${waDisplay}" class="fixed bottom-5 right-5 w-14 h-14 bg-[#25D366] rounded-full shadow-xl shadow-green-900/50 flex items-center justify-center text-white text-2xl hover:scale-110 active:scale-95 transition-transform animate-glow z-50" aria-label="WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
    </a>
</body>
</html>`;
}

function downloadBioSite() {
    const fullHtml = generateBioHTML();
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bio-${appState.bio.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
}


// --- LOCAL PLATFORM INTEGRATION ---
const publishModal = document.getElementById('publish-modal');
const siteSlugInput = document.getElementById('site-slug');
const publishStatus = document.getElementById('publish-status');

window.openPublishModal = function () {
    publishModal.classList.remove('hidden');
    const savedSlug = localStorage.getItem('site_slug');
    if (savedSlug) siteSlugInput.value = savedSlug;
}

window.closePublishModal = function () {
    publishModal.classList.add('hidden');
    publishStatus.style.display = 'none';
}

window.publishToPlatform = async function () {
    const slug = siteSlugInput.value.trim();

    if (!slug) {
        alert("Escolha um nome para seu link!");
        return;
    }

    // Validate slug (simple check)
    if (!/^[a-z0-9-]+$/i.test(slug)) {
        alert("Use apenas letras, números e traços. Sem espaços ou acentos.");
        return;
    }

    localStorage.setItem('site_slug', slug);

    const btn = document.getElementById('publish-action-btn');
    const originalText = btn.innerText;
    btn.innerText = "⏳ Publicando...";
    btn.disabled = true;
    btn.style.opacity = "0.7";
    publishStatus.style.display = 'block';

    function updateStatus(msg, color = '#3b82f6') {
        publishStatus.innerHTML = msg;
        publishStatus.style.color = color;
        publishStatus.style.border = `1px solid ${color}`;
    }

    try {
        updateStatus("Gerando site...");
        const htmlContent = generateBioHTML();

        updateStatus("Enviando para o servidor...");

        // Call Layout Backend
        const response = await fetch('http://localhost:3000/api/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, content: htmlContent })
        });

        if (!response.ok) throw new Error("Erro na conexão com servidor.");

        const data = await response.json();

        if (!data.success) throw new Error(data.error || "Erro desconhecido");

        // Success
        updateStatus(`
            <div style="display:flex; flex-direction:column; gap:8px;">
                <span style="font-weight:bold; font-size:1.1rem;">✅ Sucesso! Site online.</span>
                <a href="${data.url}" target="_blank" style="padding:10px; background:#10B981; color:white; border-radius:6px; text-decoration:none; font-weight:bold; margin-top:5px;">
                    🔗 Abrir Meu Link
                </a>
                <small style="color:#666;">Site salvo em: ./sites/${slug}.html</small>
            </div>
        `, '#10B981');

        btn.innerText = "✅ Publicado";
        setTimeout(() => { btn.innerText = originalText; btn.disabled = false; btn.style.opacity = "1"; }, 3000);

    } catch (err) {
        console.error(err);
        updateStatus(`❌ Erro: ${err.message}<br><small style="color:white;">Verifique se o backend está rodando ("npm start")</small>`, '#ef4444');
        btn.innerText = originalText;
        btn.disabled = false;
        btn.style.opacity = "1";
    }
}


// Global Toggle for Preview
window.toggleTheme = function () {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Start
init();
