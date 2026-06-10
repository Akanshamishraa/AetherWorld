
const WORLDS_DATABASE = {
    cyberpunk: {
        id: "cyberpunk",
        title: "Neo-Tokyo 2099",
        dim: "D-2099",
        tag: "CYBERPUNK",
        image: "assets/images/cyberpunk.png",
        lore: "A sprawling cyber-metropolis illuminated by vertical neon advertising corridors and constant acid rain. Hover-traffic streams between titanium towers, while the undercity runs on black-market cyberware and retro-tech grids.",
        prompt: "A stunning neon-lit rainy cyberpunk street at night, towering skyscrapers with glowing holographic ads, flying cars leaving light trails, highly detailed digital art, cinematic lighting, octane render, 8k.",
        enhancedPrompt: "A stunning neon-lit rainy cyberpunk street at night, towering skyscrapers with glowing holographic ads, flying cars leaving light trails, highly detailed digital art, cinematic lighting, octane render, 8k, ray tracing, volumetric fog, cyberpunk core, photorealistic, hyper-detailed, trending on ArtStation.",
        seed: "481023791",
        ratio: "1:1",
        steps: "30"
    },
    fantasy: {
        id: "fantasy",
        title: "Aetheria Sky Citadel",
        dim: "F-7002",
        tag: "HIGH FANTASY",
        image: "assets/images/fantasy.png",
        lore: "A majestic citadel constructed from ancient levitating crystals, floating high above a sea of endless clouds. Cascading waterfalls spill from the island edges into the open sky as mythical golden-feathered birds soar between spiraling towers.",
        prompt: "A majestic floating crystal citadel in the sky, waterfalls cascading from the floating islands into clouds, magical golden sunset light, mythical birds soaring, high fantasy digital painting, highly detailed, 8k.",
        enhancedPrompt: "A majestic floating crystal citadel in the sky, waterfalls cascading from the floating islands into clouds, magical golden sunset light, mythical birds soaring, high fantasy digital painting, highly detailed, 8k, celestial glow, fantasy concept art, dreamlike, epic scale, photorealistic render.",
        seed: "719304852",
        ratio: "1:1",
        steps: "30"
    },
    steampunk: {
        id: "steampunk",
        title: "Clockwork Sky Port",
        dim: "S-1888",
        tag: "STEAMPUNK",
        image: "assets/images/steampunk.png",
        lore: "A massive brass and copper sky port perched atop a soot-laden mountain range. Massive clockwork airships dock at steam-filled ports, releasing warm glowing industrial gas as gears grind and mechanical lifts transport cargo through the haze.",
        prompt: "A massive brass and copper clockwork airship docking at a Victorian-era sky port, gears and smoke escaping, glowing industrial lanterns, warm sunset lighting, highly detailed steampunk digital art, 8k.",
        enhancedPrompt: "A massive brass and copper clockwork airship docking at a Victorian-era sky port, gears and smoke escaping, glowing industrial lanterns, warm sunset lighting, highly detailed steampunk digital art, 8k, vintage warm color grading, industrial machinery, intricate design, hyper-detailed, unreal engine 5 render.",
        seed: "198837402",
        ratio: "1:1",
        steps: "35"
    },
    bioluminescent: {
        id: "bioluminescent",
        title: "Lumira Deep Abyss",
        dim: "B-8809",
        tag: "BIOLUMINESCENT",
        image: "assets/images/bioluminescent.png",
        lore: "A glowing underwater alien forest situated on a distant aquatic world. Dense bioluminescent coral structures emit soft cyan, magenta, and emerald light, while ethereal jellyfish-like organisms navigate the dark, mysterious marine currents.",
        prompt: "A glowing underwater alien forest, bioluminescent coral reef emitting neon blue, green, and pink light, alien jellyfish and fish swimming, deep sea atmosphere, surreal digital art, highly detailed, 8k.",
        enhancedPrompt: "A glowing underwater alien forest, bioluminescent coral reef emitting neon blue, green, and pink light, alien jellyfish and fish swimming, deep sea atmosphere, surreal digital art, highly detailed, 8k, sub-surface scattering, ethereal glow, photorealistic ocean floor, bioluminescent organisms, award-winning lighting.",
        seed: "660291738",
        ratio: "1:1",
        steps: "40"
    },
    solarpunk: {
        id: "solarpunk",
        title: "Ecotopia Oasis",
        dim: "E-4010",
        tag: "SOLARPUNK",
        image: "assets/images/solarpunk.png",
        lore: "A sustainable utopian city built in harmony with nature. Gleaming white eco-friendly skyscrapers are covered with hanging vertical gardens, solar collectors shaped like natural tree leaves, and clear rushing streams winding between parks.",
        prompt: "A lush solarpunk oasis city, eco-friendly modern white architecture integrated with hanging gardens, winding streams, solar leaf energy collectors, bright sunlight, clean futures, highly detailed, 8k.",
        enhancedPrompt: "A lush solarpunk oasis city, eco-friendly modern white architecture integrated with hanging gardens, winding streams, solar leaf energy collectors, bright sunlight, clean futures, highly detailed, 8k, architectural visualization, green ecology, optimistic future, bright volumetric rays, photorealistic.",
        seed: "330491823",
        ratio: "1:1",
        steps: "30"
    },
    cosmic: {
        id: "cosmic",
        title: "The Celestial Forge",
        dim: "C-0001",
        tag: "COSMIC FORGE",
        image: "assets/images/cosmic.png",
        lore: "A cosmic space structure built around a dying star. Swirling clouds of colorful nebula dust and planetary rings orbit a blinding plasma core, where cosmic energy is harnessed to forge stellar matter in deep outer space.",
        prompt: "An epic cosmic forge in deep space, swirling colorful nebula dust clouds, stars and planetary rings, bright hot plasma glowing at the center of a celestial structure, high resolution sci-fi digital art, 8k.",
        enhancedPrompt: "An epic cosmic forge in deep space, swirling colorful nebula dust clouds, stars and planetary rings, bright hot plasma glowing at the center of a celestial structure, high resolution sci-fi digital art, 8k, astronomical imagery, cosmic horror element, interstellar scale, glowing particles, hyperrealistic.",
        seed: "900827361",
        ratio: "1:1",
        steps: "45"
    }
};

// 2. Application State
let appState = {
    activeTab: "worldbuilder",
    selectedWorld: "cyberpunk", // Current world on Map
    selectedStyle: "cyberpunk", // Current style in Workspace
    selectedRatio: "1:1",
    guidanceScale: 7.5,
    steps: 30,
    seed: "",
    isGenerating: false,
    promptEnhancer: false
};

// 3. Initialize DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initWorldbuilderMap();
    initWorkspaceControls();
    initGallery();
    initModals();
    
    // Draw initial lines on the constellation map
    setTimeout(drawConstellationLines, 500);
    window.addEventListener("resize", drawConstellationLines);
});

// ==========================================================================
// NAVIGATION TABS CONTROL
// ==========================================================================
function initTabs() {
    const tabs = document.querySelectorAll(".nav-tab");
    const panels = document.querySelectorAll(".tab-panel");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetTab = tab.getAttribute("data-tab");
            
            // Switch tabs
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            // Switch panels
            panels.forEach(p => p.classList.remove("active"));
            document.getElementById(`panel-${targetTab}`).classList.add("active");
            
            appState.activeTab = targetTab;
            
            // Trigger redrawing of SVG lines if switching to worldbuilder
            if (targetTab === "worldbuilder") {
                setTimeout(drawConstellationLines, 100);
            }
        });
    });
}

// ==========================================================================
// WORLD BUILDER - CONSTELLATION MAP
// ==========================================================================
function initWorldbuilderMap() {
    const nodes = document.querySelectorAll(".map-node");
    
    nodes.forEach(node => {
        node.addEventListener("click", () => {
            const worldId = node.getAttribute("data-world");
            
            // Set active node class
            nodes.forEach(n => n.classList.remove("active"));
            node.classList.add("active");
            
            appState.selectedWorld = worldId;
            updateWorldInfoPanel(worldId);
            
            // Re-render lines to highlight the path connected to active node
            drawConstellationLines();
        });
    });

    // Load world in workspace button
    const loadBtn = document.getElementById("btn-load-in-workspace");
    loadBtn.addEventListener("click", () => {
        const worldData = WORLDS_DATABASE[appState.selectedWorld];
        
        // Populate Workspace
        const promptArea = document.getElementById("workspace-prompt");
        promptArea.value = worldData.prompt;
        
        // Select Style Card
        const styleCards = document.querySelectorAll(".style-card");
        styleCards.forEach(card => {
            if (card.getAttribute("data-style") === worldData.id) {
                card.classList.add("active");
                appState.selectedStyle = worldData.id;
            } else {
                card.classList.remove("active");
            }
        });

        // Set Seed
        const seedInput = document.getElementById("input-seed");
        seedInput.value = worldData.seed;
        appState.seed = worldData.seed;
        document.getElementById("val-seed-auto").textContent = worldData.seed;

        // Set Steps
        const stepsSlider = document.getElementById("slider-steps");
        stepsSlider.value = worldData.steps;
        appState.steps = parseInt(worldData.steps);
        document.getElementById("val-steps").textContent = worldData.steps;

        // Auto-switch to Workspace tab
        document.getElementById("tab-workspace").click();
        
        showToast(`Loaded ${worldData.title} settings into workspace!`);
    });

    // Copy Prompt on Info Panel
    const copyPromptBtn = document.getElementById("btn-copy-info-prompt");
    copyPromptBtn.addEventListener("click", () => {
        const promptText = document.getElementById("info-world-prompt").textContent;
        navigator.clipboard.writeText(promptText)
            .then(() => showToast("Art prompt copied to clipboard!"))
            .catch(err => console.error("Clipboard error: ", err));
    });
}

function updateWorldInfoPanel(worldId) {
    const world = WORLDS_DATABASE[worldId];
    if (!world) return;

    const img = document.getElementById("info-world-img");
    const title = document.getElementById("info-world-title");
    const tag = document.getElementById("info-world-tag");
    const lore = document.getElementById("info-world-lore");
    const prompt = document.getElementById("info-world-prompt");
    const dim = document.getElementById("info-world-dim");

    // Smooth fade transition for image
    img.style.opacity = 0;
    setTimeout(() => {
        img.src = world.image;
        img.style.opacity = 1;
    }, 200);

    title.textContent = world.title;
    tag.textContent = world.tag;
    lore.textContent = world.lore;
    prompt.textContent = world.prompt;
    dim.textContent = world.dim;
}

// Draw connection lines in a network web
function drawConstellationLines() {
    const map = document.getElementById("constellation-map");
    const svg = document.getElementById("connections-svg");
    if (!map || !svg) return;

    // Clear existing lines
    svg.innerHTML = '';

    const nodes = Array.from(document.querySelectorAll(".map-node"));
    if (nodes.length === 0) return;

    // Connect nodes in a pre-defined layout ring & center
    // Let's connect them: Cyberpunk(0) -> Cosmic(5) -> Fantasy(1) -> Bioluminescent(3) -> Solarpunk(4) -> Steampunk(2) -> Cyberpunk(0)
    // Also cross connections to Cosmic(5)
    const connections = [
        [0, 5], [5, 1], [1, 3], [3, 4], [4, 2], [2, 0], // Outer Loop + Center
        [5, 2], [5, 3], [5, 4] // Cross connections
    ];

    const mapRect = map.getBoundingClientRect();

    connections.forEach(([fromIdx, toIdx]) => {
        const fromNode = nodes[fromIdx];
        const toNode = nodes[toIdx];

        if (!fromNode || !toNode) return;

        // Get coordinates relative to the map grid
        const fromX = fromNode.offsetLeft;
        const fromY = fromNode.offsetTop;
        const toX = toNode.offsetLeft;
        const toY = toNode.offsetTop;

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", fromX);
        line.setAttribute("y1", fromY);
        line.setAttribute("x2", toX);
        line.setAttribute("y2", toY);
        
        // Highlight connections linked to the active node
        const activeWorld = appState.selectedWorld;
        const fromWorld = fromNode.getAttribute("data-world");
        const toWorld = toNode.getAttribute("data-world");

        if (fromWorld === activeWorld || toWorld === activeWorld) {
            line.setAttribute("class", "connection-line active");
        } else {
            line.setAttribute("class", "connection-line");
        }

        svg.appendChild(line);
    });
}

// ==========================================================================
// WORKSPACE GENERATOR CONTROLS
// ==========================================================================
function initWorkspaceControls() {
    // Style presets selector
    const styleCards = document.querySelectorAll(".style-card");
    styleCards.forEach(card => {
        card.addEventListener("click", () => {
            styleCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
            appState.selectedStyle = card.getAttribute("data-style");
            
            // Auto populate input if empty
            const promptArea = document.getElementById("workspace-prompt");
            if (!promptArea.value.trim()) {
                promptArea.value = WORLDS_DATABASE[appState.selectedStyle].prompt;
            }
        });
    });

    // Toggle Advanced accordion
    const advToggle = document.getElementById("advanced-toggle");
    const advContent = document.getElementById("advanced-content");
    advToggle.addEventListener("click", () => {
        advToggle.classList.toggle("open");
        advContent.classList.toggle("open");
    });

    // Ratio selectors
    const ratioBtns = document.querySelectorAll(".ratio-btn");
    ratioBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            ratioBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            appState.selectedRatio = btn.getAttribute("data-ratio");
            document.getElementById("val-ratio").textContent = `${appState.selectedRatio} (${appState.selectedRatio === '16:9' ? 'Landscape' : appState.selectedRatio === '9:16' ? 'Portrait' : 'Square'})`;
        });
    });

    // CFG scale slider
    const cfgSlider = document.getElementById("slider-cfg");
    cfgSlider.addEventListener("input", (e) => {
        appState.guidanceScale = parseFloat(e.target.value);
        document.getElementById("val-cfg").textContent = appState.guidanceScale.toFixed(1);
    });

    // Steps slider
    const stepsSlider = document.getElementById("slider-steps");
    stepsSlider.addEventListener("input", (e) => {
        appState.steps = parseInt(e.target.value);
        document.getElementById("val-steps").textContent = appState.steps;
    });

    // Seed input
    const seedInput = document.getElementById("input-seed");
    seedInput.addEventListener("input", (e) => {
        appState.seed = e.target.value;
        const autoSeedLabel = document.getElementById("val-seed-auto");
        if (e.target.value.trim() === "") {
            autoSeedLabel.textContent = "Random";
            autoSeedLabel.classList.add("text-muted");
        } else {
            autoSeedLabel.textContent = e.target.value;
            autoSeedLabel.classList.remove("text-muted");
        }
    });

    // AI Enhancer switch
    const enhancerToggle = document.getElementById("toggle-enhancer");
    enhancerToggle.addEventListener("change", (e) => {
        appState.promptEnhancer = e.target.checked;
        const promptArea = document.getElementById("workspace-prompt");
        
        if (appState.promptEnhancer && promptArea.value.trim()) {
            // Check if user has prompt matching standard prompt. Expand it.
            const currentVal = promptArea.value.trim();
            // Find if there is a match in our db, load enhanced prompt instead
            let matched = false;
            for (let style in WORLDS_DATABASE) {
                if (currentVal === WORLDS_DATABASE[style].prompt) {
                    promptArea.value = WORLDS_DATABASE[style].enhancedPrompt;
                    matched = true;
                    break;
                }
            }
            
            if (!matched) {
                // Generic expand
                promptArea.value = `${currentVal}, highly detailed, cinematic lighting, 8k resolution, photorealistic render, octane engine render, dramatic environment concept art.`;
            }
            showToast("Prompt expanded with AI style tokens!");
        } else if (!appState.promptEnhancer) {
            // Restore simpler prompt if matched
            const currentVal = promptArea.value.trim();
            for (let style in WORLDS_DATABASE) {
                if (currentVal === WORLDS_DATABASE[style].enhancedPrompt) {
                    promptArea.value = WORLDS_DATABASE[style].prompt;
                    break;
                }
            }
        }
    });

    // Click GENERATE button
    const generateBtn = document.getElementById("btn-generate");
    generateBtn.addEventListener("click", () => {
        const promptArea = document.getElementById("workspace-prompt");
        if (!promptArea.value.trim()) {
            showToast("Please enter a visual prompt first!");
            promptArea.focus();
            return;
        }
        
        startGenerationSequence(promptArea.value.trim());
    });
}

// ==========================================================================
// MOCK GENERATION SIMULATION PIPELINE
// ==========================================================================
function startGenerationSequence(userPrompt) {
    if (appState.isGenerating) return;
    appState.isGenerating = true;

    // Select Canvas panels
    const stateEmpty = document.getElementById("state-empty");
    const stateGenerating = document.getElementById("state-generating");
    const stateComplete = document.getElementById("state-complete");
    
    // Switch state view
    stateEmpty.classList.remove("active");
    stateComplete.classList.remove("active");
    stateGenerating.classList.add("active");

    // Reset progress bar & terminal
    const progressBar = document.getElementById("generation-progress");
    const progressText = document.getElementById("progress-percentage");
    const terminal = document.getElementById("terminal-logs");
    
    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    terminal.innerHTML = "";

    // Generate random seed if not set
    const finalSeed = appState.seed.trim() || Math.floor(Math.random() * 999999999).toString();
    const styleDb = WORLDS_DATABASE[appState.selectedStyle] || WORLDS_DATABASE.cyberpunk;

    // Pipeline generation logs sequences
    const stepsCount = appState.steps;
    const logTimeline = [
        { progress: 0, text: `[SYS] Booting diffusion model... Latents initialized.` },
        { progress: 8, text: `[SYS] Loaded weights for Style Preset: ${styleDb.tag}.` },
        { progress: 15, text: `[PROMPT] Enhancing input vectors: "${userPrompt.slice(0, 45)}..."` },
        { progress: 22, text: `[SAMPLER] Sampler: Euler A | CFG Scale: ${appState.guidanceScale} | Seed: ${finalSeed}` },
        { progress: 30, text: `[DIFFUSION] Denoising latent space: step 1/${stepsCount}...` },
        { progress: 45, text: `[DIFFUSION] Denoising latent space: step ${Math.floor(stepsCount/3)}/${stepsCount}...` },
        { progress: 60, text: `[DIFFUSION] Denoising latent space: step ${Math.floor(stepsCount*2/3)}/${stepsCount}...` },
        { progress: 75, text: `[DIFFUSION] Denoising latent space: step ${stepsCount}/${stepsCount}...` },
        { progress: 85, text: `[DECODER] VAE Decoder running... Translating latents to high-res canvas.` },
        { progress: 95, text: `[SYS] Generation success. Finalizing color space mapping.` },
        { progress: 100, text: `[SYS] Complete. Rendered output dimensions in ${appState.selectedRatio}.` }
    ];

    let logIndex = 0;
    
    // Animate loading progress
    const progressInterval = setInterval(() => {
        let currentWidth = parseInt(progressBar.style.width) || 0;
        
        if (currentWidth < 100) {
            currentWidth += 2;
            progressBar.style.width = `${currentWidth}%`;
            progressText.textContent = `${currentWidth}%`;
            
            // Check if we need to write logs in timeline
            if (logIndex < logTimeline.length && currentWidth >= logTimeline[logIndex].progress) {
                const log = logTimeline[logIndex];
                const line = document.createElement("div");
                line.className = "log-line";
                if (log.text.startsWith("[SYS]")) line.classList.add("system");
                line.textContent = log.text;
                terminal.appendChild(line);
                terminal.scrollTop = terminal.scrollHeight;
                logIndex++;
            }
        } else {
            clearInterval(progressInterval);
            finishGeneration(userPrompt, finalSeed, styleDb);
        }
    }, 80); // Total generation time roughly 4 seconds (50 steps * 80ms)
}

function finishGeneration(promptText, seed, worldData) {
    appState.isGenerating = false;

    // Set UI outputs
    const outputImg = document.getElementById("output-img");
    const container = document.getElementById("output-canvas-container");
    const title = document.getElementById("output-meta-title");
    const prompt = document.getElementById("output-meta-prompt");
    
    const badgeStyle = document.getElementById("output-badge-style");
    const badgeRatio = document.getElementById("output-badge-ratio");
    const badgeSeed = document.getElementById("output-badge-seed");

    // Load correct image
    outputImg.src = worldData.image;

    // Apply aspect ratio class
    container.className = "output-canvas-container"; // reset
    if (appState.selectedRatio === "16:9") {
        container.classList.add("ratio-16-9");
    } else if (appState.selectedRatio === "9:16") {
        container.classList.add("ratio-9-16");
    }

    title.textContent = `${worldData.title} Output`;
    prompt.textContent = promptText;
    
    badgeStyle.textContent = `Style: ${worldData.tag}`;
    badgeRatio.textContent = `Ratio: ${appState.selectedRatio}`;
    badgeSeed.textContent = `Seed: ${seed}`;

    // Switch view
    document.getElementById("state-generating").classList.remove("active");
    document.getElementById("state-complete").classList.add("active");

    // Add generated image to top of Gallery dynamically!
    addNewGalleryItem(worldData.title, promptText, worldData.image, worldData.id, seed);
    
    showToast("Visual world rendered successfully!");

    // Wire output canvas action buttons
    document.getElementById("btn-zoom").onclick = () => openZoomModal(worldData.image, worldData.title, promptText);
    
    document.getElementById("btn-copy-seed").onclick = () => {
        const metadata = `Prompt: ${promptText}\nStyle: ${worldData.tag}\nRatio: ${appState.selectedRatio}\nSeed: ${seed}\nSteps: ${appState.steps}`;
        navigator.clipboard.writeText(metadata)
            .then(() => showToast("Generation metadata copied to clipboard!"))
            .catch(err => console.error(err));
    };

    document.getElementById("btn-download").onclick = () => {
        const a = document.createElement("a");
        a.href = worldData.image;
        a.download = `${worldData.id}-render-${seed}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast("Image download initiated!");
    };
}

// ==========================================================================
// ART GALLERY
// ==========================================================================
let galleryItems = [
    { title: "Neo-Tokyo Alleyways", category: "cyberpunk", image: "assets/images/cyberpunk.png", prompt: "A stunning neon-lit rainy cyberpunk street at night, towering skyscrapers with glowing holographic ads, flying cars leaving light trails, highly detailed digital art, cinematic lighting, octane render, 8k.", seed: "481023791" },
    { title: "Aetheria Sky Towers", category: "fantasy", image: "assets/images/fantasy.png", prompt: "A majestic floating crystal citadel in the sky, waterfalls cascading from the floating islands into clouds, magical golden sunset light, mythical birds soaring, high fantasy digital painting, highly detailed, 8k.", seed: "719304852" },
    { title: "Docking of the Skyfleet", category: "steampunk", image: "assets/images/steampunk.png", prompt: "A massive brass and copper clockwork airship docking at a Victorian-era sky port, gears and smoke escaping, glowing industrial lanterns, warm sunset lighting, highly detailed steampunk digital art, 8k.", seed: "198837402" },
    { title: "Bioluminescent Forest", category: "bioluminescent", image: "assets/images/bioluminescent.png", prompt: "A glowing underwater alien forest, bioluminescent coral reef emitting neon blue, green, and pink light, alien jellyfish and fish swimming, deep sea atmosphere, surreal digital art, highly detailed, 8k.", seed: "660291738" },
    { title: "Ecotopia Waterfalls", category: "solarpunk", image: "assets/images/solarpunk.png", prompt: "A lush solarpunk oasis city, eco-friendly modern white architecture integrated with hanging gardens, winding streams, solar leaf energy collectors, bright sunlight, clean futures, highly detailed, 8k.", seed: "330491823" },
    { title: "The Cosmic Core", category: "cosmic", image: "assets/images/cosmic.png", prompt: "An epic cosmic forge in deep space, swirling colorful nebula dust clouds, stars and planetary rings, bright hot plasma glowing at the center of a celestial structure, high resolution sci-fi digital art, 8k.", seed: "900827361" }
];

function initGallery() {
    renderGallery("all");

    // Filter Buttons
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const category = btn.getAttribute("data-filter");
            renderGallery(category);
        });
    });
}

function renderGallery(filter = "all") {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    grid.innerHTML = "";
    
    const filtered = filter === "all" ? galleryItems : galleryItems.filter(item => item.category === filter);

    filtered.forEach(item => {
        const card = createGalleryCard(item);
        grid.appendChild(card);
    });
}

function createGalleryCard(item) {
    const el = document.createElement("div");
    el.className = `gallery-item`;
    el.setAttribute("data-category", item.category);

    el.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
            <h4 class="gallery-item-title">${item.title}</h4>
            <p class="gallery-item-prompt">${item.prompt}</p>
            <div class="gallery-meta-row">
                <span class="gallery-tag">${item.category.toUpperCase()}</span>
                <span class="gallery-tag" style="border-color:var(--cyan);color:var(--cyan)">SEED: ${item.seed}</span>
            </div>
        </div>
    `;

    // Click item open modal zoom
    el.addEventListener("click", () => {
        openZoomModal(item.image, item.title, item.prompt);
    });

    return el;
}

function addNewGalleryItem(title, prompt, image, category, seed) {
    // Check if item already exists in gallery list (don't duplicate if identical seed)
    if (galleryItems.some(i => i.seed === seed)) return;

    const newItem = { title, category, image, prompt, seed };
    
    // Add to start of array
    galleryItems.unshift(newItem);
    
    // Re-render gallery if currently on active filter
    const activeFilterBtn = document.querySelector(".filter-btn.active");
    const currentFilter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
    
    if (currentFilter === "all" || currentFilter === category) {
        renderGallery(currentFilter);
    }
}

// ==========================================================================
// ZOOM FULLSCREEN MODAL
// ==========================================================================
function initModals() {
    const modal = document.getElementById("zoom-modal");
    const closeBtn = document.getElementById("modal-close-btn");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Click outside image to close
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

function openZoomModal(imgSrc, title, promptText) {
    const modal = document.getElementById("zoom-modal");
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("modal-caption");

    modalImg.src = imgSrc;
    caption.innerHTML = `<strong>${title}</strong> — <em>${promptText}</em>`;
    
    modal.classList.add("active");
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add("active");

    // Clear previous timeout if already active
    if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
    }

    toast.timeoutId = setTimeout(() => {
        toast.classList.remove("active");
    }, 2500);
}
