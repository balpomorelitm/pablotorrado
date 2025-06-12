document.addEventListener('DOMContentLoaded', function() {
    // --- 1. DATOS DE LA EXPERIENCIA LABORAL ---
    // Definimos todos los datos aquí para que sea más fácil de gestionar.
    const jobsData = [
        {
            id: 'job7',
            company: 'Universidad de Hong Kong',
            location: 'Hong Kong',
            title: 'Profesor de español y Coordinador',
            startDate: '2020-08',
            endDate: 'Presente', // Usar 'Presente' para trabajos actuales
            tasks: [
                'Profesor en diversas asignaturas optativas y troncales.',
                'Coordinador de las asignaturas SPAN1001 y SPAN1002.',
                'Diseño y ejecución de un currículo de español especializado para diversas necesidades de aprendizaje.'
            ]
        },
        {
            id: 'job6',
            company: 'Food and Agricultural Organization (FAO)',
            location: 'Tailandia',
            title: 'Profesor de español',
            startDate: '2019-05',
            endDate: '2019-12',
            tasks: [
                'Enseñanza de español para grupos, niveles A1 a B1.',
                'Clases dirigidas a profesionales de distintos sectores.'
            ]
        },
        {
            id: 'job5',
            company: 'Asia Spirit',
            location: 'Tailandia',
            title: 'Profesor y consultor de español',
            startDate: '2018-01',
            endDate: '2019-12',
            tasks: [
                'Desarrollo de materiales formativos para guías turísticos.',
                'Asesoramiento para mejorar la comunicación con turistas internacionales.'
            ]
        },
        {
            id: 'job3',
            company: 'Universidad Thammasat',
            location: 'Tailandia',
            title: 'Lector AECID',
            startDate: '2016-01',
            endDate: '2020-07',
            tasks: [
                'Desarrollo, ejecución y evaluación de currículos (1200 horas).',
                'Cursos impartidos: español general, conversación, cultura hispana y literatura hispanoamericana.',
                'Implementación de un programa integral de lengua y cultura españolas.'
            ]
        },
        {
            id: 'job4',
            company: 'Linguameeting',
            location: 'En línea',
            title: 'Profesor de Conversación',
            startDate: '2016-06',
            endDate: '2017-12',
            tasks: [
                'Clases de conversación para estudiantes universitarios estadounidenses y australianos.',
                'Sesiones orientadas al uso real del idioma.'
            ]
        },
        {
            id: 'job2',
            company: 'AIL Madrid',
            location: 'Madrid, España',
            title: 'Profesor de español',
            startDate: '2014-01',
            endDate: '2015-12',
            tasks: [
                'Profesor para clases individuales y grupos (341 horas).',
                'Enseñanza a estudiantes de diferentes edades y niveles.'
            ]
        },
        {
            id: 'job1',
            company: 'Universidad de Khon Kaen',
            location: 'Tailandia',
            title: 'Lector AECID',
            startDate: '2009-01',
            endDate: '2012-12',
            tasks: [
                'Desarrollo, ejecución y evaluación de currículos (1200 horas).',
                'Asignaturas: gramática, conversación, lectura, escritura, español para los negocios, cultura hispana y literatura hispanoamericana.'
            ]
        }
    ];

    // --- 2. RENDERIZADO DE LA LÍNEA DE TIEMPO ---
    const timelineContainer = document.getElementById('timeline-v2');
    const today = new Date();
    const endYear = today.getFullYear();
    const startYear = 2009;
    const totalYears = endYear - startYear + 1;

    // Calcular la posición vertical para cada barra para evitar solapamientos
    let verticalPosition = 0;
    const verticalIncrement = 60; // Espacio vertical entre barras (en px)
    const yearHeight = 150; // Altura visual para cada año en la línea de tiempo

    timelineContainer.style.height = `${totalYears * yearHeight}px`;

    jobsData.forEach(job => {
        const jobBar = document.createElement('div');
        jobBar.className = 'job-bar';
        jobBar.dataset.jobId = job.id;

        // Calcular fechas
        const jobStartDate = new Date(job.startDate);
        const jobEndDate = (job.endDate === 'Presente') ? today : new Date(job.endDate);

        // Calcular posición y altura
        const topPosition = (jobStartDate.getFullYear() - startYear + (jobStartDate.getMonth() / 12)) * yearHeight;
        const barHeight = (jobEndDate.getTime() - jobStartDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25) * yearHeight;

        jobBar.style.top = `${topPosition}px`;
        jobBar.style.height = `${Math.max(barHeight, 20)}px`; // Altura mínima
        jobBar.style.left = `${verticalPosition}px`;

        jobBar.innerHTML = `
            <div class="job-bar-title">${job.title}</div>
            <div class="job-bar-company">${job.company}</div>
        `;
        
        timelineContainer.appendChild(jobBar);
        
        // Incrementar la posición para la siguiente barra para evitar solapamientos visuales
        verticalPosition += 160;
         if (verticalPosition > 600) { // Resetear para que no se haga demasiado ancho
             verticalPosition = 0;
         }
    });
    
    // Añadir los marcadores de año
    const yearsAxis = document.getElementById('timeline-years');
    for (let i = startYear; i <= endYear; i++) {
        const yearMarker = document.createElement('div');
        yearMarker.className = 'year-marker';
        yearMarker.textContent = i;
        yearMarker.style.top = `${(i - startYear) * yearHeight}px`;
        yearsAxis.appendChild(yearMarker);
    }


    // --- 3. LÓGICA DE LA VENTANA MODAL ---
    const modal = document.getElementById('timeline-modal');
    const modalContent = modal.querySelector('.modal-card-content');
    const closeModalButton = modal.querySelector('.modal-close');

    timelineContainer.addEventListener('click', function(event) {
        const bar = event.target.closest('.job-bar');
        if (!bar) return;

        const jobId = bar.dataset.jobId;
        const jobData = jobsData.find(j => j.id === jobId);

        if (jobData) {
            // Poblar el modal con los datos del trabajo
            modalContent.innerHTML = `
                <h3>${jobData.company}</h3>
                <p class="job-location">${jobData.location}</p>
                <p class="job-title">${jobData.title}</p>
                <p class="job-date">${new Date(jobData.startDate).getFullYear()} - ${jobData.endDate === 'Presente' ? 'Presente' : new Date(jobData.endDate).getFullYear()}</p>
                <ul>
                    ${jobData.tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            `;
            modal.classList.add('visible');
        }
    });

    // Cerrar el modal
    function closeModal() {
        modal.classList.remove('visible');
    }

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) { // Si se hace clic en el fondo
            closeModal();
        }
    });
});
