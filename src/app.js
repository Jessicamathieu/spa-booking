// Spa Booking Application
class SpaBooking {
    constructor() {
        this.bookings = JSON.parse(localStorage.getItem('spaBookings')) || [];
        this.currentBooking = {};
        this.availableSlots = this.generateAvailableSlots();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupDatePicker();
        this.setupFormHandlers();
        this.setupServiceCards();
        this.setupModal();
        this.setMinDate();
    }

    // Navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.showSection(targetSection);
                this.updateActiveNavLink(link);
            });
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Date and Time Management
    setMinDate() {
        const dateInput = document.getElementById('date');
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    setupDatePicker() {
        const dateInput = document.getElementById('date');
        dateInput.addEventListener('change', () => {
            this.updateAvailableSlots();
        });
    }

    generateAvailableSlots() {
        // Generate time slots from 9:00 to 18:00
        const slots = [];
        for (let hour = 9; hour <= 18; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                if (hour === 18 && minute > 0) break; // Don't go past 18:00
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(timeString);
            }
        }
        return slots;
    }

    updateAvailableSlots() {
        const dateInput = document.getElementById('date');
        const timeSelect = document.getElementById('time');
        const selectedDate = dateInput.value;

        // Clear existing options
        timeSelect.innerHTML = '<option value="">Choisissez une heure</option>';

        if (!selectedDate) return;

        // Filter out booked slots for the selected date
        const bookedSlots = this.bookings
            .filter(booking => booking.date === selectedDate)
            .map(booking => booking.time);

        // Add available slots
        this.availableSlots.forEach(slot => {
            if (!bookedSlots.includes(slot)) {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                timeSelect.appendChild(option);
            }
        });
    }

    // Service Cards
    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const service = card.getAttribute('data-service');
                this.selectService(service);
                this.showSection('booking');
                this.updateActiveNavLink(document.querySelector('[href="#booking"]'));
            });
        });
    }

    selectService(serviceId) {
        const serviceSelect = document.getElementById('service');
        serviceSelect.value = serviceId;
        this.updateBookingSummary();
    }

    // Form Handling
    setupFormHandlers() {
        const form = document.getElementById('booking-form');
        const serviceSelect = document.getElementById('service');

        // Update summary when service changes
        serviceSelect.addEventListener('change', () => {
            this.updateBookingSummary();
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission();
        });
    }

    updateBookingSummary() {
        const serviceSelect = document.getElementById('service');
        const summaryDiv = document.getElementById('booking-summary');
        const summaryContent = summaryDiv.querySelector('.summary-content');

        if (!serviceSelect.value) {
            summaryDiv.style.display = 'none';
            return;
        }

        const serviceData = this.getServiceData(serviceSelect.value);
        if (serviceData) {
            summaryContent.innerHTML = `
                <strong>Service:</strong> ${serviceData.name}<br>
                <strong>Durée:</strong> ${serviceData.duration} minutes<br>
                <strong>Prix:</strong> ${serviceData.price}€
            `;
            summaryDiv.style.display = 'block';
        }
    }

    getServiceData(serviceId) {
        const services = {
            'massage': { name: 'Massage Relaxant', duration: 60, price: 80 },
            'facial': { name: 'Soin du Visage', duration: 45, price: 65 },
            'body-wrap': { name: 'Enveloppement Corporel', duration: 90, price: 120 },
            'manicure': { name: 'Manucure', duration: 30, price: 35 }
        };
        return services[serviceId];
    }

    handleBookingSubmission() {
        const formData = new FormData(document.getElementById('booking-form'));
        const booking = {
            id: Date.now().toString(),
            service: formData.get('service'),
            date: formData.get('date'),
            time: formData.get('time'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            notes: formData.get('notes'),
            createdAt: new Date().toISOString()
        };

        // Validate booking
        if (!this.validateBooking(booking)) {
            return;
        }

        // Show loading state
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading"></span> Confirmation en cours...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.saveBooking(booking);
            this.showConfirmation(booking);
            this.resetForm();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    }

    validateBooking(booking) {
        // Check if slot is still available
        const isSlotTaken = this.bookings.some(b => 
            b.date === booking.date && b.time === booking.time
        );

        if (isSlotTaken) {
            alert('Désolé, ce créneau n\'est plus disponible. Veuillez choisir un autre horaire.');
            this.updateAvailableSlots();
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(booking.email)) {
            alert('Veuillez entrer une adresse email valide.');
            return false;
        }

        // Validate phone format (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(booking.phone)) {
            alert('Veuillez entrer un numéro de téléphone valide.');
            return false;
        }

        return true;
    }

    saveBooking(booking) {
        this.bookings.push(booking);
        localStorage.setItem('spaBookings', JSON.stringify(this.bookings));
    }

    resetForm() {
        document.getElementById('booking-form').reset();
        document.getElementById('booking-summary').style.display = 'none';
        this.setMinDate();
    }

    // Modal Management
    setupModal() {
        const modal = document.getElementById('confirmation-modal');
        const closeBtn = modal.querySelector('.close');

        closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    showConfirmation(booking) {
        const modal = document.getElementById('confirmation-modal');
        const detailsDiv = document.getElementById('confirmation-details');
        const serviceData = this.getServiceData(booking.service);

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        detailsDiv.innerHTML = `
            <div style="text-align: left; margin: 1rem 0;">
                <p><strong>Service:</strong> ${serviceData.name}</p>
                <p><strong>Date:</strong> ${formatDate(booking.date)}</p>
                <p><strong>Heure:</strong> ${booking.time}</p>
                <p><strong>Durée:</strong> ${serviceData.duration} minutes</p>
                <p><strong>Prix:</strong> ${serviceData.price}€</p>
                <p><strong>Client:</strong> ${booking.firstName} ${booking.lastName}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Téléphone:</strong> ${booking.phone}</p>
                ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
            </div>
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                <p><small>Un email de confirmation a été envoyé à ${booking.email}</small></p>
            </div>
        `;

        modal.style.display = 'flex';
    }

    closeModal() {
        document.getElementById('confirmation-modal').style.display = 'none';
    }

    // Admin Functions (for demo purposes)
    getBookings() {
        return this.bookings;
    }

    clearAllBookings() {
        this.bookings = [];
        localStorage.removeItem('spaBookings');
        console.log('All bookings cleared');
    }
}

// Global functions for HTML onclick events
function showSection(sectionId) {
    spaApp.showSection(sectionId);
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

function closeModal() {
    spaApp.closeModal();
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.spaApp = new SpaBooking();
    console.log('Spa Booking Application initialized');
    
    // Debug functions (remove in production)
    window.getBookings = () => spaApp.getBookings();
    window.clearBookings = () => spaApp.clearAllBookings();
});