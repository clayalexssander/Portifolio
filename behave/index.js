/* ======================
  behave/index.js
  - Estrelas
  - Toasts e copiar e-mail
  - Detalhe de projeto com carrossel dark neon
   ======================= */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Estrelas decorativas ---------- */
  const starsContainer = document.getElementById('stars');
  if (starsContainer) {
    for (let i = 0; i < 90; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.opacity = (0.2 + Math.random() * 0.8).toString();
      s.style.transform = `scale(${0.6 + Math.random() * 1.6})`;
      s.style.animationDuration = `${2 + Math.random() * 4}s`;
      starsContainer.appendChild(s);
    }
  }

  /* ---------- Toast / copiar e-mail / external link feedback ---------- */
  const toastEl = document.getElementById('toast');
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 1800);
  }

  // copiar e-mail
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'aclayver100@gmail.com';
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => showToast('E-mail copiado para a área de transferência!')).catch(() => fallbackCopy(email));
      } else {
        fallbackCopy(email);
      }
    });
  }
  function fallbackCopy(text) {
    const tmp = document.createElement('textarea');
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    showToast('E-mail copiado para a área de transferência!');
  }

  // feedback links externos
  document.querySelectorAll('.ext-link').forEach(link => {
    link.addEventListener('click', () => showToast(`Abrindo ${link.dataset.platform}…`));
  });

  /* ---------- Dados dos projetos com cores neon ---------- */
  const projetos = {
    ecofinder: {
      titulo: "Ecofinder",
      cor: "#00ff00",
      descricao: "Sistema inteligente para localização de pontos de reciclagem, com geolocalização, rota otimizada e painel administrativo para monitoramento de coletas.",
      link: "https://github.com/matheuscostar77/EcoFinder_v2",
      techs: ["C#", "MySQL", "Leaflet", "API REST"],
      collabs: ["Prefeitura Municipal", "Voluntários locais"],
      images: [
        "https://picsum.photos/seed/ecof1/1200/700",
        "https://picsum.photos/seed/ecof2/1200/700",
        "https://picsum.photos/seed/ecof3/1200/700"
      ]
    },
    marmitas: {
      titulo: "Distribuição de Marmitas",
      cor: "#ff7300",
      descricao: "Site para análise da distribuição de marmitas. Transforma planilhas CSV em estatísticas rápidas, tabelas e gráficos interativos para iniciativas comunitárias.",
      link: "https://clayalexssander.github.io/AnliseDeDistribuicaoDeMarmitas/",
      techs: ["HTML5", "CSS3", "JavaScript"],
      collabs: ["Igreja local"],
      images: [
        "imagens/DistribuicaoMarmitas/Dm1.png",
        "imagens/DistribuicaoMarmitas/Dm2.png"
      ]
    },
    agede: {
      titulo: "Agede",
      cor: "#ff1616",
      descricao: "Sistema de monitoramento e prevenção de dengue com mapas de calor, alerta e integração com saúde pública.",
      link: "https://seu-projeto-agede.com",
      techs: ["Python", "Flask", "Pandas", "MySQL"],
      collabs: ["Secretaria de Saúde", "Agentes Comunitários"],
      images: [
        "https://picsum.photos/seed/agede1/1200/700",
        "https://picsum.photos/seed/agede2/1200/700",
        "https://picsum.photos/seed/agede3/1200/700"
      ]
    },
    microcalc: {
      titulo: "Microcalc",
      cor: "#45cece",
      descricao: "O Microcalc é um site responsivo que permite ao usuário estimar sua ingestão diária e semanal de microplásticos com base em hábitos pessoais.",
      link: "https://clayalexssander.github.io/Microcalc/",
      techs: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      collabs: ["Orientado por professores"],
      images: [
        "imagens/microcalc/Mc1.png",
        "imagens/microcalc/Mc3.png"
      ]
    },
    thetower: {
      titulo: "TheTowerProject",
      cor: "#2020e2",
      descricao: "Sistema de gestão educacional com controle de notas, matrículas e painel para professores e alunos.",
      link: "https://clayalexssander.github.io/TheTowerProject/landingpage/sistema.html",
      techs: ["C#", ".NET", "MySQL", "Angular"],
      collabs: ["Instituição de Ensino local"],
      images: [
        "https://picsum.photos/seed/tower1/1200/700",
        "https://picsum.photos/seed/tower2/1200/700"
      ]
    }
  };

  /* ---------- Seletores do detalhe/carrossel ---------- */
  const projectDetailEl = document.getElementById('project-detail');
  const projectsContainerEl = document.querySelector('.projects-container');
  const detailTitleEl = document.getElementById('detail-title');
  const detailDescriptionEl = document.getElementById('detail-description');
  const detailLinkEl = document.getElementById('detail-link');
  const detailTechsEl = document.getElementById('detail-techs');
  const detailCollabsEl = document.getElementById('detail-collabs');
  const carouselImageEl = document.getElementById('carousel-image');
  const carouselCaptionEl = document.getElementById('carousel-caption');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const backBtn = document.getElementById('back-button');
  const detailNameBox = document.querySelector('.detail-name-box');

  let currentImages = [];
  let currentIndex = 0;
  let currentProjectKey = null;
  let autoPlayInterval = null;

  function updateCarouselImage() {
    if (!currentImages || currentImages.length === 0) {
      carouselImageEl.src = "https://picsum.photos/seed/placeholder/1200/700";
      carouselImageEl.alt = "Imagem indisponível";
      carouselCaptionEl.textContent = "";
      return;
    }
    const url = currentImages[currentIndex];
    carouselImageEl.src = url;
    carouselImageEl.alt = `Imagem ${currentIndex + 1} - ${detailTitleEl.textContent}`;
    carouselCaptionEl.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  function nextImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateCarouselImage();
  }
  function prevImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateCarouselImage();
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextImage, 4000);
  }
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }

  function openProjectDetail(key) {
    const proj = projetos[key];
    if (!proj) return;

    currentProjectKey = key;
    currentImages = Array.isArray(proj.images) && proj.images.length ? proj.images.slice() : [];
    currentIndex = 0;

    // preencher campos
    detailTitleEl.textContent = proj.titulo;
    detailDescriptionEl.textContent = proj.descricao;
    detailLinkEl.href = proj.link || "#";

    // aplica cor neon respectiva
    projectDetailEl.style.color = proj.cor;
    projectDetailEl.style.setProperty('--project-color', proj.cor);
    detailNameBox.style.color = proj.cor;
    detailLinkEl.style.background = proj.cor;
    detailLinkEl.style.boxShadow = `0 0 20px ${proj.cor}`;
    detailLinkEl.style.color = "#000";

    // tecnologias
    detailTechsEl.innerHTML = '';
    proj.techs.forEach(t => {
      const span = document.createElement('span');
      span.className = 'tech-badge';
      span.textContent = t;
      detailTechsEl.appendChild(span);
    });

    // colaborações
    detailCollabsEl.innerHTML = '';
    proj.collabs.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      detailCollabsEl.appendChild(li);
    });

    updateCarouselImage();

    // mostrar/ocultar views
    projectsContainerEl.classList.add('hidden');
    projectDetailEl.classList.remove('hidden');
    projectDetailEl.setAttribute('aria-hidden', 'false');

    // esconder sidebar
    const sidebarEl = document.querySelector('.sidebar');
    if (sidebarEl) sidebarEl.classList.add('hidden');

    document.body.style.overflow = 'hidden';

    startAutoPlay();
    backBtn.focus();
  }

  function closeProjectDetail() {
    stopAutoPlay();
    projectDetailEl.classList.add('hidden');
    projectDetailEl.setAttribute('aria-hidden', 'true');
    projectsContainerEl.classList.remove('hidden');

    // mostrar sidebar novamente
    const sidebarEl = document.querySelector('.sidebar');
    if (sidebarEl) sidebarEl.classList.remove('hidden');

    document.body.style.overflow = '';

    currentImages = [];
    currentIndex = 0;
    currentProjectKey = null;
  }

  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (backBtn) backBtn.addEventListener('click', () => closeProjectDetail());

  carouselImageEl.addEventListener('click', () => {
    if (autoPlayInterval) {
      stopAutoPlay();
      showToast("Carrossel pausado");
    } else {
      startAutoPlay();
      showToast("Carrossel retomado");
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!projectDetailEl || projectDetailEl.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeProjectDetail();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  document.querySelectorAll('.project-link[data-project]').forEach(a => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      const key = a.dataset.project;
      if (key) openProjectDetail(key);
    });
  });
});
/* ====================== Fim do behave/index.js ======================= */