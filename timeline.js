document.addEventListener('DOMContentLoaded', function() {
    // --- 1. DATOS DE LA EXPERIENCIA LABORAL ---
    // Definimos todos los datos aquí para que sea más fácil de gestionar.
    const jobsData = [
        {
            id: 'edu2',
            company: 'Universidad Antonio de Nebrija',
            location: 'Madrid, España',
            title: 'Máster: Lingüística Aplicada',
            startDate: '2014-09',
            endDate: '2016-06',
            tasks: [
                'Specialization in lexicon acquisition.',
                'Focused on the use of ICT in teaching Spanish as a Foreign Language.'
            ]
        },
        {
            id: 'edu1',
            company: 'Universidad de Salamanca',
            location: 'Salamanca, España',
            title: 'Filología Hispánica',
            startDate: '2008-06', // Represents the completion date
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

    // --- 2. NEW BLOCK TIMELINE RENDERER ---
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineItemsWrapper = document.querySelector('.timeline-items');

    // Sort data by date, oldest to newest, to handle overlaps correctly
    jobsData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    const startYear = 2008;
    const endYear = 2025;
    const totalYears = endYear - startYear;

    // Helper to convert a date to a percentage position
    const dateToPercentage = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth();
        const timeIntoYear = month / 12;
        const totalTime = (year + timeIntoYear) - startYear;
        return (totalTime / totalYears) * 100;
    };

    let lastPosition = -10; // Keep track of last item's position to alternate
    let isOdd = true;

    jobsData.forEach(job => {
        // Determine position
        const position = dateToPercentage(job.startDate);

        // If this event is too close to the last one, flip its orientation
        if ((position - lastPosition) < 10) { // 10% threshold
            isOdd = !isOdd;
        } else {
            isOdd = true; // Default to odd (top)
        }

        const eventDiv = document.createElement('div');
        eventDiv.className = isOdd ? 'timeline-event event-odd' : 'timeline-event event-even';
        eventDiv.style.left = `${position}%`;

        const cardDiv = document.createElement('div');
        cardDiv.className = 'timeline-card';
        cardDiv.dataset.jobId = job.id; // Critical for modal click

        const startDisplayYear = new Date(job.startDate).getFullYear();
        const endDisplayYear = job.endDate === 'Presente' ? 'Now' : new Date(job.endDate).getFullYear();

        cardDiv.innerHTML = `
            <h4>${job.company}</h4>
            <p>${job.title}</p>
            <p><strong>(${startDisplayYear} - ${endDisplayYear})</strong></p>
        `;

        eventDiv.appendChild(cardDiv);
        timelineItemsWrapper.appendChild(eventDiv);

        lastPosition = position;
    });


    // --- 3. MODAL LOGIC ---
    const modal = document.getElementById('timeline-modal');
    const modalContent = modal.querySelector('.modal-card-content');
    const closeModalButton = modal.querySelector('.modal-close');

    // Event listener for the entire timeline area
    timelineItemsWrapper.addEventListener('click', function(event) {
        const card = event.target.closest('.timeline-card');
        if (!card) return;

        const jobId = card.dataset.jobId;
        const jobData = jobsData.find(j => j.id === jobId);

        if (jobData) {
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

    // Functions to close the modal
    function closeModal() {
        modal.classList.remove('visible');
    }

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});
