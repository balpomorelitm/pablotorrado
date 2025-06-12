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
    const timelineContainer = document.querySelector('.timeline-items');

    jobsData.forEach(job => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.dataset.jobId = job.id;

        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        dot.textContent = new Date(job.startDate).getFullYear();

        const card = document.createElement('div');
        card.className = 'cv-card job-card';
        card.innerHTML = `
            <h3>${job.company}</h3>
            <p class="job-location">${job.location}</p>
            <p class="job-title">${job.title}</p>
            <p class="job-date">${new Date(job.startDate).getFullYear()} - ${job.endDate === 'Presente' ? 'Presente' : new Date(job.endDate).getFullYear()}</p>
            <ul>
                ${job.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
        `;

        item.appendChild(dot);
        item.appendChild(card);
        timelineContainer.appendChild(item);
    });


    // --- 3. LÓGICA DE LA VENTANA MODAL ---
    const modal = document.getElementById('timeline-modal');
    const modalContent = modal.querySelector('.modal-card-content');
    const closeModalButton = modal.querySelector('.modal-close');

    timelineContainer.addEventListener('click', function(event) {
        const item = event.target.closest('.timeline-item');
        if (!item) return;

        const jobId = item.dataset.jobId;
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
