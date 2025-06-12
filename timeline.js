document.addEventListener('DOMContentLoaded', function() {
    // --- 1. DATOS DE LA EXPERIENCIA LABORAL ---
    // Definimos todos los datos aquí para que sea más fácil de gestionar.
    const jobsData = [
        {
            id: 'edu2', // new master's degree
            company: 'Universidad Antonio de Nebrija',
            location: 'Madrid',
            title: 'Máster: Lingüística Aplicada a la Enseñanza del Español como Lengua Extranjera',
            startDate: '2014-09',
            endDate: '2016-06',
            tasks: [
                'Specialization in lexicon acquisition.',
                'Focused on the use of ICT in teaching Spanish as a Foreign Language.'
            ]
        },
        {
            id: 'edu1', // new undergraduate degree
            company: 'Universidad de Salamanca',
            location: 'Salamanca, España',
            title: 'Filología Hispánica',
            startDate: '2008-01',
            endDate: '2008-06',
            tasks: [
                'Completed undergraduate studies in Hispanic Philology.'
            ]
        },
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

    // --- 2. NEW TIMELINE RENDERING ---
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        // Clear any existing content
        timelineContainer.innerHTML = '';

        // Define the timeline range
        const startYear = 2025;
        const endYear = 2008;
        const totalYears = startYear - endYear;

        // Create the main wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'timeline-wrapper';

        // Create the axis line
        const axis = document.createElement('div');
        axis.className = 'timeline-axis';
        wrapper.appendChild(axis);

        // Create year markers
        const yearsContainer = document.createElement('div');
        yearsContainer.className = 'timeline-years';
        for (let i = 0; i <= totalYears; i++) {
            const year = startYear - i;
            const yearEl = document.createElement('div');
            yearEl.className = 'timeline-year';
            yearEl.textContent = year;
            yearsContainer.appendChild(yearEl);
        }
        wrapper.appendChild(yearsContainer);

        // Create job/event markers
        const markersContainer = document.createElement('div');
        markersContainer.className = 'timeline-markers';

        // Helper function to convert a date to a percentage of the timeline
        const dateToPercentage = (dateStr) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth(); // 0-11
            const timeIntoYear = month / 12;
            const totalTime = (year + timeIntoYear) - endYear;
            // We calculate position from the right, as time goes backwards
            return 100 - ((totalTime / totalYears) * 100);
        };

        jobsData.forEach(job => {
            const end = job.endDate === 'Presente' ? '2025-06-12' : job.endDate; // Use current date for "Presente"
            const start = job.startDate;

            const leftPos = dateToPercentage(end);
            const rightPos = dateToPercentage(start);
            const width = rightPos - leftPos;

            const marker = document.createElement('div');
            marker.className = 'job-marker';
            marker.dataset.jobId = job.id; // Link to the job data
            marker.style.left = `${leftPos}%`;
            marker.style.width = `${width}%`;

            const startDisplayYear = new Date(start).getFullYear();
            const endDisplayYear = job.endDate === 'Presente' ? 'Presente' : new Date(end).getFullYear();

            marker.innerHTML = `
                <span class="marker-title">${job.title}</span>
                <span class="marker-period">${startDisplayYear} - ${endDisplayYear}</span>
            `;
            markersContainer.appendChild(marker);
        });

        wrapper.appendChild(markersContainer);
        timelineContainer.appendChild(wrapper);

        // Re-link the click event to the new markers
        timelineContainer.addEventListener('click', function(event) {
            const marker = event.target.closest('.job-marker');
            if (!marker) return;

            const jobId = marker.dataset.jobId;
            const jobData = jobsData.find(j => j.id === jobId);

            if (jobData) {
                const modal = document.getElementById('timeline-modal');
                const modalContent = modal.querySelector('.modal-card-content');
                const endDisplayYear = jobData.endDate === 'Presente' ? 'Presente' : new Date(jobData.endDate).getFullYear();
                
                modalContent.innerHTML = `
                    <h3>${jobData.company}</h3>
                    <p class="job-location">${jobData.location}</p>
                    <p class="job-title">${jobData.title}</p>
                    <p class="job-date">${new Date(jobData.startDate).getFullYear()} - ${endDisplayYear}</p>
                    <ul>
                        ${jobData.tasks.map(task => `<li>${task}</li>`).join('')}
                    </ul>
                `;
                modal.classList.add('visible');
            }
        });
    }


    // --- 3. LÓGICA DE LA VENTANA MODAL (Modified slightly) ---
    // The click logic is now inside the rendering block to ensure it's attached after elements are created.
    // We only need the closing logic here.
    const modal = document.getElementById('timeline-modal');
    if (modal) {
        const closeModalButton = modal.querySelector('.modal-close');
        
        function closeModal() {
            modal.classList.remove('visible');
        }

        closeModalButton.addEventListener('click', closeModal);
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});
